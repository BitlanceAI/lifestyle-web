import React from 'react';
import { motion } from 'motion/react';
import { ProjectConfig } from '../data/projects';

interface ProjectStatsProps {
  project: ProjectConfig;
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ project }) => {
  const isAura = project.slug === 'aura';

  return (
    <section className={`py-12 border-y relative z-10 ${
      isAura 
        ? 'bg-[#101013] border-[#D4AF37]/20 text-[#F5E6C8]' 
        : 'bg-white border-primary/10 text-primary'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-current/10">
          {project.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center pt-4 sm:pt-0 px-2 flex flex-col items-center justify-center"
            >
              <span className={`text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-1 ${
                isAura ? 'font-cinzel text-white' : 'font-serif text-primary'
              }`}>
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37] mb-0.5">
                {stat.label}
              </span>
              {stat.subtext && (
                <span className={`text-[11px] font-light ${
                  isAura ? 'text-[#C5BBAA]/60' : 'text-primary/50'
                }`}>
                  {stat.subtext}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
