import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { PROJECTS, ProjectConfig } from '../data/projects';

interface ProjectSwitcherProps {
  currentSlug?: string;
  onSelectProject: (slug: string) => void;
  title?: string;
  subtitle?: string;
}

export const ProjectSwitcher: React.FC<ProjectSwitcherProps> = ({
  currentSlug,
  onSelectProject,
  title = 'OUR PROJECTS PORTFOLIO',
  subtitle = 'Discover landmark developments by Lifestyle Home Spaces in Amravati',
}) => {
  const projectList = Object.values(PROJECTS);

  return (
    <section id="projects-portfolio" className="py-20 lg:py-28 bg-[#08080A] text-[#F5E6C8] relative border-t border-[#D4AF37]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37]">
                THE PORTFOLIO
              </span>
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-cinzel text-white">
              {title}
            </h2>

            <p className="mt-3 text-sm sm:text-base font-light text-[#C5BBAA]">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Cinematic Dual-Project Portfolio Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projectList.map((proj: ProjectConfig, idx: number) => {
            const isCurrent = currentSlug === proj.slug;
            const projectNumber = String(idx + 1).padStart(2, '0');

            return (
              <motion.div
                key={proj.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                onClick={() => onSelectProject(proj.slug)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 shadow-2xl ${
                  isCurrent
                    ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-[#D4AF37]/10'
                    : 'border-white/10 hover:border-[#D4AF37]/60'
                }`}
              >
                {/* Background Cinematic Image with Zoom */}
                <div className="aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={proj.hero.image}
                    alt={proj.projectName}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-95"
                    loading="lazy"
                  />
                  {/* Dark Radial & Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 group-hover:via-black/20 transition-all duration-500" />
                </div>

                {/* Top Badge: Number and Category */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-[#D4AF37] drop-shadow">
                    {projectNumber}
                  </span>

                  <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-black/75 text-[#F5E6C8] border border-[#D4AF37]/30 backdrop-blur-md">
                    {proj.category}
                  </span>
                </div>

                {/* Animated Gold Bottom Border on Hover */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                {/* Content Overlay that moves upward on hover */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 z-10 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
                  
                  {/* Project Logo if available */}
                  {proj.hero.logoImage && (
                    <div className="mb-3 max-w-[180px]">
                      <img
                        src={proj.hero.logoImage}
                        alt={proj.projectName}
                        className="h-9 sm:h-11 w-auto object-contain filter drop-shadow brightness-110"
                      />
                    </div>
                  )}

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-cinzel leading-tight mb-1">
                    {proj.projectName}
                  </h3>

                  <p className="text-xs uppercase tracking-[0.25em] font-medium text-[#D4AF37] mb-2">
                    {proj.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light mb-6 line-clamp-2">
                    {proj.location.address}, {proj.location.city}
                  </p>

                  {/* CTA Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/15">
                    <span className="text-xs tracking-wider uppercase font-semibold text-white group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                      <span>{isCurrent ? 'Currently Viewing' : 'Explore Project'}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </span>

                    <span className="text-[11px] font-mono text-[#D4AF37]">
                      {proj.statusBadge}
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
