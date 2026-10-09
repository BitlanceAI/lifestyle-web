export interface LeadCapturePayload {
  name: string;
  phone: string;
  email?: string;
  source?: string;
  project?: string;
  preference?: string;
  preferredDate?: string;
  notes?: string;
}

export interface LeadCaptureResult {
  success: boolean;
  leadId?: string;
  message?: string;
  error?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

// Targets both the primary CRM organization and the dashboard organization
const PRIMARY_ORG_ID =
  import.meta.env.VITE_CRM_ORG_ID || '8a7fe841-bda6-46a1-a033-d68d2bb2a318';
const DASHBOARD_ORG_ID = '956739fd-5b6f-46f6-9e8f-82b6e17ee482';

const CRM_ADMIN_ID =
  import.meta.env.VITE_CRM_ADMIN_ID || '403ac464-fdf6-4cd7-b415-4cef9f17fa21';
const CRM_AGENT_ID =
  import.meta.env.VITE_CRM_AGENT_ID || '2b0fc266-1ca1-4c36-97cf-783f7155a32e';

// Splits full name into first and last name
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
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

// Canonical phone number formatting
function normalizePhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits) return rawPhone.trim();
  // If 10 digits without country code, add +91
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  return `+${digits}`;
}

/**
 * Captures a lead into the Real Estate CRM database.
 * Ensures the lead is visible in both the Lifestyle org and main CRM dashboard.
 */
export async function captureLeadInCRM(
  payload: LeadCapturePayload
): Promise<LeadCaptureResult> {
  try {
    if (!payload.phone && !payload.name) {
      return { success: false, error: 'Phone or name is required' };
    }

    if (!SUPABASE_URL || !SERVICE_KEY) {
      console.warn('CRM Supabase URL or Service Key not configured in environment.');
      return { success: false, error: 'CRM credentials not configured' };
    }

    const { firstName, lastName } = splitName(payload.name || '');
    const phone = normalizePhone(payload.phone || '');
    const email = payload.email?.trim() || null;
    const sourceTitle = payload.source || 'Website Contact Form';
    const project = payload.project || 'Lifestyle Home Spaces';
    const preference = payload.preference || '2 BHK Residence';

    const formattedNotes = [
      `Project: ${project}`,
      `Preference: ${preference}`,
      payload.preferredDate ? `Preferred Site Visit Date: ${payload.preferredDate}` : null,
      `Source: ${sourceTitle}`,
      payload.notes ? `Additional Notes: ${payload.notes}` : null,
      `Captured At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    ]
      .filter(Boolean)
      .join(' | ');

    const headers = {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    };

    const targetOrgs = Array.from(new Set([PRIMARY_ORG_ID, DASHBOARD_ORG_ID].filter(Boolean)));
    const phoneLast10 = phone.replace(/\D/g, '').slice(-10);
    let primaryLeadId: string | undefined;

    for (const orgId of targetOrgs) {
      try {
        let existingLead: any = null;
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
          const existingNotes = existingLead.notes || '';
          const updatedNotes = `${existingNotes}\n[${new Date().toISOString()}] ${formattedNotes}`.trim();

          await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${leadId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
              notes: updatedNotes,
              email: email || existingLead.email,
              updated_at: new Date().toISOString(),
            }),
          });
        } else {
          // Insert new Lead
          const insertPayload: Record<string, any> = {
            organization_id: orgId,
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            status: 'new',
            temperature: 'warm',
            source: 'website',
            location: 'Amravati, Maharashtra',
            notes: formattedNotes,
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
            const errText = await insertLeadRes.text();
            console.error(`Failed to insert lead into CRM org ${orgId}:`, errText);
            continue;
          }
        }

        if (!primaryLeadId) {
          primaryLeadId = leadId;
        }

        // Try to log activity (fail-safe)
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
                details: `Website form submitted for ${project}`,
                source: 'website',
                lead_name: `${firstName} ${lastName}`.trim(),
              },
            }),
          });
        } catch {}

        // In-app notifications for primary org
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
                  message: `New Lead: ${firstName} ${lastName} (${phone}) interested in ${project} [${preference}]`,
                }),
              });
            }
            if (CRM_ADMIN_ID) {
              await fetch(`${SUPABASE_URL}/rest/v1/notifications`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  organization_id: orgId,
                  recipient_id: CRM_ADMIN_ID,
                  lead_id: leadId,
                  type: 'lead_triage',
                  message: `New Website Lead captured: ${firstName} ${lastName} (${phone})`,
                }),
              });
            }
          } catch {}
        }
      } catch (innerErr) {
        console.error(`Error saving to org ${orgId}:`, innerErr);
      }
    }

    return {
      success: true,
      leadId: primaryLeadId,
      message: 'Lead successfully captured in Real Estate CRM',
    };
  } catch (err: any) {
    console.error('Error in captureLeadInCRM:', err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}
