import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, Check, Maximize2, X, ZoomIn } from 'lucide-react';
import { ProjectConfig } from '../data/projects';

interface RetailSectionProps {
  project: ProjectConfig;
  onEnquireCommercial?: () => void;
}

export const RetailSection: React.FC<RetailSectionProps> = ({ project, onEnquireCommercial }) => {
  const retail = project.retail;
  if (!retail) return null;

  const [selectedPlanModal, setSelectedPlanModal] = useState<{ title: string; image: string } | null>(null);

  return (
    <section id="commercial" className="py-20 lg:py-28 bg-[#111114] text-[#F5E6C8] relative border-t border-[#D4AF37]/20">
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
                COMMERCIAL DESTINATION
              </span>
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-cinzel text-white">
              Retail & Corporate at {project.projectName}
            </h2>

            <p className="mt-3 text-sm sm:text-base font-light text-[#C5BBAA]">
              {retail.headline} — {retail.subheadline}
            </p>
          </motion.div>
        </div>

        {/* Commercial Banner / Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Large Commercial Exterior Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#D4AF37]/30 shadow-2xl group">
              <img
                src={retail.image}
                alt="Commercial Retail Facade"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded text-[10px] uppercase tracking-widest font-mono bg-[#D4AF37] text-black inline-block mb-2 font-bold">
                  High-Street Retail Promenade
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-white font-cinzel">
                  Unmatched Street Frontage & Footfall
                </h3>
                <p className="text-xs sm:text-sm text-[#C5BBAA] mt-1 font-light">
                  Direct commercial access on main arterial roads with 2.4m to 3.8m wide shopping boulevards.
                </p>
              </div>
            </div>
          </div>

          {/* Retail Advantages & Commercial Value */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#16161A] border border-[#D4AF37]/25 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-white font-cinzel">
                  Business Advantages
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#C5BBAA] leading-relaxed mb-6 font-light">
                {retail.description}
              </p>

              <div className="space-y-3 mb-8">
                {retail.features.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[#F5E6C8]/90 font-light leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {onEnquireCommercial && (
                <button
                  onClick={onEnquireCommercial}
                  className="w-full py-3.5 px-4 rounded text-xs uppercase tracking-[0.2em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/10"
                >
                  <span>Enquire For Retail / Office Space</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Commercial Floor Plans Grid */}
        <div className="mt-12">
          <h3 className="text-xl sm:text-2xl font-light text-white font-cinzel text-center mb-8">
            Commercial Floor Plans
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {retail.plans.map((plan, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#16161A] p-4 flex flex-col justify-between group"
              >
                <div 
                  onClick={() => setSelectedPlanModal({ title: plan.title, image: plan.image })}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/60 mb-4 cursor-pointer"
                >
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-light text-white font-cinzel mb-1">
                    {plan.title}
                  </h4>
                  <p className="text-xs text-[#C5BBAA] font-light leading-relaxed mb-4">
                    {plan.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPlanModal({ title: plan.title, image: plan.image })}
                  className="w-full py-2.5 rounded text-[11px] uppercase tracking-wider font-semibold border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  Inspect Layout Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Plan Zoom Modal */}
      <AnimatePresence>
        {selectedPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPlanModal(null)}
          >
            <button
              onClick={() => setSelectedPlanModal(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div 
              className="max-w-5xl max-h-[85vh] overflow-hidden rounded-xl bg-black p-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-lg font-light text-[#D4AF37] font-cinzel mb-3">
                {selectedPlanModal.title}
              </h4>
              <img
                src={selectedPlanModal.image}
                alt={selectedPlanModal.title}
                className="max-h-[75vh] w-auto mx-auto object-contain rounded"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
