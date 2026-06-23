import React, { useState } from 'react';
import { 
  Trees, Compass, Calendar, Award, CheckCircle2, Star, ArrowLeft, ArrowRight, 
  Sparkles, Building2, Eye, MapPin, Landmark, Heart, Users, Coffee, BedDouble, HelpCircle
} from 'lucide-react';
import { Property } from '../types';

interface KirteePropertyPageProps {
  onBookNow: (property: Property) => void;
  onBackToMarketplace: () => void;
  kirteeProperty: Property;
  onTriggerGdsRedirect: (propertyName: string) => void;
}

export default function KirteePropertyPage({ 
  onBookNow, 
  onBackToMarketplace, 
  kirteeProperty,
  onTriggerGdsRedirect
}: KirteePropertyPageProps) {
  
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cottage' | 'suite'>('all');

  const galleryList = kirteeProperty?.gallery || [
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80'
  ];

  // Specific Room Categories
  const rooms = [
    {
      name: 'Eco Cottage',
      price: 5500,
      size: '420 sq.ft',
      capacity: '2 Adults',
      image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80',
      description: 'Rustic yet premium handcrafted mud-and-thatch design with elegant modern bathrooms.',
      amenities: ['Private Forest Patio', 'Fully AC', 'Walk-in Rainshower', 'Organic Tea Station', 'Hammock'],
      type: 'cottage'
    },
    {
      name: 'Premium Cottage',
      price: 7500,
      size: '550 sq.ft',
      capacity: '2 Adults + 1 Child',
      image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=800&q=80',
      description: 'Spacious, elevated glass cottage offering stunning views of the surrounding cashew reserve.',
      amenities: ['Elevated Deck', 'Fully AC', 'Mini-bar', 'Smart TV', 'Premium Linens'],
      type: 'cottage'
    },
    {
      name: 'Family Villa',
      price: 11500,
      size: '800 sq.ft',
      capacity: '4 Adults',
      image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=80',
      description: 'Two-bedroom luxury cottage styled with local wooden arts and spacious private living lawn.',
      amenities: ['Two King Beds', 'Private Lawn', 'Outdoor Plunge Tub', '24/7 Butler Support'],
      type: 'cottage'
    },
    {
      name: 'Pool View Suite',
      price: 13500,
      size: '720 sq.ft',
      capacity: '2 Adults + 2 Children',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      description: 'Exclusive master sanctuary overlooking our bio-filtered natural swimming pool.',
      amenities: ['Living Lounge', 'Infinity Pool Access', 'Welcome Fruit Platter', 'Spa Voucher'],
      type: 'suite'
    },
    {
      name: 'Executive Convention Suite',
      price: 16500,
      size: '950 sq.ft',
      capacity: '2 Adults',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      description: 'High-end suite with integrated boardroom desk and supercharged high-speed Wi-Fi connectivity for executives.',
      amenities: ['Boardroom Workspace', 'Deep Bath Tub', 'Express Check-in', 'Coffee Machine', 'Concierge Support'],
      type: 'suite'
    }
  ];

  const filteredRooms = selectedCategory === 'all' 
    ? rooms 
    : rooms.filter(r => r.type === selectedCategory);

  // Dining Experiences list
  const dinings = [
    {
      title: 'Haritanna - Forest to Fork',
      desc: 'Our fine dining signature venue serving exclusively organic recipes, crafted with superfoods harvested minutes prior from our sprawling 15-acre resort botanical garden.',
      hours: '7:00 AM - 11:00 PM',
      highlight: 'Chef Special Smoked Claypot Dal'
    },
    {
      title: 'The Infusion Deck',
      desc: 'An open-air wellness lounge situated under old cashew trees, offering curated Ayurvedic herbal teas, mocktails, and refreshing cold-pressed fruit nectars.',
      hours: '4:00 PM - 9:00 PM',
      highlight: 'Odishan Lemongrass & Holy Basil Elixir'
    },
    {
      title: 'Earth & Embers Pit',
      desc: 'An interactive sunset clay oven culinary theater. Enjoy customized woodsmoke kebabs, organic grilled paneer, and slow-baked breads on stone grills around bonfire hubs.',
      hours: '7:30 PM - 10:30 PM',
      highlight: 'Casuarina Smoked Pit Delicacies'
    }
  ];

  // Specific Core Experiences
  const natureExperiences = [
    { title: 'The Wildlife Cashew Trails', desc: 'Curated morning hiking paths into the bordering Balukhand Sanctuary led by certified eco-botanist naturalists.' },
    { title: 'Organic Farm Harvest', desc: 'Participate directly in farm-to-table planting, vegetable harvesting, and organic farming masterclasses with local farmers.' },
    { title: 'Tribal Bonfire Storytelling', desc: 'Unwind around cozy crackling fire pits listening to legacy Odia folk lore, flute melodies, and acoustic rhythms.' },
    { title: 'Recreational Archery & ATV', desc: 'Dedicated eco-safe physical adventure fields featuring archery targets, obstacle grids, and off-road ATV tracks.' },
    { title: 'Vedic Panchkarma Shala', desc: 'Immersive sound bowl therapies, sunrise pranayam sessions, and customizable eco-wellness massage therapies.' },
    { title: 'Corporate Retreat Initiatives', desc: 'Dynamic wilderness-based survival simulators and structured team building leadership modules.' }
  ];

  // Convention Details
  const conventionFacilities = [
    { title: 'The Kalinga Summit Hall', cap: '600 Delegates', desc: 'Pillar-less state-of-the-art corporate event auditorium with customizable staging setups.' },
    { title: 'The Casuarina Lawn Garden', cap: '1500 Guests', desc: 'Sprawling grass amphitheater ideal for grand eco-luxury destination weddings and green banquet receptions.' },
    { title: 'Pragati Executive Boardrooms', cap: '25 Executives', desc: 'High-speed smart connected dens featuring interactive display glass and modular seating.' }
  ];

  // Corporate & Celebration Programs
  const businessRetreats = [
    { title: 'Business Summits & Training', desc: 'Full-day modular schedules offering multi-hall events, projection desks, and premium nature-breaks.' },
    { title: 'Destination Green Weddings', desc: 'Bespoke zero-plastic elegant wedding setups, clay-art floral pandals, traditional folk welcomes, and Sattvik feasts.' },
    { title: 'Family Integration Camps', desc: 'Multi-family cottage clusters featuring physical adventure tournaments, pottery workshops, and lagoon pool games.' }
  ];

  const testimonials = [
    {
      quote: "KIRTEE Eco Resort was the ultimate layout for our corporate design workshop. Combining seamless high-end boardrooms with cashew tree team building runs was magical. Bypassing OTA commissions via Bharat Travels dashboard made our budgeting flawless.",
      author: "Aditya Vardhan Sengupta",
      role: "VP Design, Tata Logistics Group",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Our destination green wedding at KIRTEE was pristine. Zero plastic, beautiful terracotta decorations, and traditional Odia folk musicians made our vows memorable. The shared platform allowed guests to coordinate airport transits easily.",
      author: "Swarupa Patnaik & Dr. Nair",
      role: "Newlyweds & Eco-advocates",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="bg-[#fcfbf9] text-[#1e2d24] relative min-h-screen font-sans selection:bg-emerald-600 selection:text-white" id="kirtee-property-portal">
      
      {/* Dynamic Earth Accent Lines */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#f0ede6]/70 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating property navbar spacer */}
      <div className="bg-emerald-950 text-emerald-100 py-3.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 flex flex-wrap justify-between items-center gap-3 relative z-30">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={onBackToMarketplace}
            className="flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white transition-colors border border-emerald-850 bg-emerald-900/30 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Bharat Marketplace
          </button>
          <span className="text-emerald-700 font-mono text-xs hidden sm:inline">|</span>
          <span className="text-[10px] sm:text-xs text-emerald-400 font-mono tracking-widest font-bold uppercase flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            DIRECT PLATFORM INTERFACE
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onTriggerGdsRedirect('KIRTEE Eco Resort & Convention')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] sm:text-xs font-bold uppercase px-4 py-1.5 rounded-lg tracking-wider transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
          >
            Open PMS Console
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ================= HERO BANNER ================= */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-emerald-900/20 bg-emerald-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1600&q=80" 
            alt="KIRTEE Eco Resort & Convention" 
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/85 border border-emerald-700/60 text-emerald-300 font-mono text-[10px] sm:text-xs tracking-widest font-extrabold shadow-2xl">
            <Trees className="w-4 h-4 text-emerald-450 animate-bounce" />
            PREMIUM ECO LUXURY & CONVENTION
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-white leading-none font-bold tracking-tight">
            KIRTEE Eco Resort<br />
            <span className="text-emerald-300">& Convention</span>
          </h1>

          <p className="text-lg sm:text-xl text-emerald-100 font-mono tracking-widest font-medium max-w-xl mx-auto border-t border-b border-emerald-800/65 py-2.5">
            Nature. Events. Experiences.
          </p>

          <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl mx-auto leading-relaxed">
            Sprawling over 15 acres of organic forest reserves bordering the Chandrabhaga coast. Experience the timeless union of natural woodwork, luxury business assemblies, and direct booking GDS transparency.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => onBookNow(kirteeProperty)}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all cursor-pointer transform active:scale-95 text-xs uppercase tracking-widest"
            >
              Direct Guest Book Now
            </button>
            <button 
              onClick={() => onTriggerGdsRedirect('KIRTEE Eco Resort & Convention')}
              className="w-full sm:w-auto bg-transparent border border-emerald-500 text-emerald-300 hover:bg-emerald-900/40 font-semibold px-8 py-4 rounded-xl transition-all cursor-pointer text-xs uppercase tracking-widest"
            >
              Check Shared PMS Ledger
            </button>
          </div>
        </div>
      </section>

      {/* ================= PROPERTY OVERVIEW ================= */}
      <section className="py-24 bg-white" id="kirtee-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left overview context */}
            <div className="space-y-6">
              <span className="text-xs font-mono text-emerald-750 font-bold uppercase tracking-widest">
                Sustainable Modern Hospitality
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-emerald-950 font-bold leading-tight">
                Where High-Octane Corporate Assemblies Meet Earthy Solitude
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                KIRTEE Eco Resort & Convention breaks the mold of conventional business stays. Every brick is hand-molded; every pillar timber is responsibly sourced. Rooted in traditional Odishan wood crafts and modern modular structural engineering, the resort serves as Odisha's premier luxury retreat and business summit ground.
              </p>

              {/* Grid overview pointers */}
              <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                  <span className="block font-serif text-lg font-bold text-emerald-900">15 Acres</span>
                  <p className="text-slate-500 leading-snug">Sprawling organic lawns, cashew pathways, and botanical gardens</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                  <span className="block font-serif text-lg font-bold text-emerald-900">100% Bio</span>
                  <p className="text-slate-500 leading-snug">Zero-chemical filtered natural swimming pools & organic crops</p>
                </div>
              </div>
            </div>

            {/* Right Side visual with overview checklist */}
            <div className="p-6 bg-[#f7f6f2] rounded-3xl border border-emerald-800/10 space-y-6 shadow-sm">
              <h4 className="font-serif text-lg font-bold text-emerald-950 border-b border-emerald-900/10 pb-3">
                Integrated Shared Platform Amenities
              </h4>

              <p className="text-xs text-slate-600">
                As a premier onboarded partner of the <strong>Bharat Travels Circle</strong>, we route all operational channels directly through a secure centralized GDS platform:
              </p>

              <div className="space-y-3">
                {[
                  'Shared Web Check-In with instant digital ticket passes',
                  'Frictionless automated GST Invoicing & escrows',
                  'Direct unified fleet transit dispatch (Limo SUVs, Mini-buses)',
                  'Direct PMS tracking to eliminate dual-inventory hazards',
                  'Secure member ledger tracking direct yields in real-time',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-805 px-3 py-1.5 rounded-lg border border-emerald-200 uppercase font-black">
                  Zero commission leakage checked
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= RESORT GALLERY ================= */}
      <section className="py-20 bg-[#f4f3ee] border-t border-b border-emerald-800/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <span className="text-xs font-mono text-emerald-700 tracking-widest uppercase font-extrabold">RESORT ALBUM</span>
            <h2 className="text-3xl font-serif text-emerald-950 font-bold mt-1">Ecosystem Photo Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Big Active Image (8 cols) */}
            <div className="md:col-span-8 h-80 sm:h-96 lg:h-[480px] rounded-2xl overflow-hidden shadow-md relative border border-emerald-900/15">
              <img 
                src={galleryList[activeGalleryIdx]} 
                alt="Active Gallery" 
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6 text-left">
                <span className="font-mono text-[10px] uppercase text-emerald-300 font-bold">KIRTEE Eco Reserve, Konark</span>
                <p className="font-serif text-sm text-white mt-1">Bespoke Timber Architecture & Holistic Healing Sinks</p>
              </div>
            </div>

            {/* Thumbnails list (4 cols) */}
            <div className="md:col-span-4 flex flex-col justify-between gap-3 h-auto md:h-[480px]">
              {galleryList.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIdx(idx)}
                  className={`w-full h-24 lg:h-28 rounded-xl overflow-hidden border transition-all ${
                    activeGalleryIdx === idx ? 'border-emerald-600 ring-2 ring-emerald-600/30 ring-offset-2' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt={`Resort Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACCOMMODATION / ROOM CATEGORIES ================= */}
      <section className="py-24 bg-white" id="kirtee-accommodation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-700 tracking-widest uppercase font-extrabold">RESORT SANCTUARIES</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-emerald-950 font-bold mt-1">Aesthetic Accommodations</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md">Each shelter is styled with natural clays, premium wood ceilings, and high-tech amenities.</p>
            </div>
            
            {/* Filter buttons */}
            <div className="flex bg-slate-105 p-1 rounded-xl border border-slate-201 text-xs font-semibold shrink-0">
              {(['all', 'cottage', 'suite'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer uppercase text-[10px] tracking-wider font-bold ${
                    selectedCategory === cat ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'all' ? 'All Shelters' : cat + 's'}
                </button>
              ))}
            </div>
          </div>

          {/* Accommodation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div key={room.name} className="flex flex-col rounded-3xl overflow-hidden bg-[#fafaf8] border border-slate-200/80 hover:shadow-xl hover:border-emerald-700/20 transition-all duration-300">
                <div className="h-56 relative overflow-hidden shrink-0">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-emerald-900/95 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-emerald-600/30 uppercase">
                    {room.size} | {room.capacity}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-emerald-950 leading-tight">{room.name}</h4>
                    <p className="text-xs text-slate-650 leading-relaxed line-clamp-2">{room.description}</p>
                    
                    {/* Amenities Sublist */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {room.amenities.map((am) => (
                        <span key={am} className="text-[9px] bg-slate-100 text-slate-600 font-mono px-2 py-1 rounded border border-slate-200 uppercase font-black">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200/80 pt-4 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block uppercase">DIRECT TARIFF</span>
                      <span className="text-xl font-extrabold text-emerald-950 font-sans">₹{room.price.toLocaleString('en-IN')}<span className="text-slate-500 text-xs font-normal">/nt</span></span>
                    </div>

                    <button 
                      onClick={() => onBookNow(kirteeProperty)}
                      className="bg-emerald-750 hover:bg-emerald-605 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl cursor-pointer shadow-sm active:scale-95 transition-all"
                    >
                      Instant Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DINING EXPERIENCES ================= */}
      <section className="py-24 bg-[#14281a] text-white relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase font-extrabold">RESORT CUISINES</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight">Authentic Organic Gastronomy</h2>
            <p className="text-xs text-emerald-200/80 max-w-xl mx-auto">Savor culinary masterpieces that celebrate pure organic agriculture and timber-smoke cooking.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dinings.map((dining) => (
              <div key={dining.title} className="p-8 rounded-3xl bg-[#1d3525] border border-emerald-800/40 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase leading-none">{dining.hours}</span>
                  <h4 className="font-serif text-xl font-bold text-white tracking-tight">{dining.title}</h4>
                  <p className="text-xs text-emerald-100/75 leading-relaxed">{dining.desc}</p>
                </div>

                <div className="border-t border-emerald-800/50 pt-4 flex items-center justify-between text-xs text-emerald-300">
                  <span className="font-mono">Signature:</span>
                  <span className="font-bold underline text-white italic">{dining.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NATURE & WELLNESS EXPERIENCES ================= */}
      <section className="py-24 bg-white" id="kirtee-experiences">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-emerald-700 tracking-widest uppercase font-extrabold">CURATED IMMERSION</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-emerald-950 font-bold">Unparalleled Nature Experiences</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Engage your physical senses, calm your mind, and build lasting corporate bonds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {natureExperiences.map((exp, idx) => (
              <div key={exp.title} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-150 flex items-center justify-center shrink-0 text-emerald-750">
                  <span className="font-mono font-bold text-sm">0{idx + 1}</span>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-emerald-950 leading-snug">{exp.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CONVENTION FACILITIES ================= */}
      <section className="py-24 bg-[#faf9f5] border-t border-b border-slate-200/60" id="kirtee-conventions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-emerald-750 font-bold uppercase tracking-widest">EVENT & MICE GENERAL</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#13251a] font-bold leading-tight">Odisha's Premium Green Assembly Destination</h2>
            <p className="text-sm text-slate-655 leading-relaxed">
              Why settle for standard glass boxes in crowded cities? KIRTEE and our shared platform GDS infrastructure host high-volume executive conferences, team challenges, and luxurious wedding banquets. From advanced AV systems in our central halls to pristine seaside lawn spaces, every detail is engineered to support professional success and memorable celebrations in the lap of nature.
            </p>

            <div className="space-y-4 pt-4">
              {conventionFacilities.map((fac) => (
                <div key={fac.title} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <h5 className="font-serif text-sm font-bold text-emerald-950">{fac.title}</h5>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-805 px-2 py-0.5 rounded-md font-bold uppercase">{fac.cap}</span>
                  </div>
                  <p className="text-xs text-slate-500">{fac.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-750 shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <h5 className="font-serif text-lg font-bold text-emerald-950">Corporate Meetings & Trg</h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                Empower your executives with smart, modular spaces, high resolution video screens, and direct catering. We arrange complete group dining buffers with customized dietary formats.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-505 shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <h5 className="font-serif text-lg font-bold text-emerald-950">Grand Destination Weddings</h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                Step into a green wedding fairytale. Terracotta canopies, handmade sand art altars on Chandrabhaga sands, organic Odia feast lines, and dynamic guest transport routing.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4 sm:col-span-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-650 shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <h5 className="font-serif text-lg font-bold text-emerald-950">Corporate Retreat Programs</h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                Unite your global workforce with customized wilderness simulators, obstacle races, and collective farm harvesting. Shared travel fleet dispatch covers airport pick-up smoothly.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-white" id="kirtee-testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-emerald-750 font-bold uppercase tracking-widest">VERIFIED STORIES</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#122218] font-bold">Resort Guest Testimonial Ledger</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test) => (
              <div key={test.author} className="p-8 rounded-3xl bg-[#fcfbf7] border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-slate-202">
                  <img src={test.avatar} alt={test.author} className="w-10 h-10 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="font-serif text-sm font-bold text-emerald-950">{test.author}</h5>
                    <span className="text-[10px] text-slate-450 font-mono">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= BOOKING CTA ================= */}
      <section className="py-20 bg-emerald-950 text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/25 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs text-emerald-450 font-mono tracking-widest font-extrabold uppercase">SECURE RESORT DIRECT PMS PORTAL</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold tracking-tight">Lock in Your Green Escape Today</h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl mx-auto leading-relaxed">
            By booking directly through the Bharat Travels shared platform, you receive instant check-in clearances, zero double-booking inventory failures, and verified escrow wallet protection.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-sm mx-auto">
            <button 
              onClick={() => onBookNow(kirteeProperty)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all cursor-pointer transform active:scale-95 text-xs uppercase tracking-widest"
            >
              Direct Book Room
            </button>
            <button 
              onClick={onBackToMarketplace}
              className="w-full bg-transparent border border-emerald-555 hover:bg-emerald-900/40 text-emerald-100 font-semibold py-4 rounded-xl transition-all cursor-pointer text-xs uppercase"
            >
              Return to Marketplace
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
