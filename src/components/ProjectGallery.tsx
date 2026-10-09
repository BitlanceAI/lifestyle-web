import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Sparkles } from 'lucide-react';
import { ProjectConfig } from '../data/projects';

interface ProjectGalleryProps {
  project: ProjectConfig;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ project }) => {
  const isAura = project.slug === 'aura';
  const galleryItems = project.gallery;
  const categories = ['ALL', ...Array.from(new Set(galleryItems.map((g) => g.category)))];
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = selectedFilter === 'ALL'
    ? galleryItems
    : galleryItems.filter((g) => g.category === selectedFilter);

  return (
    <section id="gallery" className={`py-20 lg:py-28 ${
      isAura ? 'bg-[#0B0B0D] text-[#F5E6C8]' : 'bg-[#FAF8F5] text-primary'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37]">
                PROJECT PERSPECTIVES
              </span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${
              isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
            }`}>
              Curated Gallery
            </h2>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedFilter === cat
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

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.title + idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setLightboxIndex(idx)}
                className={`rounded-2xl overflow-hidden border relative group cursor-pointer aspect-[16/11] ${
                  isAura ? 'bg-[#151518] border-[#D4AF37]/20 shadow-xl' : 'bg-white border-primary/10 shadow-md'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-base font-light text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl max-h-[85vh] overflow-hidden rounded-xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[80vh] w-auto object-contain rounded-xl"
              />
              <div className="p-4 bg-black/80 text-center">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] block mb-1">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="text-lg font-light text-white">
                  {filteredItems[lightboxIndex].title}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
