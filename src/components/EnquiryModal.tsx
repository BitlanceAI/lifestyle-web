import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Phone,
  MessageCircle,
  User,
  Mail,
  Sparkles,
  Loader2,
  CheckCircle2,
  Clock,
  Building,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  AlertCircle,
  KeyRound,
  RefreshCw,
} from 'lucide-react';
import { ProjectConfig, BRAND_CONFIG, PROJECTS } from '../data/projects';
import { captureLeadInCRM, generateReferenceId, normalizePhone } from '../services/crmLeadService';
import {
  sendWhatsappOtp,
  getLifestyleConciergeWhatsAppUrl,
  notifyOwnerOnWhatsApp,
} from '../services/whatsappService';
import { VerifiedUser } from '../types/auth';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectConfig | null;
  defaultPreference?: string;
  defaultName?: string;
  defaultPhone?: string;
  currentUser?: VerifiedUser | null;
  onUserVerified?: (user: VerifiedUser) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  project,
  defaultPreference = '2 BHK Luxury Residence',
  defaultName = '',
  defaultPhone = '',
  currentUser,
  onUserVerified,
}) => {
  // Step state: 'phone' -> 'otp' -> 'form' -> 'confirmed'
  const isInitiallyVerified = Boolean(currentUser?.verified);
  const [step, setStep] = useState<'phone' | 'otp' | 'form' | 'confirmed'>(
    isInitiallyVerified ? 'form' : 'phone'
  );

  // Form Fields
  const [name, setName] = useState(currentUser?.name || defaultName);
  const [phone, setPhone] = useState(currentUser?.phone || defaultPhone);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [selectedProject, setSelectedProject] = useState<string>(
    project ? project.projectName : 'Lifestyle Home Spaces'
  );
  const [preference, setPreference] = useState(defaultPreference);
  const [preferredMethod, setPreferredMethod] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [preferredTime, setPreferredTime] = useState('Any time');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);

  // OTP Verification State (for unauthenticated users)
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpExpirySeconds, setOtpExpirySeconds] = useState(300);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [confirmedRefId, setConfirmedRefId] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);
  const [conciergeUrl, setConciergeUrl] = useState('');

  // Synchronize initial state when modal opens or user auth changes
  useEffect(() => {
    if (isOpen) {
      const verified = Boolean(currentUser?.verified);
      setStep(verified ? 'form' : 'phone');
      if (currentUser) {
        setName(currentUser.name || '');
        setPhone(currentUser.phone || '');
        setEmail(currentUser.email || '');
      }
      if (project) {
        setSelectedProject(project.projectName);
      }
      setPreference(defaultPreference);
      setSubmissionError('');
      setOtpError('');
    }
  }, [isOpen, currentUser, project, defaultPreference]);

  // Resend cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // OTP Expiry timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && otpExpirySeconds > 0) {
      timer = setInterval(() => {
        setOtpExpirySeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, otpExpirySeconds]);

  if (!isOpen) return null;

  const formatExpiryTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate 6-digit OTP
  const createSecureOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    return code;
  };

  // Step 1 -> Send OTP for unauthenticated flow
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      setOtpError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSendingOtp(true);
    setOtpError('');

    const newOtp = createSecureOtp();
    const formattedPhone = normalizePhone(phone);

    try {
      await sendWhatsappOtp(formattedPhone, newOtp);
      setIsSendingOtp(false);
      setStep('otp');
      setEnteredOtp('');
      setAttemptsRemaining(5);
      setResendCooldown(60);
      setOtpExpirySeconds(300);
    } catch {
      setIsSendingOtp(false);
      setStep('otp');
      setResendCooldown(60);
    }
  };

  // Step 2 -> Verify OTP and advance to Form
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (otpExpirySeconds <= 0) {
      setOtpError('Verification code has expired. Please request a new code.');
      return;
    }

    if (attemptsRemaining <= 0) {
      setOtpError('Maximum attempts exceeded. Please request a new code.');
      return;
    }

    if (enteredOtp.trim() !== generatedOtp.trim()) {
      const remaining = attemptsRemaining - 1;
      setAttemptsRemaining(remaining);
      setOtpError(`Invalid code. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining.`);
      return;
    }

    // Successfully verified!
    const verifiedUser: VerifiedUser = {
      name: name.trim() || 'Lifestyle Client',
      phone: normalizePhone(phone),
      email: email.trim() || undefined,
      verified: true,
      verifiedAt: new Date().toISOString(),
      token: `lifestyle_token_${Date.now()}`,
    };

    try {
      localStorage.setItem('lifestyle_user', JSON.stringify(verifiedUser));
    } catch {}

    if (onUserVerified) {
      onUserVerified(verifiedUser);
    }

    setOtpError('');
    setStep('form');
  };

  // Step 3 -> Submit Form to CRM & Dispatch WhatsApp Notification
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setSubmissionError('Please provide your full name.');
      return;
    }

    if (!consent) {
      setSubmissionError('Please confirm consent to be contacted regarding this enquiry.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError('');

    const refId = generateReferenceId();
    const formattedPhone = normalizePhone(phone);

    try {
      // 1. Ingest lead into CRM with reference ID and verified phone
      const crmResult = await captureLeadInCRM({
        name: name.trim(),
        phone: formattedPhone,
        email: email.trim() || undefined,
        project: selectedProject,
        preference,
        preferredMethod,
        preferredTime,
        preferredDate,
        message: message.trim() || undefined,
        consent,
        source: 'Website Contact Form (Enquire Button)',
        referenceId: refId,
        verifiedAt: new Date().toISOString(),
      });

      // 2. Generate WhatsApp concierge deep-link prefilled with details
      const waUrl = getLifestyleConciergeWhatsAppUrl({
        name: name.trim(),
        phone: formattedPhone,
        email: email.trim() || undefined,
        project: selectedProject,
        preference,
        preferredMethod,
        preferredTime,
        preferredDate,
        message: message.trim() || undefined,
        referenceId: refId,
        leadId: crmResult.leadId,
      });

      setConfirmedRefId(refId);
      setConciergeUrl(waUrl);

      // 3. Dispatch real-time WhatsApp notification to the owner
      notifyOwnerOnWhatsApp({
        type: 'enquiry',
        name: name.trim(),
        phone: formattedPhone,
        email: email.trim() || undefined,
        project: selectedProject,
        preference,
        referenceId: refId,
      }).catch((err) => console.error('Owner notification error:', err));

      // 4. Update persistent verified user profile in localStorage
      const updatedUser: VerifiedUser = {
        name: name.trim(),
        phone: formattedPhone,
        email: email.trim() || undefined,
        verified: true,
        verifiedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem('lifestyle_user', JSON.stringify(updatedUser));
      } catch {}

      if (onUserVerified) {
        onUserVerified(updatedUser);
      }

      setIsSubmitting(false);
      setStep('confirmed');
    } catch (err: any) {
      console.error('Enquiry submission error:', err);
      setIsSubmitting(false);
      setSubmissionError(err?.message || 'Failed to submit enquiry. Please try again.');
    }
  };

  const copyReferenceId = () => {
    if (confirmedRefId) {
      navigator.clipboard.writeText(confirmedRefId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-[#121216] border border-[#D4AF37]/30 rounded-3xl shadow-2xl p-6 sm:p-8 text-white z-10 my-8 max-h-[92vh] overflow-y-auto"
        >
          {/* Top Bar / Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                  LIFESTYLE CONCIERGE ENQUIRY
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light font-cinzel text-white">
                {step === 'phone' && 'Verify Mobile Number'}
                {step === 'otp' && 'Enter Verification Code'}
                {step === 'form' && 'Exclusive Property Enquiry'}
                {step === 'confirmed' && 'Enquiry Confirmed'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* STEP 1: Phone Verification (Unauthenticated Users) */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="mt-6 space-y-5">
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                To provide verified floor plans, pricing sheets, and direct sales concierge assistance, please verify your mobile number.
              </p>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-2">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 flex items-center gap-1.5 text-zinc-400 font-mono text-sm border-r border-white/15 pr-3">
                    <span className="text-base">🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    autoFocus
                    placeholder="85307 63405"
                    value={phone.replace(/^\+91/, '')}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(val);
                      setOtpError('');
                    }}
                    className="w-full pl-24 pr-4 py-3.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] font-mono text-base"
                  />
                </div>
              </div>

              {otpError && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-900/50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSendingOtp || phone.replace(/\D/g, '').length < 10}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
              >
                {isSendingOtp ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending Code via WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-zinc-500">
                You will receive a one-time verification code via WhatsApp.
              </div>
            </form>
          )}

          {/* STEP 2: OTP Entry (Unauthenticated Users) */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-5">
              <div className="text-sm text-zinc-300">
                <span>Code sent to WhatsApp number: </span>
                <span className="font-mono text-white font-medium">+91 {phone.replace(/\D/g, '').slice(-10)}</span>
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setOtpError('');
                  }}
                  className="ml-2 text-xs text-[#D4AF37] hover:underline"
                >
                  Change
                </button>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-mono text-zinc-400">
                    Enter 6-Digit Passcode
                  </label>
                  <span className={`text-xs font-mono ${otpExpirySeconds < 60 ? 'text-red-400' : 'text-zinc-400'}`}>
                    Expires in {formatExpiryTime(otpExpirySeconds)}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    required
                    autoFocus
                    placeholder="••••••"
                    value={enteredOtp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setEnteredOtp(val);
                      setOtpError('');
                    }}
                    className="w-full text-center tracking-[0.5em] text-2xl font-mono py-3.5 bg-black/60 border border-[#D4AF37]/50 rounded-xl text-[#F5E6C8] placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/60" />
                </div>
              </div>

              {otpError && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-900/50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={enteredOtp.length !== 6 || attemptsRemaining <= 0 || otpExpirySeconds <= 0}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Unlock Enquiry Form</span>
              </button>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
                <button
                  type="button"
                  disabled={resendCooldown > 0}
                  onClick={(e) => handleSendOtp(e)}
                  className="text-[#D4AF37] hover:underline disabled:text-zinc-600 disabled:no-underline flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}</span>
                </button>

                <span className="text-[11px] text-zinc-500 font-mono">
                  {attemptsRemaining} attempts left
                </span>
              </div>
            </form>
          )}

          {/* STEP 3: Complete Enquiry Form */}
          {step === 'form' && (
            <form onSubmit={handleSubmitForm} className="mt-5 space-y-4">
              {/* Full Name & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                    Full Name <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Deshmukh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs uppercase tracking-wider font-mono text-zinc-400">
                      Mobile Number
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <input
                      type="text"
                      disabled
                      value={phone}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-300 font-mono text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address (Optional) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs uppercase tracking-wider font-mono text-zinc-400">
                    Email Address
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">Optional</span>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] text-sm"
                  />
                </div>
              </div>

              {/* Project & Configuration Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                    Interested Project
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#18181e] border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] text-sm appearance-none cursor-pointer"
                    >
                      <option value="Lifestyle Home Spaces">Lifestyle Home Spaces</option>
                      <option value="Aura by Lifestyle">Aura by Lifestyle</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                    Property Configuration
                  </label>
                  <select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#18181e] border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] text-sm appearance-none cursor-pointer"
                  >
                    <option value="2 BHK Luxury Residence">2 BHK Luxury Residence</option>
                    <option value="3 BHK Signature Residence">3 BHK Signature Residence</option>
                    <option value="Penthouse / Sky Villa">Penthouse / Sky Villa</option>
                    <option value="Commercial Showroom / Retail Space">Commercial Showroom / Retail Space</option>
                    <option value="Prime Office Space">Prime Office Space</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact Mode & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreferredMethod('whatsapp')}
                      className={`py-2 px-2 text-xs rounded-lg border font-mono transition-colors flex items-center justify-center gap-1.5 ${
                        preferredMethod === 'whatsapp'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                          : 'border-white/15 bg-black/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredMethod('call')}
                      className={`py-2 px-2 text-xs rounded-lg border font-mono transition-colors flex items-center justify-center gap-1.5 ${
                        preferredMethod === 'call'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                          : 'border-white/15 bg-black/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredMethod('email')}
                      className={`py-2 px-2 text-xs rounded-lg border font-mono transition-colors flex items-center justify-center gap-1.5 ${
                        preferredMethod === 'email'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                          : 'border-white/15 bg-black/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#18181e] border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] text-sm appearance-none cursor-pointer"
                  >
                    <option value="Any time">Any time</option>
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Site Visit Date */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="preferredVisitDateInput" className="text-xs uppercase tracking-wider font-mono text-zinc-400 cursor-pointer">
                    Preferred Site Visit Date
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">Optional</span>
                </div>
                <div
                  className="relative cursor-pointer group"
                  onClick={() => {
                    const el = document.getElementById('preferredVisitDateInput') as HTMLInputElement | null;
                    if (el) {
                      try {
                        el.showPicker();
                      } catch {
                        el.focus();
                      }
                    }
                  }}
                >
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none group-hover:scale-110 transition-transform" />
                  <input
                    id="preferredVisitDateInput"
                    type="date"
                    min={new Date().toLocaleDateString('en-CA')}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    onClick={(e) => {
                      try {
                        (e.target as HTMLInputElement).showPicker();
                      } catch {}
                    }}
                    onFocus={(e) => {
                      try {
                        (e.target as HTMLInputElement).showPicker();
                      } catch {}
                    }}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] text-sm cursor-pointer [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                {/* Quick Date Presets */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[10px] uppercase font-mono text-zinc-500">Quick Select:</span>
                  {[
                    { label: 'Tomorrow', days: 1 },
                    { label: 'This Weekend', days: (6 - new Date().getDay() + 7) % 7 || 7 },
                    { label: 'Next Week', days: 7 },
                  ].map((preset) => {
                    const presetDate = new Date();
                    presetDate.setDate(presetDate.getDate() + preset.days);
                    const formattedPreset = presetDate.toLocaleDateString('en-CA');
                    const isSelected = preferredDate === formattedPreset;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setPreferredDate(formattedPreset)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-colors ${
                          isSelected
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-semibold'
                            : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                  {preferredDate && (
                    <button
                      type="button"
                      onClick={() => setPreferredDate('')}
                      className="text-[10px] text-zinc-500 hover:text-red-400 ml-auto transition-colors font-mono"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Message / Requirements */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs uppercase tracking-wider font-mono text-zinc-400">
                    Specific Requirements or Notes
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">Optional</span>
                </div>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for high floor unit with east-facing balconies..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] text-sm resize-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="enquiryConsent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-black/60 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label htmlFor="enquiryConsent" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
                  I agree to be contacted by the Lifestyle Home Spaces sales concierge regarding project information, pricing, and appointments.
                </label>
              </div>

              {submissionError && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-900/50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submissionError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !consent}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synchronizing with Concierge...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Confirm Priority Enquiry</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 4: Confirmation Screen */}
          {step === 'confirmed' && (
            <div className="mt-6 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]"
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>

              <div>
                <h4 className="text-xl font-cinzel text-white mb-1.5">Enquiry Successfully Registered</h4>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Your enquiry has been synchronized with our Real Estate CRM and dispatched to the official Lifestyle Home Spaces sales concierge.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="p-4 rounded-2xl bg-black/60 border border-[#D4AF37]/40 max-w-sm mx-auto text-center space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                  OFFICIAL ENQUIRY REFERENCE
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl font-mono font-bold tracking-wider text-[#F5E6C8]">
                    {confirmedRefId}
                  </span>
                  <button
                    onClick={copyReferenceId}
                    title="Copy Reference ID"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-[#D4AF37] transition-colors"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[11px] text-zinc-500">
                  {selectedProject} • {preference}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                {conciergeUrl && (
                  <a
                    href={conciergeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open Official WhatsApp Concierge</span>
                  </a>
                )}

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl border border-white/20 hover:border-white/40 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
