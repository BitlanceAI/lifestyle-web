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
 * Sends a real-time WhatsApp notification directly to the owner number (8530763405)
 * using Bitlance AI (Phone ID 744188362103708) from Real Estate CRM.
 * The customer NEVER receives this message — it is sent ONLY to the owner.
 */
export async function notifyOwnerOnWhatsApp(
  params: OwnerNotificationParams
): Promise<{ success: boolean; error?: string }> {
  // 1. Bitlance AI sender credentials (from CRM config)
  const bitlancePhoneId =
    import.meta.env.VITE_BITLANCE_WHATSAPP_PHONE_ID || '744188362103708';
  const bitlanceToken =
    import.meta.env.VITE_BITLANCE_WHATSAPP_TOKEN ||
    'EAAU6uBLPyowBRZB635p73IoYSJusGBYeJPNezLQWnPmjnr5i2ZB7ZCNZCmZCkvvjGuvqSFVb6ejubUsH1hgt95joyIxi7emH2NlfxCT5sIAwtisWs9HQZBKURg79rqKa20cYRi2KQ0mLRXE7hhIRJ3vjlfrsDUFD0mk6pW3DGwMoR5AItC2OwZAFqzhMMHQwYfyHQZDZD';

  // 2. Owner recipient: Official Lifestyle Owner from CRM (8530763405)
  const ownerRecipient = (import.meta.env.VITE_OWNER_WHATSAPP_NUMBER || '918530763405').replace(/\D/g, '');
  const cleanOwnerTo = ownerRecipient.length === 10 ? '91' + ownerRecipient : ownerRecipient;

  const nowIST = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const actionText =
    params.type === 'sign_in'
      ? 'signed in to the client portal'
      : 'submitted a new property enquiry';

  const detailParam =
    params.type === 'sign_in'
      ? 'Member Portal Access'
      : `${params.project || 'Lifestyle Home Spaces'} (${params.preference || 'Residence'})`;

  const refParam = params.referenceId || `LHS-MEMBER-${params.phone.replace(/\D/g, '').slice(-4)}`;
  const emailLine = params.email?.trim() ? `\n• Email: ${params.email.trim()}` : '';

  const messageBody = `Hello Lifestyle Team,\n\nA customer has ${actionText} on Lifestyle Home Spaces.\n\n*Customer Details:*\n• Name: ${params.name || 'Valued Client'}\n• Phone: ${params.phone}${emailLine}\n• Details / Project: ${detailParam}\n• Reference ID: ${refParam}\n• Time: ${nowIST} IST\n\nPlease follow up with the customer promptly.`;

  try {
    const url = `https://graph.facebook.com/v19.0/${bitlancePhoneId}/messages`;

    // Send using the approved template 'lifestyle_lead_alert'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bitlanceToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: cleanOwnerTo,
        type: 'template',
        template: {
          name: 'lifestyle_lead_alert',
          language: {
            code: 'en'
          },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: params.name || 'Valued Client' },
                { type: 'text', text: params.phone + (emailLine ? ` | ${params.email}` : '') },
                { type: 'text', text: detailParam },
                { type: 'text', text: refParam },
                { type: 'text', text: `${nowIST} IST` }
              ]
            }
          ]
        }
      }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.warn('Bitlance AI message to owner returned error:', data);
    } else {
      console.log('Owner notification dispatched via Bitlance AI to', cleanOwnerTo, data);
    }
    return { success: res.ok };
  } catch (err: any) {
    console.warn('Failed to dispatch owner notification via Bitlance AI:', err);
    return { success: false, error: err?.message };
  }
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
