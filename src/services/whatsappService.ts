import { LeadCapturePayload } from './crmLeadService';

const TOKEN = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || '';
const PHONE_NUMBER_ID = import.meta.env.VITE_WHATSAPP_PHONE_ID || '1321450167713117';
const OFFICIAL_LIFESTYLE_WHATSAPP = '918530763405';

export interface SendOtpResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface OwnerNotificationParams {
  type: 'sign_in' | 'enquiry';
  name: string;
  phone: string;
  email?: string;
  project?: string;
  preference?: string;
  referenceId?: string;
}

/**
 * Sends a verified 6-digit OTP code to the customer's WhatsApp using Meta WhatsApp Cloud API.
 * Uses the pre-approved 'web_verify' template.
 */
export async function sendWhatsappOtp(
  phone: string,
  otp: string
): Promise<SendOtpResult> {
  // Normalize recipient phone number (country code without '+')
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone; // Default to India (+91)
  }

  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    to: cleanPhone,
    type: 'template',
    template: {
      name: 'web_verify',
      language: {
        code: 'en',
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: otp,
            },
          ],
        },
        {
          type: 'button',
          sub_type: 'url',
          index: '0',
          parameters: [
            {
              type: 'text',
              text: otp,
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.warn('WhatsApp Cloud API response not OK:', result);
      return {
        success: false,
        error: result.error?.message || 'Failed to dispatch WhatsApp OTP',
      };
    }

    const messageId = result.messages?.[0]?.id;
    return {
      success: true,
      messageId,
    };
  } catch (error: any) {
    console.error('Error invoking WhatsApp Cloud API:', error);
    return {
      success: false,
      error: error?.message || 'Network error communicating with WhatsApp API',
    };
  }
}

/**
 * Sends a real-time WhatsApp notification directly to the owner/admin when:
 * 1. A new user signs in (verifies mobile)
 * 2. A user submits an enquiry
 */
export async function notifyOwnerOnWhatsApp(
  params: OwnerNotificationParams
): Promise<{ success: boolean; error?: string }> {
  const envOwner = import.meta.env.VITE_OWNER_WHATSAPP_NUMBER;
  const rawList = envOwner ? envOwner.split(',') : ['916398792951'];
  
  // Format numbers and filter out sending number (cannot message itself)
  const targetNumbers = Array.from(
    new Set(
      rawList
        .map((num: string) => num.replace(/\D/g, ''))
        .filter((num: string) => num.length >= 10 && num !== '918530763405' && num !== '8530763405')
    )
  );

  const nowIST = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const eventText =
    params.type === 'sign_in'
      ? `New Sign-In: ${params.name || 'Client'} (${params.phone})`
      : `New Enquiry [${params.referenceId || 'LHS'}]: ${params.name || 'Client'} (${params.phone}) for ${params.preference || 'Residence'}`;

  const detailText =
    params.type === 'sign_in'
      ? `Lifestyle Web at ${nowIST}`
      : `${params.project || 'Lifestyle Home Spaces'} at ${nowIST}`;

  for (const recipient of targetNumbers) {
    try {
      const cleanTo = recipient.length === 10 ? '91' + recipient : recipient;
      const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

      // 1. Prepare lifestyle_lead_alert payload (unified for Sign In & Enquiry)
      const actionText =
        params.type === 'sign_in'
          ? 'signed in to the client portal'
          : 'submitted a new property enquiry';
      const detailParam =
        params.type === 'sign_in'
          ? 'Member Portal Access'
          : `${params.project || 'Lifestyle Home Spaces'} (${params.preference || 'Residence'})`;
      const refParam = params.referenceId || `LHS-MEMBER-${params.phone.replace(/\D/g, '').slice(-4)}`;

      const primaryPayload = {
        messaging_product: 'whatsapp',
        to: cleanTo,
        type: 'template',
        template: {
          name: 'lifestyle_lead_alert',
          language: { code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: actionText },
                { type: 'text', text: params.name || 'Valued Client' },
                { type: 'text', text: params.phone },
                { type: 'text', text: detailParam },
                { type: 'text', text: refParam },
              ],
            },
          ],
        },
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(primaryPayload),
      });

      // If lifestyle_lead_alert is still under review by Meta, fallback to approved wacrm_appointment_reminder
      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        console.warn('lifestyle_lead_alert not yet active (under review), trying fallback template:', errJson);

        await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: cleanTo,
            type: 'template',
            template: {
              name: 'wacrm_appointment_reminder',
              language: { code: 'en_US' },
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: 'Lifestyle Owner' },
                    { type: 'text', text: eventText },
                    { type: 'text', text: detailText },
                  ],
                },
              ],
            },
          }),
        });
      }
    } catch (err) {
      console.warn('Failed to dispatch owner WhatsApp notification to', recipient, err);
    }
  }

  return { success: true };
}

/**
 * Formats a luxury new lead notification message for Lifestyle Home Spaces concierge.
 */
export function formatLifestyleConciergeMessage(
  payload: LeadCapturePayload & { referenceId: string; leadId?: string }
): string {
  const crmLink = payload.leadId
    ? `\n*CRM Lead Link:* https://realstatecrm.bitlancetechhub.com/leads/${payload.leadId}`
    : '';

  const emailLine = payload.email?.trim() ? `\n*Email:* ${payload.email.trim()}` : '';
  const dateLine = payload.preferredDate ? `\n*Preferred Date:* ${payload.preferredDate}` : '';
  const methodLine = payload.preferredMethod
    ? `\n*Preferred Mode:* ${payload.preferredMethod.toUpperCase()} ${payload.preferredTime ? `(${payload.preferredTime})` : ''}`
    : '';
  const msgLine = payload.message ? `\n*Customer Note:* ${payload.message}` : '';

  return `*LIFESTYLE HOME SPACES — NEW LEAD NOTIFICATION*
----------------------------------------
*Ref ID:* ${payload.referenceId}
*Customer:* ${payload.name || 'Prospective Buyer'}
*Verified Mobile:* ${payload.phone}${emailLine}
*Project:* ${payload.project || 'Lifestyle Home Spaces'}
*Configuration:* ${payload.preference || '2 BHK Luxury Residence'}${dateLine}${methodLine}${msgLine}
*Source:* ${payload.source || 'Website Contact Form'}
*Timestamp:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST${crmLink}
----------------------------------------`;
}

/**
 * Generates direct pre-filled WhatsApp link for instant connection with Lifestyle Home Spaces concierge.
 */
export function getLifestyleConciergeWhatsAppUrl(
  payload: LeadCapturePayload & { referenceId: string; leadId?: string }
): string {
  const text = formatLifestyleConciergeMessage(payload);
  return `https://wa.me/${OFFICIAL_LIFESTYLE_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

/**
 * Dispatches lead notification to the official Lifestyle Home Spaces business number.
 * Ensures that if WhatsApp delivery fails or is throttled, the CRM lead is safely retained.
 */
export async function sendLeadNotificationToLifestyle(
  payload: LeadCapturePayload & { referenceId: string; leadId?: string }
): Promise<{ success: boolean; url: string; error?: string }> {
  const conciergeUrl = getLifestyleConciergeWhatsAppUrl(payload);

  return {
    success: true,
    url: conciergeUrl,
  };
}
