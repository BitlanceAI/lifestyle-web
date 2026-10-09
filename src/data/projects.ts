export interface AmenityItem {
  title: string;
  description: string;
  iconName: string;
  image?: string;
  tag?: string;
}

export interface ConfigurationItem {
  type: string;
  title: string;
  carpetArea?: string;
  description: string;
  highlights: string[];
  image: string;
  badge?: string;
}

export interface FloorPlanItem {
  id: string;
  tabLabel: string;
  title: string;
  category: string;
  image: string;
  description: string;
  features?: string[];
}

export interface SpecificationCategory {
  category: string;
  items: string[];
}

export interface LandmarkItem {
  name: string;
  distanceOrTime: string;
  category: string;
}

export interface ProjectTheme {
  mode: 'dark' | 'light';
  primaryAccent: string; // Hex code or CSS variable
  bgClass: string;
  cardBgClass: string;
  textPrimaryClass: string;
  textMutedClass: string;
  borderClass: string;
  goldAccentClass: string;
  fontHeadingClass: string;
}

export interface ProjectConfig {
  slug: string;
  name: string;
  projectName: string;
  tagline: string;
  subTagline?: string;
  category: string;
  statusBadge: string;
  theme: ProjectTheme;
  
  hero: {
    headline: string;
    subHeadline: string;
    supportingText: string;
    image: string;
    logoImage: string;
    developerLogo: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge?: string;
  };

  showcase: {
    title: string;
    subtitle: string;
    items: {
      tagline: string;
      headline: string;
      description: string;
      image: string;
    }[];
  };

  overview: {
    heading: string;
    subheading: string;
    description: string;
    paragraphs: string[];
    highlights: string[];
  };

  stats: {
    label: string;
    value: string;
    subtext?: string;
  }[];

  configurations: ConfigurationItem[];

  floorPlans: FloorPlanItem[];

  amenities: AmenityItem[];

  lifestyleStories?: {
    tagline: string;
    headline: string;
    description: string;
    image: string;
  }[];

  interiors: {
    category: string;
    title: string;
    description: string;
    image: string;
  }[];

  gallery: {
    category: string;
    title: string;
    image: string;
  }[];

  location: {
    address: string;
    city: string;
    state: string;
    description: string;
    mapImage: string;
    googleMapsQuery: string;
    landmarks: LandmarkItem[];
  };

  specifications: SpecificationCategory[];

  retail?: {
    headline: string;
    subheadline: string;
    description: string;
    image: string;
    features: string[];
    plans: {
      title: string;
      image: string;
      description: string;
    }[];
  };

  developer: {
    name: string;
    brandTagline: string;
    description: string;
    logo: string;
    city: string;
    team?: TeamMember[];
  };

  legal: {
    reraNo: string;
    reraWebsite: string;
    disclaimer: string;
    consultants?: {
      role: string;
      name: string;
    }[];
    brochureDownloadUrl?: string;
  };

