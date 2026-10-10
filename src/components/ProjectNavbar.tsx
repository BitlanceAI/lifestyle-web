import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, LogOut, User, BookOpen, Wand2 } from 'lucide-react';
import { PROJECTS, ProjectConfig, BRAND_CONFIG } from '../data/projects';
import { VerifiedUser } from '../types/auth';

interface ProjectNavbarProps {
  currentProject?: ProjectConfig | null;
  onNavigateHome: () => void;
  onSelectProject: (slug: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenEnquiry: () => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  currentUser?: VerifiedUser | null;
  onOpenBlogGenerator?: () => void;
  onNavigateBlogs?: () => void;
}

export const ProjectNavbar: React.FC<ProjectNavbarProps> = ({
  currentProject,
  onNavigateHome,
  onSelectProject,
  onScrollToSection,
  onOpenEnquiry,
  onOpenAuth,
  onLogout,
  currentUser,
  onOpenBlogGenerator,
  onNavigateBlogs,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  const isAura = currentProject?.slug === 'aura';
  const isBrandHome = !currentProject;
  const isBlogsPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/blogs');
  const isDarkHeader = Boolean(isAura || isBrandHome || isBlogsPage);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Dynamic, context-aware navigation links tailored to the active route
  const navLinks = isBlogsPage
    ? [
        { id: 'home', label: 'HOME', isHome: true },
        { id: 'brand-leadership', label: 'ABOUT US' },
        { id: 'blogs', label: 'BLOGS', isBlog: true },
        { id: 'brand-contact', label: 'CONTACT' },
      ]
    : currentProject
      ? [
          { id: 'amenities', label: 'AMENITIES' },
          { id: 'floor-plans', label: 'FLOOR PLANS' },
          { id: 'blogs', label: 'BLOGS', isBlog: true },
          { id: 'developer', label: 'CONTACT' },
        ]
      : [
          { id: 'brand-vision', label: 'OVERVIEW' },
          { id: 'brand-leadership', label: 'ABOUT US' },
          { id: 'blogs', label: 'BLOGS', isBlog: true },
          { id: 'brand-contact', label: 'CONTACT' },
        ];

  const handleLinkClick = (id: string, isHome?: boolean, isBlog?: boolean) => {
    if (isHome) {
      onNavigateHome();
      return;
    }
    if (isBlog || id === 'blogs' || id === 'brand-insights') {
      if (onNavigateBlogs) {
        onNavigateBlogs();
      } else {
        onScrollToSection('brand-insights');
      }
      return;
    }
    onScrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? isDarkHeader
              ? 'bg-[#09090D]/90 backdrop-blur-xl shadow-2xl py-3 border-b border-white/[0.08]'
              : 'bg-[#FAF8F5]/90 backdrop-blur-xl shadow-md py-3 border-b border-black/[0.08]'
            : isDarkHeader
              ? 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5'
              : 'bg-gradient-to-b from-[#FAF8F5]/95 to-transparent py-4 sm:py-5'
        } ${isDarkHeader ? 'text-[#F5E6C8]' : 'text-zinc-900'}`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center">
          
          {/* Brand Logo (Links to Home) */}
          <div className="flex items-center">
            <button
              onClick={onNavigateHome}
              className="flex items-center focus:outline-none group cursor-pointer"
              aria-label="Lifestyle Home Spaces"
              title="Return to Home Portfolio"
            >
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.name}
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </div>

          {/* Desktop Navigation Bar: Spacious, Minimalist Luxury */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 2xl:gap-10">
            {/* PROJECTS Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setProjectsDropdownOpen(true)}
              onMouseLeave={() => setProjectsDropdownOpen(false)}
            >
              <button
                className={`text-[11px] xl:text-xs uppercase tracking-[0.22em] font-medium transition-colors flex items-center gap-1.5 py-1.5 cursor-pointer ${
                  projectsDropdownOpen
                    ? 'text-[#D4AF37]'
                    : isDarkHeader
                      ? 'text-zinc-300 hover:text-[#D4AF37]'
                      : 'text-zinc-700 hover:text-[#D4AF37]'
                }`}
              >
                <span>PROJECTS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${projectsDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </button>

              <AnimatePresence>
                {projectsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-72 rounded-2xl bg-[#0E0E12]/95 border border-[#D4AF37]/35 shadow-2xl p-2.5 z-50 backdrop-blur-2xl"
                  >
                    <div className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] px-3 py-1.5 border-b border-white/10 mb-1.5 flex items-center justify-between">
                      <span>Developments</span>
                      <span className="text-[9px] text-zinc-400 font-sans">Amravati</span>
                    </div>
                    {Object.values(PROJECTS).map((p) => {
                      const isCurrent = currentProject?.slug === p.slug;
                      return (
                        <button
                          key={p.slug}
                          onClick={() => {
                            setProjectsDropdownOpen(false);
                            onSelectProject(p.slug);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-200 flex flex-col cursor-pointer ${
                            isCurrent
                              ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-white'
                              : 'hover:bg-white/10 text-[#C5BBAA] hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider uppercase font-cinzel text-white">
                              {p.projectName}
                            </span>
                            {isCurrent && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
                            )}
                          </div>
                          <span className="text-[10px] text-[#D4AF37] font-light mt-0.5">
                            {p.category} · {p.location.area}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Essential Section Links */}
            {navLinks.map((link) => {
              const isActive = link.isBlog ? isBlogsPage : false;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id, link.isHome, link.isBlog)}
                  className={`relative text-[11px] xl:text-xs uppercase tracking-[0.22em] font-medium transition-all py-1 cursor-pointer group ${
                    isActive
                      ? isDarkHeader
                        ? 'text-[#D4AF37] font-semibold'
                        : 'text-[#B8860B] font-semibold'
                      : isDarkHeader
                        ? 'text-zinc-300 hover:text-[#D4AF37]'
                        : 'text-zinc-700 hover:text-[#D4AF37]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                  ) : (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-300 group-hover:w-full rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: High-End Pill Badge & Enquire Button */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser?.verified ? (
              <div
                className={`flex items-center gap-2 rounded-full py-1.5 pl-3.5 pr-1.5 border transition-all ${
                  isDarkHeader
                    ? 'bg-white/[0.05] border-[#D4AF37]/35 text-zinc-200 backdrop-blur-md'
                    : 'bg-black/[0.04] border-black/15 text-zinc-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_6px_#25D366] animate-pulse" />
                <span className="text-xs font-mono font-medium tracking-wide">
                  {currentUser.name.split(' ')[0]}
                </span>
                {currentUser.isAdmin && (
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black shadow-xs">
                    ADMIN
                  </span>
                )}
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer ml-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold border transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                  isDarkHeader
                    ? 'border-white/20 hover:border-[#D4AF37] text-white hover:bg-white/5 bg-white/[0.03]'
                    : 'border-zinc-800/30 hover:border-[#D4AF37] text-zinc-900 hover:text-black hover:bg-black/5 bg-black/[0.03]'
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="tracking-wider">Sign In</span>
              </button>
            )}

            {/* Admin-only AI Blog Studio Trigger */}
            {currentUser?.isAdmin && onOpenBlogGenerator && (
              <button
                onClick={onOpenBlogGenerator}
                title="Generate Real Estate Blog with Bitlance AI (Admin)"
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-medium border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all shadow-sm cursor-pointer group"
              >
                <Wand2 className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
                <span>AI Studio</span>
              </button>
            )}

            <button
              onClick={onOpenEnquiry}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg cursor-pointer ${
                isDarkHeader
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] bg-[length:200%_auto] text-black hover:bg-[position:right_center] shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/45 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-zinc-900 text-white hover:bg-[#D4AF37] hover:text-black shadow-zinc-900/10 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              Enquire
            </button>
          </div>

          {/* Mobile Menu Button (Visible below lg) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ${
              isDarkHeader ? 'text-[#D4AF37]' : 'text-zinc-900'
            }`}
            aria-label="Open Navigation"
          >
            <Menu className="w-6 h-6" />
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
              className="relative w-full max-w-sm bg-[#101014] border-l border-[#D4AF37]/30 h-full p-6 flex flex-col justify-between overflow-y-auto text-white z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img src={BRAND_CONFIG.logo} alt="Logo" className="h-8 w-auto" />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Client Authentication Status in Drawer */}
                <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#D4AF37]/15 flex items-center justify-center border border-[#D4AF37]/30">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-white block">
                        {currentUser?.verified ? currentUser.name : 'Sign In'}
                      </span>
                      <span className="text-[10px] text-[#D4AF37] font-mono block">
                        {currentUser?.verified
                          ? currentUser.isAdmin
                            ? 'Administrator Access'
                            : 'Verified Client'
                          : 'Unlock Blueprints & Folios'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
                  >
                    {currentUser?.verified ? (currentUser.isAdmin ? 'Admin' : 'Profile') : 'Sign In'}
                  </button>
                </div>

                {/* Essential Navigation Links */}
                <div className="py-6 space-y-3.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateHome();
                    }}
                    className="block w-full text-left text-xs uppercase tracking-[0.2em] font-medium hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    HOME PORTFOLIO
                  </button>

                  {/* Direct Project Jump Links */}
                  <div className="pt-1 pb-2 space-y-2 border-y border-white/5 my-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                      OUR DEVELOPMENTS
                    </span>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onSelectProject('lifestyle-homes');
                      }}
                      className="block w-full text-left text-xs uppercase tracking-[0.15em] font-cinzel text-zinc-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      • Lifestyle Homes (DPS Road)
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onSelectProject('aura');
                      }}
                      className="block w-full text-left text-xs uppercase tracking-[0.15em] font-cinzel text-zinc-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      • Aura by Lifestyle (Congress Nagar)
                    </button>
                  </div>

                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLinkClick(link.id, link.isHome, link.isBlog);
                      }}
                      className={`block w-full text-left text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer ${
                        link.isBlog && isBlogsPage ? 'text-[#D4AF37] font-bold' : 'text-zinc-300 hover:text-[#D4AF37]'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>

                {/* Blogs Section in Drawer */}
                <div className="py-4 border-t border-white/10">
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-white/5 to-[#D4AF37]/5 border border-[#D4AF37]/30 space-y-2.5">
                    <div>
                      <h4 className="text-xs font-cinzel font-light text-white tracking-wide flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Real Estate Folios & Guides</span>
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-relaxed">
                        Amravati market analysis, sample flat walkthroughs, and MahaRERA guides.
                      </p>
                    </div>

                    <div className="pt-1">
                      {currentUser?.isAdmin && onOpenBlogGenerator ? (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              if (onNavigateBlogs) onNavigateBlogs();
                              else onScrollToSection('brand-insights');
                            }}
                            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 text-xs font-medium text-white transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <BookOpen className="w-3 h-3 text-[#D4AF37]" />
                            <span>Read Blogs</span>
                          </button>

                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              onOpenBlogGenerator();
                            }}
                            className="px-3 py-2 rounded-lg bg-[#D4AF37] hover:bg-white text-black text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                          >
                            <Wand2 className="w-3 h-3" />
                            <span>+ Generate</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            if (onNavigateBlogs) onNavigateBlogs();
                            else onScrollToSection('brand-insights');
                          }}
                          className="w-full px-3 py-2.5 rounded-lg bg-white/10 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 text-xs font-medium text-white transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Browse Real Estate Publications</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                {currentUser?.verified ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                      <div className="text-left">
                        <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                        <p className="text-[10px] font-mono text-zinc-400">{currentUser.phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout?.();
                      }}
                      className="px-2.5 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] uppercase font-mono tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full py-2.5 rounded text-xs font-mono font-medium border border-white/20 hover:border-[#D4AF37] text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 mb-1 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-[#D4AF37]" />
                    <span>Sign In</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-3.5 rounded text-xs uppercase tracking-[0.2em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-colors cursor-pointer"
                >
                  Book Private Site Visit
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
