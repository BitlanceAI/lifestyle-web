import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Phone, MessageCircle, User, Sparkles } from 'lucide-react';
import { ProjectConfig, BRAND_CONFIG } from '../data/projects';
import { captureLeadInCRM } from '../services/crmLeadService';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectConfig | null;
  defaultPreference?: string;
  defaultName?: string;
  defaultPhone?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  project,
  defaultPreference = '2 BHK Residence',
  defaultName = '',
  defaultPhone = '',
}) => {
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState(defaultPhone);
  const [preference, setPreference] = useState(defaultPreference);
  const [preferredDate, setPreferredDate] = useState('');

  React.useEffect(() => {
    if (defaultName) setName(defaultName);
    if (defaultPhone) setPhone(defaultPhone);
    if (defaultPreference) setPreference(defaultPreference);
  }, [defaultName, defaultPhone, defaultPreference, isOpen]);

  if (!isOpen) return null;

  const activeProjectName = project ? project.projectName : BRAND_CONFIG.name;
  const whatsappTarget = project ? project.contact.whatsapp : BRAND_CONFIG.whatsappNumber;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Capture the lead asynchronously into Lifestyle Real Estate CRM
    captureLeadInCRM({
      name,
      phone,
      project: activeProjectName,
      preference,
      preferredDate,
      source: 'Website Contact Form (Site Visit Booking)',
    }).catch((err) => {
      console.error('Failed to capture lead in CRM:', err);
    });

    const msg = `Hello Lifestyle Team,\n\nI would like to schedule a private site visit for *${activeProjectName}*.\n\n*Name:* ${name || 'Prospective Buyer'}\n*Phone:* ${phone || 'Not provided'}\n*Preference:* ${preference}\n*Preferred Date:* ${preferredDate || 'Earliest Available'}\n\nPlease share floor plans and schedule my appointment.`;
    
    window.open(`https://wa.me/${whatsappTarget}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#141418] border border-[#D4AF37]/30 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                  EXCLUSIVE APPOINTMENT
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light font-cinzel text-white">
                Book A Private Site Visit
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {activeProjectName} · Amravati, Maharashtra
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 block mb-1.5 font-medium">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 block mb-1.5 font-medium">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-300 block mb-1.5 font-medium">
                  Configuration
                </label>
                <select
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-black/50 border border-white/10 text-sm focus:border-[#D4AF37] focus:outline-none text-zinc-200"
                >
                  <option value="2 BHK Residence">2 BHK Residence</option>
                  <option value="3 BHK Residence">3 BHK Residence</option>
                  <option value="Commercial Retail Shop">Commercial Retail Shop</option>
                  <option value="Corporate Office">Corporate Office</option>
                  <option value="General Inquiry">General Project Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-300 block mb-1.5 font-medium">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  onClick={(e) => {
                    try {
                      e.currentTarget.showPicker?.();
                    } catch {}
                  }}
                  style={{ colorScheme: 'dark' }}
                  className="w-full px-3.5 py-3 rounded-xl bg-black/50 border border-white/10 text-sm focus:border-[#D4AF37] focus:outline-none text-zinc-100 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-all duration-300 shadow-xl shadow-[#D4AF37]/10 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Appointment via WhatsApp →</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-[10px] text-zinc-500">
              Direct Site Concierge: +91 {whatsappTarget} · Instant Response
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