  contact: {
    phone: string;
    whatsapp: string;
    officeAddress: string;
    workingHours?: string;
    email?: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  whatsapp: string;
}

export interface BrandBlogPost {
  id: string;
  title: string;
  category: string;
  date?: string;
  readTime?: string;
  excerpt: string;
  image: string;
  content: string[];
  highlights: string[];
  relatedProject?: string;
}

export interface BrandFAQ {
  question: string;
  answer: string;
  category: string;
}

export const PROJECTS: Record<string, ProjectConfig> = {
  'lifestyle-homes': {
    slug: 'lifestyle-homes',
    name: 'Lifestyle Home Spaces',
    projectName: 'Lifestyle Homes',
    tagline: 'Where Space Meets The Way You Live',
    subTagline: 'DPS Road · Parvati Nagar · Amravati',
    category: 'Premium Residential & Retail',
    statusBadge: 'Ready for Possession',
    
    theme: {
      mode: 'light',
      primaryAccent: '#D4AF37',
      bgClass: 'bg-[#FAF8F5]',
      cardBgClass: 'bg-white',
      textPrimaryClass: 'text-[#0A0A0A]',
      textMutedClass: 'text-[#0A0A0A]/70',
      borderClass: 'border-[#0A0A0A]/10',
      goldAccentClass: 'text-[#D4AF37]',
      fontHeadingClass: 'font-serif',
    },

    hero: {
      headline: 'LIFESTYLE HOMES',
      subHeadline: 'Where Space Meets The Way You Live',
      supportingText: 'Experience refined living in Amravati’s premier residential enclave. Thoughtfully curated 2 & 3 BHK residences accompanied by high-street retail spaces.',
      image: '/assets/projects/lifestyle-homes/building/building-exterior.jpg',
      logoImage: '/assets/projects/lifestyle-homes/brand/lifestyle-logo.png',
      developerLogo: '/assets/projects/lifestyle-homes/brand/lifestyle-logo.png',
      ctaPrimary: 'Explore Residences',
      ctaSecondary: 'Schedule Visit',
      badge: 'Immediate Possession Available',
    },

    showcase: {
      title: 'ARCHITECTURAL DISTINCTION',
      subtitle: 'Designed for modern Indian families seeking permanence and poise',
      items: [
        {
          tagline: 'GROUND LEVEL CONVENIENCE',
          headline: 'High-Street Retail Promenade',
          description: 'A vibrant commercial podium bringing daily essentials, boutiques, and lifestyle services right to your residential sanctuary.',
          image: '/assets/projects/lifestyle-homes/building/building-exterior.jpg',
        },
        {
          tagline: 'TIMELESS FACADE',
          headline: 'Balanced Contemporary Elevation',
          description: 'Clean architectural lines, deep balconies, and maximized natural ventilation crafted for comfort through every season.',
          image: '/assets/projects/lifestyle-homes/building/building-hero.jpg',
        },
      ],
    },

    overview: {
      heading: 'SANCTUARY OF SPACE & LIGHT',
      subheading: 'DPS Road · Parvati Nagar, Amravati',
      description: 'Lifestyle Homes represents a benchmark in urban living for Amravati. Combining private residential floors with a well-planned retail boulevard, the development is tailored for those who value privacy, connectivity, and structural longevity.',
      paragraphs: [
        'Each apartment is planned with dedicated ventilation shafts, private elevator lobbies, and uninterrupted sunlight across living areas.',
        'With immediate possession, your transition to an elevated standard of living is seamless and certain.',
      ],
      highlights: [
        '100% Vastu Compliant Layouts',
        'Ready for Immediate Possession',
        'Exclusive 30 Residential Suites',
        '24 Integrated High-Street Shops',
      ],
    },

    stats: [
      { label: '3 BHK Residences', value: '12 Units', subtext: 'Spacious Family Suites' },
      { label: '2 BHK Residences', value: '18 Units', subtext: 'Optimized Comfort' },
      { label: 'Commercial Retail', value: '24 Shops', subtext: 'Ground & 1st Floor' },
      { label: 'Project Status', value: 'Ready', subtext: 'Immediate Possession' },
    ],

    configurations: [
      {
        type: '3 BHK',
        title: '3 BHK Royal Residence',
        carpetArea: 'Generous Multi-Balcony Layout',
        description: 'Commanding family suites featuring dedicated master bedrooms, expansive living halls, and cross-ventilation designed for expansive hospitality.',
        highlights: [
          'Grand Living & Dining Room',
          'Private Master Suite with Ensuite Bath',
          'Multiple Sundrenched Balconies',
          'Separate Dry Kitchen & Utility Balcony',
        ],
        image: '/assets/projects/lifestyle-homes/interiors/living-room.jpg',
        badge: 'Only 12 Available',
      },
      {
        type: '2 BHK',
        title: '2 BHK Comfort Residence',
        carpetArea: 'Smart Layout Optimization',
        description: 'Elegantly proportioned 2 bedroom residences designed for young families and discerning professionals seeking high-yield aesthetic comfort.',
        highlights: [
          'Zero Wasted Circulation Area',
          'Master Bedroom with Wide Wardrobe Niche',
          'Airy Balcony Overlooking City Skyline',
          'Full Vastu Directional Alignment',
        ],
        image: '/assets/projects/lifestyle-homes/interiors/living-room-wide.jpg',
        badge: '18 Premium Units',
      },
    ],

    floorPlans: [
      {
        id: 'lh-3bhk',
        tabLabel: '3 BHK Suite',
        title: '3 BHK Master Layout',
        category: 'Residential',
        image: '/assets/projects/lifestyle-homes/interiors/living-room.jpg',
        description: 'Comprehensive 3 Bedroom floor plan balancing intimate private quarters with an open-plan social core.',
        features: ['3 Bedrooms', '3 Bathrooms', '2 Balconies', 'Kitchen + Utility'],
      },
      {
        id: 'lh-2bhk',
        tabLabel: '2 BHK Comfort',
        title: '2 BHK Smart Layout',
        category: 'Residential',
        image: '/assets/projects/lifestyle-homes/interiors/living-room-wide.jpg',
        description: 'Functional 2 Bedroom spatial layout ensuring continuous natural illumination and seamless privacy zoning.',
        features: ['2 Bedrooms', '2 Bathrooms', '1 Panoramic Balcony', 'Open Dining'],
      },
      {
        id: 'lh-retail',
        tabLabel: 'Retail Arcade',
        title: 'High-Street Retail Promenade',
        category: 'Commercial',
        image: '/assets/projects/lifestyle-homes/building/building-exterior.jpg',
        description: 'Street-facing commercial retail shops with wide storefronts and high pedestrian footfall.',
        features: ['12 Ground Floor Shops', '12 First Floor Showrooms', 'Dedicated Customer Parking'],
      },
    ],

    amenities: [
      {
        title: '24/7 Security & CCTV',
        description: 'Round-the-clock trained guards, perimeter surveillance, CCTV monitoring, and video door access.',
        iconName: 'ShieldCheck',
        image: '/assets/projects/lifestyle-homes/amenities/security-cctv.jpg',
      },
      {
        title: 'Allotted Covered Parking',
        description: 'Structured ground-level parking bays ensuring smooth entry and egress for all residents.',
        iconName: 'Car',
        image: '/assets/projects/lifestyle-homes/amenities/parking-layout-plan.png',
      },
      {
        title: 'High-Speed Elevators',
        description: 'Smooth vertical transit with automatic rescue devices and generator power backup.',
        iconName: 'Building2',
        image: '/assets/projects/lifestyle-homes/amenities/high-speed-elevators.jpg',
      },
      {
        title: '100% Vastu Compliance',
        description: 'Scientific layout orientations designed to optimize magnetic harmony and solar energy.',
        iconName: 'Compass',
        image: '/assets/projects/lifestyle-homes/interiors/living-room.jpg',
      },
      {
        title: 'Smart Cross-Ventilation',
        description: 'Dual-aspect windows and deep balconies creating refreshing breezes across every residence.',
        iconName: 'Sparkles',
        image: '/assets/projects/lifestyle-homes/interiors/bedroom-window.jpg',
      },
      {
        title: 'Dedicated Site Maintenance',
        description: 'Professional facilities management team ensuring common areas remain pristine.',
        iconName: 'CheckCircle2',
        image: '/assets/projects/lifestyle-homes/amenities/site-maintenance.png',
      },
    ],

    interiors: [
      {
        category: 'LIVING',
        title: 'Grand Living Hall',
        description: 'Expansive social living space with crystal chandelier, polished marble flooring, and direct balcony doorway.',
        image: '/assets/projects/lifestyle-homes/interiors/living-room.jpg',
      },
      {
        category: 'KITCHEN',
        title: 'Culinary Master Kitchen',
        description: 'Polished granite countertops with deep stainless sink, glazed tile dado, and adjacent utility terrace.',
        image: '/assets/projects/lifestyle-homes/interiors/kitchen.jpg',
      },
      {
        category: 'BALCONY',
        title: 'Private Sunset Balcony',
        description: 'Sheltered outdoor viewing deck with herringbone pattern floor tiles, glass & stainless steel railing, and open greenery views.',
        image: '/assets/projects/lifestyle-homes/interiors/balcony.jpg',
      },
      {
        category: 'BEDROOM',
        title: 'Cross-Ventilated Master Bedroom',
        description: 'Airy bedroom with wide sliding windows, safety grills, and continuous natural daylight.',
        image: '/assets/projects/lifestyle-homes/interiors/bedroom-window.jpg',
      },
      {
        category: 'ELEVATORS',
        title: 'Modern Elevator Lobby',
        description: 'Granite and marble framed elevator foyer with high-speed automated lifts.',
        image: '/assets/projects/lifestyle-homes/amenities/high-speed-elevators.jpg',
      },
      {
        category: 'CORRIDOR',
        title: 'Private Apartment Foyer',
        description: 'Discreet entry foyers providing peace of mind and acoustic separation from common lobbies.',
        image: '/assets/projects/lifestyle-homes/interiors/corridor.jpg',
      },
      {
        category: 'STORAGE',
        title: 'Utility & Storage Alcove',
        description: 'Dedicated alcoves engineered for pantry organization and domestic machinery.',
        image: '/assets/projects/lifestyle-homes/interiors/storage-room.jpg',
      },
    ],

    gallery: [
      {
        category: 'Architecture',
        title: 'Building Street Frontage',
        image: '/assets/projects/lifestyle-homes/building/building-exterior.jpg',
      },
      {
        category: 'Elevation',
        title: 'Contemporary Facade',
        image: '/assets/projects/lifestyle-homes/building/building-hero.jpg',
      },
      {
        category: 'Interiors',
        title: 'Living Room Atmosphere',
        image: '/assets/projects/lifestyle-homes/interiors/living-room-detail.jpg',
      },
      {
        category: 'Interiors',
        title: 'Designer Chandelier Detail',
        image: '/assets/projects/lifestyle-homes/interiors/chandelier.jpg',
      },
      {
        category: 'Balcony',
        title: 'Private Sunset Balcony',
        image: '/assets/projects/lifestyle-homes/interiors/balcony.jpg',
      },
    ],

    location: {
      address: 'DPS Road, Parvati Nagar, Near Avinashe Avenue',
      city: 'Amravati',
      state: 'Maharashtra',
      description: 'Positioned on the prestigious DPS Road, Lifestyle Homes balances peaceful residential privacy with rapid transit access to Amravati’s commercial, academic, and healthcare nodes.',
      mapImage: '/assets/projects/lifestyle-homes/building/building-exterior.jpg',
      googleMapsQuery: 'DPS Road Parvati Nagar Amravati',
      landmarks: [
        { name: 'Delhi Public School (DPS)', distanceOrTime: '2 min', category: 'Education' },
        { name: 'Avinashe Avenue Commercials', distanceOrTime: '1 min', category: 'Retail' },
        { name: 'Amravati Ring Road', distanceOrTime: '4 min', category: 'Transit' },
        { name: 'Irwin Square & City Centre', distanceOrTime: '8 min', category: 'City Center' },
        { name: 'Super Speciality Hospital', distanceOrTime: '7 min', category: 'Healthcare' },
      ],
    },

    specifications: [
      {
        category: 'Structure',
        items: ['Earthquake resistant RCC framed structure designed to structural engineering standards.'],
      },
      {
        category: 'Brickwork & Plaster',
        items: ['External 6" walls and internal 4" walls with smooth plaster finish.'],
      },
      {
        category: 'Flooring',
        items: ['Premium vitrified tile flooring in living, dining, bedrooms, and kitchen.', 'Anti-skid ceramic tiles in balconies and utility areas.'],
      },
      {
        category: 'Doors & Windows',
        items: ['Main entrance decorative laminated flush door with brass fittings.', 'Powder-coated aluminum sliding windows with MS safety grills.'],
      },
      {
        category: 'Kitchen',
        items: ['Granite kitchen platform with stainless steel sink and ceramic glazed wall tiles.'],
      },
      {
        category: 'Electrical & Plumbing',
        items: ['Concealed copper wiring with modular switches.', 'Concealed plumbing with branded CP and sanitary ware fittings.'],
      },
    ],

    developer: {
      name: 'Lifestyle Home Spaces',
      brandTagline: 'Architectural Excellence & Timeless Living',
      description: 'Lifestyle Home Spaces is committed to creating enduring urban addresses that harmonize modern construction practices with client-centric spatial value.',
      logo: '/assets/projects/lifestyle-homes/brand/lifestyle-logo.png',
      city: 'Amravati, Maharashtra',
      team: [
        {
          name: 'Rajesh Mishra',
          role: 'Listing Coordinator',
          phone: '+91 9158111140',
          email: 'lifestylehomespace@gmail.com',
          image: '/assets/brand/team-rajesh-mishra.jpg',
          whatsapp: '919158111140',
        },
        {
          name: 'Amit Talda',
          role: 'Property Developer',
          phone: '+91 9730768982',
          email: 'lifestylehomespace@gmail.com',
          image: '/assets/brand/team-amit-talda.jpg',
          whatsapp: '919730768982',
        },
      ],
    },

    legal: {
      reraNo: 'Available upon site enquiry',
      reraWebsite: 'maharera.maharashtra.gov.in',
      disclaimer: 'The specifications and images shown are for informational purposes. All transactions are governed by the terms of the formal agreement for sale.',
    },

    contact: {
      phone: '+91 85307 63405',
      whatsapp: '918530763405',
      officeAddress: 'DPS Road, Parvati Nagar, Near Avinashe Avenue, Amravati, Maharashtra',
    },
  },

  'aura': {
    slug: 'aura',
    name: 'Aura',
    projectName: 'Aura by Lifestyle',
    tagline: 'Life Beyond Imagination',
    subTagline: 'Experience Life in the Sky',
    category: 'Skyline Residences & High-Street Retail',
    statusBadge: 'Upcoming Landmark',

    theme: {
      mode: 'dark',
      primaryAccent: '#D4AF37',
      bgClass: 'bg-[#0B0B0D]',
      cardBgClass: 'bg-[#151518]',
      textPrimaryClass: 'text-[#F5E6C8]',
      textMutedClass: 'text-[#C5BBAA]',
      borderClass: 'border-[#D4AF37]/20',
      goldAccentClass: 'text-[#D4AF37]',
      fontHeadingClass: 'font-cinzel',
    },

    hero: {
      headline: 'AURA',
      subHeadline: 'BY LIFESTYLE',
      supportingText: 'Life Beyond Imagination. Step into a home that lets you truly touch the sky. With Aura’s highrise architecture, you don’t just live in a building — you live among the clouds.',
      image: '/assets/projects/aura/building/aura-building-hero.jpg',
      logoImage: '/assets/projects/aura/brand/aura-logo.png',
      developerLogo: '/assets/projects/aura/brand/lifestyle-developer-logo.png',
      ctaPrimary: 'Explore Aura',
      ctaSecondary: 'Book a Site Visit',
      badge: 'MAHA RERA: P5030002502915',
    },

    showcase: {
      title: 'WHERE LIFE AND STYLE COME TOGETHER',
      subtitle: 'A highrise architectural milestone redefining Amravati’s skyline',
      items: [
        {
          tagline: 'WHERE LIFE AND STYLE COME TOGETHER',
          headline: 'Iconic Highrise Presence',
          description: 'Rising with dramatic poise in Congress Nagar, Aura’s striking vertical silhouette combines elite residential towers with an active 3-level commercial podium.',
          image: '/assets/projects/aura/building/aura-building-perspective.jpg',
        },
        {
          tagline: 'BECAUSE MORE IS WHAT YOU DESERVE',
          headline: 'Elevated Beyond Expectations',
          description: 'At Aura, we believe life should never be confined. There is always space to grow, to dream, and to achieve more with grand panoramic perspectives over the city.',
          image: '/assets/projects/aura/building/aura-building-exterior-twilight.jpg',
        },
        {
          tagline: 'BECAUSE LIFESTYLE IS MEANT TO BE GRAND',
          headline: 'Front Elevation & Grand Promenade',
          description: 'A monument to modern luxury. With picturesque views, beautifully designed homes, and a wide array of rooftop and podium amenities crafted to enrich daily living.',
          image: '/assets/projects/aura/building/aura-building-front-elevation.jpg',
        },
      ],
    },

    overview: {
      heading: 'FOR SELECTED FEW',
      subheading: 'Congress Nagar Road · Amravati',
      description: 'Crafted for those who seek identity and distinction, Aura offers a lifestyle reserved for the chosen. A home designed exclusively for the select few who aspire to live above the ordinary.',
      paragraphs: [
        'Aura introduces highrise architectural mastery to Amravati with 13 residential storeys crowned by an awe-inspiring rooftop leisure deck.',
        'With infinity-edge rooftop swimming, sky-high multi-sports turf, private jogging tracks, and world-class retail right at your doorstep, Aura is not merely a place — it is a feeling.',
      ],
      highlights: [
        'Rooftop Swimming Pool & Sky Deck',
        'Multi-Sports Turf & Box Cricket Arena',
        'High-Street Retail & Corporate Offices',
        '4 Elevators with 100% Generator Backup',
      ],
    },

    stats: [
      { label: 'Tower Elevation', value: '13 Storeys', subtext: 'Skyline Highrise' },
      { label: 'Rooftop Deck', value: 'Sky Oasis', subtext: 'Pool & Sports Turf' },
      { label: 'High-Street Retail', value: '3 Levels', subtext: 'Shops & Corporate' },
      { label: 'MahaRERA Reg.', value: 'P5030002502915', subtext: 'Verified Official' },
    ],

    lifestyleStories: [
      {
        tagline: 'ROOFTOP SPLENDOR',
        headline: 'Experience Life in the Sky',
        description: 'Step into a home that lets you truly touch the sky. Every floor here brings you closer to the horizon with refreshing openness and a lifestyle elevated to new heights.',
        image: '/assets/projects/aura/amenities/aura-rooftop-pool-sunset.png',
      },
      {
        tagline: 'UNCOMPROMISING WELLNESS',
        headline: 'Staying Fit Means Living More',
        description: 'Movement becomes essential. Aura keeps fitness at the heart of daily routine with an open-air multi-sports turf, sky-view gym, and rooftop jogging track.',
        image: '/assets/projects/aura/amenities/aura-sports-cricket.jpg',
      },
      {
        tagline: 'TAILORED LEISURE',
        headline: 'Curated for Every Passion',
        description: 'Unwind with a variety of tailored entertainment options. Picture yourself under the stars, taking a refreshing dip in the leisure pool or hosting on the viewing deck.',
        image: '/assets/projects/aura/building/aura-building-aerial.jpg',
      },
      {
        tagline: 'EMOTIONAL DESIGN',
        headline: 'Every Corner Pulses with Life Here',
        description: 'Feel the uniqueness, feel the Aura. It is more than a place, it is a feeling. Every detail awakens emotions, blending lifestyle, identity, and elegance into an experience beyond the ordinary.',
        image: '/assets/projects/aura/interiors/aura-living-room.jpg',
      },
    ],

    configurations: [
      {
        type: '2 BHK',
        title: '2 BHK Luxury Residence',
        carpetArea: 'Optimal Cut Section Layout',
        description: 'Thoughtfully planned two-bedroom sanctum featuring spacious master bedroom (11’0” x 12’0”), expansive living room (11’0” x 17’0”), attached balconies, and dedicated utility.',
        highlights: [
          'Living Room: 11’0” × 17’0” with Sunlit Balcony',
          'Master Bedroom: 11’0” × 12’0” with Ensuite Bath',
          'Children’s Bedroom: 11’0” × 12’0”',
          'Vitrified 800 × 1600 mm Luxury Flooring',
        ],
        image: '/assets/projects/aura/floor-plans/aura-2bhk-floorplan.jpg',
        badge: 'Typical 3rd - 13th Floor',
      },
      {
        type: '3 BHK',
        title: '3 BHK Signature Residence',
        carpetArea: 'Grand Family Cut Section',
        description: 'Expansive three-bedroom master suite with three private balconies, separate guest bedroom, lavish dining foyer, and designer modular kitchen spaces.',
        highlights: [
          'Master Bedroom with Wide Viewing Balcony',
          'Kids Bedroom & Independent Guest Bedroom',
          'Expansive Living & Formal Dining Salons',
          'Separate Washing Balcony & Service Entry',
        ],
        image: '/assets/projects/aura/floor-plans/aura-3bhk-floorplan.jpg',
        badge: 'Signature Sky Suites',
      },
      {
        type: 'Commercial',
        title: 'High-Street Retail & Offices',
        carpetArea: 'Lower, Upper Ground & First Floor',
        description: 'Prime commercial arcade facing Congress Nagar Road featuring 2.4m to 3.3m wide circulation corridors, high visibility glass facades, and dedicated parking.',
        highlights: [
          'Lower Ground: High-Footfall Retail Shops',
          'Upper Ground: Premium Showrooms & Offices',
          'First Floor: Corporate Suites & Boutiques',
          'Direct Road Access & Stretcher Lift',
        ],
        image: '/assets/projects/aura/building/aura-retail-exterior.jpg',
        badge: 'High Investment Yield',
      },
    ],

    floorPlans: [
      {
        id: 'aura-2bhk',
        tabLabel: '2 BHK',
        title: '2 BHK Flat Cut Section & Layout',
        category: 'Residential',
        image: '/assets/projects/aura/floor-plans/aura-2bhk-floorplan.jpg',
        description: 'Actual isometric 3D cut section and top view architectural layout showing exact room dimensions from the brochure.',
        features: ['Living 11’0”×17’0”', 'Master Bed 11’0”×12’0”', 'Kids Bed 11’0”×12’0”', 'Balcony 10’6”×6’0”'],
      },
      {
        id: 'aura-3bhk',
        tabLabel: '3 BHK',
        title: '3 BHK Flat Cut Section & Layout',
        category: 'Residential',
        image: '/assets/projects/aura/floor-plans/aura-3bhk-floorplan.jpg',
        description: 'Official 3 BHK cut section with 3D isometric view and top-down architectural layout with comprehensive room measurements.',
        features: ['Master Suite 11’0”×15’0”', 'Guest Bed 11’0”×12’0”', 'Dining 9’6”×12’6”', 'Multiple Balconies'],
      },
      {
        id: 'aura-typical',
        tabLabel: 'TYPICAL FLOOR',
        title: 'Typical Floor Plan (3rd - 13th Floor)',
        category: 'Residential',
        image: '/assets/projects/aura/floor-plans/aura-typical-floorplan.jpg',
        description: 'High-resolution architectural CAD typical floor plan for 3rd, 4th, 5th, 6th, 7th, 9th, 10th, 11th & 13th floors.',
        features: ['Central 4.0m Corridor', '4 Elevators (2 Passenger, 1 Stretcher, 1 Service)', 'Double Staircases'],
      },
      {
        id: 'aura-terrace',
        tabLabel: 'TERRACE',
        title: 'Terrace Floor Plan & Sky Amenities',
        category: 'Amenities',
        image: '/assets/projects/aura/floor-plans/aura-terrace-plan.jpg',
        description: 'Architectural layout of the iconic rooftop oasis featuring pool deck, sports turf, party area, and viewing decks.',
        features: ['Swimming Pool & Kids Pool', 'Multi-Sports Turf', 'Party Area', 'Viewing Decks'],
      },
      {
        id: 'aura-first-floor',
        tabLabel: 'RETAIL',
        title: 'First Floor Commercial & Offices Plan',
        category: 'Commercial',
        image: '/assets/projects/aura/floor-plans/aura-retail-first-floor-plan.jpg',
        description: 'Commercial first-floor plan with designated retail shops (F-01 to F-21) and executive corporate offices.',
        features: ['Shops F-01 to F-21', 'Corporate Offices', 'Wide Corridors', 'Stretcher & Passenger Lifts'],
      },
      {
        id: 'aura-lower-ground',
        tabLabel: 'LOWER GROUND',
        title: 'Lower Ground Floor Plan (Shops & Parking)',
        category: 'Commercial',
        image: '/assets/projects/aura/floor-plans/aura-retail-lower-ground-plan.jpg',
        description: 'Lower ground floor layout showing high-traffic retail spaces (G-01 to G-24) alongside spacious parking bays.',
        features: ['24 Lower Ground Retail Shops', 'Dedicated Parking Bays', '2.4m Wide Corridors'],
      },
      {
        id: 'aura-upper-ground',
        tabLabel: 'UPPER GROUND',
        title: 'Upper Ground Floor Plan (Shops & Offices)',
        category: 'Commercial',
        image: '/assets/projects/aura/floor-plans/aura-retail-upper-ground-plan.jpg',
        description: 'Upper ground commercial floor layout with prominent street frontage and multi-sized commercial configurations.',
        features: ['Shops U-01 to U-22', 'Offices OU-01 to OU-19', '3.3m Wide Main Corridors'],
      },
    ],

    amenities: [
      {
        title: 'Rooftop Swimming Pool & Kids Pool',
        description: 'Gleaming sky-level leisure pool featuring custom Aura tile monogram, sun deck, kids pool, and sunset horizon views.',
        iconName: 'Waves',
        image: '/assets/projects/aura/amenities/aura-rooftop-pool-sunset.png',
        tag: 'Sky Luxury',
      },
      {
        title: 'Multi-Sports Turf & Cricket Pitch',
        description: 'Fully netted rooftop astroturf court equipped for box cricket, basketball, tennis, and active recreational games.',
        iconName: 'Trophy',
        image: '/assets/projects/aura/amenities/aura-sports-cricket.jpg',
        tag: 'Rooftop Sports',
      },
      {
        title: 'Viewing Deck & Stargazing Lounge',
        description: 'Panoramic open-air observation deck with comfortable seating arrangements designed for quiet evenings and community bonding.',
        iconName: 'Eye',
        image: '/assets/projects/aura/building/aura-building-aerial.jpg',
        tag: 'Panoramic',
      },
      {
        title: 'Fitness Gym & Conditioning Center',
        description: 'Fully equipped modern fitness center with cardio, weight training machinery, and attached private washrooms.',
        iconName: 'Dumbbell',
        image: '/assets/projects/aura/amenities/aura-gym.jpg',
        tag: 'Wellness',
      },
      {
        title: 'Children’s Play Area & Old Citizens Corner',
        description: 'Podium-level dedicated zone with child-safe soft play apparatus alongside tranquil shaded seating for senior residents.',
        iconName: 'Users',
        image: '/assets/projects/aura/amenities/aura-play-area.jpg',
        tag: 'Family',
      },
      {
        title: 'Indoor Games & Entertainment Arena',
        description: 'Air-conditioned recreational lounge featuring table tennis, carrom, chess, and board games for leisurely weekends.',
        iconName: 'Gamepad2',
        image: '/assets/projects/aura/amenities/aura-indoor-games.jpg',
        tag: 'Recreation',
      },
      {
        title: 'Rooftop Jogging & Reflexology Track',
        description: 'Dedicated sky track bordered by lush landscaping for peaceful sunrise walks high above city noise.',
        iconName: 'Footprints',
        image: '/assets/projects/aura/building/aura-building-aerial.jpg',
        tag: 'Health',
      },
      {
        title: '4 Elevators with 100% Generator Backup',
        description: '2 high-speed passenger elevators, 1 dedicated stretcher elevator, and 1 service elevator ensuring round-the-clock vertical transit.',
        iconName: 'Building2',
        image: '/assets/projects/aura/building/aura-building-front-elevation.jpg',
        tag: 'Infrastructure',
      },
    ],

    interiors: [
      {
        category: 'LIVING',
        title: 'Elegance Redefined Living Space',
        description: 'Spacious living hall detailed with warm ambient cove lighting, designer wall panelling, and 800 × 1600 mm vitrified tiles.',
        image: '/assets/projects/aura/interiors/aura-living-room.jpg',
      },
      {
        category: 'BEDROOM',
        title: 'Master Bedroom Suite',
        description: 'Generously proportioned bedroom with ensuite bathroom, wooden texture acoustic panels, and direct balcony connectivity.',
        image: '/assets/projects/aura/interiors/aura-bedroom.jpg',
      },
      {
        category: 'KITCHEN',
        title: 'Gourmet Modular Kitchen',
        description: 'Granite kitchen platform with glazed dado tiles up to lintel height, deep stainless steel sink, and dedicated appliance sockets.',
        image: '/assets/projects/aura/interiors/aura-kitchen.jpg',
      },
      {
        category: 'DINING',
        title: 'Sophisticated Dining Lounge',
        description: 'Intimate dining quarters tailored for family banquets, flowing smoothly into the open-plan culinary space.',
        image: '/assets/projects/aura/interiors/aura-dining.jpg',
      },
      {
        category: 'BALCONY',
        title: 'Skyview Panoramic Balcony',
        description: 'Deep private balcony framed with safety MS railings and weather-resistant anti-skid floor tiles.',
        image: '/assets/projects/aura/interiors/aura-balcony.jpg',
      },
    ],

    gallery: [
      {
        category: 'Skyline Architecture',
        title: 'Building Twilight Exterior',
        image: '/assets/projects/aura/building/aura-building-hero.jpg',
      },
      {
        category: 'Rooftop Deck',
        title: 'Aerial Rooftop Amenities',
        image: '/assets/projects/aura/building/aura-building-aerial.jpg',
      },
      {
        category: 'Amenities',
        title: 'Rooftop Swimming Pool',
        image: '/assets/projects/aura/amenities/aura-rooftop-pool-sunset.png',
      },
      {
        category: 'Sports',
        title: 'Multi-Sports Turf & Box Cricket',
        image: '/assets/projects/aura/amenities/aura-sports-cricket.jpg',
      },
      {
        category: 'Interiors',
        title: 'Living Salon Atmosphere',
        image: '/assets/projects/aura/interiors/aura-living-room.jpg',
      },
      {
        category: 'Commercial',
        title: 'High-Street Retail Promenade',
        image: '/assets/projects/aura/building/aura-retail-exterior.jpg',
      },
      {
        category: 'Balcony',
        title: 'Skyview Panoramic Balcony',
        image: '/assets/projects/aura/interiors/aura-balcony.jpg',
      },
    ],

    location: {
      address: 'Congress Nagar Road, Next To Dreamz Signature, Congress Nagar',
      city: 'Amravati',
      state: 'Maharashtra',
      description: 'Located in prestigious Congress Nagar, Aura places you at the center of convenience. With seamless connectivity to major roads, commercial spaces, and everyday essentials, Aura ensures that everything you need is always within reach.',
      mapImage: '/assets/projects/aura/location/aura-location-map.jpg',
      googleMapsQuery: 'Congress Nagar Road Next To Dreamz Signature Amravati',
      landmarks: [
        { name: 'Hospitals (Super Speciality)', distanceOrTime: '5 min', category: 'Healthcare' },
        { name: 'Colleges & Universities', distanceOrTime: '5 min', category: 'Education' },
        { name: 'Schools (Govt. Higher Sec. / Bhivapurkar)', distanceOrTime: '6 min', category: 'Education' },
        { name: 'Entertainment & Stadiums', distanceOrTime: '6 min', category: 'Leisure' },
        { name: 'Shopping Malls & D-Mart', distanceOrTime: '7 min', category: 'Retail' },
        { name: 'Restaurants & Dining Hubs', distanceOrTime: '5 min', category: 'Dining' },
        { name: 'Markets (Itwara Bazar / Shrikrishna Peth)', distanceOrTime: '5 min', category: 'Commerce' },
        { name: 'Main ST Bus Stand & Railway Station', distanceOrTime: '5-6 min', category: 'Transit' },
      ],
    },

    specifications: [
      {
        category: 'STRUCTURE',
        items: [
          'Well designed RCC frame structure with good quality material as per structural engineer’s design.',
        ],
      },
      {
        category: 'BRICKWORK',
        items: [
          'External: 6” wall for structural insulation and weather barrier.',
          'Internal: 4” wall using high-grade red bricks.',
        ],
      },
      {
        category: 'WINDOWS',
        items: [
          'Three-track powder-coated aluminum / UPVC windows with mosquito mesh.',
          'Safety MS grills for comprehensive apartment security.',
        ],
      },
      {
        category: 'FLOORING / TOILET',
        items: [
          'Vitrified flooring 800 × 1600 mm in all rooms with 3” skirting.',
          'Vitrified tiles 600 × 1200 mm up to lintel level in bathrooms.',
          'Anti-skid designer flooring tiles in all bathrooms and balconies.',
        ],
      },
      {
        category: 'DOORS',
        items: [
          'Main Door: Plywood frame with decorative laminated flush door and premium brass lock.',
          'Internal Door: Granite frame / Plywood frame with decorative laminated flush door.',
        ],
      },
      {
        category: 'KITCHEN',
        items: [
          'Granite kitchen otta with glazed tile dado up to lintel height.',
          'Heavy-duty stainless steel sink with swivel mixer fitting.',
        ],
      },
      {
        category: 'PLUMBING',
        items: [
          'Concealed plumbing in high-grade UPVC / CPVC pipes.',
          'Toilet fittings of reputed high quality (Jaquar or equivalent).',
        ],
      },
      {
        category: 'PAINT',
        items: [
          'Exterior: Premium quality weather-shield emulsion paint.',
          'Interior: Smooth acrylic emulsion paint with putty finish.',
        ],
      },
      {
        category: 'SECURITY',
        items: [
          '24/7 CCTV surveillance in parking areas and all common lobbies.',
          'Gated access with security cabin and communication network.',
        ],
      },
      {
        category: 'LIFT',
        items: [
          '2 Regular passenger elevators.',
          '1 Dedicated Stretcher elevator.',
          '1 Dedicated Service elevator.',
          'All elevators equipped with automatic generator backup.',
        ],
      },
      {
        category: 'ELECTRIFICATION',
        items: [
          'Concealed electrification with premium quality modular switches.',
          'Adequate power points in Living, Kitchen & Toilets.',
          'Provision for inverter point and TV point in Living room.',
          'One dedicated A.C. electrical point in each bedroom.',
        ],
      },
      {
        category: 'COMMON FEATURES',
        items: [
          'Concrete finish treatment for parking areas.',
          'Underground (UG) tank and overhead water tank for ample water storage.',
        ],
      },
    ],

    retail: {
      headline: 'BECAUSE AURA BRINGS RETAIL TO YOUR CALL',
      subheadline: 'High-Street Commercial Spaces for Growth & Prestige',
      description: 'Commercial spaces at Aura Lifestyle are designed for growth, visibility, and success. With modern infrastructure, seamless connectivity, and a prime Congress Nagar location, Aura offers the perfect blend of convenience and prestige.',
      image: '/assets/projects/aura/building/aura-retail-exterior.jpg',
      features: [
        'High-footfall frontage facing Congress Nagar Road',
        '2.4m to 3.8m wide arterial shopping corridors',
        '3 Commercial Levels: Lower Ground, Upper Ground & 1st Floor',
        'Stretcher & Service Elevators with generator backup',
        'Ample customer parking & dedicated delivery bays',
      ],
      plans: [
        {
          title: 'Lower Ground Commercial Floor',
          image: '/assets/projects/aura/floor-plans/aura-retail-lower-ground-plan.jpg',
          description: '24 Retail shops (G-01 to G-24) optimized for daily conveniences, pharmacy, and high-footfall retail.',
        },
        {
          title: 'Upper Ground Commercial Floor',
          image: '/assets/projects/aura/floor-plans/aura-retail-upper-ground-plan.jpg',
          description: 'Prominent retail showrooms (U-01 to U-22) and executive offices (OU-01 to OU-19) with 3.3m wide corridors.',
        },
        {
          title: 'First Floor Commercial & Corporate',
          image: '/assets/projects/aura/floor-plans/aura-retail-first-floor-plan.jpg',
          description: 'Showrooms (F-01 to F-21) and corporate office suites (OF-01 to OF-19) with central atrium visibility.',
        },
      ],
    },

    developer: {
      name: 'Lifestyle Home Spaces',
      brandTagline: 'Architectural Excellence & Timeless Living',
      description: 'Delivering landmark projects is the vision and mission of Lifestyle Homes. Built on a foundation of quality and distinction, each project creates a benchmark that no one else can match.',
      logo: '/assets/projects/aura/brand/lifestyle-developer-logo.png',
      city: 'Amravati, Maharashtra',
      team: [
        {
          name: 'Rajesh Mishra',
          role: 'Listing Coordinator',
          phone: '+91 9158111140',
          email: 'lifestylehomespace@gmail.com',
          image: '/assets/brand/team-rajesh-mishra.jpg',
          whatsapp: '919158111140',
        },
        {
          name: 'Amit Talda',
          role: 'Property Developer',
          phone: '+91 9730768982',
          email: 'lifestylehomespace@gmail.com',
          image: '/assets/brand/team-amit-talda.jpg',
          whatsapp: '919730768982',
        },
      ],
    },

    legal: {
      reraNo: 'P5030002502915',
      reraWebsite: 'https://maharera.maharashtra.gov.in',
      disclaimer: 'This brochure is purely conceptual & not a legal offering. The plans, specifications, images & other details herein are indicative, furniture & accessories will not be provided by the developer & the developer / owner reserves all rights to change. All dimensions mentioned in the drawings may vary / differ due to construction contingencies & site conditions.',
      brochureDownloadUrl: '/assets/projects/aura/documents/aura-official-brochure.pdf',
      consultants: [
        { role: 'Architect', name: 'CAPE DESIGN STUDIO — Ar. Rohit Punshi' },
        { role: 'Architect Planner & Interior Designer', name: 'SUHAS JUNANKAR & ASSOCIATES' },
        { role: 'Structural Consultant', name: 'PATANKAR CONSULTANTS PRIVATE LIMITED' },
        { role: 'Financial Consultant', name: 'CA. DEEPAK ZAMBANI' },
        { role: 'Legal Consultant', name: 'ADV. YOGESH TOLANI' },
        { role: 'Landscape Consultant', name: 'TEJAAL RAKSHAMWAR' },
        { role: 'Plumbing Consultant', name: 'MR. ASHWIN S PATANKAR' },
        { role: 'Electrical Consultant', name: 'MR. NIRANJAN DESHKAR' },
        { role: '3D Visualization', name: '3D POWER' },
      ],
    },

    contact: {
      phone: '777-0000-750',
      whatsapp: '918530763405',
      officeAddress: 'AURA BY LIFESTYLE, Congress Nagar Road, Next To Dreamz Signature, Congress Nagar, Amravati',
      workingHours: 'Mon-Sat | 12:00 PM - 8:00 PM',
      email: 'lifestylehomespace@gmail.com',
    },
  },
};

export const BRAND_CONFIG = {
  name: 'LIFESTYLE HOME SPACES',
  tagline: 'Where Space Meets The Way You Live',
  subTagline: 'Creating spaces that feel like home.',
  phone: '8530763405',
  whatsappNumber: '918530763405',
  logo: '/assets/projects/lifestyle-homes/brand/lifestyle-logo.png',
  address: 'Shop no. 104, First Floor, Next Level Mall, Camp, Amravati - 444602',
  city: 'Amravati, Maharashtra',
  workingHours: 'Mon-Sat | 12:00 PM - 8:00 PM',
  email: 'lifestylehomespace@gmail.com',
  website: 'https://lifestylehomespaces.com/',
  socialLinks: {
    instagram: 'https://www.instagram.com/lifestylerealestate_11/',
    facebook: 'https://www.facebook.com/profile.php?id=61591959993385',
    instagramSecondary: 'https://www.instagram.com/lifestylehomespaces/',
    facebookSecondary: 'https://www.facebook.com/lifestylehomespace/',
  },
  vision: 'To create spaces that enhance living and business, ensuring long-term value, structural integrity, and enduring community trust.',
  mission: 'To build well-planned, reliable properties that serve both homeowners and businesses with quality, transparency, and innovation.',
  team: [
    {
      name: 'Rajesh Mishra',
      role: 'Listing Coordinator',
      phone: '+91 9158111140',
      email: 'lifestylehomespace@gmail.com',
      image: '/assets/brand/team-rajesh-mishra.jpg',
      whatsapp: '919158111140',
    },
    {
      name: 'Amit Talda',
      role: 'Property Developer',
      phone: '+91 9730768982',
      email: 'lifestylehomespace@gmail.com',
      image: '/assets/brand/team-amit-talda.jpg',
      whatsapp: '919730768982',
    },
  ] as TeamMember[],
  coreValues: [
    { title: 'Proven Excellence', description: 'A verifiable track record of delivering resilient, high-grade constructions.' },
    { title: 'Customer Commitment', description: 'Attentive, end-to-end guidance from site visit to keys handover.' },
    { title: 'Collaboration First', description: 'Cohesive engagement between architects, engineers, and homeowners.' },
    { title: 'Passion for Progress', description: 'Continuous integration of modern layouts, ventilation, and sustainable materials.' },
    { title: 'End-to-End Support', description: 'Complete assistance with documentation, home loans, and interior planning.' },
  ],
  blogs: [
    {
      id: 'spacious-flats-amravati',
      title: 'Spacious Flats in Amravati with School, Mall & Station Nearby',
      category: 'Property',
      readTime: '4 min read',
      excerpt: 'Discover spacious and modern flats in Amravati, strategically located near schools, shopping malls, and railway stations.',
      image: '/assets/projects/lifestyle-homes/building/building-hero-polished.jpg',
      content: [
        'When selecting a lifelong residence in Amravati, strategic urban proximity transforms daily life from exhausting transit into effortless convenience. Modern families today demand residences that harmonize spacious interior floor plans with rapid transit access to premier schools, retail hubs, and civic transit nodes.',
        'Lifestyle Homes on DPS Road is specifically engineered to meet this standard. Situated within 2 minutes of Delhi Public School (DPS) and directly adjacent to Avinashe Avenue commercial arcade, children reach their classes without tedious school bus commutes while parents enjoy instantaneous access to daily essentials.',
        'With Amravati Ring Road just 4 minutes away and Irwin Square & Amravati Railway Station under 8 to 10 minutes, residents remain connected to the pulse of the city while residing in a peaceful, noise-insulated neighborhood.',
        'Each apartment is planned with dual-aspect cross-ventilation, generous living spaces exceeding traditional city dimensions, and private sunset balconies that provide uninhibited skyline vistas.'
      ],
      highlights: [
        'Just 2 minutes from Delhi Public School (DPS) on DPS Road',
        'Direct access to Amravati Ring Road and Avinashe Avenue',
        'Ready for Immediate Possession with clear legal titles',
        '100% Vastu-aligned residential orientations with covered parking'
      ],
      relatedProject: 'lifestyle-homes',
    },
    {
      id: 'sample-flat-preview',
      title: 'Sample Flat Preview at Lifestyle Homes — A Step Closer to Everyday Living',
      category: 'Walkthrough',
      readTime: '3 min read',
      excerpt: 'Experience real construction quality, generous ceiling heights, and premium fittings in person at our live sample showcase.',
      image: '/assets/projects/lifestyle-homes/interiors/living-room-polished.jpg',
      content: [
        'Buying a home on paper requires imagination, but inspecting a finished, fully furnished sample apartment provides genuine certainty. At Lifestyle Homes, our live sample flat on DPS Road is open for prospective buyers to touch, feel, and inspect every structural detail.',
        'From the moment you step through the decorative entrance door, you notice the spacious living hall finished with premium vitrified tiles and delicate chandelier lighting fixtures that create an immediate aura of quiet luxury.',
        'The culinary kitchen features mirror-polished granite countertops, heavy-gauge stainless steel sinks, and dedicated utility balconies. Bedrooms are oriented to catch refreshing cross-breezes and morning solar energy through wide powder-coated aluminum sliding windows.',
        'We invite prospective families to walk through the actual corridors, inspect elevator lobbies, and verify room measurements in person.'
      ],
      highlights: [
        'Fully finished 2 BHK & 3 BHK sample apartments open for daily walkthroughs',
        'Inspect actual material specs, tile finishing, and sanitary fittings in person',
        'Developer consultation available on-site with Rajesh Mishra & Amit Talda',
        'Site visits arranged Monday to Saturday, 12:00 PM to 8:00 PM'
      ],
      relatedProject: 'lifestyle-homes',
    },
    {
      id: 'commercial-property-amravati',
      title: 'Why Investing in Commercial Property in Amravati is a Smart Move',
      category: 'Investment',
      readTime: '5 min read',
      excerpt: 'Explore high-visibility commercial corridors and prime retail arcade opportunities offering strong rental yields and footfall.',
      image: '/assets/projects/aura/building/aura-building-perspective.jpg',
      content: [
        'Amravati is witnessing an economic renaissance driven by infrastructure expansion, commercial corridor modernization, and rising retail consumer spending. For savvy investors and business owners, commercial retail spaces represent robust capital appreciation and dependable rental yields.',
        'Key corridors such as Congress Nagar Road and DPS Road offer high vehicular and pedestrian footfall. Developments like Aura by Lifestyle integrate three expansive levels of high-street retail promenades and corporate office suites beneath residential towers.',
        'With dedicated commercial parking, 3.3-meter-wide visitor corridors, and storefronts featuring wide road frontage, these commercial hubs attract national brand franchises, boutique clinics, financial firms, and gourmet dining destinations.',
        'Whether you seek immediate lease-back income or a flagship corporate address for your own business enterprise, strategic commercial developments provide security and long-term liquidity.'
      ],
      highlights: [
        'High visibility retail frontages on Congress Nagar Road & DPS Road',
        'Ideal for medical clinics, corporate offices, retail boutiques, and cafes',
        'Dedicated customer parking bays separate from residential zones',
        'Strong capital appreciation fueled by Amravati’s expanding arterial roads'
      ],
      relatedProject: 'aura',
    },
    {
      id: 'first-time-home-buyers-guide',
      title: 'What First-Time Home Buyers Need to Know Before Investing',
      category: 'Buyer Guide',
      readTime: '4 min read',
      excerpt: 'Essential advice on MahaRERA verification, carpet area transparency, loan eligibility, and location appreciation.',
      image: '/assets/projects/lifestyle-homes/interiors/bedroom-balcony-clean.jpg',
      content: [
        'Purchasing your first home is one of life’s most meaningful financial and personal milestones. However, navigating the landscape of property titles, government approvals, and carpet area definitions can feel overwhelming without clear guidance.',
        'Step one is always verifying MahaRERA registration. A registered project guarantees that all architectural sanctions, title deeds, construction milestones, and escrow bank accounts adhere strictly to statutory consumer protection regulations.',
        'Secondly, prioritize carpet area over super built-up claims. Understanding usable interior dimensions ensures you know exactly how much living space your family will inhabit on a daily basis.',
        'At Lifestyle Home Spaces, we maintain 100% transparency. Our advisors guide buyers through pre-approved home loan options with leading nationalized banks, ensuring smooth paperwork and clear disbursement schedules.'
      ],
      highlights: [
        'Mandatory MahaRERA verification protects homebuyer funds and timelines',
        'Clear carpet area layouts with zero wasted circulation spaces',
        'End-to-end documentation assistance with leading banking partners',
        'Pre-approved home loans with attractive interest rates and flexible tenures'
      ],
      relatedProject: 'lifestyle-homes',
    },
    {
      id: 'quality-durability-assurance',
      title: 'How Lifestyle Home Spaces Ensures Quality & Durability in Every Build',
      category: 'Engineering',
      readTime: '4 min read',
      excerpt: 'From grade-tested concrete to branded CP fittings and electricals, discover our unbending approach to construction longevity.',
      image: '/assets/projects/aura/building/aura-building-front-elevation.jpg',
      content: [
        'Behind every striking architectural elevation lies structural engineering that must stand resilient against the elements for generations. At Lifestyle Home Spaces, our construction philosophy centers on uncompromising structural integrity and premium building materials.',
        'Every project begins with rigorous soil testing and earthquake-resistant RCC framed structures engineered to structural codes. We utilize grade-tested steel reinforcement and laboratory-certified concrete mixes to guarantee compressive durability.',
        'For interiors and domestic plumbing, only branded CP fittings, concealed corrosion-resistant piping, and ISI-certified copper wiring with modular safety switches are specified. This prevents moisture seepage, maintenance headaches, and electrical hazards.',
        'Our engineering leads conduct multi-stage quality audits at foundation, slab casting, brickwork, and waterproofing phases before handing over keys to homeowners.'
      ],
      highlights: [
        'Earthquake-resistant RCC framed structures built to stringent structural codes',
        'Laboratory-tested high-grade concrete and corrosion-resistant steel',
        'Concealed plumbing and branded electrical wiring with modular breakers',
        'Rigorous multi-stage quality assurance audits prior to possession'
      ],
      relatedProject: 'aura',
    },
  ] as BrandBlogPost[],
  faqs: [
    {
      category: 'Properties & Selection',
      question: 'How do buyers explore and book properties with Lifestyle Home Spaces?',
      answer: 'Buyers can browse our portfolio on the platform, view detailed 2D/3D floor plans and walkthroughs, and schedule an on-site visit directly with Amit Talda or Rajesh Mishra.',
    },
    {
      category: 'Properties & Selection',
      question: 'Can I inspect a ready sample flat before making a commitment?',
      answer: 'Yes, fully finished sample residences are available on DPS Road (Lifestyle Homes) and our developer lounge is open Monday to Saturday from 12:00 PM to 8:00 PM.',
    },
    {
      category: 'Legal & MahaRERA',
      question: 'Are all projects approved and compliant with MahaRERA?',
      answer: 'Yes, all our projects hold verified MahaRERA certifications (Aura: P5030002502915). All plans, sanctions, and titles are 100% clear and documented.',
    },
    {
      category: 'Loans & Financing',
      question: 'Do you provide home loan and documentation assistance?',
      answer: 'Our in-house advisory team coordinates with leading nationalized and private banks (SBI, HDFC, ICICI, etc.) for streamlined pre-approvals, paperwork, and disbursement.',
    },
    {
      category: 'Amenities & Maintenance',
      question: 'What amenities and parking facilities are included?',
      answer: 'All projects include dedicated allotted covered parking, high-speed elevators with ARD, 100% Vastu-aligned layouts, 24/7 security surveillance, and project-specific amenities like rooftop decks or community greens.',
    },
  ] as BrandFAQ[],
};

export interface PolicySection {
  title: string;
  content: string[];
}

export const TERMS_OF_USE_CONTENT: PolicySection[] = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using this website, you agree to comply with and be bound by these Terms of Use. If you do not agree, please do not use this website.',
    ],
  },
  {
    title: '2. Property Listings & Availability',
    content: [
      'All property details, pricing, availability, and specifications provided on this website are for informational purposes only and are subject to change without prior notice. Lifestyle Home Spaces does not guarantee the accuracy or completeness of any listing.',
    ],
  },
  {
    title: '3. No Legal or Financial Advice',
    content: [
      'The content on this website does not constitute legal, financial, or investment advice. Users are encouraged to seek independent professional advice before making any real estate decisions.',
    ],
  },
  {
    title: '4. Intellectual Property Rights',
    content: [
      'All content on this website, including text, images, graphics, and logos, is the property of Lifestyle Home Spaces and is protected by copyright laws. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.',
    ],
  },
  {
    title: '5. User Conduct',
    content: [
      'You agree not to engage in any unlawful, abusive, or fraudulent activities while using this website. Any misuse of the website may result in legal action.',
    ],
  },
  {
    title: '6. Third-Party Links',
    content: [
      'This website may contain links to third-party websites. Lifestyle Home Spaces is not responsible for the content, policies, or practices of any third-party sites.',
    ],
  },
  {
    title: '7. Limitation of Liability',
    content: [
      'Lifestyle Home Spaces shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on its content.',
    ],
  },
  {
    title: '8. Modifications to Terms',
    content: [
      'Lifestyle Home Spaces reserves the right to update or modify these Terms of Use at any time without prior notice. Continued use of this website constitutes acceptance of any changes.',
    ],
  },
  {
    title: '9. Governing Law',
    content: [
      'These Terms shall be governed by and construed in accordance with the laws of Maharashtra. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Amravati.',
    ],
  },
];

