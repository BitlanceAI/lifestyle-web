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

const CRM_ORG_ID =
  import.meta.env.VITE_CRM_ORG_ID || '8a7fe841-bda6-46a1-a033-d68d2bb2a318';
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
 * Captures a lead into the Lifestyle Real Estate CRM
 * Automatically assigns the lead to agent@lifestylehomespaces.com and notifies both
 * admin@lifestylehomespaces.com and agent@lifestylehomespaces.com
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
    const sourceTitle = payload.source || 'Website Registration';
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

    // 1. Check if lead already exists in this organization by phone
    const phoneLast10 = phone.replace(/\D/g, '').slice(-10);
    let existingLead: any = null;

    if (phoneLast10.length >= 7) {
      const searchRes = await fetch(
        `${SUPABASE_URL}/rest/v1/leads?organization_id=eq.${CRM_ORG_ID}&phone=like.*${phoneLast10}&limit=1`,
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
      // Enrich existing lead with newly provided notes
      const existingNotes = existingLead.notes || '';
      const updatedNotes = `${existingNotes}\n[${new Date().toISOString()}] ${formattedNotes}`.trim();

      await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${leadId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          notes: updatedNotes,
          updated_at: new Date().toISOString(),
        }),
      });

      // Log note/activity on timeline
      await fetch(`${SUPABASE_URL}/rest/v1/activities`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          organization_id: CRM_ORG_ID,
          lead_id: leadId,
          type: 'note',
          payload: {
            via: 'website',
            details: `Repeat enquiry received via ${sourceTitle}`,
            project,
            preference,
            source: 'website',
          },
        }),
      });
    } else {
      // 2. Insert new Lead assigned directly to Lifestyle Agent
      const insertLeadRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          organization_id: CRM_ORG_ID,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          status: 'new',
          temperature: 'warm',
          source: 'website',
          location: 'Amravati, Maharashtra',
          assigned_to: CRM_AGENT_ID, // agent@lifestylehomespaces.com
          notes: formattedNotes,
        }),
      });

      if (!insertLeadRes.ok) {
        const errText = await insertLeadRes.text();
        console.error('Failed to insert lead into CRM:', errText);
        return { success: false, error: errText };
      }

      const createdLeads = await insertLeadRes.json();
      leadId = createdLeads[0].id;

      // 3. Log lead creation in timeline activities
      await fetch(`${SUPABASE_URL}/rest/v1/activities`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          organization_id: CRM_ORG_ID,
          lead_id: leadId,
          type: 'lead_created',
          payload: {
            via: 'website',
            details: `Lead created from ${sourceTitle} for ${project}`,
            source: 'website',
            lead_name: `${firstName} ${lastName}`.trim(),
            assigned_agent: 'agent@lifestylehomespaces.com',
            admin_notified: 'admin@lifestylehomespaces.com',
          },
        }),
      });
    }

    // 4. Create in-app notification for Agent (agent@lifestylehomespaces.com)
    await fetch(`${SUPABASE_URL}/rest/v1/notifications`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        organization_id: CRM_ORG_ID,
        recipient_id: CRM_AGENT_ID,
        lead_id: leadId,
        type: 'lead_assigned',
        message: `New Lead: ${firstName} ${lastName} (${phone}) interested in ${project} [${preference}]`,
      }),
    });

    // 5. Create in-app notification for Admin (admin@lifestylehomespaces.com)
    await fetch(`${SUPABASE_URL}/rest/v1/notifications`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        organization_id: CRM_ORG_ID,
        recipient_id: CRM_ADMIN_ID,
        lead_id: leadId,
        type: 'lead_triage',
        message: `New Website Lead captured: ${firstName} ${lastName} (${phone}) - assigned to agent@lifestylehomespaces.com`,
      }),
    });

    return {
      success: true,
      leadId,
      message: 'Lead successfully captured and assigned in Lifestyle CRM',
    };
  } catch (err: any) {
    console.error('Error in captureLeadInCRM:', err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}
