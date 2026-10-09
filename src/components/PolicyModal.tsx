import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Scale } from 'lucide-react';
import { TERMS_OF_USE_CONTENT, PRIVACY_POLICY_CONTENT, BRAND_CONFIG } from '../data/projects';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy' | null;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  const isTerms = type === 'terms';
  const title = isTerms ? 'Terms of Use' : 'Privacy Policy';
  const subtitle = isTerms
    ? 'Official terms governing platform usage and property information'
    : 'How Lifestyle Home Spaces protects, collects, and processes your personal data';
  const sections = isTerms ? TERMS_OF_USE_CONTENT : PRIVACY_POLICY_CONTENT;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-3xl max-h-[85vh] bg-[#0E0E12] border border-[#D4AF37]/30 rounded-3xl shadow-2xl p-6 sm:p-10 text-left flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                {isTerms ? <Scale className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-light font-cinzel text-white">
                  {title}
                </h3>
                <p className="text-xs text-[#C5BBAA] mt-0.5">
                  {subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Policy Clauses */}
          <div className="flex-1 overflow-y-auto py-6 pr-2 space-y-6 custom-scrollbar text-sm text-[#C5BBAA] font-light leading-relaxed">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs flex items-center justify-between text-zinc-300">
              <span>Jurisdiction: Amravati, Maharashtra</span>
              <span className="font-mono text-[#D4AF37]">MahaRERA: P5030002502915</span>
            </div>

            {sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  {sec.title}
                </h4>
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm text-[#C5BBAA]/90 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div className="pt-6 border-t border-white/10 text-xs text-zinc-400">
              <p className="font-semibold text-white mb-1">Official Contact Information:</p>
              <p>Email: {BRAND_CONFIG.email} | Phone: +91 9730768982 / +91 9158111140</p>
              <p>{BRAND_CONFIG.address}</p>
            </div>
          </div>

          {/* Footer Close */}
          <div className="pt-4 border-t border-white/10 flex justify-end flex-shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
