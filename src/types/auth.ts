export interface VerifiedUser {
  name: string;
  phone: string;
  email?: string;
  interest?: string;
  details?: string;
  verified: boolean;
  verifiedAt: string;
  token?: string;
}

export interface LeadEnquiryData {
  name: string;
  phone: string;
  email?: string;
  project: string;
  preference: string;
  preferredMethod: 'whatsapp' | 'call' | 'email';
  preferredTime?: string;
  preferredDate?: string;
  message?: string;
  consent: boolean;
  referenceId?: string;
}
