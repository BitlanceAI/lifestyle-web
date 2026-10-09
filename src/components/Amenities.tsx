import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Waves, Trophy, Eye, Dumbbell, Users, Gamepad2, 
  Footprints, Building2, ShieldCheck, Car, Compass, Sparkles, CheckCircle2 
} from 'lucide-react';
import { ProjectConfig, AmenityItem } from '../data/projects';

interface AmenitiesProps {
  project: ProjectConfig;
}

// Icon mapper helper
const getAmenityIcon = (iconName: string) => {
  switch (iconName) {
    case 'Waves': return <Waves className="w-5 h-5 text-[#D4AF37]" />;
    case 'Trophy': return <Trophy className="w-5 h-5 text-[#D4AF37]" />;
    case 'Eye': return <Eye className="w-5 h-5 text-[#D4AF37]" />;
    case 'Dumbbell': return <Dumbbell className="w-5 h-5 text-[#D4AF37]" />;
    case 'Users': return <Users className="w-5 h-5 text-[#D4AF37]" />;
    case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-[#D4AF37]" />;
    case 'Footprints': return <Footprints className="w-5 h-5 text-[#D4AF37]" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />;
    case 'Car': return <Car className="w-5 h-5 text-[#D4AF37]" />;
    case 'Compass': return <Compass className="w-5 h-5 text-[#D4AF37]" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
    case 'Building2': return <Building2 className="w-5 h-5 text-[#D4AF37]" />;
    default: return <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />;
  }
};

export const Amenities: React.FC<AmenitiesProps> = ({ project }) => {
  const isAura = project.slug === 'aura';
  const amenitiesList = project.amenities;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = amenitiesList[activeIndex] || amenitiesList[0];

  return (
    <section id="amenities" className={`py-20 lg:py-28 relative ${
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
                CURATED AMENITIES
              </span>
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${
              isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
            }`}>
              Everyday Exclusivity
            </h2>

            <p className={`mt-3 text-sm sm:text-base font-light ${
              isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
            }`}>
              Designed to transform routine moments into extraordinary lifestyle experiences.
            </p>
          </motion.div>
        </div>

        {/* Interactive 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Dynamic High-Res Amenity Image that changes on hover */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/11] sm:aspect-[16/10] border border-black/10 shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.image || activeItem.title}
                  src={activeItem.image || project.hero.image}
                  alt={activeItem.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`w-full h-full ${
                    activeItem.image?.includes('plan') ? 'object-contain bg-black/60 p-3' : 'object-cover'
                  }`}
                />
              </AnimatePresence>

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Tag & Title on Image */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                {activeItem.tag && (
                  <span className="px-3 py-1 rounded text-[10px] font-semibold tracking-widest uppercase bg-[#D4AF37] text-black inline-block mb-2">
                    {activeItem.tag}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-light text-white leading-tight font-cinzel">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 max-w-xl font-light">
                  {activeItem.description}
                </p>
              </div>

              {/* Border shine */}
              <div className={`absolute inset-0 pointer-events-none rounded-2xl border ${
                isAura ? 'border-[#D4AF37]/30' : 'border-primary/10'
              }`} />
            </div>
          </div>

          {/* Right Column: Interactive Amenity List with Hover Trigger */}
          <div className="lg:col-span-5 space-y-3">
            {amenitiesList.map((item: AmenityItem, idx: number) => {
              const isSelected = idx === activeIndex;

              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? isAura
                        ? 'bg-[#18181D] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10 translate-x-1.5'
                        : 'bg-white border-primary shadow-md translate-x-1.5'
                      : isAura
                        ? 'bg-[#121215]/60 border-white/5 hover:border-[#D4AF37]/40 hover:bg-[#15151A]'
                        : 'bg-white/60 border-primary/5 hover:border-primary/20 hover:bg-white'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg flex-shrink-0 transition-transform duration-300 ${
                    isSelected ? 'scale-110 bg-[#D4AF37]/10' : 'bg-current/5'
                  }`}>
                    {getAmenityIcon(item.iconName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm sm:text-base font-semibold leading-snug ${
                        isSelected
                          ? isAura ? 'text-white' : 'text-primary'
                          : isAura ? 'text-[#F5E6C8]/80' : 'text-primary/80'
                      }`}>
                        {item.title}
                      </h4>
                      {item.tag && (
                        <span className={`text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded ${
                          isSelected ? 'text-[#D4AF37]' : 'text-zinc-500'
                        }`}>
                          {item.tag}
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-xs mt-1 leading-relaxed line-clamp-2 font-light ${
                      isSelected
                        ? isAura ? 'text-[#C5BBAA]' : 'text-primary/70'
                        : isAura ? 'text-[#C5BBAA]/50' : 'text-primary/50'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
