import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Sparkles, CheckCircle2, MessageCircle, ArrowRight, Share2, Building2 } from 'lucide-react';
import { BrandBlogPost, BRAND_CONFIG } from '../data/projects';
import { captureLeadInCRM } from '../services/crmLeadService';

interface BlogArticleModalProps {
  blog: BrandBlogPost | null;
  onClose: () => void;
  onOpenEnquiry: (pref?: string) => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  blog,
  onClose,
  onOpenEnquiry,
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryNote, setInquiryNote] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!blog) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleArticleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    // Capture in Real Estate CRM
    try {
      await captureLeadInCRM({
        name: inquiryName,
        phone: inquiryPhone,
        project: 'Lifestyle Home Spaces',
        source: `Article Inquiry (${blog.title})`,
        notes: inquiryNote,
      });
    } catch (err) {
      console.error('CRM capture error:', err);
    }

    const msg = `Hello Lifestyle Team,\n\nI was reading your publication: *"${blog.title}"* and would like to request further details, floor plans, and pricing for this development.\n\n*Name:* ${inquiryName || 'Interested Reader'}\n*WhatsApp:* ${inquiryPhone || 'Not specified'}\n*Query/Note:* ${inquiryNote || 'Please share brochure and schedule an appointment.'}`;
    
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0E0E12] border border-[#D4AF37]/35 rounded-3xl shadow-2xl text-left flex flex-col z-10 overflow-hidden font-sans text-white my-auto"
        >
          {/* Header Bar */}
          <div className="bg-[#121216] px-6 py-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                {blog.category}
              </span>
              {blog.readTime && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{blog.readTime}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-[#D4AF37] transition-colors text-xs flex items-center gap-1.5"
                title="Share Article Link"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-[11px] hidden sm:inline">{isCopied ? 'Link Copied!' : 'Share'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close Article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Scrollable Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-6">
            
            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-light font-cinzel text-white leading-snug">
                {blog.title}
              </h1>
              <p className="mt-2 text-sm text-[#C5BBAA] font-light italic">
                {blog.excerpt}
              </p>
            </div>

            {/* Featured Hero Visual */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl max-h-[340px]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover max-h-[340px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-mono text-[#D4AF37] text-[11px] uppercase tracking-wider">
                  Lifestyle Architectural Insights · Amravati
                </span>
              </div>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-sm sm:text-[15px] text-zinc-300 font-light leading-relaxed">
              {blog.content.map((paragraph, index) => (
                <p key={index} className="first-letter:text-2xl first-letter:font-cinzel first-letter:text-[#D4AF37] first-letter:mr-0.5">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Takeaways & Highlights */}
            {blog.highlights && blog.highlights.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#14141A] border border-[#D4AF37]/30 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#D4AF37]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Key Architectural Takeaways</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {blog.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dedicated Post-Article Contact & Enquiry Form */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="bg-gradient-to-br from-[#16161E] to-[#101016] p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/40 shadow-2xl">
                <div className="text-center max-w-lg mx-auto mb-6">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] block mb-1">
                    NEXT STEPS & SITE VISITS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light font-cinzel text-white">
                    Request Full Brochure & Schedule Visit
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400">
                    Connect directly with our senior development desk regarding residences and retail spaces featured in this article.
                  </p>
                </div>

                {localStorage.getItem('lifestyle_user') && JSON.parse(localStorage.getItem('lifestyle_user')!).verified ? (
                  <div className="text-center pt-2">
                    <p className="text-sm text-zinc-300 mb-6 font-light">
                      You are a verified client. You can directly request the brochure and schedule a visit.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenEnquiry(blog.title);
                      }}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs uppercase tracking-[0.15em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-all mx-auto flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20"
                    >
                      <span>Contact Us / Schedule Visit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleArticleInquiry} className="space-y-4 max-w-xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-1">
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="e.g. Rajesh Sharma"
                          className="w-full px-4 py-3 bg-[#0B0B0E] border border-white/15 focus:border-[#D4AF37] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-1">
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full px-4 py-3 bg-[#0B0B0E] border border-white/15 focus:border-[#D4AF37] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-1">
                        Inquiry Note / Preferred Visit Date
                      </label>
                      <input
                        type="text"
                        value={inquiryNote}
                        onChange={(e) => setInquiryNote(e.target.value)}
                        placeholder="e.g. Interested in 2/3 BHK sample flat walkthrough this weekend"
                        className="w-full px-4 py-3 bg-[#0B0B0E] border border-white/15 focus:border-[#D4AF37] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        className="w-full sm:flex-1 py-3.5 rounded-xl text-xs uppercase tracking-[0.2em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenEnquiry(blog.title);
                        }}
                        className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs uppercase tracking-[0.15em] font-semibold border border-white/20 text-zinc-300 hover:text-white hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2"
                      >
                        <span>Custom Site Visit Form</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="bg-[#121216] px-6 py-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 flex-shrink-0">
            <span>Official Helpline: <strong className="text-white">+91 85307 63405</strong></span>
            <span className="font-mono text-[11px] text-[#D4AF37]">Lifestyle Home Spaces · Amravati</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