export const PRIVACY_POLICY_CONTENT: PolicySection[] = [
  {
    title: '1. Information We Collect',
    content: [
      'We may collect personal information such as your name, email, phone number, and property preferences when you interact with our website, submit inquiries, or request property details.',
    ],
  },
  {
    title: '2. Use of Information',
    content: [
      'Your information is used to respond to inquiries, provide requested services, improve website functionality, and send updates on properties, offers, or company news.',
    ],
  },
  {
    title: '3. Sharing of Information',
    content: [
      'We do not sell, rent, or trade your personal data. We may share information strictly with legal or regulatory authorities if required by law, or authorized financial and banking partners assisting in real estate transactions.',
    ],
  },
  {
    title: '4. Data Security',
    content: [
      'We take appropriate security measures to protect personal information. However, we cannot guarantee absolute security against unauthorized access or breaches.',
    ],
  },
  {
    title: '5. Cookies & Tracking Technologies',
    content: [
      'Our website may use cookies to enhance user experience and collect analytics. Users can manage cookie preferences through browser settings.',
    ],
  },
  {
    title: '6. Third-Party Links',
    content: [
      'Our website may contain links to external sites. We are not responsible for the privacy practices or content of third-party websites.',
    ],
  },
  {
    title: '7. Your Rights',
    content: [
      'Users have the right to request access to their personal information, opt-out of marketing communications, or request deletion of their personal data subject to legal obligations.',
    ],
  },
  {
    title: '8. Policy Updates',
    content: [
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with the revised date.',
    ],
  },
  {
    title: '9. Contact Information',
    content: [
      'For any concerns regarding our Terms or Privacy Policy, you may contact us at: lifestylehomespace@gmail.com | +91 9730768982 | Shop no. 104, First Floor, Next Level Mall, Camp, Amravati - 444602',
    ],
  },
];
