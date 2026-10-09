import React from 'react';
import { motion } from 'motion/react';
import { ProjectConfig } from '../data/projects';

interface ProjectShowcaseProps {
  project: ProjectConfig;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project }) => {
  const isAura = project.slug === 'aura';

  return (
    <section id="showcase" className={`py-20 lg:py-28 ${
      isAura ? 'bg-[#0E0E12] text-[#F5E6C8]' : 'bg-white text-primary'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37]">
              ARCHITECTURAL SHOWCASE
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${
            isAura ? 'font-cinzel text-white' : 'font-serif text-primary'
          }`}>
            {project.showcase.title}
          </h2>
          <p className={`mt-3 text-sm sm:text-base font-light ${
            isAura ? 'text-[#C5BBAA]' : 'text-primary/70'
          }`}>
            {project.showcase.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Showcase Cards / Scroll Stories */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 space-y-24 lg:space-y-32">
        {project.showcase.items.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                !isEven ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Image Frame */}
              <div className={`lg:col-span-7 ${!isEven ? 'lg:col-start-6' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden group shadow-2xl">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.headline}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </motion.div>
                  {/* Luxury border overlay */}
                  <div className={`absolute inset-0 pointer-events-none rounded-2xl border transition-colors duration-300 ${
                    isAura ? 'border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50' : 'border-primary/10 group-hover:border-primary/30'
                  }`} />
                  {/* Number pill */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded text-[11px] font-mono tracking-widest uppercase backdrop-blur-md ${
                    isAura ? 'bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30' : 'bg-white/90 text-primary border border-primary/10'
                  }`}>
                    0{idx + 1}
                  </div>
                </div>
              </div>

              {/* Text Description */}
              <div className={`lg:col-span-5 ${!isEven ? 'lg:col-start-1' : ''}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-[1px] bg-[#D4AF37]" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                    {item.tagline}
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-tight mb-4 ${
                  isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
                }`}>
                  {item.headline}
                </h3>

                <p className={`text-sm sm:text-base leading-relaxed font-light ${
                  isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
                }`}>
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-4 text-xs tracking-wider uppercase font-medium text-[#D4AF37]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Brochure Architectural Perspective</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
