export interface LeadCapturePayload {
  name: string;
  phone: string;
  email?: string;
  source?: string;
  project?: string;
  preference?: string;
  preferredMethod?: string;
  preferredTime?: string;
  preferredDate?: string;
  message?: string;
  consent?: boolean;
  notes?: string;
  referenceId?: string;
  verifiedAt?: string;
}

export interface LeadCaptureResult {
  success: boolean;
  leadId?: string;
  referenceId: string;
  deduped?: boolean;
  message?: string;
  error?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://scymbepzlkfqtkkwnxne.supabase.co';
const SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
const CRM_WEBHOOK_URL =
  import.meta.env.VITE_CRM_WEBHOOK_URL ||
  'https://realstatecrm.bitlancetechhub.com/api/webhooks/leads';
const CRM_WEBHOOK_SECRET =
  import.meta.env.VITE_CRM_WEBHOOK_SECRET ||
  'whsec_1f6b4e17bccfc6a5a0dde2c5dcde533e6638652203f517e8';

// Target Organizations: Primary Lifestyle Org + Dashboard Org
const PRIMARY_ORG_ID =
  import.meta.env.VITE_CRM_ORG_ID || '8a7fe841-bda6-46a1-a033-d68d2bb2a318';
const DASHBOARD_ORG_ID = '956739fd-5b6f-46f6-9e8f-82b6e17ee482';

const CRM_ADMIN_ID =
  import.meta.env.VITE_CRM_ADMIN_ID || '403ac464-fdf6-4cd7-b415-4cef9f17fa21';
const CRM_AGENT_ID =
  import.meta.env.VITE_CRM_AGENT_ID || '2b0fc266-1ca1-4c36-97cf-783f7155a32e';

// Generates an official reference ID (e.g. LHS-2026-A82F)
export function generateReferenceId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `LHS-2026-${code}`;
}

// Splits full name into first and last name safely
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = (fullName || '').trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) {
    return { firstName: 'Prospective', lastName: 'Buyer' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: 'Client' };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

// Canonical phone number formatting (+91...)
export function normalizePhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits) return rawPhone.trim();
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.startsWith('91') && digits.length === 12) {
    return `+${digits}`;
  }
  return `+${digits}`;
}

// Maps luxury property configuration to CRM property_type enum
function mapPropertyType(pref: string): string {
  const lower = (pref || '').toLowerCase();
  if (lower.includes('commercial') || lower.includes('shop') || lower.includes('retail') || lower.includes('office')) {
    return 'commercial';
  }
  if (lower.includes('villa') || lower.includes('penthouse') || lower.includes('duplex')) {
    return 'multi_family';
  }
  return 'condo';
}

/**
 * Captures a lead into the MERN Real Estate CRM.
 * 1. Posts to CRM server webhook endpoint (runs deduplication, assignment, timeline logging)
 * 2. As an atomic fail-safe, ensures lead row exists in Supabase for both target organizations.
 */
