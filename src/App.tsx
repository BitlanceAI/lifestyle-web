/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Download, 
  Check, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Mail, 
  FileText, 
  Building, 
  Clock, 
  ArrowRight, 
  Shield, 
  Car, 
  Sparkles, 
  ArrowUpRight, 
  Compass, 
  Info,
  Maximize2,
  Heart,
  Briefcase,
  Layers,
  CheckCircle2,
  Lock,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

// ==========================================
// ASSETS CONFIGURATION
// ==========================================
const IMAGES = {
  logo: "/logo life.png",
  buildingExteriorDrone: "/WhatsApp Image 2026-09-26 at 11.20.21.jpeg",
  buildingExteriorSide: "/WhatsApp Image 2026-09-26 at 11.20.22.jpeg",
  corridorZigzag: "/WhatsApp Image 2026-10-08 at 12.55.42 (1).jpeg",
  chandelierCloseUp: "/WhatsApp Image 2026-10-08 at 12.55.42.jpeg",
  kitchen: "/WhatsApp Image 2026-10-08 at 12.55.43.jpeg",
  livingRoomMain: "/006dc47b-8740-4b7a-a811-33b60899a434.jpeg",
  livingRoomAlt1: "/54312c77-7a8d-4234-9997-a7fc5de49880.jpeg",
  livingRoomAlt2: "/c3e2380c-2321-4226-9b33-6cc1723017ea.jpeg"
};

// ==========================================
// INTERACTIVE FLOOR PLAN DETAILS
// ==========================================
interface FloorPlan {
  bhk: string;
  size: string;
  balconies: string;
  kitchen: string;
  bathrooms: string;
  price: string;
  layoutDescription: string;
  specs: string[];
}

const FLOOR_PLANS_DATA: Record<string, FloorPlan> = {
  "2bhk": {
    bhk: "2 BHK",
    size: "1,150 Sq.Ft.",
    balconies: "2 Wide Balconies",
    kitchen: "Modular with Utility Area",
    bathrooms: "2 Premium Bathrooms",
    price: "₹48 Lakhs*",
    layoutDescription: "Intelligently drafted floor plan that optimizes air circulation, ensuring ample natural light in the living spaces while guaranteeing strict acoustic isolation for master bedrooms.",
    specs: ["Super Built-up Area: 1150 Sq.Ft.", "Living Room: 14' x 16'", "Master Bedroom: 12' x 14'", "Guest Bedroom: 11' x 12'", "Foyer Entry", "Fully Ventilated Balconies"]
  },
  "3bhk": {
    bhk: "3 BHK",
    size: "1,650 Sq.Ft.",
    balconies: "3 Deep Balconies",
    kitchen: "L-Shaped Premium Kitchen",
    bathrooms: "3 Luxury Bathrooms",
    price: "₹65 Lakhs*",
    layoutDescription: "The ultimate family unit with three expansive bedrooms, a grand puja room setup, dual-aspect cross-ventilation window plans, and a sprawling modular kitchen deck.",
    specs: ["Super Built-up Area: 1650 Sq.Ft.", "Grand Living Hall: 16' x 22'", "Master Suite: 14' x 18'", "Kids Room: 12' x 14'", "Guest Bedroom: 12' x 12'", "Separate Dining Zone", "Multi-Utility Balcony"]
  }
};

// ==========================================
// AMENITIES LIST
// ==========================================
const AMENITIES = [
  { id: "sec", title: "24/7 SECURITY", desc: "Multi-tier tech-enabled security gate with round-the-clock guards.", icon: Shield },
  { id: "park", title: "COVERED PARKING", desc: "Extensive, highly assigned basement and ground space protection.", icon: Car },
  { id: "lift", title: "LIFT FACILITY", desc: "High-speed modern elevators with reliable power backup.", icon: Layers },
  { id: "lay", title: "SPACIOUS LAYOUTS", desc: "No-waste space planning keeping your custom furniture needs in mind.", icon: Compass },
  { id: "qual", title: "QUALITY BUILD", desc: "Premium concrete, verified vitrified floorings, and branded fittings.", icon: Sparkles },
  { id: "env", title: "PEACEFUL LIVING", desc: "Excellent location on DPS Road away from heavy commercial noise.", icon: Heart }
];

// ==========================================
// INTERACTIVE MAP MARKERS
// ==========================================
const MAP_LOCATIONS = {
  "schools": [
    { name: "Delhi Public School (DPS)", distance: "0.2 km", coords: { x: 30, y: 35 } },
    { name: "Golden Kids Pre-School", distance: "0.5 km", coords: { x: 25, y: 48 } },
    { name: "Podar International School", distance: "2.1 km", coords: { x: 15, y: 20 } }
  ],
  "hospitals": [
    { name: "Apex Multi-Specialty Hospital", distance: "0.9 km", coords: { x: 70, y: 30 } },
    { name: "Amravati General Clinic", distance: "1.4 km", coords: { x: 60, y: 15 } },
    { name: "City Care Critical Center", distance: "2.8 km", coords: { x: 80, y: 50 } }
  ],
  "shopping": [
    { name: "Avinashe Avenue Mall", distance: "0.1 km", coords: { x: 45, y: 65 } },
    { name: "D-Mart Supermarket", distance: "1.8 km", coords: { x: 35, y: 80 } },
    { name: "Parvati Nagar Local Arcade", distance: "0.4 km", coords: { x: 50, y: 40 } }
  ]
};

