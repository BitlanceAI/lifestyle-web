import React from 'react';
import { motion } from 'motion/react';
import { Building2, Award, ShieldCheck, Sparkles, Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { ProjectConfig } from '../data/projects';

interface DeveloperProps {
  project: ProjectConfig;
}

export const Developer: React.FC<DeveloperProps> = ({ project }) => {
  const isAura = project.slug === 'aura';
  const dev = project.developer;
  const team = dev.team || [];

  return (
    <section id="developer" className={`py-20 lg:py-28 ${
      isAura ? 'bg-[#0B0B0D] text-[#F5E6C8]' : 'bg-[#FAF8F5] text-primary'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto rounded-3xl border p-8 sm:p-14 relative overflow-hidden backdrop-blur-md shadow-2xl text-center">
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37]">
              ABOUT THE DEVELOPER & TEAM
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>

          {dev.logo && (
            <div className="mb-6 flex justify-center">
              <img
                src={dev.logo}
                alt={dev.name}
                className="h-16 sm:h-20 w-auto object-contain drop-shadow"
              />
            </div>
          )}

          <h2 className={`text-2xl sm:text-4xl font-light tracking-tight mb-2 ${
            isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
          }`}>
            {dev.name}
          </h2>

          <p className="text-xs uppercase tracking-[0.25em] font-medium text-[#D4AF37] mb-6">
            {dev.brandTagline}
          </p>

          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light mb-10 ${
            isAura ? 'text-[#C5BBAA]' : 'text-primary/80'
          }`}>
            {dev.description}
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-current/10">
            <div className="flex flex-col items-center">
              <Building2 className="w-6 h-6 text-[#D4AF37] mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Benchmark Quality</span>
              <span className={`text-[11px] font-light ${isAura ? 'text-[#C5BBAA]/60' : 'text-primary/60'}`}>
                Engineered for Decades
              </span>
            </div>

            <div className="flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37] mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Uncompromising Trust</span>
              <span className={`text-[11px] font-light ${isAura ? 'text-[#C5BBAA]/60' : 'text-primary/60'}`}>
                Transparent Delivery
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-[#D4AF37] mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Curated Lifestyles</span>
              <span className={`text-[11px] font-light ${isAura ? 'text-[#C5BBAA]/60' : 'text-primary/60'}`}>
                Spaces That Feel Like Home
              </span>
            </div>
          </div>

          {/* Key Leadership & Direct Contacts */}
          {team.length > 0 && (
            <div className="mt-12 pt-10 border-t border-current/10">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] block mb-2">
                KEY CONTACTS & LEADERSHIP
              </span>
              <h3 className={`text-xl sm:text-2xl font-light mb-8 ${
                isAura ? 'font-cinzel text-white' : 'font-serif text-[#0A0A0A]'
              }`}>
                Meet Our Leadership & Project Advisory
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
                {team.map((member, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] flex flex-col sm:flex-row gap-5 items-center sm:items-start ${
                      isAura
                        ? 'bg-[#141418] border-[#D4AF37]/25 hover:border-[#D4AF37]'
                        : 'bg-white border-primary/10 shadow-md hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-[#D4AF37]/40 shadow-lg flex-shrink-0"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className={`text-lg font-semibold ${isAura ? 'text-white' : 'text-primary'}`}>
                        {member.name}
                      </h4>
                      <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-medium mb-3">
                        {member.role}
                      </p>
                      
                      <div className="space-y-1.5 text-xs">
                        <a
                          href={`tel:${member.phone.replace(/\s+/g, '')}`}
                          className="flex items-center justify-center sm:justify-start gap-2 hover:text-[#D4AF37] transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{member.phone}</span>
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center justify-center sm:justify-start gap-2 hover:text-[#D4AF37] transition-colors break-all"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{member.email}</span>
                        </a>
                      </div>

                      <div className="mt-4 flex items-center justify-center sm:justify-start">
                        <a
                          href={`https://wa.me/${member.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors border border-[#25D366]/30 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Connect on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Official Office Headquarters and Social Links */}
              <div className="mt-8 pt-6 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-left">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#D4AF37]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Corporate Office:</span>
                  </div>
                  <p className="opacity-80">Shop no. 104, First Floor, Next Level Mall, Camp, Amravati - 444602</p>
                  <p className="opacity-60 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Mon - Sat | 12:00 PM – 8:00 PM</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/lifestylerealestate_11/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full border border-current/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61591959993385"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full border border-current/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
