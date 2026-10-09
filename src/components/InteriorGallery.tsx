import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectConfig } from '../data/projects';

interface InteriorGalleryProps {
  project: ProjectConfig;
}

export const InteriorGallery: React.FC<InteriorGalleryProps> = ({ project }) => {
  const isAura = project.slug === 'aura';
  const interiors = project.interiors;
  
  // Extract unique categories
  const categories = ['ALL', ...Array.from(new Set(interiors.map((i) => i.category)))];
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filtered = selectedCategory === 'ALL'
    ? interiors
    : interiors.filter((i) => i.category === selectedCategory);

  return (
    <section id="interiors" className={`py-20 lg:py-28 overflow-hidden ${
      isAura ? 'bg-[#0E0E12] text-[#F5E6C8]' : 'bg-white text-primary'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37]">
                RESIDENTIAL INTERIORS
              </span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${
              isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
            }`}>
              {isAura ? 'Lifestyle Inside Aura' : 'Sanctuary of Space & Finishes'}
            </h2>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? isAura
                      ? 'bg-[#D4AF37] text-black shadow-md'
                      : 'bg-primary text-white shadow-md'
                    : isAura
                      ? 'bg-white/5 text-[#C5BBAA] hover:bg-white/10'
                      : 'bg-black/5 text-primary/70 hover:bg-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Cinematic Scroll / Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.title + idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`rounded-2xl overflow-hidden border group flex flex-col justify-between ${
                  isAura ? 'bg-[#151518] border-[#D4AF37]/20 shadow-xl' : 'bg-[#FAF8F5] border-primary/10 shadow-md'
                }`}
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                  
                  <span className="absolute top-4 left-4 px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase bg-black/75 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className={`text-lg sm:text-xl font-light mb-2 leading-tight ${
                    isAura ? 'font-cinzel text-white' : 'font-serif text-primary'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed font-light ${
                    isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
