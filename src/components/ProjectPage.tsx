import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectConfig } from '../data/projects';
import { ProjectHero } from './ProjectHero';
import { ProjectStats } from './ProjectStats';
import { ProjectOverview } from './ProjectOverview';
import { ProjectShowcase } from './ProjectShowcase';
import { HomeConfigurations } from './HomeConfigurations';
import { FloorPlans } from './FloorPlans';
import { Amenities } from './Amenities';
import { InteriorGallery } from './InteriorGallery';
import { ProjectGallery } from './ProjectGallery';
import { Location } from './Location';
import { Specifications } from './Specifications';
import { RetailSection } from './RetailSection';
import { Developer } from './Developer';
import { LegalInformation } from './LegalInformation';
import { ProjectCTA } from './ProjectCTA';
import { ProjectSwitcher } from './ProjectSwitcher';
import { PolicyModal } from './PolicyModal';

interface ProjectPageProps {
  project: ProjectConfig;
  onSelectProject: (slug: string) => void;
  onOpenEnquiry: (pref?: string) => void;
  initialSection?: string;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({
  project,
  onSelectProject,
  onOpenEnquiry,
  initialSection,
}) => {
  const [policyType, setPolicyType] = React.useState<'terms' | 'privacy' | null>(null);
  const isAura = project.slug === 'aura';

  useEffect(() => {
    if (initialSection) {
      setTimeout(() => {
        const el = document.getElementById(initialSection);
        if (el) {
          const yOffset = -75;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 400);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project.slug, initialSection]);

  const handleExplore = () => {
    const el = document.getElementById('overview');
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.slug}
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(8px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`min-h-screen ${
          isAura ? 'bg-[#0B0B0D] text-[#F5E6C8]' : 'bg-[#FAF8F5] text-primary'
        }`}
      >
        {/* 1. Hero */}
        <ProjectHero
          project={project}
          onOpenEnquiry={onOpenEnquiry}
          onExplore={handleExplore}
        />

        {/* 2. Key Stats Strip */}
        <ProjectStats project={project} />

        {/* 3. Project Overview */}
        <ProjectOverview
          project={project}
          onOpenEnquiry={() => onOpenEnquiry(project.configurations[0]?.title)}
        />

        {/* 4. Architectural Showcase */}
        <ProjectShowcase project={project} />

        {/* 5. Lifestyle Stories (if defined) */}
        {project.lifestyleStories && project.lifestyleStories.length > 0 && (
          <section className="py-20 lg:py-28 bg-[#09090C] text-[#F5E6C8] border-t border-[#D4AF37]/15">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
                  THE SKY EXPERIENCE
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-cinzel text-white">
                  Curated For Every Passion
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#C5BBAA] font-light">
                  A highrise symphony of sky terraces, leisure waters, and wellness spaces.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {project.lifestyleStories.map((story, sIdx) => (
                  <motion.div
                    key={sIdx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: sIdx * 0.15 }}
                    className="rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-[#141418] group flex flex-col justify-between"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={story.image}
                        alt={story.headline}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase bg-[#D4AF37] text-black font-bold">
                        {story.tagline}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-light font-cinzel text-white mb-2">
                        {story.headline}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#C5BBAA] font-light leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Residences / Configurations */}
        <HomeConfigurations
          project={project}
          onSelectUnit={(unit) => onOpenEnquiry(unit)}
        />

        {/* 7. Floor Plans with High-Res CAD Modal */}
        <FloorPlans
          project={project}
          onEnquirePlan={(plan) => onOpenEnquiry(plan)}
        />

        {/* 8. Interactive Amenities */}
        <Amenities project={project} />

        {/* 9. Residential Interiors */}
        <InteriorGallery project={project} />

        {/* 10. Commercial / Retail Section (if present) */}
        {project.retail && (
          <RetailSection
            project={project}
            onEnquireCommercial={() => onOpenEnquiry('Commercial Retail Shop')}
          />
        )}

        {/* 11. Curated Photo Gallery */}
        <ProjectGallery project={project} />

        {/* 12. Strategic Location */}
        <Location project={project} />

        {/* 13. Expandable Technical Specifications */}
        <Specifications project={project} />

        {/* 14. About Developer */}
        <Developer project={project} />

        {/* 15. Legal / MahaRERA Information */}
        <LegalInformation project={project} />

        {/* 16. Project Call to Action */}
        <ProjectCTA
          project={project}
          onOpenEnquiry={() => onOpenEnquiry(project.configurations[0]?.title)}
        />

        {/* 17. Project Switcher (Allows seamless jump to other projects) */}
        <ProjectSwitcher
          currentSlug={project.slug}
          onSelectProject={onSelectProject}
          title="MORE BY LIFESTYLE HOME SPACES"
          subtitle="Explore other signature real-estate benchmarks in our portfolio"
        />

        {/* Footer */}
        <footer className={`py-12 border-t text-center text-xs font-light ${
          isAura 
            ? 'bg-[#060608] border-white/10 text-zinc-500' 
            : 'bg-white border-primary/10 text-zinc-500'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <p className="mb-2">
              {project.projectName} · {project.location.address}, {project.location.city}
            </p>
            <div className="mt-4 pt-4 border-t border-current/10 flex items-center justify-center gap-4 text-[11px] opacity-75">
              <button
                onClick={() => setPolicyType('terms')}
                className="hover:text-[#D4AF37] transition-colors"
              >
                Terms of Use
              </button>
              <span>·</span>
              <button
                onClick={() => setPolicyType('privacy')}
                className="hover:text-[#D4AF37] transition-colors"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </footer>

        {/* Policy Modal */}
        <PolicyModal
          isOpen={policyType !== null}
          onClose={() => setPolicyType(null)}
          type={policyType}
        />

      </motion.div>
    </AnimatePresence>
  );
};
