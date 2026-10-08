import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Phone, ArrowRight, X, Building2, 
  ShieldCheck, Car, TreePine, LayoutTemplate, Menu, 
  Compass, Sparkles, CheckCircle2, ChevronRight, MessageCircle, Home
} from 'lucide-react';

// Official Polished Assets
const ASSETS = {
  logo: '/assets/brand/lifestyle-logo.png',
  buildingHero: '/assets/building/building-exterior.jpg', // Genuine, sunny street perspective with clear sky & retail shops
  buildingElevation: '/assets/building/building-hero.jpg', // Frontal architectural view
  livingRoom: '/assets/interiors/living-room.jpg',
  livingRoomDetail: '/assets/interiors/living-room-detail.jpg',
  livingRoomWide: '/assets/interiors/living-room-wide.jpg',
  kitchen: '/assets/interiors/kitchen.jpg',
  corridor: '/assets/interiors/corridor.jpg',
  chandelier: '/assets/interiors/chandelier.jpg',
  storage: '/assets/interiors/storage-room.jpg',
  balcony: '/assets/interiors/balcony.jpg',
  bedroomBalcony: '/assets/interiors/bedroom-balcony.jpg',
  hallWalkthrough: '/assets/interiors/hall-walkthrough.jpg',
};

// WhatsApp Helpline
const WHATSAPP_NUMBER = '919422156688';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello, I am interested in Lifestyle Home Spaces (DPS Road, Parvati Nagar, Amravati). Please share full details and schedule a site visit."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// Safe Image Component
const SafeImage = ({ 
  src, 
  alt, 
  className = "", 
  style = {}, 
  variant = "default" 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  style?: React.CSSProperties; 
  variant?: "default" | "logo"; 
}) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    if (variant === 'logo') {
      return (
        <div className={`flex flex-col items-start justify-center ${className}`} style={style}>
          <span className="font-serif text-2xl md:text-3xl font-semibold leading-none text-primary uppercase tracking-wider">
            Lifestyle
          </span>
          <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-gold mt-1 font-bold">
            Home Spaces
          </span>
        </div>
      );
    }
    return (
      <div className={`arch-placeholder ${className}`} style={style}>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <Building2 className="w-8 h-8 mb-2 opacity-60 text-gold" />
          <span className="text-xs tracking-widest text-white/80 uppercase font-medium">Lifestyle Homes</span>
          <span className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{alt}</span>
        </div>
      </div>
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style}
      loading="lazy"
      onError={() => setError(true)} 
    />
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState('2 BHK Residence');
  const [activePhotoView, setActivePhotoView] = useState<'street' | 'elevation'>('street');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openEnquiryModal = (preference = '2 BHK Residence') => {
    setSelectedPreference(preference);
    setIsSiteVisitOpen(true);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75; // Account for fixed navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'overview', label: 'Overview', num: '01' },
    { id: 'project', label: 'The Project', num: '02' },
    { id: 'residences', label: 'Residences', num: '03' },
    { id: 'interiors', label: 'Interiors', num: '04' },
    { id: 'amenities', label: 'Amenities', num: '05' },
    { id: 'location', label: 'Location', num: '06' },
    { id: 'gallery', label: 'Gallery', num: '07' },
  ];

  return (
    <div className="font-sans text-primary bg-[#FAF8F5] selection:bg-gold/30 selection:text-primary min-h-screen">
      
      {/* Floating WhatsApp Action */}
      <a 
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 text-xs font-semibold tracking-wider uppercase">
          WhatsApp Us
        </span>
      </a>

      {/* Luxury Navbar */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md py-3.5 border-b border-primary/10' 
            : 'bg-[#FAF8F5]/90 backdrop-blur-sm py-5 border-b border-primary/5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('overview'); }} className="flex items-center space-x-3 group">
            <div className="h-11 sm:h-12 flex items-center">
              <SafeImage 
                src={ASSETS.logo} 
                alt="Lifestyle Home Spaces" 
                variant="logo"
                className="h-full w-auto max-w-[200px] sm:max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-8 text-[12px] uppercase tracking-[0.2em] font-semibold text-charcoal/80">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)} 
                className="hover:text-gold transition-colors py-1 cursor-pointer focus:outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex text-[11px] font-semibold tracking-wider text-charcoal/70 hover:text-gold items-center uppercase"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-gold" />
              <span>Enquire</span>
            </a>
            
            <button 
              onClick={() => openEnquiryModal('General Enquiry')}
              className="bg-primary text-warmwhite hover:bg-gold hover:text-primary transition-all duration-300 px-4 sm:px-6 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold border border-transparent shadow-sm"
            >
              Book a Site Visit
            </button>

            {/* Menu Toggle Button (Opens Right Drawer) */}
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              aria-label="Open menu drawer"
              className="p-2 text-primary hover:text-gold transition-colors focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right Side Slide-Over Drawer Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
              />

              {/* Right Slide Panel */}
              <motion.aside 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-[#FAF8F5] z-50 shadow-2xl flex flex-col justify-between p-6 sm:p-8 border-l border-primary/10 overflow-y-auto"
              >
                {/* Drawer Header */}
                <div>
                  <div className="flex justify-between items-center pb-6 border-b border-primary/10">
                    <div className="h-10">
                      <SafeImage 
                        src={ASSETS.logo} 
                        alt="Lifestyle Homes" 
                        variant="logo" 
                        className="h-full w-auto object-contain" 
                      />
                    </div>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close menu drawer"
                      className="p-2 text-primary hover:text-gold hover:bg-black/5 rounded-full transition-colors focus:outline-none"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-6 flex flex-col space-y-1">
                    {navLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => scrollTo(link.id)}
                        className="w-full text-left py-3.5 px-2 border-b border-primary/5 flex items-center justify-between group transition-colors hover:bg-black/[0.02]"
                      >
                        <span className="font-serif text-2xl text-primary group-hover:text-gold group-hover:translate-x-1 transition-all">
                          {link.label}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-mono tracking-widest text-charcoal/40 group-hover:text-gold transition-colors">
                            {link.num}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-6 border-t border-primary/10 flex flex-col space-y-3">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); openEnquiryModal('General Enquiry'); }}
                    className="w-full bg-primary hover:bg-gold hover:text-primary transition-all duration-300 text-white py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-center shadow-md"
                  >
                    Book a Site Visit
                  </button>
                  <a 
                    href={WHATSAPP_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-center flex items-center justify-center transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
                  </a>
                  
                  <div className="pt-2 text-center text-[10px] text-charcoal/50 uppercase tracking-widest">
                    DPS Road · Parvati Nagar · Amravati
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Hero Section (Polished Front Page) */}
      <section id="overview" className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 overflow-hidden bg-[#FAF8F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: High-End Editorial Typography */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              {/* Main Headline (Clean, no DPS Road eyebrow tag) */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.02] tracking-tight text-primary mb-4">
                LIFESTYLE <br />
                <span className="font-light italic text-gold">HOMES</span>
              </h1>

              {/* Tagline */}
              <p className="font-serif text-xl sm:text-2xl text-charcoal/90 italic mb-6">
                “Where Space Meets The Way You Live.”
              </p>

              {/* Editorial Description */}
              <p className="text-sm sm:text-base text-charcoal/70 font-light leading-relaxed mb-8 max-w-xl">
                A prestigious residential landmark offering meticulously planned 
                <strong> 2 &amp; 3 BHK residences </strong> combined with <strong>24 high-street retail shops</strong>. 
                Designed with expansive living spaces, designer lobbies, sunlit balconies, and superior construction quality.
              </p>

              {/* Configuration Highlights */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3.5 px-4 bg-white border border-primary/10 shadow-sm mb-8">
                <div className="border-r border-primary/10 pr-2">
                  <div className="text-base sm:text-lg font-serif font-bold text-primary">12 Flats</div>
                  <div className="text-[10px] uppercase tracking-wider text-charcoal/60">3 BHK Luxury</div>
                </div>
                <div className="border-r border-primary/10 pr-2 pl-2">
                  <div className="text-base sm:text-lg font-serif font-bold text-primary">18 Flats</div>
                  <div className="text-[10px] uppercase tracking-wider text-charcoal/60">2 BHK Comfort</div>
                </div>
                <div className="pl-2">
                  <div className="text-base sm:text-lg font-serif font-bold text-primary">24 Units</div>
                  <div className="text-[10px] uppercase tracking-wider text-charcoal/60">Retail Shops</div>
                </div>
              </div>

              {/* Action Buttons (Floor Plan button removed and replaced with Explore Residences) */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
                <button 
                  onClick={() => openEnquiryModal('General Enquiry')}
                  className="bg-primary text-warmwhite px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-gold hover:text-primary transition-all duration-300 flex items-center justify-center group shadow-md"
                >
                  Book a Site Visit
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a 
                  href="#residences"
                  className="border border-primary/30 bg-white hover:bg-warmwhite text-primary px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center"
                >
                  <Home className="w-4 h-4 mr-2 text-gold" />
                  Explore Residences
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-4 border-t border-primary/10 text-xs font-medium text-charcoal/80">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                  <span>RERA Registered Project</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                  <span>Prime Connectivity</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                  <span>High-Speed Elevators</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                  <span>Vastu Compliant Layouts</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Clean, Polished Real Architectural Photograph */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-7 relative"
            >
              {/* Outer clean architectural frame (NO CLUTTERING OVERLAYS) */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white group">
                
                {/* Main Authentic High-Res Photograph */}
                <div className="relative aspect-[4/4.8] sm:aspect-[16/13] lg:aspect-[4/4.5] overflow-hidden bg-charcoal">
                  <SafeImage 
                    src={activePhotoView === 'street' ? ASSETS.buildingHero : ASSETS.buildingElevation} 
                    alt="Lifestyle Home Spaces Building Real Architecture" 
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
                  />
                </div>

                {/* Perspective Switcher Controls (Clean & Discreet) */}
                <div className="absolute top-4 right-4 flex space-x-1.5 bg-black/60 backdrop-blur-md p-1 rounded-md border border-white/20">
                  <button 
                    onClick={() => setActivePhotoView('street')}
                    className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded transition-colors ${
                      activePhotoView === 'street' 
                        ? 'bg-gold text-primary font-bold' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Street Perspective
                  </button>
                  <button 
                    onClick={() => setActivePhotoView('elevation')}
                    className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded transition-colors ${
                      activePhotoView === 'elevation' 
                        ? 'bg-gold text-primary font-bold' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Front Elevation
                  </button>
                </div>

                {/* Subtle, Minimalist Bottom Caption Bar (Doesn't block building) */}
                <div className="p-4 bg-white flex justify-between items-center border-t border-primary/5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-primary">
                      Lifestyle Homes &amp; Commercial Hub
                    </h3>
                    <p className="text-[11px] text-charcoal/60 font-light">
                      G+7 Storeys landmark architecture with on-site retail &amp; spacious residential flats.
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Ready for Possession
                  </span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* The Project Section */}
      <section id="project" className="py-20 lg:py-28 bg-[#0F0F0F] text-warmwhite relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-bold block mb-3">
                Architectural Masterpiece
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                A Home Designed <br />
                Around <span className="text-gold italic font-light">Your Life.</span>
              </h2>
              <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed mb-8">
                Lifestyle Home Spaces brings together structural integrity and modern architectural finishes. 
                Featuring robust earthquake-resistant RCC construction, high-capacity passenger elevators, 
                and well-ventilated residences designed for lifelong comfort.
              </p>

              {/* Statistics Grid */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="text-4xl sm:text-5xl font-serif text-gold font-light mb-1">12</div>
                  <div className="text-xs uppercase tracking-widest text-white/80 font-semibold">3 BHK Flats</div>
                  <div className="text-[10px] text-white/50 mt-1">Expansive Living</div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-serif text-gold font-light mb-1">18</div>
                  <div className="text-xs uppercase tracking-widest text-white/80 font-semibold">2 BHK Flats</div>
                  <div className="text-[10px] text-white/50 mt-1">Smart Comfort</div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-serif text-gold font-light mb-1">24</div>
                  <div className="text-xs uppercase tracking-widest text-white/80 font-semibold">Shops</div>
                  <div className="text-[10px] text-white/50 mt-1">High-Street Retail</div>
                </div>
              </div>
            </div>

            {/* Building Frontal Elevation Photo */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl group">
                <SafeImage 
                  src={ASSETS.buildingElevation} 
                  alt="Lifestyle Homes Elevation View" 
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Architectural Highlights Over Image */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 sm:gap-3">
                  <span className="bg-black/80 backdrop-blur-md text-gold text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 border border-gold/30">
                    Grand Main Entrance
                  </span>
                  <span className="bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 border border-white/20">
                    Covered Parking Bays
                  </span>
                  <span className="bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 border border-white/20">
                    Ground + 1st Floor Retail
                  </span>
                  <span className="bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 border border-white/20">
                    Earthquake Resistant RCC
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Residences Section (Floor Plan Button Removed & Replaced with Direct Enquiries) */}
      <section id="residences" className="py-20 lg:py-28 bg-[#F4EFE6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-bronze font-bold block mb-2">
              Signature Residences
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-primary mb-4">
              Choose Your Home
            </h2>
            <p className="text-charcoal/70 text-sm sm:text-base font-light">
              Crafted with expansive living halls, high-end Italian vitrified tiles, and private sunlit balconies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* 2 BHK Card */}
            <div 
              onClick={() => openEnquiryModal('2 BHK Residence')}
              className="bg-white rounded-lg overflow-hidden shadow-lg border border-primary/10 group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-gold/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SafeImage 
                  src={ASSETS.livingRoom} 
                  alt="2 BHK Living Room" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs uppercase tracking-widest font-semibold px-3 py-1.5 shadow">
                  18 Available Units
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-2xl sm:text-3xl text-primary font-bold">2 BHK Residences</h3>
                  <span className="text-xs uppercase tracking-widest font-semibold text-gold bg-gold/10 px-3 py-1 rounded">
                    Vastu Compliant
                  </span>
                </div>
                <p className="text-charcoal/70 text-sm font-light mb-6">
                  Spacious homes designed for modern growing families. Features an open dining &amp; living space, master suite with attached bath, and a private sunlit terrace balcony.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs text-charcoal/80 mb-6 py-4 border-y border-primary/10">
                  <div><strong>Living Hall:</strong> 18' × 12'6"</div>
                  <div><strong>Master Bed:</strong> 14' × 12'</div>
                  <div><strong>Balcony:</strong> Expansive Deck</div>
                  <div><strong>Ventilation:</strong> Cross-Air Windows</div>
                </div>

                <div className="flex items-center text-xs uppercase tracking-[0.2em] font-bold text-primary group-hover:text-gold transition-colors">
                  <span>Enquire About 2 BHK</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* 3 BHK Card */}
            <div 
              onClick={() => openEnquiryModal('3 BHK Luxury Residence')}
              className="bg-white rounded-lg overflow-hidden shadow-lg border border-primary/10 group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-gold/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SafeImage 
                  src={ASSETS.livingRoomWide} 
                  alt="3 BHK Grand Suite" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-gold text-primary text-xs uppercase tracking-widest font-semibold px-3 py-1.5 shadow">
                  12 Exclusive Units
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-2xl sm:text-3xl text-primary font-bold">3 BHK Luxury Suites</h3>
                  <span className="text-xs uppercase tracking-widest font-semibold text-gold bg-gold/10 px-3 py-1 rounded">
                    Ultra Premium
                  </span>
                </div>
                <p className="text-charcoal/70 text-sm font-light mb-6">
                  More space. More comfort. More possibilities. Ideal for large families desiring lavish living halls, dual balconies, and private ensuite bedrooms.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs text-charcoal/80 mb-6 py-4 border-y border-primary/10">
                  <div><strong>Grand Living:</strong> 22'6" × 14'</div>
                  <div><strong>Master Suite:</strong> 16' × 13'6"</div>
                  <div><strong>Bedrooms:</strong> 3 Large Suites</div>
                  <div><strong>Deck:</strong> Dual Sun Decks</div>
                </div>

                <div className="flex items-center text-xs uppercase tracking-[0.2em] font-bold text-primary group-hover:text-gold transition-colors">
                  <span>Enquire About 3 BHK</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interior Showcase Section (Brand New Polished Photographs) */}
      <section id="interiors" className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-bronze font-bold block mb-2">
                Inside Your Home
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-primary">
                Every Corner <br /><span className="italic text-gold font-light">Has A Purpose.</span>
              </h2>
            </div>
            <p className="text-charcoal/70 text-sm max-w-md mt-4 md:mt-0 font-light">
              Polished interior captures showcasing the marble flooring, false ceilings, crystal lighting, modern kitchen, and dedicated storage spaces.
            </p>
          </div>

          {/* Interactive Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Living Room */}
            <div className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-charcoal">
              <SafeImage src={ASSETS.livingRoom} alt="Spacious Living Room" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Living Room</span>
                <h4 className="font-serif text-xl">Expansive Marble Finish Hall</h4>
              </div>
            </div>

            {/* 2. Designer Corridor */}
            <div className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-charcoal">
              <SafeImage src={ASSETS.corridor} alt="Chevron Designer Lobby" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Entrance Lobby</span>
                <h4 className="font-serif text-xl">Chevron Tiled Floor Corridors</h4>
              </div>
            </div>

            {/* 3. Kitchen */}
            <div className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-charcoal">
              <SafeImage src={ASSETS.kitchen} alt="Modular Kitchen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Kitchen</span>
                <h4 className="font-serif text-xl">Granite Counter &amp; Dado Tiles</h4>
              </div>
            </div>

            {/* 4. Chandelier Detail */}
            <div className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-charcoal">
              <SafeImage src={ASSETS.chandelier} alt="Crystal Chandelier" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Craftsmanship</span>
                <h4 className="font-serif text-xl">Artisan Wood Ceiling &amp; Light</h4>
              </div>
            </div>

            {/* 5. Storage Room */}
            <div className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-charcoal">
              <SafeImage src={ASSETS.storage} alt="Dedicated Storage Room" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Utility Space</span>
                <h4 className="font-serif text-xl">Dedicated Storage Room</h4>
              </div>
            </div>

            {/* 6. Bedroom with Balcony Deck (New Image) */}
            <div className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-charcoal">
              <SafeImage src={ASSETS.bedroomBalcony} alt="Bedroom with Balcony" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Bedrooms</span>
                <h4 className="font-serif text-xl">Sunlit Suite &amp; Balcony Deck</h4>
              </div>
            </div>

            {/* 7. Hall Natural Illumination (New Image) */}
            <div className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-charcoal">
              <SafeImage src={ASSETS.hallWalkthrough} alt="Expansive Living Hall" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Living Spaces</span>
                <h4 className="font-serif text-xl">Expansive Living &amp; Dining Hall</h4>
              </div>
            </div>

            {/* 8. Living Room False Ceiling Detail */}
            <div className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-charcoal">
              <SafeImage src={ASSETS.livingRoomDetail} alt="Hall False Ceiling" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Interior Lighting</span>
                <h4 className="font-serif text-xl">Concealed LED &amp; False Ceiling</h4>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 lg:py-28 bg-[#171717] text-warmwhite">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-bold block mb-2">
                Elevated Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl mb-6 leading-tight">
                Amenities For <br />
                A Better <span className="text-gold italic font-light">Tomorrow.</span>
              </h2>
              <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed mb-8">
                Designed to grant peace of mind and utmost comfort. From 24/7 security to covered vehicle parking, every element ensures smooth everyday living for you and your family.
              </p>

              <button 
                onClick={() => openEnquiryModal('General Enquiry')}
                className="bg-gold text-primary hover:bg-white transition-colors duration-300 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-bold inline-flex items-center"
              >
                Schedule A Visit <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: "24/7 Monitored Security",
                    desc: "CCTV surveillance and professional security personnel ensuring absolute safety."
                  },
                  {
                    icon: Car,
                    title: "Dedicated Parking",
                    desc: "Spacious ground floor covered parking slots for residents and commercial visitors."
                  },
                  {
                    icon: Building2,
                    title: "High-Speed Elevators",
                    desc: "Modern, high-capacity passenger elevators with battery power backup."
                  },
                  {
                    icon: LayoutTemplate,
                    title: "Thoughtful Ventilation",
                    desc: "Smart architectural placement ensuring cross-breeze and abundant sunlight."
                  },
                  {
                    icon: TreePine,
                    title: "Peaceful Neighborhood",
                    desc: "Quiet residential setting on DPS Road, away from congestion yet well-connected."
                  },
                  {
                    icon: Sparkles,
                    title: "Commercial Retail Avenues",
                    desc: "24 on-site retail outlets catering to all your daily grocery and lifestyle needs."
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-gold/40 transition-colors duration-300 group"
                  >
                    <item.icon className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="font-serif text-xl text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-white/60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Location Connectivity Section */}
      <section id="location" className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-bronze font-bold block mb-2">
              Strategic Neighborhood
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-primary mb-4">
              A Well-Connected Lifestyle
            </h2>
            <p className="text-charcoal/70 text-sm sm:text-base font-light">
              DPS Road, Parvati Nagar, Near Avinashe Avenue, Amravati. Enjoy effortless proximity to reputed schools, hospitals, and markets.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-primary/10 rounded-lg shadow-sm">
              <MapPin className="w-8 h-8 text-gold mb-4" />
              <h4 className="font-serif text-2xl text-primary mb-2">Prime Address</h4>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
                DPS Road, Parvati Nagar, Near Avinashe Avenue, Amravati, Maharashtra.
              </p>
              <div className="text-xs font-semibold uppercase tracking-wider text-bronze">
                Rapidly Appreciating Residential Hub
              </div>
            </div>

            <div className="p-8 bg-white border border-primary/10 rounded-lg shadow-sm">
              <Compass className="w-8 h-8 text-gold mb-4" />
              <h4 className="font-serif text-2xl text-primary mb-2">Key Landmarks</h4>
              <ul className="text-xs text-charcoal/80 space-y-2.5">
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-gold mr-1" /> Delhi Public School (DPS) Road</li>
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-gold mr-1" /> Avinashe Avenue Commercials</li>
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-gold mr-1" /> Top Healthcare Centers &amp; Hospitals</li>
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-gold mr-1" /> Daily Supermarkets &amp; Banking</li>
              </ul>
            </div>

            <div className="p-8 bg-white border border-primary/10 rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <ShieldCheck className="w-8 h-8 text-gold mb-4" />
                <h4 className="font-serif text-2xl text-primary mb-2">Site Visit Assistance</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                  Our project representatives are on-site daily to provide guided tours of the 2 &amp; 3 BHK sample residences.
                </p>
              </div>
              <button 
                onClick={() => openEnquiryModal('General Enquiry')}
                className="w-full bg-primary text-white hover:bg-gold hover:text-primary transition-colors py-3 text-xs uppercase tracking-widest font-semibold"
              >
                Schedule Site Visit
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Masonry Gallery Section */}
      <section id="gallery" className="py-20 lg:py-28 bg-[#F4EFE6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] text-bronze font-bold block mb-2">
              Visual Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-primary mb-3">
              Project Gallery
            </h2>
            <p className="text-charcoal/70 text-sm font-light">
              Experience the authentic building architecture and luxurious interior finishes of Lifestyle Home Spaces.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { img: ASSETS.buildingHero, caption: "Street Perspective View" },
              { img: ASSETS.bedroomBalcony, caption: "Sunlit Bedroom with Balcony Deck" },
              { img: ASSETS.livingRoom, caption: "Living Room with Chandelier" },
              { img: ASSETS.corridor, caption: "Designer Chevron Entrance Lobby" },
              { img: ASSETS.hallWalkthrough, caption: "Spacious Living & Dining Hall" },
              { img: ASSETS.buildingElevation, caption: "Frontal Building Elevation" },
              { img: ASSETS.kitchen, caption: "Modern Fitted Kitchen Platform" },
              { img: ASSETS.chandelier, caption: "Opulent Crystal Chandelier & False Ceiling" },
              { img: ASSETS.storage, caption: "Dedicated Storage Room" },
              { img: ASSETS.livingRoomDetail, caption: "Living Hall Natural Illumination" },
            ].map((item, i) => (
              <div 
                key={i} 
                className="break-inside-avoid relative rounded-lg overflow-hidden group shadow-md bg-white border border-primary/5"
              >
                <SafeImage 
                  src={item.img} 
                  alt={item.caption} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs uppercase tracking-wider text-white font-medium">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Developer & RERA Trust Section */}
      <section className="py-16 bg-white border-t border-b border-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                Architectural Excellence
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-primary mb-2">Built With Purpose.</h3>
              <p className="text-charcoal/70 text-sm leading-relaxed mb-4">
                Lifestyle Home Spaces represents an uncompromising commitment to superior structural integrity, 
                thoughtful layout planning, and transparent execution in the prime heart of Amravati.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-6 bg-[#FAF8F5] p-6 rounded-lg border border-primary/10">
              <ShieldCheck className="w-12 h-12 text-gold flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-xs uppercase tracking-widest font-bold text-primary">RERA Registered Project</div>
                <div className="text-xs text-charcoal/60 mt-1">Certified Indian Real Estate Compliance</div>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-gold font-semibold hover:underline mt-2 inline-block"
                >
                  Request Official RERA Details →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final Grand Call To Action */}
      <section className="relative py-24 sm:py-32 bg-charcoal text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-25">
          <SafeImage src={ASSETS.buildingHero} alt="Building Final CTA" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold block mb-4">
            Your New Address Awaits
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Your Next Home <br />
            Is Closer Than You Think.
          </h2>
          <p className="text-white/80 font-light text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Experience the spacious layouts and grand lobbies in person. Contact our project team to arrange your personalized site walkthrough.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => openEnquiryModal('General Enquiry')}
              className="w-full sm:w-auto bg-gold text-primary hover:bg-white transition-colors duration-300 px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold shadow-xl"
            >
              Book a Site Visit
            </button>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors duration-300 px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center shadow-xl"
            >
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
            </a>
          </div>

          <p className="text-[11px] text-white/50 uppercase tracking-widest mt-10">
            DPS Road, Parvati Nagar, Near Avinashe Avenue, Amravati, Maharashtra
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white/60 py-12 text-xs border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <SafeImage src={ASSETS.logo} alt="Lifestyle Homes" variant="logo" className="h-10 w-auto" />
          </div>
          <div className="text-center md:text-right text-white/50">
            <p>&copy; {new Date().getFullYear()} Lifestyle Home Spaces. All rights reserved.</p>
            <p className="text-[10px] mt-1 text-white/40">DPS Road, Parvati Nagar, Amravati, Maharashtra · Lifestyle Home Spaces</p>
          </div>
        </div>
      </footer>

      {/* Book a Site Visit Enquiry Modal */}
      <AnimatePresence>
        {isSiteVisitOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/90 backdrop-blur-md p-4"
          >
            <div className="bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8 relative border border-primary/10">
              
              <button 
                onClick={() => setIsSiteVisitOpen(false)}
                className="absolute top-4 right-4 p-2 text-charcoal/50 hover:text-primary"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                  Guided Walkthrough
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-primary">
                  Book A Site Visit
                </h3>
                <p className="text-xs text-charcoal/70 mt-1">
                  Visit Lifestyle Home Spaces at DPS Road, Parvati Nagar, Amravati. Our representatives will guide you through the completed residences.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as any;
                  const name = target.name.value;
                  const phone = target.phone.value;
                  const pref = target.pref.value;
                  const msg = encodeURIComponent(
                    `Hello, my name is ${name} (${phone}). I would like to schedule a site visit for Lifestyle Homes (${pref}).`
                  );
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
                  setIsSiteVisitOpen(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal/80 mb-1">Full Name</label>
                  <input 
                    name="name" 
                    required 
                    placeholder="Enter your name" 
                    className="w-full px-4 py-3 text-sm bg-warmwhite border border-primary/15 rounded focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal/80 mb-1">Contact Number</label>
                  <input 
                    name="phone" 
                    type="tel" 
                    required 
                    placeholder="Enter your phone number" 
                    className="w-full px-4 py-3 text-sm bg-warmwhite border border-primary/15 rounded focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal/80 mb-1">Interested In</label>
                  <select 
                    name="pref" 
                    defaultValue={selectedPreference}
                    className="w-full px-4 py-3 text-sm bg-warmwhite border border-primary/15 rounded focus:outline-none focus:border-gold"
                  >
                    <option value="2 BHK Residence">2 BHK Residence</option>
                    <option value="3 BHK Luxury Residence">3 BHK Luxury Residence</option>
                    <option value="Commercial Retail Shop">Commercial Retail Shop</option>
                    <option value="General Enquiry">General Project Enquiry</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-gold hover:text-primary transition-all duration-300 text-white py-3.5 text-xs uppercase tracking-[0.2em] font-bold rounded shadow-md"
                  >
                    Confirm via WhatsApp →
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-[10px] text-charcoal/50">
                  Project Site Office: Lifestyle Home Spaces · DPS Road, Parvati Nagar, Amravati
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
