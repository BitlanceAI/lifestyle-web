import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckCircle, ShieldCheck } from 'lucide-react';
import { ProjectConfig, SpecificationCategory } from '../data/projects';

interface SpecificationsProps {
  project: ProjectConfig;
}

export const Specifications: React.FC<SpecificationsProps> = ({ project }) => {
  const isAura = project.slug === 'aura';
  const specs = project.specifications;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="specifications" className={`py-20 lg:py-28 ${
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
                TECHNICAL STANDARDS
              </span>
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${
              isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
            }`}>
              Building Specifications
            </h2>

            <p className={`mt-3 text-sm sm:text-base font-light ${
              isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
            }`}>
              Uncompromising engineering rigor and premium building material certifications.
            </p>
          </motion.div>
        </div>

        {/* Accordion / Expandable Grid */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {specs.map((item: SpecificationCategory, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                  isAura
                    ? 'bg-[#151518] border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                    : 'bg-white border-primary/10 hover:border-primary/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <h3 className={`text-sm sm:text-base font-semibold tracking-wide ${
                      isAura ? 'text-white font-cinzel' : 'text-primary font-serif'
                    }`}>
                      {item.category}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1.5 rounded-full bg-current/5"
                  >
                    <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-current/10"
                    >
                      <div className="p-5 sm:p-6 space-y-2.5">
                        {item.items.map((line: string, lIdx: number) => (
                          <div key={lIdx} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
                              isAura ? 'text-[#C5BBAA]' : 'text-primary/80'
                            }`}>
                              {line}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
