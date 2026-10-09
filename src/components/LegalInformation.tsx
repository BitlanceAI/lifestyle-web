import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Download, ExternalLink, Users, FileText } from 'lucide-react';
import { ProjectConfig } from '../data/projects';

interface LegalInformationProps {
  project: ProjectConfig;
}

export const LegalInformation: React.FC<LegalInformationProps> = ({ project }) => {
  const isAura = project.slug === 'aura';
  const legal = project.legal;

  return (
    <section id="legal" className={`py-16 lg:py-24 border-t ${
      isAura 
        ? 'bg-[#08080A] border-[#D4AF37]/20 text-[#F5E6C8]' 
        : 'bg-white border-primary/10 text-primary'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Top RERA Banner */}
          <div className={`p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
            isAura ? 'bg-[#121215] border-[#D4AF37]/30 shadow-xl' : 'bg-[#FAF8F5] border-primary/10 shadow-md'
          }`}>
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex-shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37] block">
                  GOVERNMENT RERA REGISTRATION
                </span>
                <h3 className={`text-xl sm:text-2xl font-semibold tracking-wide ${
                  isAura ? 'text-white font-cinzel' : 'text-primary font-serif'
                }`}>
                  MahaRERA Reg. No: {legal.reraNo}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Registered under Maharashtra Real Estate Regulatory Authority (MahaRERA)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={legal.reraWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded text-xs uppercase tracking-wider font-bold border border-current/20 hover:border-[#D4AF37] transition-colors flex items-center gap-1.5"
              >
                <span>Verify on MahaRERA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {legal.brochureDownloadUrl && (
                <a
                  href={legal.brochureDownloadUrl}
                  download
                  className="px-5 py-2.5 rounded text-xs uppercase tracking-wider font-bold bg-[#D4AF37] text-black hover:bg-white transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Brochure PDF</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Consultants (From Brochure Page 34) */}
          {legal.consultants && legal.consultants.length > 0 && (
            <div>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                    PROJECT CONSULTANTS
                  </span>
                </div>
                <h4 className={`text-xl sm:text-2xl font-light ${
                  isAura ? 'font-cinzel text-white' : 'font-serif text-primary'
                }`}>
                  Master Planners & Engineering Team
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {legal.consultants.map((cons, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-center flex flex-col justify-center ${
                      isAura ? 'bg-[#121216] border-white/5' : 'bg-[#FAF8F5] border-primary/5'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] block mb-1">
                      {cons.role}
                    </span>
                    <span className={`text-xs sm:text-sm font-medium ${
                      isAura ? 'text-[#F5E6C8]' : 'text-primary'
                    }`}>
                      {cons.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal Disclaimer */}
          <div className={`p-6 sm:p-8 rounded-2xl border text-center transition-all ${
            isAura
              ? 'bg-[#141418] border-[#D4AF37]/25 shadow-lg shadow-black/40'
              : 'bg-[#FAF8F5] border-[#0A0A0A]/10 shadow-sm'
          }`}>
            <span className={`text-xs font-semibold uppercase tracking-[0.2em] block mb-2.5 ${
              isAura ? 'text-[#D4AF37] font-cinzel' : 'text-[#A9873A] font-serif'
            }`}>
              Statutory Legal Disclaimer
            </span>
            <p className={`text-xs sm:text-[13px] leading-relaxed font-normal max-w-4xl mx-auto ${
              isAura ? 'text-[#F5E6C8]/90 font-light' : 'text-[#0A0A0A]/80'
            }`}>
              {legal.disclaimer}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
