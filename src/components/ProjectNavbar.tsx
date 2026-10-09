import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Sparkles, Building2, Phone, MessageCircle, MapPin } from 'lucide-react';
import { PROJECTS, ProjectConfig, BRAND_CONFIG } from '../data/projects';

interface ProjectNavbarProps {
  currentProject?: ProjectConfig | null;
  onNavigateHome: () => void;
  onSelectProject: (slug: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenEnquiry: () => void;
  onOpenAuth: () => void;
  currentUser?: { name: string; phone: string; verified: boolean } | null;
}

export const ProjectNavbar: React.FC<ProjectNavbarProps> = ({
  currentProject,
  onNavigateHome,
  onSelectProject,
  onScrollToSection,
  onOpenEnquiry,
  onOpenAuth,
  currentUser,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  const isAura = currentProject?.slug === 'aura';
  const isBrandHome = !currentProject;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = currentProject
    ? [
        { id: 'overview', label: 'OVERVIEW' },
        { id: 'showcase', label: 'SHOWCASE' },
        { id: 'residences', label: 'RESIDENCES' },
        { id: 'floor-plans', label: 'FLOOR PLANS' },
        { id: 'amenities', label: 'AMENITIES' },
        { id: 'location', label: 'LOCATION' },
        { id: 'gallery', label: 'GALLERY' },
        { id: 'developer', label: 'ABOUT US' },
      ]
    : [
        { id: 'projects-portfolio', label: 'PROJECTS' },
        { id: 'brand-leadership', label: 'LEADERSHIP' },
        { id: 'brand-vision', label: 'VALUES' },
        { id: 'brand-insights', label: 'INSIGHTS' },
        { id: 'brand-faq', label: 'FAQS' },
        { id: 'brand-contact', label: 'CONTACT' },
      ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? isAura || isBrandHome
              ? 'bg-[#0B0B0D]/95 backdrop-blur-md shadow-2xl py-3 border-b border-[#D4AF37]/20'
              : 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md py-3.5 border-b border-primary/10'
            : isAura || isBrandHome
              ? 'bg-gradient-to-b from-black/80 to-transparent py-5'
              : 'bg-gradient-to-b from-[#FAF8F5]/90 to-transparent py-5'
        } ${isAura || isBrandHome ? 'text-[#F5E6C8]' : 'text-primary'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.name}
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <span className={`text-xs font-semibold tracking-[0.2em] uppercase block leading-tight ${
                  isAura || isBrandHome ? 'text-white' : 'text-primary'
                }`}>
                  {BRAND_CONFIG.name}
                </span>
                <span className="text-[10px] text-[#D4AF37] tracking-[0.15em] uppercase font-mono block">
                  {currentProject ? currentProject.projectName : 'Architectural Portfolio'}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            <button
              onClick={onNavigateHome}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                isBrandHome ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'
              }`}
            >
              HOME
            </button>

            {/* PROJECTS Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setProjectsDropdownOpen(true)}
              onMouseLeave={() => setProjectsDropdownOpen(false)}
            >
              <button
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-1.5 py-2 ${
                  !isBrandHome ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'
                }`}
              >
                <span>PROJECTS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <AnimatePresence>
                {projectsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-64 rounded-2xl bg-[#121215] border border-[#D4AF37]/30 shadow-2xl p-3 z-50 backdrop-blur-xl"
                  >
                    <div className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] px-3 py-1.5 border-b border-white/10 mb-2">
                      Lifestyle Portfolio
                    </div>
                    {Object.values(PROJECTS).map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => {
                          setProjectsDropdownOpen(false);
                          onSelectProject(p.slug);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-200 flex flex-col ${
                          currentProject?.slug === p.slug
                            ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-white'
                            : 'hover:bg-white/10 text-[#C5BBAA] hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-semibold tracking-wider uppercase font-cinzel text-white">
                          {p.projectName}
                        </span>
                        <span className="text-[10px] text-[#D4AF37] font-light">
                          {p.category}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section links */}
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-[#D4AF37]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-2 rounded text-xs font-mono font-medium border border-[#25D366]/40 hover:border-[#25D366] text-white hover:bg-[#25D366]/10 transition-all flex items-center gap-1.5 shadow-sm"
              title={currentUser?.verified ? `Verified Client: ${currentUser.name}` : 'Sign In with WhatsApp OTP'}
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{currentUser?.verified ? `${currentUser.name.split(' ')[0]} ✓` : 'WhatsApp Sign In'}</span>
            </button>

            <button
              onClick={onOpenEnquiry}
              className={`px-5 py-2.5 rounded text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md ${
                isAura || isBrandHome
                  ? 'bg-[#D4AF37] text-black hover:bg-white'
                  : 'bg-primary text-white hover:bg-[#D4AF37] hover:text-primary'
              }`}
            >
              Enquire
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open Navigation"
          >
            <Menu className="w-6 h-6 text-[#D4AF37]" />
          </button>

        </div>
      </header>

      {/* Slide-over Right Navigation Drawer for Mobile/Tablet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[70] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm bg-[#101014] border-l border-[#D4AF37]/30 h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-white z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img src={BRAND_CONFIG.logo} alt="Logo" className="h-8 w-auto" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                      {BRAND_CONFIG.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* WhatsApp Authentication Status in Drawer */}
                <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#25D366]/20 flex items-center justify-center border border-[#25D366]/40">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-white block">
                        {currentUser?.verified ? currentUser.name : 'WhatsApp Sign In'}
                      </span>
                      <span className="text-[10px] text-[#D4AF37] font-mono block">
                        {currentUser?.verified ? 'Verified Client' : 'Unlock Blueprints & Folios'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors"
                  >
                    {currentUser?.verified ? 'Profile' : 'Sign In'}
                  </button>
                </div>

                {/* Portfolio Switcher in Drawer */}
                <div className="py-6 border-b border-white/10">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block mb-3">
                    SELECT PROJECT
                  </span>
                  <div className="space-y-2.5">
                    {Object.values(PROJECTS).map((p) => (
                      <div
                        key={p.slug}
                        className={`w-full p-3.5 rounded-xl border transition-all ${
                          currentProject?.slug === p.slug
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/10'
                            : 'bg-white/5 border-white/5 text-zinc-300 hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onSelectProject(p.slug);
                          }}
                          className="w-full text-left focus:outline-none"
                        >
                          <span className="text-xs font-bold uppercase tracking-wider block font-cinzel">
                            {p.projectName}
                          </span>
                          <span className="text-[10px] text-zinc-400 block mt-0.5">
                            {p.category}
                          </span>
                        </button>
                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(p.location.googleMapsQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-[11px] text-[#D4AF37] hover:text-white transition-colors py-1 px-2 rounded bg-black/40 border border-[#D4AF37]/30 hover:border-[#D4AF37]"
                            title={`Open ${p.projectName} on Google Maps`}
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{p.location.city} on Google Maps ↗</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="py-6 space-y-4">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateHome();
                    }}
                    className="block w-full text-left text-sm uppercase tracking-[0.2em] font-medium hover:text-[#D4AF37] transition-colors"
                  >
                    HOME PORTFOLIO
                  </button>
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onScrollToSection(link.id);
                      }}
                      className="block w-full text-left text-sm uppercase tracking-[0.2em] font-medium text-zinc-300 hover:text-[#D4AF37] transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>

                {/* Corporate Office Location in Drawer */}
                <div className="py-4 px-3.5 rounded-xl bg-white/5 border border-white/10 my-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                      Corporate Headquarters
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-2">
                    {BRAND_CONFIG.address}
                  </p>
                  <a
                    href="https://maps.app.goo.gl/24P5tAitT1zZAdNc8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#D4AF37] hover:text-white font-medium transition-colors"
                  >
                    <span>Open in Google Maps ↗</span>
                  </a>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-3.5 rounded text-xs uppercase tracking-[0.2em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-colors"
                >
                  Book Private Site Visit
                </button>
                <a
                  href={
                    currentProject
                      ? `https://maps.google.com/?q=${encodeURIComponent(currentProject.location.googleMapsQuery)}`
                      : 'https://maps.app.goo.gl/24P5tAitT1zZAdNc8'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded text-xs uppercase tracking-[0.2em] font-semibold border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {currentProject ? `View ${currentProject.projectName} on Map` : 'View on Google Maps'}
                  </span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
