import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  User, 
  Building2, 
  ArrowRight, 
  KeyRound, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/projects';

import { sendWhatsappOtp } from '../services/whatsappService';

export interface VerifiedUser {
  name: string;
  phone: string;
  interest: string;
  details?: string;
  verified: boolean;
  verifiedAt: string;
}

interface AuthOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: VerifiedUser) => void;
  currentUser?: VerifiedUser | null;
}

export const AuthOtpModal: React.FC<AuthOtpModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentUser,
}) => {
  const [step, setStep] = useState<'details' | 'otp' | 'success'>('details');
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [interest, setInterest] = useState(currentUser?.interest || 'Aura by Lifestyle');
  const [details, setDetails] = useState(currentUser?.details || '2 BHK Residence');
  
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.verified) {
      setName(currentUser.name);
      setPhone(currentUser.phone);
      setInterest(currentUser.interest);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  // Generate random 6-digit OTP
  const generateNewOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    return code;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }

    setIsSendingOtp(true);
    const newOtp = generateNewOtp();

    // Call real WhatsApp API
    const result = await sendWhatsappOtp(phone, newOtp);
    
    setIsSendingOtp(false);
    
    if (result.success) {
      setStep('otp');
      setEnteredOtp(''); // Clear so user can type it
      setOtpError('');
    } else {
      alert('Failed to send OTP. Please check your credentials or try again later.');
    }
  };

  const handleOpenWhatsAppForOtp = () => {
    const text = encodeURIComponent(
      `Hello Lifestyle Home Spaces,\n\nI am requesting my WhatsApp verification OTP.\n*Name:* ${name || 'Prospective Buyer'}\n*Phone:* ${phone}\n*Generated Code:* ${generatedOtp}\n\nPlease verify my session for priority project access.`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.trim() === generatedOtp.trim()) {
      const verifiedUser: VerifiedUser = {
        name: name.trim() || 'Verified Guest',
        phone: phone.trim(),
        interest,
        details,
        verified: true,
        verifiedAt: new Date().toISOString(),
      };
      localStorage.setItem('lifestyle_user', JSON.stringify(verifiedUser));
      setStep('success');
      setTimeout(() => {
        onSuccess(verifiedUser);
        onClose();
      }, 1500);
    } else {
      setOtpError('Invalid OTP code. Please re-enter the 6-digit verification code.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#0E0E12] border border-[#D4AF37]/35 rounded-3xl shadow-2xl text-left flex flex-col z-10 overflow-hidden font-sans text-white my-auto"
        >
          {/* Header */}
          <div className="bg-[#121217] p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={BRAND_CONFIG.logo} alt="Logo" className="h-8 w-auto" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white block">
                  {BRAND_CONFIG.name}
                </span>
                <span className="text-[10px] text-[#D4AF37] font-mono tracking-wider uppercase block">
                  Verified Client Access
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content by Step */}
          <div className="p-6 sm:p-8">
            
            {/* Step 1: User details & WhatsApp number */}
            {step === 'details' && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-light font-cinzel text-white">
                    Sign In with WhatsApp
                  </h2>
                  <p className="mt-1.5 text-xs text-zinc-400 font-light leading-relaxed">
                    Verify via WhatsApp to unlock CAD floor plans, exclusive pricing schedules & direct site visit bookings.
                  </p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-4 py-3 bg-[#15151C] border border-white/15 focus:border-[#D4AF37] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* WhatsApp Mobile */}
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Number *</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-white/15 bg-white/5 text-xs font-mono text-zinc-300">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full px-4 py-3 bg-[#15151C] border border-white/15 focus:border-[#D4AF37] rounded-r-xl text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project of Interest */}
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Primary Interest</span>
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-3 bg-[#15151C] border border-white/15 focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="Aura by Lifestyle">Aura by Lifestyle (Skyline Highrise · Congress Nagar)</option>
                      <option value="Lifestyle Homes">Lifestyle Homes (Ready Possession · DPS Road)</option>
                      <option value="Commercial Retail">High-Street Commercial Retail & Showrooms</option>
                      <option value="Both Developments">Both Landmark Developments</option>
                    </select>
                  </div>

                  {/* Additional Preferences */}
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Requirement Type</span>
                    </label>
                    <select
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full px-4 py-3 bg-[#15151C] border border-white/15 focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="2 BHK Residence">2 BHK Luxury Residence</option>
                      <option value="3 BHK Suite">3 BHK Panoramic Suite</option>
                      <option value="Ground Retail Arcade">Ground Floor Retail Arcade</option>
                      <option value="Investor Portfolio">Investor Portfolio / Rental Yield</option>
                    </select>
                  </div>

                  <div className="pt-3 space-y-3">
                    <button
                      type="submit"
                      disabled={isSendingOtp}
                      className="w-full py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20 disabled:opacity-50"
                    >
                      <MessageCircle className="w-4 h-4 text-black" />
                      <span>{isSendingOtp ? 'Generating WhatsApp Code...' : 'Send WhatsApp OTP'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sessionStorage.setItem('lifestyle_guest_browsing', 'true');
                        onClose();
                      }}
                      className="w-full py-2.5 text-xs text-zinc-400 hover:text-white transition-colors text-center font-mono block"
                    >
                      Continue as Guest / Explore Portfolio →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Enter WhatsApp OTP */}
            {step === 'otp' && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center mx-auto mb-3 text-[#25D366]">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-light font-cinzel text-white">
                    Enter WhatsApp Verification Code
                  </h2>
                  <p className="mt-1.5 text-xs text-zinc-400 font-light">
                    Sent to WhatsApp: <strong className="text-white">+91 {phone}</strong>
                  </p>
                </div>


                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-1.5 text-center">
                      Enter 6-Digit Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={enteredOtp}
                      onChange={(e) => {
                        setEnteredOtp(e.target.value.replace(/\D/g, ''));
                        setOtpError('');
                      }}
                      className="w-full px-4 py-3 bg-[#15151C] border border-white/20 focus:border-[#D4AF37] rounded-xl text-center text-xl font-mono tracking-[0.3em] text-white focus:outline-none transition-colors"
                      placeholder="000000"
                    />
                    {otpError && (
                      <p className="mt-2 text-xs text-red-400 text-center">{otpError}</p>
                    )}
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Enter Portfolio</span>
                    </button>

                    <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                      <button
                        type="button"
                        onClick={() => setStep('details')}
                        className="hover:text-white transition-colors"
                      >
                        ← Edit Details
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newCode = generateNewOtp();
                          setEnteredOtp(newCode);
                          setOtpError('');
                        }}
                        className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Resend Code</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Verified Success */}
            {step === 'success' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light font-cinzel text-white">
                  Welcome, {name}!
                </h3>
                <p className="mt-2 text-xs text-zinc-300 font-light max-w-xs mx-auto leading-relaxed">
                  Your WhatsApp authentication is verified. Unlocking full project blueprints, CAD folios, and direct site appointments.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#D4AF37] font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Loading Lifestyle Home Spaces Portfolio...</span>
                </div>
              </div>
            )}

          </div>

          {/* Footer note */}
          <div className="bg-[#121217] px-6 py-3 border-t border-white/5 text-center text-[10px] text-zinc-500 font-mono">
            MahaRERA: P5030002502915 · Enduring Architecture in Amravati
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
