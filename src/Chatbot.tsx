import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Bot, ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS, BRAND_CONFIG } from './data/projects';

const WHATSAPP_NUMBER = '918530763405';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: Option[];
};

type Option = {
  label: string;
  action: () => void;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            sender: 'bot',
            text: 'Namaste! Welcome to Lifestyle Home Spaces.\n\nI am your digital portfolio concierge. Which landmark development would you like to explore today?',
            options: [
              { label: '✨ Aura by Lifestyle (New)', action: () => handleOptionClick('Aura Details') },
              { label: '🏛️ Lifestyle Homes', action: () => handleOptionClick('Lifestyle Homes Details') },
              { label: '⚖️ Compare Both Projects', action: () => handleOptionClick('Compare Projects') },
              { label: '📍 Locations & Connectivity', action: () => handleOptionClick('Locations') },
              { label: '💬 Talk to Sales on WhatsApp', action: () => handleOptionClick('Contact Sales') },
            ],
          },
        ]);
      }, 250);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (msg: Omit<Message, 'id'>) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now().toString() }]);
  };

  const handleOptionClick = (optionLabel: string) => {
    addMessage({ sender: 'user', text: optionLabel });

    setTimeout(() => {
      let botResponse: Omit<Message, 'id'> = { sender: 'bot', text: '' };

      switch (optionLabel) {
        case 'Aura Details':
          botResponse = {
            sender: 'bot',
            text: '🌟 Aura by Lifestyle — "Life Beyond Imagination"\n\n• Concept: Skyline Highrise luxury with rooftop amenities.\n• Configuration: 2 & 3 BHK luxury residences + 3 levels of high-street commercial retail & offices.\n• Rooftop Sky Deck: Rooftop swimming pool & kids pool, multi-sports turf with box cricket, viewing deck & party terrace.\n• Location: Congress Nagar Road, Next to Dreamz Signature, Amravati.\n• MahaRERA: P5030002502915\n• Elevators: 4 elevators (2 regular, 1 stretcher, 1 service) with 100% generator backup.',
            options: [
              { label: 'Aura Floor Plans', action: () => handleOptionClick('Aura Floor Plans') },
              { label: 'Aura Commercial Retail', action: () => handleOptionClick('Aura Retail') },
              { label: 'Book Aura Site Visit', action: () => handleOptionClick('Contact Sales') },
              { label: 'Main Menu', action: () => handleOptionClick('Main Menu') },
            ],
          };
          break;

        case 'Lifestyle Homes Details':
          botResponse = {
            sender: 'bot',
            text: '🏛️ Lifestyle Homes — "Where Space Meets The Way You Live"\n\n• Status: Ready for Immediate Possession!\n• Configuration: 12 Units of 3 BHK suites, 18 Units of 2 BHK residences, and 24 integrated ground/1st floor retail shops.\n• Highlights: 100% Vastu compliance, cross-ventilation, covered parking, and 24/7 security.\n• Location: DPS Road, Parvati Nagar, Near Avinashe Avenue, Amravati.',
            options: [
              { label: 'Lifestyle Homes Plans', action: () => handleOptionClick('Lifestyle Plans') },
              { label: 'Schedule Visit', action: () => handleOptionClick('Contact Sales') },
              { label: 'Main Menu', action: () => handleOptionClick('Main Menu') },
            ],
          };
          break;

        case 'Compare Projects':
          botResponse = {
            sender: 'bot',
            text: '📊 Project Comparison Summary:\n\n1. AURA BY LIFESTYLE\n• Skyline 13-storey highrise tower\n• Rooftop sky deck, swimming pool, box cricket turf & fitness gym\n• Congress Nagar prime commercial corridor\n• Ideal for skyline luxury living & retail investment\n\n2. LIFESTYLE HOMES\n• Ready for possession\n• Exclusive community of 30 residences on DPS Road\n• Ground & first floor retail arcade\n• Ideal for immediate move-in & peaceful family living',
            options: [
              { label: 'Explore Aura', action: () => handleOptionClick('Aura Details') },
              { label: 'Explore Lifestyle Homes', action: () => handleOptionClick('Lifestyle Homes Details') },
              { label: 'Connect on WhatsApp', action: () => handleOptionClick('Contact Sales') },
            ],
          };
          break;

        case 'Aura Floor Plans':
          botResponse = {
            sender: 'bot',
            text: '📐 Aura Floor Plans:\n\n• 2 BHK: Master Bedroom (11’0” × 12’0”), Kids Bedroom (11’0” × 12’0”), Living (11’0” × 17’0”), Balcony (10’6” × 6’0”).\n• 3 BHK: Master Suite (11’0” × 15’0”), Guest Bed (11’0” × 12’0”), 3 Balconies.\n• Typical Floors: 3rd to 13th.\n• Commercial: Lower Ground, Upper Ground & 1st Floor layouts.',
            options: [
              { label: 'Book Site Visit', action: () => handleOptionClick('Contact Sales') },
              { label: 'Main Menu', action: () => handleOptionClick('Main Menu') },
            ],
          };
          break;

        case 'Aura Retail':
          botResponse = {
            sender: 'bot',
            text: '🛍️ Retail & Corporate at Aura:\n\n• Lower Ground: 24 Shops (G-01 to G-24) with dedicated customer parking.\n• Upper Ground: Retail Showrooms (U-01 to U-22) & Offices (OU-01 to OU-19) with 3.3m wide corridors.\n• First Floor: Showrooms (F-01 to F-21) and executive corporate suites.\n• Direct Frontage: Main Congress Nagar Road.',
            options: [
              { label: 'Enquire for Retail', action: () => handleOptionClick('Contact Sales') },
              { label: 'Main Menu', action: () => handleOptionClick('Main Menu') },
            ],
          };
          break;

        case 'Locations':
          botResponse = {
            sender: 'bot',
            text: '📍 Strategic Amravati Addresses:\n\n1. Aura by Lifestyle: Congress Nagar Road, Next to Dreamz Signature, Amravati (5 min to Super Speciality Hospital, D-Mart, ST Stand).\n\n2. Lifestyle Homes: DPS Road, Parvati Nagar, Near Avinashe Avenue, Amravati (2 min to Delhi Public School, quick access to Ring Road).\n\n3. Corporate Headquarters: Shop no. 104, First Floor, Next Level Mall, Camp, Amravati.',
            options: [
              {
                label: '🗺️ Aura on Google Maps',
                action: () => window.open('https://maps.google.com/?q=Congress+Nagar+Road+Next+To+Dreamz+Signature+Amravati', '_blank'),
              },
              {
                label: '🗺️ Lifestyle Homes on Google Maps',
                action: () => window.open('https://maps.google.com/?q=DPS+Road+Parvati+Nagar+Amravati', '_blank'),
              },
              {
                label: '🗺️ Head Office on Google Maps',
                action: () => window.open('https://maps.app.goo.gl/24P5tAitT1zZAdNc8', '_blank'),
              },
              { label: '💬 Connect on WhatsApp', action: () => handleOptionClick('Contact Sales') },
              { label: 'Main Menu', action: () => handleOptionClick('Main Menu') },
            ],
          };
          break;

        case 'Contact Sales':
          botResponse = {
            sender: 'bot',
            text: `Our official sales desk is available on WhatsApp at +91 ${WHATSAPP_NUMBER}.\n\nClick below to open WhatsApp with your chosen inquiry.`,
            options: [
              {
                label: '💬 Open WhatsApp Concierge',
                action: () => {
                  const message = encodeURIComponent(
                    "Hello, I am interested in Lifestyle Home Spaces projects (Aura & Lifestyle Homes in Amravati). Please share full details and schedule an appointment."
                  );
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
                },
              },
              { label: 'Back to Menu', action: () => handleOptionClick('Main Menu') },
            ],
          };
          break;

        case 'Main Menu':
        default:
          botResponse = {
            sender: 'bot',
            text: 'How can I assist you further with Lifestyle Home Spaces portfolio?',
            options: [
              { label: '✨ Aura by Lifestyle', action: () => handleOptionClick('Aura Details') },
              { label: '🏛️ Lifestyle Homes', action: () => handleOptionClick('Lifestyle Homes Details') },
              { label: '⚖️ Compare Both Projects', action: () => handleOptionClick('Compare Projects') },
              { label: '📍 Locations', action: () => handleOptionClick('Locations') },
              { label: '💬 Talk to Sales on WhatsApp', action: () => handleOptionClick('Contact Sales') },
            ],
          };
          break;
      }

      addMessage(botResponse);
    }, 400);
  };

  return (
    <>
      {/* Floating Concierge Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F27] text-black shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            aria-label="Open Project Concierge"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute right-full mr-3 bg-black/90 text-[#F5E6C8] border border-[#D4AF37]/30 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Explore Aura & Lifestyle Homes
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Concierge Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] h-[520px] max-h-[calc(100vh-5rem)] bg-[#101014] border border-[#D4AF37]/35 rounded-3xl shadow-2xl flex flex-col overflow-hidden font-sans text-white"
          >
            {/* Header */}
            <div className="bg-[#09090C] p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/40">
                  <Bot className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-xs tracking-wider uppercase font-cinzel">
                    Lifestyle Concierge
                  </h3>
                  <p className="text-[10px] text-[#D4AF37] flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    Portfolio Assistant Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#101014] custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[90%]">
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center mb-1 text-[#D4AF37]">
                        <Bot className="w-3 h-3" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-[#D4AF37] text-black font-medium rounded-br-xs'
                          : 'bg-[#18181E] text-zinc-200 rounded-bl-xs border border-white/10'
                      }`}
                    >
                      {msg.text.replace(/\*\*/g, '')}
                    </div>
                  </div>

                  {/* Options */}
                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-2 pl-7">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={opt.action}
                          className="px-3 py-1.5 bg-[#18181E] hover:bg-[#D4AF37] hover:text-black border border-white/10 hover:border-[#D4AF37] text-[11px] text-[#F5E6C8] rounded-full transition-all duration-200 flex items-center gap-1.5"
                        >
                          {opt.label}
                          {opt.label.includes('WhatsApp') && <ExternalLink className="w-3 h-3" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#09090C] border-t border-white/10 text-center text-[10px] text-zinc-500">
              Select an option above to explore floor plans, specs & amenities
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
