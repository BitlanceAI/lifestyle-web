import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, Building, GraduationCap, ShoppingBag, Hospital, Trees } from 'lucide-react';
import { ProjectConfig, LandmarkItem } from '../data/projects';

interface LocationProps {
  project: ProjectConfig;
}

const getCategoryIcon = (cat: string) => {
  switch (cat.toLowerCase()) {
    case 'healthcare': return <Hospital className="w-4 h-4 text-[#D4AF37]" />;
    case 'education': return <GraduationCap className="w-4 h-4 text-[#D4AF37]" />;
    case 'retail':
    case 'commerce': return <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />;
    case 'leisure': return <Trees className="w-4 h-4 text-[#D4AF37]" />;
    default: return <Building className="w-4 h-4 text-[#D4AF37]" />;
  }
};

export const Location: React.FC<LocationProps> = ({ project }) => {
  const isAura = project.slug === 'aura';
  const loc = project.location;

  return (
    <section id="location" className={`py-20 lg:py-28 relative ${
      isAura ? 'bg-[#0E0E12] text-[#F5E6C8]' : 'bg-white text-primary'
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
                STRATEGIC CONNECTIVITY
              </span>
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${
              isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
            }`}>
              {isAura ? 'Connected to Everything.' : 'Prime Civic Location'}
            </h2>

            <p className={`mt-3 text-sm sm:text-base font-light ${
              isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
            }`}>
              {loc.description}
            </p>
          </motion.div>
        </div>

        {/* 2-Column Grid: Location Map Visual + Travel Radii List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Map Visual Frame */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-black/10 shadow-2xl group bg-black/40">
              <img
                src={loc.mapImage}
                alt={`${project.projectName} Location Map`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                    SITE ADDRESS
                  </span>
                  <p className="text-xs sm:text-sm font-light text-zinc-200">
                    {loc.address}, {loc.city}
                  </p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.googleMapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded text-[11px] uppercase tracking-wider font-bold bg-[#D4AF37] text-black hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Supported Distance/Travel Landmarks */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              isAura ? 'bg-[#151518] border-[#D4AF37]/20 shadow-xl' : 'bg-[#FAF8F5] border-primary/10 shadow-lg'
            }`}>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <h3 className={`text-xs uppercase tracking-[0.25em] font-bold ${
                  isAura ? 'text-white' : 'text-primary'
                }`}>
                  Travel Time Proximities
                </h3>
              </div>

              <div className="divide-y divide-current/10">
                {loc.landmarks.map((landmark: LandmarkItem, idx: number) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-current/5">
                        {getCategoryIcon(landmark.category)}
                      </div>
                      <div>
                        <span className={`text-xs sm:text-sm font-medium block leading-snug ${
                          isAura ? 'text-[#F5E6C8]' : 'text-primary'
                        }`}>
                          {landmark.name}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider ${
                          isAura ? 'text-[#C5BBAA]/60' : 'text-primary/50'
                        }`}>
                          {landmark.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D4AF37]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{landmark.distanceOrTime}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-current/10 text-center">
                <p className={`text-[11px] font-light ${
                  isAura ? 'text-[#C5BBAA]/60' : 'text-primary/50'
                }`}>
                  *Travel durations extracted directly from official project brochure reference.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
