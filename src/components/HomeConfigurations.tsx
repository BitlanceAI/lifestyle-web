import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { ProjectConfig, ConfigurationItem } from '../data/projects';

interface HomeConfigurationsProps {
  project: ProjectConfig;
  onSelectUnit: (unitType: string) => void;
}

export const HomeConfigurations: React.FC<HomeConfigurationsProps> = ({ project, onSelectUnit }) => {
  const isAura = project.slug === 'aura';

  return (
    <section id="residences" className={`py-20 lg:py-28 relative ${
      isAura ? 'bg-[#0B0B0D] text-[#F5E6C8]' : 'bg-[#FAF8F5] text-primary'
    }`}>
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
                RESIDENCES & SPACES
              </span>
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${
              isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
            }`}>
              Curated Configurations
            </h2>

            <p className={`mt-3 text-sm sm:text-base font-light ${
              isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
            }`}>
              Every residence is masterfully designed to maximize daylight, cross ventilation, and spatial utility.
            </p>
          </motion.div>
        </div>

        {/* Configuration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.configurations.map((item: ConfigurationItem, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className={`rounded-2xl border overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5 ${
                isAura
                  ? 'bg-[#151518] border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-xl shadow-black/60'
                  : 'bg-white border-primary/10 hover:border-primary/30 shadow-lg'
              }`}
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {item.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#D4AF37] text-black">
                      {item.badge}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37]">
                    {item.type}
                  </span>
                  <h3 className="text-xl font-light text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {item.carpetArea && (
                    <div className="mb-4 inline-block">
                      <span className={`text-xs px-2.5 py-1 rounded font-medium ${
                        isAura ? 'bg-white/5 text-[#D4AF37]' : 'bg-primary/5 text-primary'
                      }`}>
                        {item.carpetArea}
                      </span>
                    </div>
                  )}

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-light ${
                    isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
                  }`}>
                    {item.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {item.highlights.map((point: string, pIdx: number) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span className={`text-xs font-light ${
                          isAura ? 'text-[#F5E6C8]/90' : 'text-primary/90'
                        }`}>
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectUnit(item.title)}
                  className={`w-full py-3.5 px-4 rounded text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAura
                      ? 'bg-white/5 text-[#F5E6C8] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30'
                      : 'bg-primary/5 text-primary hover:bg-primary hover:text-white border border-primary/10'
                  }`}
                >
                  <span>Enquire For This Unit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
