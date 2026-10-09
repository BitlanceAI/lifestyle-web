import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { ProjectConfig } from '../data/projects';

interface ProjectOverviewProps {
  project: ProjectConfig;
  onOpenEnquiry: () => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project, onOpenEnquiry }) => {
  const isAura = project.slug === 'aura';

  return (
    <section id="overview" className={`py-20 lg:py-28 relative ${
      isAura ? 'bg-[#0B0B0D] text-[#F5E6C8]' : 'bg-[#FAF8F5] text-primary'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Editorial Story */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-[#D4AF37]" />
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37]">
                  {project.overview.subheading}
                </span>
              </div>

              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] mb-6 ${
                isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
              }`}>
                {project.overview.heading}
              </h2>

              <p className={`text-base sm:text-lg leading-relaxed mb-6 font-light ${
                isAura ? 'text-[#C5BBAA]' : 'text-primary/80'
              }`}>
                {project.overview.description}
              </p>

              {project.overview.paragraphs && project.overview.paragraphs.map((p, idx) => (
                <p key={idx} className={`text-sm sm:text-base leading-relaxed mb-4 font-light ${
                  isAura ? 'text-[#C5BBAA]/80' : 'text-primary/70'
                }`}>
                  {p}
                </p>
              ))}

              <div className="pt-4">
                <button
                  onClick={onOpenEnquiry}
                  className={`px-7 py-3.5 rounded text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                    isAura
                      ? 'bg-[#D4AF37] text-black hover:bg-white shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-primary text-white hover:bg-[#D4AF37] hover:text-primary shadow-md'
                  }`}
                >
                  Schedule A Private Tour →
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Highlights Card & Visual Accents */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`p-8 sm:p-10 rounded-2xl border relative overflow-hidden backdrop-blur-md ${
                isAura
                  ? 'bg-gradient-to-br from-[#16161A] to-[#101013] border-[#D4AF37]/30 shadow-2xl shadow-black/80'
                  : 'bg-white border-primary/10 shadow-xl'
              }`}
            >
              {/* Subtle decorative gold glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h3 className={`text-xs uppercase tracking-[0.25em] font-bold ${
                  isAura ? 'text-white' : 'text-primary'
                }`}>
                  Distinction & Value
                </h3>
              </div>

              <div className="space-y-5">
                {project.overview.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className={`text-sm sm:text-base font-medium ${
                        isAura ? 'text-[#F5E6C8]' : 'text-primary'
                      }`}>
                        {highlight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-8 pt-6 border-t ${
                isAura ? 'border-white/10' : 'border-primary/10'
              }`}>
                <div className="flex items-center justify-between text-xs font-light">
                  <span className={isAura ? 'text-[#C5BBAA]/60' : 'text-primary/50'}>
                    Location Address
                  </span>
                  <span className="font-medium text-[#D4AF37]">
                    {project.location.city}, MH
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
