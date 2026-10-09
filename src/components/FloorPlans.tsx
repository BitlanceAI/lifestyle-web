import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, Download, Maximize2, X, ChevronRight, Eye } from 'lucide-react';
import { ProjectConfig, FloorPlanItem } from '../data/projects';

interface FloorPlansProps {
  project: ProjectConfig;
  onEnquirePlan?: (planTitle: string) => void;
}

export const FloorPlans: React.FC<FloorPlansProps> = ({ project, onEnquirePlan }) => {
  const isAura = project.slug === 'aura';
  const plans = project.floorPlans;
  const [activeTab, setActiveTab] = useState<string>(plans[0]?.id || '');
  const [modalImage, setModalImage] = useState<{ url: string; title: string } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activePlan = plans.find((p) => p.id === activeTab) || plans[0];

  const handleDownload = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${project.slug}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="floor-plans" className={`py-20 lg:py-28 ${
      isAura ? 'bg-[#0E0E12] text-[#F5E6C8]' : 'bg-white text-primary'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37]">
                ARCHITECTURAL DRAWINGS
              </span>
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${
              isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
            }`}>
              Floor Plans & Layouts
            </h2>

            <p className={`mt-3 text-sm sm:text-base font-light ${
              isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
            }`}>
              Precision CAD drawings and 3D architectural section views faithfully reproduced from the official brochure.
            </p>
          </motion.div>
        </div>

        {/* Floor Plan Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {plans.map((plan: FloorPlanItem) => {
            const isSelected = plan.id === activeTab;
            return (
              <button
                key={plan.id}
                onClick={() => setActiveTab(plan.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? isAura
                      ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 scale-105'
                      : 'bg-primary text-white shadow-md scale-105'
                    : isAura
                      ? 'bg-white/5 text-[#C5BBAA] hover:bg-white/10 hover:text-white border border-white/5'
                      : 'bg-black/5 text-primary/70 hover:bg-black/10 hover:text-primary'
                }`}
              >
                {plan.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Active Floor Plan Display Area */}
        {activePlan && (
          <div className={`p-6 sm:p-10 rounded-2xl border ${
            isAura ? 'bg-[#151518] border-[#D4AF37]/20' : 'bg-[#FAF8F5] border-primary/10'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Floor Plan Image Frame with Interactive Overlays */}
              <div className="lg:col-span-8 flex justify-center">
                <div className="relative rounded-xl overflow-hidden border border-black/10 bg-black/40 group shadow-2xl inline-flex flex-col items-center justify-center max-w-full">
                  <div className="relative overflow-hidden flex items-center justify-center max-h-[520px]">
                    <img
                      src={activePlan.image}
                      alt={activePlan.title}
                      className="max-h-[520px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-102 block"
                      loading="lazy"
                    />
                  </div>

                  {/* Top-Right Quick Action Toolbar */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <button
                      onClick={() => {
                        setModalImage({ url: activePlan.image, title: activePlan.title });
                        setZoomLevel(1);
                      }}
                      className="p-2.5 rounded-full bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black transition-colors backdrop-blur-md shadow-lg"
                      title="Zoom High-Resolution Plan"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setModalImage({ url: activePlan.image, title: activePlan.title });
                        setZoomLevel(1.5);
                      }}
                      className="p-2.5 rounded-full bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black transition-colors backdrop-blur-md shadow-lg"
                      title="Fullscreen Modal"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(activePlan.image, activePlan.title)}
                      className="p-2.5 rounded-full bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black transition-colors backdrop-blur-md shadow-lg"
                      title="Download Plan"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Inspect Prompt Bar */}
                  <div 
                    onClick={() => {
                      setModalImage({ url: activePlan.image, title: activePlan.title });
                      setZoomLevel(1.2);
                    }}
                    className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-center gap-2 text-xs font-medium text-[#D4AF37] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click anywhere to inspect in High-Resolution Modal</span>
                  </div>
                </div>
              </div>

              {/* Plan Information & Room Specifications */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] block mb-1">
                    {activePlan.category} ARCHITECTURE
                  </span>
                  
                  <h3 className={`text-2xl sm:text-3xl font-light mb-4 ${
                    isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
                  }`}>
                    {activePlan.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-light ${
                    isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
                  }`}>
                    {activePlan.description}
                  </p>

                  {/* Features / Dimensions Bullet List */}
                  {activePlan.features && (
                    <div className="space-y-2 mb-8">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#D4AF37] block mb-2">
                        Key Dimensions & Spatial Zones
                      </span>
                      {activePlan.features.map((feat: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span className={isAura ? 'text-[#F5E6C8]' : 'text-primary/90'}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="space-y-3 pt-4 border-t border-current/10">
                  <button
                    onClick={() => {
                      setModalImage({ url: activePlan.image, title: activePlan.title });
                      setZoomLevel(1.2);
                    }}
                    className={`w-full py-3.5 px-4 rounded text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isAura
                        ? 'bg-[#D4AF37] text-black hover:bg-white shadow-lg shadow-[#D4AF37]/20'
                        : 'bg-primary text-white hover:bg-[#D4AF37] hover:text-primary'
                    }`}
                  >
                    <ZoomIn className="w-4 h-4" />
                    <span>Open High-Res Modal</span>
                  </button>

                  <button
                    onClick={() => handleDownload(activePlan.image, activePlan.title)}
                    className={`w-full py-3 px-4 rounded text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
                      isAura
                        ? 'border-white/20 text-[#F5E6C8] hover:bg-white/10'
                        : 'border-primary/20 text-primary hover:bg-black/5'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CAD Sheet</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* High-Resolution Modal with Zoom & Pan */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-4 sm:p-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white">
              <div>
                <h4 className="text-base sm:text-lg font-light font-cinzel text-[#D4AF37]">
                  {modalImage.title}
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Official CAD Drawing · High Definition
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-xs">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                    className="hover:text-[#D4AF37] font-bold px-1"
                  >
                    -
                  </button>
                  <span className="font-mono text-[11px]">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
                    className="hover:text-[#D4AF37] font-bold px-1"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleDownload(modalImage.url, modalImage.title)}
                  className="p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setModalImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-500 hover:text-white transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable / Zoomable Modal Canvas */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-4 custom-scrollbar">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="max-w-full max-h-full transition-transform duration-200 cursor-grab active:cursor-grabbing"
              >
                <img
                  src={modalImage.url}
                  alt={modalImage.title}
                  className="max-h-[82vh] w-auto object-contain rounded shadow-2xl pointer-events-auto"
                />
              </motion.div>
            </div>

            {/* Modal Footer hint */}
            <div className="text-center pt-2 text-[11px] text-zinc-500">
              Use + and - buttons to zoom into architectural dimensions and labels.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
