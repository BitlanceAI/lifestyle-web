import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Sparkles, MapPin, ShieldCheck } from 'lucide-react';
import { ProjectConfig } from '../data/projects';

interface ProjectHeroProps {
  project: ProjectConfig;
  onOpenEnquiry: (pref?: string) => void;
  onExplore: () => void;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project, onOpenEnquiry, onExplore }) => {
  const isAura = project.slug === 'aura';

  return (
    <section className={`relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden ${
      isAura ? 'bg-[#0B0B0D] text-[#F5E6C8]' : 'bg-[#FAF8F5] text-primary'
    }`}>
      {/* Background Architectural Render with subtle Ken Burns motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <img
            src={project.hero.image}
            alt={`${project.projectName} Architecture`}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay tailored to project identity */}
          <div className={`absolute inset-0 ${
            isAura
              ? 'bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/75 to-[#0B0B0D]/30'
              : 'bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/85 to-[#FAF8F5]/30'
          }`} />
          {/* Radial depth vignette */}
          <div className={`absolute inset-0 ${
            isAura 
              ? 'bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0B0D_90%)] opacity-80' 
              : 'bg-[radial-gradient(ellipse_at_center,transparent_40%,#FAF8F5_95%)] opacity-70'
          }`} />
        </motion.div>
      </div>

      {/* Gold Architectural Line sweep animation */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
        className="absolute top-28 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent pointer-events-none z-10"
      />

      {/* Hero Content Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16 text-center flex flex-col items-center">
        

        {/* Project Logo Reveal */}
        {project.hero.logoImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-4 max-w-[280px] sm:max-w-[340px]"
          >
            <img
              src={project.hero.logoImage}
              alt={project.projectName}
              className="h-16 sm:h-20 lg:h-24 w-auto object-contain mx-auto drop-shadow-md"
            />
          </motion.div>
        )}

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`text-xs sm:text-sm uppercase tracking-[0.3em] font-medium mb-3 ${
            isAura ? 'text-[#D4AF37]' : 'text-primary/70'
          }`}
        >
          {project.tagline}
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6 ${
            isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
          }`}
        >
          {project.hero.headline}
          {project.hero.subHeadline && (
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-normal text-[#D4AF37]">
              {project.hero.subHeadline}
            </span>
          )}
        </motion.h1>

        {/* Supporting description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light ${
            isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
          }`}
        >
          {project.hero.supportingText}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onExplore}
            className={`w-full sm:w-auto px-8 py-4 rounded text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
              isAura
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F27] text-black hover:brightness-110 shadow-[#D4AF37]/20 hover:scale-[1.02]'
                : 'bg-primary text-white hover:bg-[#D4AF37] hover:text-primary'
            }`}
          >
            <span>{project.hero.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenEnquiry()}
            className={`w-full sm:w-auto px-8 py-4 rounded text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-center gap-2 border backdrop-blur-md ${
              isAura
                ? 'border-[#D4AF37]/40 text-[#F5E6C8] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]'
                : 'border-primary/20 text-primary hover:bg-black/5 hover:border-primary'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>{project.hero.ctaSecondary}</span>
          </button>
        </motion.div>

        {/* Location snippet at base */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className={`mt-14 inline-flex items-center gap-2 text-xs tracking-wider uppercase font-light ${
            isAura ? 'text-[#C5BBAA]/60' : 'text-primary/50'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{project.location.address}, {project.location.city}</span>
        </motion.div>

      </div>
    </section>
  );
};
