import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  ChevronDown, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Award,
  ExternalLink 
} from 'lucide-react';
import { PROJECTS, BRAND_CONFIG, BrandBlogPost } from '../data/projects';
import { ProjectSwitcher } from './ProjectSwitcher';
import { PolicyModal } from './PolicyModal';
import { BlogArticleModal } from './BlogArticleModal';

interface BrandHomePageProps {
  onSelectProject: (slug: string) => void;
  onOpenEnquiry: (pref?: string) => void;
}

export const BrandHomePage: React.FC<BrandHomePageProps> = ({ onSelectProject, onOpenEnquiry }) => {
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [policyModalType, setPolicyModalType] = useState<'terms' | 'privacy' | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BrandBlogPost | null>(null);

  const faqCategories = ['All', ...Array.from(new Set(BRAND_CONFIG.faqs.map(f => f.category)))];
  const filteredFaqs = activeFaqCategory === 'All' 
    ? BRAND_CONFIG.faqs 
    : BRAND_CONFIG.faqs.filter(f => f.category === activeFaqCategory);

  return (
    <div className="bg-[#08080A] text-[#F5E6C8] min-h-screen">
      
      {/* Brand Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        
        {/* Cinematic Backdrop Montage */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1.02, opacity: 0.35 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src="/assets/projects/aura/building/aura-building-hero.jpg"
              alt="Lifestyle Landmark"
              className="w-full h-full object-cover filter blur-[1px]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/70 to-[#08080A]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#08080A_90%)]" />
        </div>

        {/* Brand Headline & Narrative */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 text-center max-w-4xl">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <img
              src={BRAND_CONFIG.logo}
              alt={BRAND_CONFIG.name}
              className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light font-cinzel text-white tracking-tight leading-[1.1] mb-6"
          >
            LIFESTYLE HOME SPACES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-base sm:text-xl md:text-2xl text-[#D4AF37] font-serif italic mb-6"
          >
            “{BRAND_CONFIG.subTagline}”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-[#C5BBAA] font-light max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {BRAND_CONFIG.vision}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects-portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded text-xs uppercase tracking-[0.25em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-all duration-300 shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
            >
              <span>Explore Our Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto px-8 py-4 rounded text-xs uppercase tracking-[0.25em] font-medium border border-white/20 text-[#F5E6C8] hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
            >
              Contact Developer Desk
            </button>
          </motion.div>

        </div>
      </section>

      {/* OUR PROJECTS Section */}
      <ProjectSwitcher
        onSelectProject={onSelectProject}
        title="OUR PROJECTS"
        subtitle="Two signature addresses. One standard of architectural integrity."
      />

      {/* Developer Leadership & Direct Inquiries (Amit Talda & Rajesh Mishra) */}
      <section id="brand-leadership" className="py-20 lg:py-28 bg-[#0B0B0E] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
              EXECUTIVE LEADERSHIP & INQUIRIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-cinzel text-white">
              Meet Our Project Heads
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#C5BBAA] font-light">
              Connect directly with our development leadership and listing coordinator desk for authentic project consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {BRAND_CONFIG.team.map((member, mIdx) => (
              <motion.div
                key={mIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: mIdx * 0.2 }}
                className="p-8 rounded-3xl bg-[#141418] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 shadow-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-start group"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-[#D4AF37]/40 shadow-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#D4AF37] text-black">
                    <Award className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-light font-cinzel text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4">
                    {member.role}
                  </p>

                  <div className="space-y-2 text-xs text-[#C5BBAA]">
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, '')}`}
                      className="flex items-center justify-center sm:justify-start gap-2.5 hover:text-[#D4AF37] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-mono">{member.phone}</span>
                    </a>

                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center sm:justify-start gap-2.5 hover:text-[#D4AF37] transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <span>{member.email}</span>
                    </a>
                  </div>

                  <div className="mt-6 flex items-center justify-center sm:justify-start">
                    <a
                      href={`https://wa.me/${member.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-semibold flex items-center gap-2 transition-all border border-[#25D366]/30 shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Connect on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Developer Pillars & Core Values */}
      <section id="brand-vision" className="py-20 lg:py-28 bg-[#0D0D10] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
              CORE PHILOSOPHY & VALUES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-cinzel text-white">
              The Values We Stand By
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#C5BBAA] font-light">
              Every decision we make is guided by principles that ensure structural quality, integrity, and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {BRAND_CONFIG.coreValues.map((value, vIdx) => (
              <motion.div
                key={vIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: vIdx * 0.1 }}
                className="p-6 rounded-2xl bg-[#141418] border border-white/5 hover:border-[#D4AF37]/40 transition-all group text-center flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-light font-cinzel text-[#D4AF37]/30 group-hover:text-[#D4AF37] transition-colors block mb-3">
                    0{vIdx + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs text-[#C5BBAA] font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Insights & Blog Highlights from Official References */}
      <section id="brand-insights" className="py-20 lg:py-28 bg-[#09090C] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
              REAL ESTATE INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-cinzel text-white">
              Articles & Buyer Guides
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#C5BBAA] font-light">
              Official publications, sample flat walkthroughs, and investment guidance in Amravati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRAND_CONFIG.blogs.slice(0, 3).map((blog, bIdx) => (
              <motion.article
                key={bIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: bIdx * 0.15 }}
                onClick={() => setSelectedBlog(blog)}
                className="rounded-2xl overflow-hidden border border-white/5 bg-[#141418] group flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-xl cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase bg-[#D4AF37] text-black font-bold">
                    {blog.category}
                  </span>
                  {blog.readTime && (
                    <span className="absolute bottom-3 right-4 text-[10px] text-zinc-300 font-mono bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                      {blog.readTime}
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-light font-cinzel text-white mb-2 leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-[#C5BBAA] font-light leading-relaxed line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] group-hover:text-white transition-colors">
                      <span>Read Article & Insights</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      Folio
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="brand-faq" className="py-20 lg:py-28 bg-[#0D0D10] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
          
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-cinzel text-white">
              All You Need to Know
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#C5BBAA] font-light">
              Clear answers regarding bookings, MahaRERA compliance, financing, and site visits.
            </p>

            {/* Category tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFaqCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                    activeFaqCategory === cat
                      ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                      : 'bg-[#141418] text-[#C5BBAA] hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#141418] border-[#D4AF37]/40 shadow-xl'
                      : 'bg-[#0F0F13] border-white/5 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-medium text-white">
                      {faq.question}
                    </span>
                    <span className={`p-1.5 rounded-full transition-transform duration-300 ${
                      isOpen ? 'bg-[#D4AF37] text-black rotate-180' : 'bg-white/5 text-[#D4AF37]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#C5BBAA] font-light leading-relaxed border-t border-white/5"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Developer Footer & Corporate Contact */}
      <footer id="brand-contact" className="py-20 border-t border-white/10 bg-[#060608]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left">
            <div>
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.name}
                className="h-14 w-auto mb-4 object-contain"
              />
              <h4 className="text-sm font-semibold tracking-[0.25em] uppercase text-white font-cinzel mb-2">
                {BRAND_CONFIG.name}
              </h4>
              <p className="text-xs text-[#C5BBAA] font-light leading-relaxed mb-6">
                More than just buildings, we create places where daily life unfolds — homes that feel right and commercial spaces that support lasting success.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href={BRAND_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full border border-white/20 text-xs hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={BRAND_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full border border-white/20 text-xs hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  Facebook
                </a>
              </div>

              <div className="mt-6 flex items-center gap-4 text-xs text-zinc-400">
                <button
                  onClick={() => setPolicyModalType('terms')}
                  className="hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
                >
                  Terms of Use
                </button>
                <span>·</span>
                <button
                  onClick={() => setPolicyModalType('privacy')}
                  className="hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </button>
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] mb-4">
                CORPORATE HEADQUARTERS
              </h5>
              <a
                href="https://maps.app.goo.gl/24P5tAitT1zZAdNc8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C5BBAA] hover:text-[#D4AF37] leading-relaxed mb-3 block group transition-colors"
                title="View on Google Maps"
              >
                <span className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>
                    {BRAND_CONFIG.address}
                    <span className="text-[#D4AF37] text-[10px] ml-1.5 font-mono underline underline-offset-2">
                      (Google Maps ↗)
                    </span>
                  </span>
                </span>
              </a>
              <p className="text-xs text-[#C5BBAA] flex items-center gap-2 mb-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{BRAND_CONFIG.workingHours}</span>
              </p>
              <p className="text-xs text-[#C5BBAA] flex items-center gap-2 mb-4">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`mailto:${BRAND_CONFIG.email}`} className="hover:text-white transition-colors">
                  {BRAND_CONFIG.email}
                </a>
              </p>

              <div className="pt-2 border-t border-white/5 text-xs text-[#C5BBAA]">
                <span className="text-[#D4AF37] font-medium">Verified MahaRERA:</span> P5030002502915
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] mb-4">
                DIRECT INQUIRY DESK
              </h5>
              <div className="space-y-3 text-xs text-[#C5BBAA]">
                <div>
                  <p className="text-white font-medium">Rajesh Mishra (Listing Coordinator)</p>
                  <a href="tel:+919158111140" className="hover:text-[#D4AF37] font-mono transition-colors">
                    +91 9158111140
                  </a>
                </div>
                <div>
                  <p className="text-white font-medium">Amit Talda (Property Developer)</p>
                  <a href="tel:+919730768982" className="hover:text-[#D4AF37] font-mono transition-colors">
                    +91 9730768982
                  </a>
                </div>
                <div>
                  <p className="text-white font-medium">General Concierge / WhatsApp</p>
                  <a href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`} className="hover:text-[#D4AF37] font-mono transition-colors">
                    +91 {BRAND_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-[11px] text-zinc-600">
            <div>
              © {new Date().getFullYear()} Lifestyle Home Spaces. All Rights Reserved. Designed for enduring architectural benchmarks in Amravati.
            </div>
            <div className="flex items-center gap-4 text-zinc-500">
              <button
                onClick={() => setPolicyModalType('terms')}
                className="hover:text-[#D4AF37] transition-colors"
              >
                Terms of Use
              </button>
              <span>·</span>
              <button
                onClick={() => setPolicyModalType('privacy')}
                className="hover:text-[#D4AF37] transition-colors"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Terms of Use & Privacy Policy Modal */}
      <PolicyModal
        isOpen={policyModalType !== null}
        onClose={() => setPolicyModalType(null)}
        type={policyModalType}
      />

      {/* Full Blog Article Reader Modal */}
      <BlogArticleModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onOpenEnquiry={onOpenEnquiry}
      />

    </div>
  );
};