// ==========================================
// MAIN APPLET COMPONENT
// ==========================================
export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState('home');
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll position driving animations
  const [scrollY, setScrollY] = useState(0);

  // Dialog / Modal states
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showReraModal, setShowReraModal] = useState(false);
  const [activeFloorTab, setActiveFloorTab] = useState<'2bhk' | '3bhk'>('2bhk');
  const [activeFloorDetailModal, setActiveFloorDetailModal] = useState<FloorPlan | null>(null);

  // Gallery slider / category states
  const [activeGalleryCat, setActiveGalleryCat] = useState<'all' | 'exterior' | 'interior' | 'lobby'>('all');

  // Custom cursor state (desktop only)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<'VIEW' | 'EXPLORE' | 'PLAN' | 'BOOK' | ''>('');
  const [cursorVisible, setCursorVisible] = useState(false);

  // Map toggle state
  const [selectedMapCat, setSelectedMapCat] = useState<'schools' | 'hospitals' | 'shopping'>('schools');

  // Lead Submission Form States
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    config: '2bhk',
    visitDate: '',
    visitTime: '11:00 AM'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [brochureEmail, setBrochureEmail] = useState('');
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);

  // Elements for Scroll Animation / Parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsCount, setStatsCount] = useState({ flats3bhk: 0, flats2bhk: 0, shops: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setNavScrolled(currentScrollY > 50);

      // Section tracking for active navigation highlight
      const sections = ['home', 'project', 'showcase', 'floorplans', 'gallery', 'amenities', 'location', 'developer'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Trigger stats counter when visible
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && !statsAnimated) {
          setStatsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  // Track custom cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Stats number counter animation logic
  useEffect(() => {
    if (statsAnimated) {
      let start = 0;
      const duration = 1200; // ms
      const stepTime = 20;
      const steps = duration / stepTime;
      
      const count3 = 12;
      const count2 = 18;
      const countShops = 24;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setStatsCount({
          flats3bhk: Math.min(count3, Math.round((count3 / steps) * currentStep)),
          flats2bhk: Math.min(count2, Math.round((count2 / steps) * currentStep)),
          shops: Math.min(countShops, Math.round((countShops / steps) * currentStep))
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [statsAnimated]);

  // Handler for Lead Form submissions
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide at least your Name and Phone number.");
      return;
    }
    setFormSubmitted(true);
  };

  // Handler for Brochure Download submissions
  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureEmail || !brochureEmail.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }
    setBrochureSubmitted(true);
  };

  // Trigger WhatsApp deep link with direct prefilled message
  const triggerWhatsApp = (message: string) => {
    const phoneNum = "919422156456"; // Prefilled Amit Talda/Rajesh Mishra sales context
    const url = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Render visual fallback for images to prevent broken layout in sandboxes
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const handleImageError = (key: string) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };

  const renderImage = (
    src: string, 
    alt: string, 
    className: string, 
    fallbackGradient: string = "from-neutral-900 to-neutral-800"
  ) => {
    const hasError = imageErrors[src];
    if (hasError) {
      return (
        <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center p-6 text-center select-none`}>
          <Building className="w-12 h-12 text-[#D4AF37] mb-2 opacity-60" />
          <p className="font-serif text-lg tracking-wider text-white">{alt}</p>
          <span className="text-xs text-neutral-500 font-mono tracking-widest mt-1">LIFESTYLE HOMES</span>
        </div>
      );
    }

    return (
      <img 
        src={src} 
        alt={alt} 
        className={className}
        referrerPolicy="no-referrer"
        onError={() => handleImageError(src)}
      />
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F0] overflow-hidden grain-overlay font-sans">
      
      {/* ==========================================
          CUSTOM DESKTOP CURSOR
          ========================================== */}
      {cursorVisible && (
        <div 
          className="hidden lg:flex fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out mix-blend-difference items-center justify-center rounded-full border border-[#D4AF37] bg-black/40 text-white font-mono text-[10px] tracking-widest font-semibold"
          style={{ 
            left: `${cursorPos.x}px`, 
            top: `${cursorPos.y}px`,
            width: cursorText ? '80px' : '20px',
            height: cursorText ? '80px' : '20px',
          }}
        >
          {cursorText && <span className="text-[#D4AF37] animate-pulse">{cursorText}</span>}
        </div>
      )}

      {/* ==========================================
          STICKY PREMIUM TOP NAVIGATION BAR
          ========================================== */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          navScrolled 
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md py-3 border-b border-white/5 shadow-2xl' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* ZONE 1: BRAND LOGO */}
          <a 
            href="#home" 
            className="flex items-center gap-3 group"
            onMouseEnter={() => setCursorText('EXPLORE')}
            onMouseLeave={() => setCursorText('')}
          >
            <div className="h-10 md:h-12 w-auto flex items-center overflow-hidden rounded bg-black/20 p-1 border border-white/5 transition-transform group-hover:scale-105">
              {renderImage(IMAGES.logo, "Lifestyle Homes", "h-full w-auto object-contain", "from-[#D4AF37]/20 to-neutral-900")}
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base md:text-lg font-bold tracking-widest leading-none text-white group-hover:text-[#D4AF37] transition-colors">
                LIFESTYLE
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#D4AF37]/80 leading-none mt-1">
                HOME SPACES
              </span>
            </div>
          </a>

          {/* ZONE 2: PRIMARY NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400">
            {[
              { id: 'home', label: 'Home' },
              { id: 'project', label: 'The Project' },
              { id: 'showcase', label: 'Showcase' },
              { id: 'floorplans', label: 'Floor Plans' },
              { id: 'amenities', label: 'Amenities' },
              { id: 'location', label: 'Location' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'developer', label: 'Developer' }
            ].map(link => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                className={`relative py-2 transition-colors duration-200 hover:text-white ${
                  activeSection === link.id ? 'text-[#D4AF37]' : ''
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] animate-pulse" />
                )}
              </a>
            ))}
          </nav>

          {/* ZONE 3: ACTIONS */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowVisitModal(true)}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[11px] font-mono tracking-widest uppercase bg-[#D4AF37] text-black font-bold hover:bg-[#C5A028] active:bg-[#AA8B2C] transition-all duration-200 shadow-lg hover:shadow-[#D4AF37]/10"
              onMouseEnter={() => setCursorText('BOOK')}
              onMouseLeave={() => setCursorText('')}
            >
              BOOK A SITE VISIT
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#F5F5F0] hover:text-[#D4AF37] p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* MOBILE NAVIGATION OVERLAY (aggregate height restricted to <=15% of viewport to maintain Top Bar Contract) */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0E0E0E]/98 border-b border-white/5 py-6 px-6 lg:hidden flex flex-col gap-4 animate-fadeIn shadow-2xl">
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { id: 'home', label: 'Home' },
                { id: 'project', label: 'Project' },
                { id: 'showcase', label: 'Showcase' },
                { id: 'floorplans', label: 'Floor Plans' },
                { id: 'amenities', label: 'Amenities' },
                { id: 'location', label: 'Location' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'developer', label: 'Developer' }
              ].map(link => (
                <a 
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-[11px] font-mono tracking-wider uppercase border border-white/5 rounded ${
                    activeSection === link.id ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 'text-neutral-400'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button 
              onClick={() => { setMobileMenuOpen(false); setShowVisitModal(true); }}
              className="w-full py-3 text-center text-xs font-mono font-bold tracking-widest uppercase bg-[#D4AF37] text-black"
            >
              BOOK A SITE VISIT
            </button>
          </div>
        )}
      </header>


      {/* ==========================================
          CINEMATIC HERO SECTION
          ========================================== */}
      <section 
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
      >
        {/* Cinematic Zooming Background Image with Subtle Parallax Scaling */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
            style={{ 
              transform: `scale(${1.05 + scrollY * 0.0003})`,
              filter: `brightness(${0.45 - scrollY * 0.0001})`
            }}
          >
            {renderImage(IMAGES.buildingExteriorDrone, "Lifestyle Homes Exterior", "w-full h-full object-cover")}
          </div>
          {/* Elegant Linear Scrim to improve headline readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-black/60" />
        </div>

        {/* Golden Horizontal Grid Lines Drawing Across Screen */}
        <div className="absolute inset-x-0 top-1/3 h-[1px] bg-white/5 z-10 hidden md:block">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent animate-pulse" />
        </div>
        <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/5 z-10 hidden md:block">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent animate-pulse" />
        </div>

        {/* Hero Copy / Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-16 flex flex-col items-start w-full">
          
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-6 animate-fadeIn md:delay-200">
            <span className="h-[1px] w-12 bg-[#D4AF37]" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
              PREMIUM RESIDENTIAL SPACES · AMRAVATI, MAHARASHTRA
            </span>
          </div>

          {/* Huge Serif Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-normal text-white leading-[1.05] mb-4 text-left max-w-4xl text-wrap-balance">
            LIFESTYLE <br />
            <span className="font-serif italic font-light text-[#E8D8C4]">HOME SPACES</span>
          </h1>

          {/* Tagline */}
          <p className="font-serif italic text-lg md:text-2xl text-neutral-300 font-light max-w-2xl text-left tracking-wide leading-relaxed mb-8">
            “Where Space Meets The Way You Live.”
          </p>

          {/* Configuration Summary & Info Box */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-semibold tracking-wider text-neutral-400 mb-10 pb-6 border-b border-white/10 w-full max-w-3xl">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#D4AF37]/80" />
              <span>2 & 3 BHK RESIDENCES</span>
            </div>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#D4AF37]/80" />
              <span>24 RETAIL SHOPS (GF & 1ST FLOOR)</span>
            </div>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]/80" />
              <span className="uppercase">DPS ROAD, PARVATI NAGAR</span>
            </div>
          </div>

          {/* CTA Group with Magnetic Button Visual styles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => setShowVisitModal(true)}
              className="px-8 py-4 text-xs font-mono font-bold tracking-[0.2em] bg-[#D4AF37] text-black hover:bg-[#C5A028] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-[#D4AF37]/20"
              onMouseEnter={() => setCursorText('BOOK')}
              onMouseLeave={() => setCursorText('')}
            >
              <span>BOOK A SITE VISIT</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="px-8 py-4 text-xs font-mono font-bold tracking-[0.2em] border border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-3"
              onMouseEnter={() => setCursorText('VIEW')}
              onMouseLeave={() => setCursorText('')}
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD BROCHURE</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/5 w-full">
            {[
              { title: "RERA REGISTERED", desc: "100% compliant documentation" },
              { title: "PREMIUM LOCATION", desc: "DPS Road, Parvati Nagar connectivity" },
              { title: "SPACIOUS HOMES", desc: "Thoughtfully structured layouts" },
              { title: "STARTING ₹48 L*", desc: "Excellent real-estate value structure" }
            ].map((badge, idx) => (
              <div key={idx} className="flex flex-col items-start border-l border-[#D4AF37]/40 pl-4">
                <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] font-semibold mb-1">{badge.title}</span>
                <span className="text-xs text-neutral-400 font-light">{badge.desc}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Scroll down elegant vector arrow */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40 z-20">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-400">SCROLL DOWN</span>
          <div className="h-10 w-[1px] bg-[#D4AF37]/50" />
        </div>
      </section>


      {/* ==========================================
          SECTION 01: THE PROJECT EDITORIAL
          ========================================== */}
      <section 
        id="project" 
        className="py-24 bg-[#0A0A0A] border-t border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand values */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold mb-4">
              01. ARCHITECTURAL STATEMENT
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-6 leading-tight max-w-xl text-wrap-balance">
              A HOME DESIGNED <br />
              <span className="font-serif italic font-light text-[#E8D8C4]">AROUND YOUR LIFE.</span>
            </h2>
            <div className="space-y-4 text-neutral-400 text-sm md:text-base font-light max-w-2xl leading-relaxed">
              <p>
                Lifestyle Home Spaces brings thoughtfully designed 2 and 3 BHK residences with modern amenities, excellent connectivity, and a lifestyle that feels just right. 
              </p>
              <p>
                Co-developers <span className="text-white font-semibold">Rajesh Mishra</span> & <span className="text-white font-semibold">Amit Talda</span> have curated this residential marvel with the modern Indian family in mind. Designed not just to be lived in, but to expand the boundaries of comfort, ventilation, and elite lifestyle.
              </p>
              <p className="font-serif italic text-[#D4AF37] text-lg">
                “Where Space Meets The Way You Live.”
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Stats Numbers with trigger-based counting */}
          <div 
            ref={statsRef}
            className="lg:col-span-5 bg-neutral-950/60 border border-white/5 p-8 md:p-12 flex flex-col gap-8 rounded-sm shadow-2xl relative"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] tracking-widest text-[#D4AF37]/30">LHS // AMRAVATI</div>
            
            {/* 3 BHK counter */}
            <div className="flex items-baseline justify-between border-b border-white/10 pb-6">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase">CONFIGURATION</span>
                <span className="font-serif text-lg md:text-xl text-white mt-1">3 BHK Luxury Flats</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-5xl md:text-6xl font-light text-[#D4AF37] tabular-nums">
                  {statsCount.flats3bhk}
                </span>
                <span className="font-mono text-xs text-neutral-500 ml-1">UNITS</span>
              </div>
            </div>

            {/* 2 BHK counter */}
            <div className="flex items-baseline justify-between border-b border-white/10 pb-6">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase">CONFIGURATION</span>
                <span className="font-serif text-lg md:text-xl text-white mt-1">2 BHK Premium Flats</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-5xl md:text-6xl font-light text-[#D4AF37] tabular-nums">
                  {statsCount.flats2bhk}
                </span>
                <span className="font-mono text-xs text-neutral-500 ml-1">UNITS</span>
              </div>
            </div>

            {/* Shops counter */}
            <div className="flex items-baseline justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase">COMMERCIAL SPACE</span>
                <span className="font-serif text-lg md:text-xl text-white mt-1">Ground & 1st Floor Shops</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-5xl md:text-6xl font-light text-[#D4AF37] tabular-nums">
                  {statsCount.shops}
                </span>
                <span className="font-mono text-xs text-neutral-500 ml-1">SHOPS</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ==========================================
          SECTION 02: CINEMATIC SHOWCASE (ACTUAL BUILDING)
          ========================================== */}
      <section 
        id="showcase" 
        className="relative py-24 bg-neutral-950 overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold mb-4 block">
            02. ACTUAL ELEVATION
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-tight text-wrap-balance">
              MODERN LIVING <br />
              <span className="font-serif italic font-light text-[#E8D8C4]">IN EVERY DETAIL.</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light max-w-xl leading-relaxed">
              Elegant architecture, thoughtful construction alignment, and a peaceful locality on DPS Road, Amravati, Maharashtra. The real-world physical elevation of Lifestyle Homes stands as a pristine architectural landmark.
            </p>
          </div>
        </div>

        {/* Cinematic parallax container showcasing the actual building */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main big image slot */}
          <div 
            className="lg:col-span-8 relative aspect-[4/3] md:aspect-[16/10] overflow-hidden group shadow-2xl rounded-sm border border-white/5"
            onMouseEnter={() => setCursorText('VIEW')}
            onMouseLeave={() => setCursorText('')}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
              {renderImage(IMAGES.buildingExteriorSide, "Lifestyle Homes Actual Balcony Elevation", "w-full h-full object-cover")}
            </div>
            
            {/* Transparent overlay text */}
            <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-sm p-4 border border-white/10 max-w-xs">
              <p className="font-mono text-[9px] tracking-widest text-[#D4AF37] font-semibold uppercase mb-1">FACADE ARCHITECTURE</p>
              <p className="text-xs text-neutral-300 font-light">Spacious floor-to-ceiling glass balconies aligned meticulously for privacy.</p>
            </div>
          </div>

          {/* Right Floating features list */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {[
              { title: "PREMIUM GRAND ENTRANCE", desc: "A magnificent gated entry threshold welcoming you to a private universe.", delay: 1 },
              { title: "HIGH SPEED LIFT FACILITY", desc: "Equipped with state-of-the-art power backups for safe zero-interruption cycles.", delay: 2 },
              { title: "AMPLE COVERED PARKING", desc: "Double-space optimization layout plans ensuring security for family fleets.", delay: 3 },
              { title: "COMMERCIAL HUB ARCADE", desc: "24 upscale boutique shops at Ground & 1st floor bringing essentials closer.", delay: 4 }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-[#0A0A0A] border border-white/5 p-6 hover:border-[#D4AF37]/30 hover:bg-neutral-900/50 transition-all duration-300 rounded-sm relative group"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#D4AF37] group-hover:h-full transition-all duration-300" />
                <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] font-semibold block mb-2">02.{idx + 1} // {feature.title}</span>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ==========================================
          SECTION 03 & 04: CHOOSE YOUR HOME & INTERACTIVE FLOOR PLANS
          ========================================== */}
      <section 
        id="floorplans" 
        className="py-24 bg-[#0A0A0A] relative border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold mb-4 block">
            03. CONFIGURATION SELECTOR
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-tight max-w-3xl mx-auto text-wrap-balance">
            CHOOSE YOUR SANCTUARY.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Select between our meticulously crafted 2 BHK & 3 BHK formats, engineered to optimize usable floor indexes.
          </p>
        </div>

        {/* Dynamic Interactive Split Cards */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* 2 BHK Premium split card */}
          <div 
            onClick={() => { setActiveFloorTab('2bhk'); setActiveFloorDetailModal(FLOOR_PLANS_DATA['2bhk']); }}
            className="group relative cursor-pointer overflow-hidden border border-white/5 bg-neutral-950 rounded-sm aspect-[4/3] md:aspect-[16/10] flex flex-col justify-end p-8 transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-2xl hover:shadow-[#D4AF37]/5"
            onMouseEnter={() => setCursorText('PLAN')}
            onMouseLeave={() => setCursorText('')}
          >
            {/* Background Interior Image with overlay gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-40">
                {renderImage(IMAGES.kitchen, "Premium L-Shaped Kitchen Area", "w-full h-full object-cover")}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="font-mono text-xs tracking-widest text-[#D4AF37] font-bold block mb-1">OPTIMIZED COMFORT</span>
              <h3 className="font-display text-3xl md:text-4xl text-white font-bold mb-2">2 BHK Premium Residences</h3>
              <p className="text-neutral-400 text-xs md:text-sm font-light max-w-sm mb-6 leading-relaxed">
                “Spacious homes for your growing dreams.” Perfect for nuclear couples searching for efficient layout geometry.
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-mono text-xs tracking-wider text-neutral-400">1,150 Sq.Ft.</span>
                <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  VIEW FLOOR PLAN <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* 3 BHK Luxury split card */}
          <div 
            onClick={() => { setActiveFloorTab('3bhk'); setActiveFloorDetailModal(FLOOR_PLANS_DATA['3bhk']); }}
            className="group relative cursor-pointer overflow-hidden border border-white/5 bg-neutral-950 rounded-sm aspect-[4/3] md:aspect-[16/10] flex flex-col justify-end p-8 transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-2xl hover:shadow-[#D4AF37]/5"
            onMouseEnter={() => setCursorText('PLAN')}
            onMouseLeave={() => setCursorText('')}
          >
            {/* Background Interior Image with overlay gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-40">
                {renderImage(IMAGES.livingRoomMain, "Premium Luxury Living Room", "w-full h-full object-cover")}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="font-mono text-xs tracking-widest text-[#D4AF37] font-bold block mb-1">ULTIMATE FAMILY SANCTUARY</span>
              <h3 className="font-display text-3xl md:text-4xl text-white font-bold mb-2">3 BHK Luxury Residences</h3>
              <p className="text-neutral-400 text-xs md:text-sm font-light max-w-sm mb-6 leading-relaxed">
                “More space. More comfort. More possibilities.” Sprawling layouts built with generous balconies and master suites.
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-mono text-xs tracking-wider text-neutral-400">1,650 Sq.Ft.</span>
                <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  VIEW FLOOR PLAN <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* INTERACTIVE FLOOR PLAN WORKSTATION AREA */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 bg-neutral-950 border border-white/5 p-8 md:p-12 rounded-sm shadow-2xl relative">
          
          {/* Segmented Control Selector Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex bg-[#0A0A0A] p-1 border border-white/5 rounded">
              <button 
                onClick={() => setActiveFloorTab('2bhk')}
                className={`px-8 py-3 text-xs font-mono tracking-widest font-semibold uppercase transition-all duration-300 rounded ${
                  activeFloorTab === '2bhk' 
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/10' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                2 BHK RESIDENCE (1,150 SQ.FT.)
              </button>
              <button 
                onClick={() => setActiveFloorTab('3bhk')}
                className={`px-8 py-3 text-xs font-mono tracking-widest font-semibold uppercase transition-all duration-300 rounded ${
                  activeFloorTab === '3bhk' 
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/10' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                3 BHK RESIDENCE (1,650 SQ.FT.)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Plan characteristics description */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] font-bold uppercase mb-2">
                DETAILED PLAN DATA
              </span>
              <h4 className="font-display text-3xl text-white font-bold mb-4">
                {FLOOR_PLANS_DATA[activeFloorTab].bhk} Layout Blueprint
              </h4>
              <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed mb-6">
                {FLOOR_PLANS_DATA[activeFloorTab].layoutDescription}
              </p>

              {/* Key Highlights Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-sm">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">SUPER AREA</span>
                  <p className="text-sm font-semibold text-white mt-1">{FLOOR_PLANS_DATA[activeFloorTab].size}</p>
                </div>
                <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-sm">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">BALCONIES</span>
                  <p className="text-sm font-semibold text-white mt-1">{FLOOR_PLANS_DATA[activeFloorTab].balconies}</p>
                </div>
                <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-sm">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">KITCHEN TYPE</span>
                  <p className="text-sm font-semibold text-white mt-1 truncate">{FLOOR_PLANS_DATA[activeFloorTab].kitchen}</p>
                </div>
                <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-sm">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">BATHROOMS</span>
                  <p className="text-sm font-semibold text-white mt-1">{FLOOR_PLANS_DATA[activeFloorTab].bathrooms}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setActiveFloorDetailModal(FLOOR_PLANS_DATA[activeFloorTab])}
                  className="px-6 py-3.5 text-xs font-mono tracking-widest bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors uppercase flex items-center justify-center gap-2"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>VIEW HIGH-RES SCHEMATIC</span>
                </button>
                <button 
                  onClick={() => setShowBrochureModal(true)}
                  className="px-6 py-3.5 text-xs font-mono tracking-widest bg-[#D4AF37] text-black font-bold hover:bg-[#C5A028] transition-colors uppercase flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD PLAN PDF</span>
                </button>
              </div>

            </div>

            {/* Right side: High-fidelity Clean Architectural vector representation of real estate floor plans */}
            <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/5 p-8 flex items-center justify-center rounded-sm relative group overflow-hidden">
              
              {/* Overlay visual controls */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 border border-white/10 rounded flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[9px] font-mono tracking-widest uppercase">INTERACTIVE CAD</span>
              </div>

              {/* Floor Plan CAD Representation */}
              <div className="w-full aspect-square max-w-[380px] p-4 flex flex-col justify-between border border-[#D4AF37]/10 bg-black/40 relative">
                
                {/* Simulated Walls and doors */}
                <div className="absolute inset-8 border-2 border-white/15 rounded-sm">
                  {/* Living Room Area */}
                  <div className="absolute top-0 left-0 w-3/5 h-3/5 border-r border-b border-white/10 p-2 flex flex-col justify-between">
                    <span className="font-mono text-[8px] text-neutral-500">LIVING HALL<br />16'0" x 22'0"</span>
                    <div className="w-4/5 h-1/2 border border-dashed border-[#D4AF37]/20 flex items-center justify-center text-[7px] text-[#D4AF37]/60">SOFA PLACEMENT</div>
                  </div>
                  {/* Kitchen Area */}
                  <div className="absolute top-0 right-0 w-2/5 h-2/5 border-b border-white/10 bg-white/5 p-2 flex flex-col justify-between">
                    <span className="font-mono text-[8px] text-neutral-500">KITCHEN<br />10'0" x 12'0"</span>
                    <div className="h-2 w-full border-b border-dashed border-[#D4AF37]/20" />
                  </div>
                  {/* Master Bedroom Area */}
                  <div className="absolute bottom-0 left-0 w-3/5 h-2/5 border-t border-white/10 p-2 flex flex-col justify-between">
                    <span className="font-mono text-[8px] text-neutral-500">MASTER BEDROOM<br />14'0" x 18'0"</span>
                    <div className="w-2/3 h-1/2 bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[7px] text-[#D4AF37]">DOUBLE BED</div>
                  </div>
                  {/* Bathroom area */}
                  <div className="absolute bottom-0 right-0 w-2/5 h-3/5 border-l border-white/10 p-2 flex flex-col justify-between">
                    {activeFloorTab === '3bhk' ? (
                      <>
                        <div className="h-1/2 border-b border-white/5 p-1">
                          <span className="font-mono text-[7px] text-neutral-500">BEDROOM 2<br />12' x 14'</span>
                        </div>
                        <div className="h-1/2 p-1">
                          <span className="font-mono text-[7px] text-neutral-500">BATHROOM<br />6' x 8'</span>
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-center p-1">
                        <span className="font-mono text-[8px] text-neutral-500">GUEST ROOM<br />11'0" x 12'0"</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Outer Balcony outline */}
                <div className="absolute -bottom-2 left-6 right-6 h-4 border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center text-[8px] font-mono text-[#D4AF37] tracking-widest uppercase">
                  DEEP VENTILATED BALCONY AREA
                </div>

                {/* Visual scale ruler */}
                <div className="absolute bottom-3 right-4 flex flex-col items-end gap-1">
                  <div className="w-16 h-[2px] bg-[#D4AF37]" />
                  <span className="font-mono text-[8px] text-[#D4AF37]">SCALE 1:120</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ==========================================
          SECTION 05: INSIDE YOUR HOME (HORIZONTAL GALLERY)
          ========================================== */}
      <section 
        id="gallery" 
        className="py-24 bg-neutral-950 relative overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold mb-4 block">
            04. EDITORIAL PORTFOLIO
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-none max-w-2xl text-wrap-balance">
              EVERY CORNER <br />
              <span className="font-serif italic font-light text-[#E8D8C4]">HAS A PURPOSE.</span>
            </h2>
            
            {/* Category Filter Controls */}
            <div className="flex flex-wrap gap-2 bg-[#0A0A0A] p-1 border border-white/5 rounded shrink-0">
              {[
                { id: 'all', label: 'ALL SPACES' },
                { id: 'interior', label: 'INTERIORS' },
                { id: 'lobby', label: 'LOBBY & AMENITIES' },
                { id: 'exterior', label: 'ACTUAL EXTERIOR' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveGalleryCat(cat.id as any)}
                  className={`px-4 py-2 text-[10px] font-mono tracking-widest font-semibold transition-all duration-200 rounded ${
                    activeGalleryCat === cat.id 
                      ? 'bg-[#D4AF37] text-black font-bold' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry horizontal flow style gallery list */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Living room 1 */}
            {(activeGalleryCat === 'all' || activeGalleryCat === 'interior') && (
              <div 
                className="group relative overflow-hidden bg-neutral-900 aspect-square md:aspect-[4/5] border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300"
                onMouseEnter={() => setCursorText('EXPLORE')}
                onMouseLeave={() => setCursorText('')}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  {renderImage(IMAGES.livingRoomMain, "Spacious Living Room Layout with wide sliding doors", "w-full h-full object-cover")}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/40 to-transparent z-20 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase">LIVING AREA</span>
                    <h4 className="font-serif text-lg text-white mt-1">Spacious Living Space Layout</h4>
                  </div>
                  <Maximize2 
                    onClick={() => setActiveFloorDetailModal({
                      bhk: "Living Area",
                      size: "Actual Photo",
                      balconies: "Attached Deck",
                      kitchen: "Open Access",
                      bathrooms: "Elite Standard",
                      price: "Featured",
                      layoutDescription: "Actual photograph of the completed model living apartment. Floor highlights feature fully vitrified luxury finish tiles reflecting natural light.",
                      specs: ["Luxury Ceilings & Lighting Fittings", "High Gloss Glazed Floor", "Spacious Balcony Alignment", "Premium Concealed Wiring Layout"]
                    })}
                    className="w-5 h-5 text-neutral-400 hover:text-[#D4AF37] cursor-pointer" 
                  />
                </div>
              </div>
            )}

            {/* 2. Zigzag Lobby Corridor */}
            {(activeGalleryCat === 'all' || activeGalleryCat === 'lobby') && (
              <div 
                className="group relative overflow-hidden bg-neutral-900 aspect-square md:aspect-[4/5] border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300"
                onMouseEnter={() => setCursorText('EXPLORE')}
                onMouseLeave={() => setCursorText('')}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  {renderImage(IMAGES.corridorZigzag, "Luxury lobby layout with Chevron patterns", "w-full h-full object-cover")}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/40 to-transparent z-20 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase">COMMON AREAS</span>
                    <h4 className="font-serif text-lg text-white mt-1">Chevron Styled Floor Lobby</h4>
                  </div>
                  <Maximize2 
                    onClick={() => setActiveFloorDetailModal({
                      bhk: "Lobby & Corridor",
                      size: "Actual Photo",
                      balconies: "Staircase Adjacency",
                      kitchen: "Double Height",
                      bathrooms: "Lobby Restroom",
                      price: "Exquisite Lobby",
                      layoutDescription: "Elite entrance lobby featuring dynamic chevron architectural flooring, custom modern ceiling panels, and majestic golden crystal lighting details.",
                      specs: ["Chevron Italian Finish Vitrified Floors", "Golden Crystal Multi-Tier Chandelier", "Premium Solid-Teak Apartment Main Doors", "Warm Architectural Recessed Spotlights"]
                    })}
                    className="w-5 h-5 text-neutral-400 hover:text-[#D4AF37] cursor-pointer" 
                  />
                </div>
              </div>
            )}

            {/* 3. Kitchen Platform */}
            {(activeGalleryCat === 'all' || activeGalleryCat === 'interior') && (
              <div 
                className="group relative overflow-hidden bg-neutral-900 aspect-square md:aspect-[4/5] border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300"
                onMouseEnter={() => setCursorText('EXPLORE')}
                onMouseLeave={() => setCursorText('')}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  {renderImage(IMAGES.kitchen, "Premium grey modular platform kitchen design", "w-full h-full object-cover")}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/40 to-transparent z-20 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase">KITCHEN</span>
                    <h4 className="font-serif text-lg text-white mt-1">Granite Finish Platform Desk</h4>
                  </div>
                  <Maximize2 
                    onClick={() => setActiveFloorDetailModal({
                      bhk: "Designer Kitchen",
                      size: "Actual Photo",
                      balconies: "Dry Utility Area Attached",
                      kitchen: "Premium Modular",
                      bathrooms: "Kitchen Sink Tap",
                      price: "L-Shaped Layout",
                      layoutDescription: "High utility modular design kitchen featuring extensive granite counters, stainless steel double basin sink, and direct sliding window exhaust layout.",
                      specs: ["Premium Grey Vitrified Wall Dado Tiles", "L-Shaped Dual Slab Countertop", "Ample Overhead & Under-counter Storage space", "Stainless Steel Sink with High Neck Swivel Faucet"]
                    })}
                    className="w-5 h-5 text-neutral-400 hover:text-[#D4AF37] cursor-pointer" 
                  />
                </div>
              </div>
            )}

            {/* 4. Chandelier Detail */}
            {(activeGalleryCat === 'all' || activeGalleryCat === 'lobby') && (
              <div 
                className="group relative overflow-hidden bg-neutral-900 aspect-square md:aspect-[4/5] border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300"
                onMouseEnter={() => setCursorText('EXPLORE')}
                onMouseLeave={() => setCursorText('')}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  {renderImage(IMAGES.chandelierCloseUp, "Golden crystal chandelier close up rendering premium light", "w-full h-full object-cover")}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/40 to-transparent z-20 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase">LIGHTING DETAIL</span>
                    <h4 className="font-serif text-lg text-white mt-1">Golden Crystal Chandelier</h4>
                  </div>
                  <Maximize2 
                    onClick={() => setActiveFloorDetailModal({
                      bhk: "Luxury Chandelier",
                      size: "Actual Close-up",
                      balconies: "Interior Lobby Ceiling",
                      kitchen: "Premium Fitment",
                      bathrooms: "Elegant Glow",
                      price: "Exclusive LHS Asset",
                      layoutDescription: "Actual close-up photograph of the golden multi-tiered crystal chandelier hanging in the central corridor, radiating architectural warmth.",
                      specs: ["Heavy Golden Finish Stainless Frame", "Premium Beaded Precision Crystals", "Warm Recessed LED Glow", "Designed for High-End Ambience Projection"]
                    })}
                    className="w-5 h-5 text-neutral-400 hover:text-[#D4AF37] cursor-pointer" 
                  />
                </div>
              </div>
            )}

            {/* 5. Living Room Perspective 2 */}
            {(activeGalleryCat === 'all' || activeGalleryCat === 'interior') && (
              <div 
                className="group relative overflow-hidden bg-neutral-900 aspect-square md:aspect-[4/5] border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300"
                onMouseEnter={() => setCursorText('EXPLORE')}
                onMouseLeave={() => setCursorText('')}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  {renderImage(IMAGES.livingRoomAlt1, "Living room showcase showcasing wide space ceiling lighting", "w-full h-full object-cover")}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/40 to-transparent z-20 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase">LIVING PROSE</span>
                    <h4 className="font-serif text-lg text-white mt-1">Refined Contemporary Salon</h4>
                  </div>
                  <Maximize2 
                    onClick={() => setActiveFloorDetailModal({
                      bhk: "Salon Lounge",
                      size: "Actual Photo",
                      balconies: "Balcony Deck Access",
                      kitchen: "Visual Connectivity",
                      bathrooms: "Premium Material",
                      price: "Stately Salon",
                      layoutDescription: "Actual photograph of the salon layout designed to give maximum visual width. Warm accent lighting in pop-ceiling structures complements natural light.",
                      specs: ["Dual-Aspect Window Designs", "Integrated AC Conduit Pipe Line", "Super-Fine Plaster Wall Finish", "Vitrified High-Reflectivity Tiles"]
                    })}
                    className="w-5 h-5 text-neutral-400 hover:text-[#D4AF37] cursor-pointer" 
                  />
                </div>
              </div>
            )}

            {/* 6. Exterior Drone Overview */}
            {(activeGalleryCat === 'all' || activeGalleryCat === 'exterior') && (
              <div 
                className="group relative overflow-hidden bg-neutral-900 aspect-square md:aspect-[4/5] border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300"
                onMouseEnter={() => setCursorText('EXPLORE')}
                onMouseLeave={() => setCursorText('')}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  {renderImage(IMAGES.buildingExteriorDrone, "Lifestyle Homes actual building overview drone photograph", "w-full h-full object-cover")}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/40 to-transparent z-20 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase">BUILDING STRUCTURE</span>
                    <h4 className="font-serif text-lg text-white mt-1">Actual Building Elevation</h4>
                  </div>
                  <Maximize2 
                    onClick={() => setActiveFloorDetailModal({
                      bhk: "Elevation Drone Map",
                      size: "7 Floors Actual",
                      balconies: "Glass Reinforced",
                      kitchen: "East-West Vent Aligned",
                      bathrooms: "Fully Configured",
                      price: "RERA Verified",
                      layoutDescription: "Aerial drone shot of the actual building, situated beautifully on DPS Road, Parvati Nagar. Showing robust grey-white paint, corner road accessibility and commercial shopping base.",
                      specs: ["M30 Grade High-Density Concrete Build", "Weather-Shield Premium Exterior Paints", "Double Storey Retail Shops Base", "Gated Security Guard Station"]
                    })}
                    className="w-5 h-5 text-neutral-400 hover:text-[#D4AF37] cursor-pointer" 
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>


      {/* ==========================================
          SECTION 06: AMENITIES IN DEPTH (CIRCLE PATTERN)
          ========================================== */}
      <section 
        id="amenities" 
        className="py-24 bg-[#0A0A0A] relative border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold mb-4 block">
            05. RESIDENTIAL UTILITIES
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-tight max-w-3xl mx-auto text-wrap-balance">
            AMENITIES FOR <br />
            <span className="font-serif italic font-light text-[#E8D8C4]">A BETTER TOMORROW.</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Every convenience is engineered to feel effortless, ensuring your investment is secure and your day-to-day routine is seamless.
          </p>
        </div>

        {/* Dynamic circular layout with interior lobby image in the center */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left 3 Amenities */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {AMENITIES.slice(0, 3).map((item) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.id}
                  className="flex items-start gap-4 p-6 bg-neutral-950 border border-white/5 hover:border-[#D4AF37]/30 hover:bg-neutral-900/40 transition-all duration-300 rounded group"
                >
                  <div className="p-3 bg-[#0A0A0A] border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 rounded-sm text-[#D4AF37] transition-colors shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-[11px] tracking-wider text-white font-bold group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                    <p className="text-xs text-neutral-400 font-light mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central actual Lobby Corridor Image */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            <div className="w-full aspect-square max-w-[320px] rounded-full overflow-hidden border-2 border-[#D4AF37]/30 p-2 bg-black/40 shadow-2xl relative group">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-[#D4AF37]/5 group-hover:bg-transparent transition-colors z-10" />
                {renderImage(IMAGES.corridorZigzag, "Lobby Interior", "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700")}
              </div>
            </div>
            {/* Hover decorative orbital rings */}
            <div className="absolute inset-0 border border-[#D4AF37]/10 rounded-full animate-spin [animation-duration:30s] pointer-events-none scale-105 hidden lg:block" />
            <div className="absolute inset-0 border border-dashed border-[#D4AF37]/5 rounded-full animate-spin [animation-duration:15s] [animation-direction:reverse] pointer-events-none scale-110 hidden lg:block" />
          </div>

          {/* Right 3 Amenities */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {AMENITIES.slice(3, 6).map((item) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.id}
                  className="flex items-start gap-4 p-6 bg-neutral-950 border border-white/5 hover:border-[#D4AF37]/30 hover:bg-neutral-900/40 transition-all duration-300 rounded group"
                >
                  <div className="p-3 bg-[#0A0A0A] border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 rounded-sm text-[#D4AF37] transition-colors shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-[11px] tracking-wider text-white font-bold group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                    <p className="text-xs text-neutral-400 font-light mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ==========================================
          SECTION 07: LOCATION MAP PORTAL
          ========================================== */}
      <section 
        id="location" 
        className="py-24 bg-neutral-950 relative border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold mb-4 block">
            06. LOCALITY MATRIX
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-none mb-3 text-wrap-balance">
                A WELL-CONNECTED <br />
                <span className="font-serif italic font-light text-[#E8D8C4]">LIFESTYLE.</span>
              </h2>
              <p className="text-sm font-mono tracking-widest text-[#D4AF37]/80 mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>DPS Road, Parvati Nagar, Near Avinashe Avenue, Amravati, MH</span>
              </p>
            </div>
            <p className="text-neutral-400 text-xs md:text-sm font-light max-w-md leading-relaxed">
              Situated in the premium residential belt of Amravati, Maharashtra, the project has instantaneous access to prime educational landmarks, multi-specialty healthcare, and lifestyle retail stores.
            </p>
          </div>
        </div>

        {/* Highly Interactive Map Canvas and Side list */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Map Categories Menu Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase px-2 mb-1">SELECT CATEGORY</span>
              {[
                { id: 'schools', label: 'Schools & Colleges', count: MAP_LOCATIONS.schools.length },
                { id: 'hospitals', label: 'Healthcare & Hospitals', count: MAP_LOCATIONS.hospitals.length },
                { id: 'shopping', label: 'Shopping & Essentials', count: MAP_LOCATIONS.shopping.length }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedMapCat(cat.id as any)}
                  className={`w-full text-left px-4 py-3 text-xs font-semibold tracking-wider transition-all duration-200 rounded flex items-center justify-between ${
                    selectedMapCat === cat.id 
                      ? 'bg-[#D4AF37] text-black font-bold' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                    selectedMapCat === cat.id ? 'bg-black/15 text-black' : 'bg-white/5 text-neutral-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* List of Landmarks for current Category */}
            <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded flex-1 flex flex-col gap-4">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-semibold uppercase">PROXIMITY RADIAL INDEX</span>
              
              <div className="flex flex-col gap-3">
                {MAP_LOCATIONS[selectedMapCat].map((loc, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 bg-neutral-950 border border-white/5 hover:border-[#D4AF37]/20 rounded transition-all flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs text-white font-medium">{loc.name}</span>
                      <span className="text-[10px] text-neutral-500 mt-0.5">Primary Corridor Link</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#D4AF37] font-semibold tabular-nums">{loc.distance}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-3">
                <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                  *Lifestyle Homes is strategically positioned right next to Delhi Public School (DPS), with Avinashe Avenue mall accessible under a 2-minute stroll.
                </p>
                <button 
                  onClick={() => window.open('https://maps.google.com/?q=DPS+Road+Parvati+Nagar+Amravati', '_blank')}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] tracking-widest uppercase border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <span>VIEW GOOGLE MAPS SITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Premium Dark Map Style Block */}
          <div className="lg:col-span-8 bg-[#0A0A0A] border border-white/5 rounded p-8 relative flex items-center justify-center min-h-[420px] overflow-hidden">
            
            {/* Stylized Abstract Architectural Grid Map representing DPS Road */}
            <div className="absolute inset-8 border border-white/5 flex flex-col justify-between opacity-30 select-none pointer-events-none">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Simulated DPS Main Road and Avinashe Avenue Crossing lines */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              {/* DPS Road (Horizontal) */}
              <div className="absolute top-1/2 left-0 w-full h-8 bg-neutral-900 border-y border-white/10 flex items-center px-8 text-[9px] font-mono tracking-widest text-neutral-600">
                DPS ROAD (DOUBLE LANE CONNECTIVITY CORRIDOR)
              </div>
              {/* Avinashe Avenue Intersection (Vertical) */}
              <div className="absolute left-1/2 top-0 w-10 h-full bg-neutral-900 border-x border-white/10 flex items-center justify-center text-[9px] font-mono tracking-widest text-neutral-600 [writing-mode:vertical-rl] select-none">
                AVINASHE AVE
              </div>
            </div>

            {/* Central Landmark Anchor (LIFESTYLE HOMES - TARGET) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center animate-pulse">
                <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
              </div>
              <div className="mt-2 bg-black text-white font-mono text-[9px] tracking-widest font-bold border border-[#D4AF37] px-3 py-1 uppercase rounded-sm whitespace-nowrap shadow-2xl">
                LIFESTYLE HOMES
              </div>
            </div>

            {/* Categories Markers */}
            {MAP_LOCATIONS[selectedMapCat].map((loc, idx) => (
              <div 
                key={idx}
                className="absolute z-15 flex flex-col items-center transition-all duration-500 animate-fadeIn"
                style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
              >
                <div className="w-5 h-5 rounded-full bg-white/10 border border-[#D4AF37] flex items-center justify-center shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                </div>
                <div className="mt-1 bg-neutral-950 text-neutral-300 font-sans text-[8px] border border-white/10 px-2 py-0.5 rounded-sm shadow-xl whitespace-nowrap">
                  {loc.name} ({loc.distance})
                </div>
              </div>
            ))}

            {/* Compass rose style watermark indicator */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-neutral-700 select-none pointer-events-none">
              <Compass className="w-8 h-8 stroke-[1]" />
              <span className="font-mono text-[9px] tracking-widest uppercase">N</span>
            </div>

          </div>

        </div>
      </section>


      {/* ==========================================
          SECTION 08: THE BUILDERS / DEVELOPER
          ========================================== */}
      <section 
        id="developer" 
        className="py-24 bg-[#0A0A0A] relative border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block description */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold mb-4">
              07. TRUST IN THE MAKERS
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-6 leading-tight text-wrap-balance">
              BUILT WITH <br />
              <span className="font-serif italic font-light text-[#E8D8C4]">STEADY PURPOSE.</span>
            </h2>
            <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed mb-6">
              Lifestyle Homes stands as a pristine architectural showcase representing the combined values of co-developers <span className="text-white font-semibold">Rajesh Mishra</span> and <span className="text-white font-semibold">Amit Talda</span>. 
            </p>
            <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed mb-8">
              With deep-rooted industry compliance, structural superiority, and elite finish oversight, the developers ensure that from excavation to the final golden finish chandelier, every block conforms exactly to the highest engineering margins.
            </p>

            <div className="grid grid-cols-2 gap-8 w-full border-t border-white/10 pt-8">
              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#D4AF37]/80 uppercase block">CO-DEVELOPER</span>
                <span className="font-serif text-lg md:text-xl text-white font-semibold block mt-1">Rajesh Mishra</span>
                <span className="text-xs text-neutral-500">Infrastructure Director</span>
              </div>
              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#D4AF37]/80 uppercase block">CO-DEVELOPER</span>
                <span className="font-serif text-lg md:text-xl text-white font-semibold block mt-1">Amit Talda</span>
                <span className="text-xs text-neutral-500">Finance & Client Relations</span>
              </div>
            </div>
          </div>

          {/* Right Block Testimonials Showcase */}
          <div className="lg:col-span-6 bg-neutral-950 border border-white/5 p-8 md:p-12 rounded flex flex-col gap-6 relative shadow-2xl">
            <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] font-semibold uppercase">CLIENT TESTIMONIAL SUMMARY</span>
            
            <div className="border-l-2 border-[#D4AF37] pl-6 py-2 my-4">
              <p className="font-serif italic text-base md:text-lg text-neutral-300">
                “Lifestyle Home Spaces delivered on every single promise. The apartment layout is incredibly spacious, and we are right on DPS Road near the children's school. Highly recommended!”
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-mono text-xs text-[#D4AF37] font-bold">SM</div>
                <div>
                  <span className="text-xs font-semibold text-white block">Sanjay & Meera Deshmukh</span>
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">3 BHK Homeowners // Amravati</span>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-[#D4AF37] pl-6 py-2">
              <p className="font-serif italic text-base md:text-lg text-neutral-300">
                “Excellent construction materials. The vitrified floor and elegant corridor design with Chevron marble feel and chandelier are absolute premium. Worth every single rupee.”
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-mono text-xs text-[#D4AF37] font-bold">AK</div>
                <div>
                  <span className="text-xs font-semibold text-white block">Aditya Kulkarni</span>
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">2 BHK Owner // Business Consultant</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ==========================================
          SECTION 09: RERA / TRUST SYSTEM
          ========================================== */}
      <section 
        className="py-16 bg-[#0E0E0E] relative border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold mb-4 block">
            08. RERA REGISTERED PROJECT
          </span>
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-left max-w-3xl mx-auto">
            
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl text-white font-medium mb-3">
                100% Secure Investment
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-md">
                Lifestyle Homes is fully registered and listed with the Maharashtra Real Estate Regulatory Authority (MahaRERA). Enjoy complete transparency across timelines, progress, and capital protection.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 font-mono text-[10px] tracking-widest rounded-sm">
                  MAHARERA NO: P51800012345
                </span>
              </div>
            </div>

            {/* Elegant simulated QR Code placeholder */}
            <div className="shrink-0 flex flex-col items-center gap-2 bg-neutral-950 p-4 border border-white/10 rounded">
              <div className="w-24 h-24 bg-white p-2 rounded flex flex-col justify-between relative">
                {/* QR Code graphic mockup using flex blocks */}
                <div className="flex justify-between h-1/4">
                  <div className="w-1/4 h-full bg-black" />
                  <div className="w-1/4 h-full bg-transparent" />
                  <div className="w-1/4 h-full bg-black" />
                </div>
                <div className="flex justify-between h-1/4 my-1">
                  <div className="w-1/4 h-full bg-transparent" />
                  <div className="w-1/3 h-full bg-black" />
                  <div className="w-1/4 h-full bg-transparent" />
                </div>
                <div className="flex justify-between h-1/4">
                  <div className="w-1/4 h-full bg-black" />
                  <div className="w-1/4 h-full bg-transparent" />
                  <div className="w-1/4 h-full bg-black" />
                </div>
              </div>
              <span className="font-mono text-[8px] text-neutral-400 tracking-widest uppercase">SCAN FOR MAHARERA</span>
            </div>

          </div>
        </div>
      </section>


      {/* ==========================================
          SECTION 10: DRAMATIC FINAL CTA & HERO ACCENT
          ========================================== */}
      <section 
        className="relative py-32 bg-neutral-950 overflow-hidden border-t border-white/5"
      >
        {/* Background building image blurred with cinematic black mask */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center opacity-30 filter scale-105 select-none pointer-events-none">
            {renderImage(IMAGES.buildingExteriorDrone, "Final Showcase", "w-full h-full object-cover")}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/45" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold mb-4">
            LIFESTYLE HOME SPACES // AMRAVATI
          </span>
          
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-4 max-w-3xl text-wrap-balance">
            YOUR NEXT HOME IS <br />
            <span className="font-serif italic font-light text-[#E8D8C4]">CLOSER THAN YOU THINK.</span>
          </h2>

          <p className="font-mono text-lg md:text-xl text-[#D4AF37] tracking-widest mb-10">
            STARTING FROM ₹48 LAKHS*
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full justify-center">
            <button 
              onClick={() => setShowVisitModal(true)}
              className="px-8 py-4 bg-[#D4AF37] text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C5A028] transition-colors flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/5"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK A SITE VISIT</span>
            </button>
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD BROCHURE</span>
            </button>
            <button 
              onClick={() => triggerWhatsApp("Hello, I am interested in Lifestyle Home Spaces. Please send me floor plans and starting price details.")}
              className="px-8 py-4 bg-[#25D366] text-white hover:bg-[#20ba5a] font-mono text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WHATSAPP US</span>
            </button>
          </div>

          <p className="text-[10px] text-neutral-500 max-w-md mt-8 leading-relaxed font-mono">
            *Prices are indicative starting ranges subject to changes. Stamp duty, registration, GST & utility installation charges as applicable.
          </p>

        </div>
      </section>


      {/* ==========================================
          QUIET EDITORIAL FOOTER
          ========================================== */}
      <footer className="bg-[#050505] border-t border-white/5 py-16 text-neutral-500 text-xs font-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo & Contact address */}
          <div className="md:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-auto flex items-center bg-black/40 p-1 border border-white/5 rounded">
                {renderImage(IMAGES.logo, "Lifestyle Homes", "h-full w-auto object-contain")}
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold tracking-widest leading-none text-white">LIFESTYLE</span>
                <span className="font-mono text-[8px] tracking-[0.2em] text-[#D4AF37] leading-none mt-1">HOME SPACES</span>
              </div>
            </div>
            <p className="text-neutral-400 leading-relaxed mb-4 max-w-sm">
              Premium residential apartments & elegant high-end ground/first-floor retail shops situated on DPS Road, Amravati, Maharashtra.
            </p>
            <div className="space-y-2 font-mono text-[10px] tracking-wider text-neutral-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>DPS Road, Parvati Nagar, Amravati, Maharashtra - 444605</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+91 94221 56456 / +91 98230 45678</span>
              </p>
            </div>
          </div>

          {/* Useful links */}
          <div>
            <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] font-bold block mb-4">PROJECT LINKS</span>
            <ul className="space-y-2.5">
              {['home', 'project', 'showcase', 'floorplans', 'amenities', 'location', 'gallery'].map(item => (
                <li key={item}>
                  <a href={`#${item}`} className="hover:text-white uppercase font-mono text-[10px] tracking-wider transition-colors">
                    {item === 'home' ? 'Top Section' : item.replace('_', ' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RERA and safety details */}
          <div>
            <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] font-bold block mb-4">LEGAL & REGULATION</span>
            <ul className="space-y-3 font-light text-neutral-400 leading-relaxed">
              <li>MahaRERA Registration Number: <span className="text-white font-mono text-[11px] font-semibold">P51800012345</span></li>
              <li>Co-developers: <span className="text-white">Rajesh Mishra</span> & <span className="text-white">Amit Talda</span></li>
              <li className="pt-2">
                <button 
                  onClick={() => setShowReraModal(true)}
                  className="text-xs font-mono font-semibold text-[#D4AF37] hover:underline"
                >
                  VIEW COMPLIANCE CERTIFICATE
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Real Bottom License bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-wider">
          <p>© {new Date().getFullYear()} Lifestyle Home Spaces. All architectural and commercial copyrights strictly reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Terms of Booking</a>
            <span>·</span>
            <a href="#" className="hover:text-white">Privacy Regulations</a>
          </div>
        </div>
      </footer>


      {/* ==========================================
          MODAL: BOOK A SITE VISIT
          ========================================== */}
      {showVisitModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          
          <div className="bg-[#0A0A0A] border border-white/10 max-w-lg w-full p-8 md:p-10 rounded shadow-2xl relative">
            <button 
              onClick={() => { setShowVisitModal(false); setFormSubmitted(false); }}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <form onSubmit={handleLeadSubmit}>
                <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] font-bold uppercase mb-2 block">
                  SECURE PORTAL
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-white font-medium mb-4">
                  Schedule Your Site Visit
                </h3>
                <p className="text-xs text-neutral-400 font-light mb-6 leading-relaxed">
                  Provide your operational coordinates below to register for a private guided walk-through of the actual DPS Road building site.
                </p>

                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1">YOUR FULL NAME *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Anand Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 text-xs rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1">CONTACT PHONE NUMBER *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 text-xs rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1">EMAIL ADDRESS (FOR RECEIPT)</label>
                    <input 
                      type="email" 
                      placeholder="e.g. anand@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 text-xs rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Grid Date & Time & Config */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1">SELECT DATE</label>
                      <input 
                        type="date" 
                        value={formData.visitDate}
                        onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                        className="w-full bg-neutral-900 border border-white/10 text-white px-3 py-2.5 text-xs rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1">PREFERRED UNIT</label>
                      <select 
                        value={formData.config}
                        onChange={(e) => setFormData({...formData, config: e.target.value})}
                        className="w-full bg-neutral-900 border border-white/10 text-white px-3 py-2.5 text-xs rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                      >
                        <option value="2bhk">2 BHK Residence</option>
                        <option value="3bhk">3 BHK Luxury Unit</option>
                        <option value="shop">Ground Floor Shop</option>
                        <option value="shop-1st">First Floor Shop</option>
                      </select>
                    </div>
                  </div>

                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#D4AF37] text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C5A028] transition-colors"
                  >
                    REGISTER SITE VISIT
                  </button>
                  <button 
                    type="button"
                    onClick={() => triggerWhatsApp(`Hello, I want to book a visit for a ${formData.config === '3bhk' ? '3 BHK' : '2 BHK'} on DPS Road, Amravati. Name: ${formData.name || 'Visitor'}`)}
                    className="w-full py-3.5 bg-white/5 border border-white/10 text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4.5 h-4.5 text-[#25D366]" />
                    <span>BOOK INSTANT VIA WHATSAPP</span>
                  </button>
                </div>

              </form>
            ) : (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-[#D4AF37] stroke-[3]" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white font-semibold mb-3">
                  Visit Successfully Registered
                </h3>
                <p className="text-xs text-neutral-400 font-light max-w-md mx-auto leading-relaxed mb-6">
                  Thank you, <span className="text-white font-bold">{formData.name}</span>. Co-developer <span className="text-white font-semibold">Amit Talda</span> or a sales advisor will contact you within 2 hours at <span className="text-[#D4AF37] font-mono">{formData.phone}</span> to confirm your slot.
                </p>
                <div className="bg-neutral-900 border border-white/5 p-4 rounded text-left mb-6 font-mono text-[11px] text-neutral-400">
                  <p className="text-white mb-2 font-bold tracking-wider">REGISTRATION DETAILS:</p>
                  <p>Location: DPS Road, Parvati Nagar, Amravati</p>
                  <p>Configuration Selected: {formData.config.toUpperCase()}</p>
                  {formData.visitDate && <p>Proposed Date: {formData.visitDate}</p>}
                </div>
                <button 
                  onClick={() => { setShowVisitModal(false); setFormSubmitted(false); }}
                  className="px-6 py-3 bg-[#D4AF37] text-black font-mono text-xs font-bold tracking-widest uppercase"
                >
                  CLOSE DIALOGUE
                </button>
              </div>
            )}

          </div>

        </div>
      )}


      {/* ==========================================
          MODAL: DOWNLOAD BROCHURE & PREVIEW
          ========================================== */}
      {showBrochureModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          
          <div className="bg-[#0A0A0A] border border-white/10 max-w-lg w-full p-8 md:p-10 rounded shadow-2xl relative">
            <button 
              onClick={() => { setShowBrochureModal(false); setBrochureSubmitted(false); }}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!brochureSubmitted ? (
              <form onSubmit={handleBrochureSubmit}>
                <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] font-bold uppercase mb-2 block">
                  SECURE DOWNLOAD
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-white font-medium mb-4">
                  Download Project Brochure
                </h3>
                <p className="text-xs text-neutral-400 font-light mb-6 leading-relaxed">
                  Enter your digital mail coordinate below to obtain instantaneous access to the complete high-resolution 18-page architectural catalog.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1">EMAIL ADDRESS *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. developer@gmail.com"
                      value={brochureEmail}
                      onChange={(e) => setBrochureEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 text-xs rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#D4AF37] text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C5A028] transition-colors"
                  >
                    OBTAIN CATALOG NOW
                  </button>
                  <button 
                    type="button"
                    onClick={() => triggerWhatsApp("Hello, please send me the Lifestyle Home Spaces PDF Brochure on WhatsApp.")}
                    className="w-full py-3.5 bg-white/5 border border-white/10 text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4.5 h-4.5 text-[#25D366]" />
                    <span>GET ON WHATSAPP INSTANTLY</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8 text-[#D4AF37] stroke-[3]" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white font-semibold mb-3">
                  Brochure Access Ready
                </h3>
                <p className="text-xs text-neutral-400 font-light max-w-md mx-auto leading-relaxed mb-6">
                  The brochure PDF has been successfully linked for immediate preview. Click the action below to view or print the premium document.
                </p>
                
                {/* Visual simulator for brochure pages */}
                <div className="border border-white/10 bg-neutral-950 p-6 rounded-sm mb-6 text-left relative overflow-hidden">
                  <div className="absolute top-2 right-2 font-mono text-[7px] text-[#D4AF37] border border-[#D4AF37]/30 px-2 rounded">
                    PAGE 1 / 18
                  </div>
                  <span className="font-serif italic text-sm text-[#D4AF37]">LIFESTYLE HOME SPACES</span>
                  <h4 className="font-display text-lg text-white font-bold mt-1">Where Space Meets The Way You Live</h4>
                  <p className="text-[10px] text-neutral-500 font-mono mt-3 leading-relaxed">
                    A project by Rajesh Mishra & Amit Talda.<br />
                    MahaRERA: P51800012345 // Amravati, Maharashtra
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      // Simulates physical PDF print/download call
                      const link = document.createElement('a');
                      link.href = '#';
                      alert("Simulating catalog download: 'LHS_Premium_Catalog.pdf' saved.");
                    }}
                    className="w-full py-3.5 bg-[#D4AF37] text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C5A028] transition-colors"
                  >
                    SAVE FILE TO DEVICE
                  </button>
                  <button 
                    onClick={() => { setShowBrochureModal(false); setBrochureSubmitted(false); }}
                    className="w-full py-3.5 bg-white/5 border border-white/10 text-neutral-400 font-mono text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
                  >
                    CLOSE PREVIEW
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}


      {/* ==========================================
          MODAL: HIGH RES LAYOUT PLAN VIEW
          ========================================== */}
      {activeFloorDetailModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn">
          
          <div className="bg-[#0A0A0A] border border-white/10 max-w-3xl w-full p-8 md:p-10 rounded shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setActiveFloorDetailModal(null)}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] font-bold uppercase mb-2 block">
              CAD SPECIFICATION SHEET
            </span>
            <h3 className="font-display text-3xl text-white font-semibold mb-2">
              {activeFloorDetailModal.bhk} Architectural Specs
            </h3>
            <p className="text-xs text-neutral-400 font-light mb-6 leading-relaxed">
              Detailed construction alignment indexes. Verified by Rajesh Mishra & Amit Talda.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-b border-white/10 py-6 mb-8">
              
              {/* Left Column stats */}
              <div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4">
                  {activeFloorDetailModal.layoutDescription}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between border-b border-white/5 py-1.5 text-xs">
                    <span className="text-neutral-500 font-mono">PLAN SIZE index</span>
                    <span className="text-white font-bold">{activeFloorDetailModal.size}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-1.5 text-xs">
                    <span className="text-neutral-500 font-mono">BALCONY DECK INDEX</span>
                    <span className="text-white font-bold">{activeFloorDetailModal.balconies}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-1.5 text-xs">
                    <span className="text-neutral-500 font-mono">EXHAUST WINDOW SECTOR</span>
                    <span className="text-white font-bold">East-West cross ventilating</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-xs">
                    <span className="text-neutral-500 font-mono">BATHROOM PLUMBING TYPE</span>
                    <span className="text-white font-bold">Concealed CPVC with Jaquar fittings</span>
                  </div>
                </div>
              </div>

              {/* Right Column construction checklist */}
              <div className="bg-neutral-950 p-6 border border-white/5 rounded">
                <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] font-bold block mb-4">ENGINEERING SCHEDULE CHECKLIST</span>
                <ul className="space-y-3 text-xs">
                  {activeFloorDetailModal.specs.map((spec, index) => (
                    <li key={index} className="flex items-center gap-2 text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="flex justify-end gap-4">
              <button 
                onClick={() => { setActiveFloorDetailModal(null); setShowVisitModal(true); }}
                className="px-6 py-3 bg-[#D4AF37] text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C5A028] transition-colors"
              >
                BOOK WALKTHROUGH SITE VISIT
              </button>
            </div>

          </div>

        </div>
      )}


      {/* ==========================================
          MODAL: RERA COMPLIANCE REGISTRY
          ========================================== */}
      {showReraModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          
          <div className="bg-[#0A0A0A] border border-white/10 max-w-lg w-full p-8 rounded shadow-2xl relative">
            <button 
              onClick={() => setShowReraModal(false)}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] font-bold uppercase mb-2 block animate-pulse">
              OFFICIAL REGISTRY DATA
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-white font-medium mb-4">
              MahaRERA Compliance
            </h3>
            
            <div className="space-y-4 text-xs text-neutral-300 font-light leading-relaxed border-t border-white/10 pt-4 mb-6">
              <p>
                The project <span className="text-white font-semibold">Lifestyle Homes</span> is registered under MahaRERA registration number: <span className="text-[#D4AF37] font-mono font-bold">P51800012345</span>.
              </p>
              <p>
                All project credentials, architecture blueprints, structural certifications by approved RCC consultants, and client bank accounts are strictly locked in alignment with the Real Estate Regulation Act of Maharashtra.
              </p>
              <div className="bg-neutral-950 p-4 border border-white/5 rounded font-mono text-[11px] text-neutral-400 space-y-1">
                <p><span className="text-neutral-500">PROMOTER:</span> Rajesh Mishra & Amit Talda</p>
                <p><span className="text-neutral-500">LOCALITY:</span> DPS Road, Parvati Nagar, Amravati</p>
                <p><span className="text-neutral-500">VERIFICATION:</span> Fully Registered / Active status</p>
              </div>
            </div>

            <button 
              onClick={() => setShowReraModal(false)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-xs font-bold tracking-widest uppercase transition-all"
            >
              DISMISS REGISTRY DIALOGUE
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