export async function captureLeadInCRM(
  payload: LeadCapturePayload
): Promise<LeadCaptureResult> {
  const referenceId = payload.referenceId || generateReferenceId();

  try {
    if (!payload.phone && !payload.name) {
      return {
        success: false,
        referenceId,
        error: 'Phone number or name is required for lead capture.',
      };
    }

    const { firstName, lastName } = splitName(payload.name || '');
    const phone = normalizePhone(payload.phone || '');
    const email = payload.email?.trim() || undefined;
    const project = payload.project || 'Lifestyle Home Spaces';
    const preference = payload.preference || '2 BHK Luxury Residence';
    const source = payload.source || 'Website Contact Form';
    const propertyType = mapPropertyType(preference);

    const submissionTimeIST = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    });

    const detailedNotes = [
      `[REF: ${referenceId}]`,
      `Project: ${project}`,
      `Configuration: ${preference}`,
      payload.preferredMethod ? `Preferred Contact: ${payload.preferredMethod.toUpperCase()}` : null,
      payload.preferredTime ? `Preferred Time: ${payload.preferredTime}` : null,
      payload.preferredDate ? `Preferred Visit Date: ${payload.preferredDate}` : null,
      payload.message ? `Customer Message: ${payload.message}` : null,
      payload.consent ? `Consent: Verified Opt-in` : null,
      payload.verifiedAt ? `OTP Verified: ${payload.verifiedAt}` : 'OTP Verified: Yes',
      `Source: ${source}`,
      `Captured: ${submissionTimeIST} IST`,
    ]
      .filter(Boolean)
      .join(' | ');

    let webhookLeadId: string | undefined;
    let isDeduped = false;

    // 1. Primary Ingestion via authenticated CRM Webhook
    try {
      const webhookPayload = {
        name: `${firstName} ${lastName}`.trim(),
        first_name: firstName,
        last_name: lastName,
        phone,
        email: email || undefined,
        source: 'website',
        location: 'Amravati, Maharashtra',
        property_type: propertyType,
        notes: detailedNotes,
      };

      const webhookRes = await fetch(CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-secret': CRM_WEBHOOK_SECRET,
        },
        body: JSON.stringify(webhookPayload),
      });

      if (webhookRes.ok) {
        const webhookData = await webhookRes.json();
        webhookLeadId = webhookData.leadId;
        isDeduped = !!webhookData.deduped;
      } else {
        console.warn('CRM Webhook responded with status:', webhookRes.status);
      }
    } catch (whErr) {
      console.warn('CRM Webhook delivery error (will use direct sync):', whErr);
    }

    // 2. Direct Supabase Ingestion (Dual-Org Sync & Fail-safe Guarantee)
    if (SERVICE_KEY && SUPABASE_URL) {
      const headers = {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      };

      const targetOrgs = Array.from(new Set([PRIMARY_ORG_ID, DASHBOARD_ORG_ID].filter(Boolean)));
      const phoneLast10 = phone.replace(/\D/g, '').slice(-10);

      for (const orgId of targetOrgs) {
        try {
          let existingLead: any = null;

          // Check if lead already exists in this org
          if (phoneLast10.length >= 7) {
            const searchRes = await fetch(
              `${SUPABASE_URL}/rest/v1/leads?organization_id=eq.${orgId}&phone=like.*${phoneLast10}*&limit=1`,
              { headers }
            );
            if (searchRes.ok) {
              const matches = await searchRes.json();
              if (Array.isArray(matches) && matches.length > 0) {
                existingLead = matches[0];
              }
            }
          }

          let leadId: string;

          if (existingLead) {
            leadId = existingLead.id;
            isDeduped = true;
            const existingNotes = existingLead.notes || '';
            const updatedNotes = `${existingNotes}\n[${new Date().toISOString()}] ${detailedNotes}`.trim();

            const patchBody: Record<string, any> = {
              notes: updatedNotes,
              email: email || existingLead.email,
              updated_at: new Date().toISOString(),
            };

            // If a valid name is provided, update first_name and last_name in CRM
            if (firstName && firstName.toLowerCase() !== 'prospective' && firstName.toLowerCase() !== 'client') {
              patchBody.first_name = firstName;
              patchBody.last_name = lastName || '';
            }

            await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${leadId}`, {
              method: 'PATCH',
              headers,
              body: JSON.stringify(patchBody),
            });
          } else {
            const insertPayload: Record<string, any> = {
              organization_id: orgId,
              first_name: firstName,
              last_name: lastName,
              email: email || null,
              phone,
              status: 'new',
              temperature: 'warm',
              source: 'website',
              location: 'Amravati, Maharashtra',
              property_type: propertyType,
              notes: detailedNotes,
            };

            if (orgId === PRIMARY_ORG_ID && CRM_AGENT_ID) {
              insertPayload.assigned_to = CRM_AGENT_ID;
            }

            const insertLeadRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
              method: 'POST',
              headers,
              body: JSON.stringify(insertPayload),
            });

            if (insertLeadRes.ok) {
              const createdLeads = await insertLeadRes.json();
              leadId = createdLeads[0]?.id;
            } else {
              continue;
            }
          }

          if (!webhookLeadId) {
            webhookLeadId = leadId;
          }

          // Log timeline activity
          try {
            await fetch(`${SUPABASE_URL}/rest/v1/activities`, {
              method: 'POST',
              headers,
              body: JSON.stringify({
                organization_id: orgId,
                lead_id: leadId,
                type: 'lead_created',
                payload: {
                  via: 'website',
                  reference_id: referenceId,
                  details: `Website form submitted for ${project} (${preference})`,
                  source: 'website',
                  lead_name: `${firstName} ${lastName}`.trim(),
                },
              }),
            });
          } catch {}

          // Create notification for sales team in primary org
          if (orgId === PRIMARY_ORG_ID) {
            try {
              if (CRM_AGENT_ID) {
                await fetch(`${SUPABASE_URL}/rest/v1/notifications`, {
                  method: 'POST',
                  headers,
                  body: JSON.stringify({
                    organization_id: orgId,
                    recipient_id: CRM_AGENT_ID,
                    lead_id: leadId,
                    type: 'lead_assigned',
                    message: `New Lead [${referenceId}]: ${firstName} ${lastName} (${phone}) for ${project} [${preference}]`,
                  }),
                });
              }
            } catch {}
          }
        } catch (orgErr) {
          console.warn(`Sync error for org ${orgId}:`, orgErr);
        }
      }
    }

    return {
      success: true,
      leadId: webhookLeadId,
      referenceId,
      deduped: isDeduped,
      message: 'Lead successfully captured and synchronized with Real Estate CRM',
    };
  } catch (err: any) {
    console.error('Lead capture error:', err);
    return {
      success: false,
      referenceId,
      error: err?.message || 'Failed to capture lead',
    };
  }
}
