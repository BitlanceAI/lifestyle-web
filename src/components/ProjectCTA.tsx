import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Calendar, ArrowRight, Download } from 'lucide-react';
import { ProjectConfig } from '../data/projects';

interface ProjectCTAProps {
  project: ProjectConfig;
  onOpenEnquiry: () => void;
}

export const ProjectCTA: React.FC<ProjectCTAProps> = ({ project, onOpenEnquiry }) => {
  const isAura = project.slug === 'aura';
  const whatsappUrl = `https://wa.me/${project.contact.whatsapp}?text=${encodeURIComponent(
    `Hello, I am interested in ${project.projectName} (${project.location.address}, Amravati). Please share full details and schedule a site visit.`
  )}`;

  return (
    <section className={`py-20 lg:py-28 relative overflow-hidden ${
      isAura ? 'bg-[#0E0E12] text-[#F5E6C8]' : 'bg-[#FAF8F5] text-primary'
    }`}>
      {/* Background architectural image subtly blended */}
      <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
        <img
          src={project.hero.image}
          alt={project.projectName}
          className="w-full h-full object-cover filter blur-[2px]"
        />
        <div className={`absolute inset-0 ${
          isAura ? 'bg-[#0E0E12]/90' : 'bg-[#FAF8F5]/90'
        }`} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-3">
            YOUR NEW RESIDENTIAL ADDRESS
          </span>

          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-6 leading-tight ${
            isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
          }`}>
            Begin Your Life at {project.projectName}
          </h2>

          <p className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-10 font-light ${
            isAura ? 'text-[#C5BBAA]' : 'text-primary/75'
          }`}>
            Connect with our sales specialists to review available inventory, schedule private site appointments, or receive formal floor plan folios.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenEnquiry}
              className={`w-full sm:w-auto px-8 py-4 rounded text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
                isAura
                  ? 'bg-[#D4AF37] text-black hover:bg-white shadow-[#D4AF37]/20'
                  : 'bg-primary text-white hover:bg-[#D4AF37] hover:text-primary'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Private Site Visit</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded text-xs uppercase tracking-[0.2em] font-bold bg-[#25D366] text-white hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-green-900/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-light text-zinc-400">
            <span>Official Helpline: <strong className="text-white">{project.contact.phone}</strong></span>
            <span>·</span>
            <span>Site Office: <a href={`https://maps.google.com/?q=${encodeURIComponent(project.location.googleMapsQuery)}`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-[#D4AF37] underline underline-offset-2 transition-colors">{project.contact.officeAddress} (Maps ↗)</a></span>
          </div>

        </div>
      </div>
    </section>
  );
};
