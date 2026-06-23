import React, { useState, useEffect } from 'react';
import { 
  Compass, MapPin, Star, ArrowRight, Search, Calendar, Users, 
  Building2, CheckCircle2, ChevronRight, Award, ShieldCheck, 
  Car, Info, Ticket, Check, X, ShieldAlert, Heart, CalendarRange, Clock, Coffee, Sparkles, Send, Eye, ShieldCheck as ShieldIcon, Globe, Map, Anchor, Users2, Library,
  Plane, Train, Briefcase
} from 'lucide-react';
import Navbar from './components/Navbar';
import { motion } from 'motion/react';
import BookingPortal from './components/BookingPortal';
import PartnerDashboard from './components/PartnerDashboard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import KirteePropertyPage from './components/KirteePropertyPage';
import GdsRedirectLoader from './components/GdsRedirectLoader';
import TransportBookingPortal from './components/TransportBookingPortal';
import TransportDashboard from './components/TransportDashboard';
import { DESTINATIONS, HOTELS, RESORTS, EXPERIENCES, VEHICLES, TESTIMONIALS } from './data';
import { Property, Vehicle, Booking, Destination } from './types';
import { 
  KonarkWheelSVG, 
  JagannathTempleSVG, 
  OdissiDancerSVG, 
  RajasthanPalaceSVG, 
  KeralaHouseboatSVG, 
  VaranasiGhatsSVG
} from './components/CulturalMotifs';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.5,
    },
  },
};


export default function App() {
  // Master Workspace switcher ('customer' | 'staff' | 'owner')
  const [workspace, setWorkspace] = useState<'customer' | 'staff' | 'owner'>('customer');
  const [isPortalLoginOpen, setIsPortalLoginOpen] = useState(false);
  const [portalSelect, setPortalSelect] = useState<'staff' | 'owner'>('staff');
  const [portalPasscode, setPortalPasscode] = useState('');
  const [portalError, setPortalError] = useState('');

  // Master Lists
  const [localProperties, setLocalProperties] = useState<Property[]>(() => [...HOTELS, ...RESORTS]);

  // GDS Property Selector & State Controllers
  const [currentPropertyName, setCurrentPropertyName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlProp = params.get('property');
      if (urlProp) {
        localStorage.setItem('bharat_travels_selected_property', urlProp);
        return urlProp;
      }
      const stored = localStorage.getItem('bharat_travels_selected_property');
      if (stored) return stored;
    }
    return 'Niladri Shore Resort';
  });

  const [activePropertyPageView, setActivePropertyPageView] = useState<'marketplace' | 'kirtee'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlProp = params.get('property');
      if (urlProp && urlProp.toLowerCase().includes('kirtee')) {
        return 'kirtee';
      }
    }
    return 'marketplace';
  });

  const [gdsRedirectState, setGdsRedirectState] = useState<{
  isRedirecting: boolean;
  propertyName: string;
  targetUrl: string;
} | null>(null);

// Helper trigger for premium loading redirect
const triggerGdsRedirect = (propertyName: string) => {
  localStorage.setItem('bharat_travels_selected_property', propertyName);
  const targetUrl = "https://ais-pre-pz53nhau76qrsxicbwhilx-1046839605750.asia-southeast1.run.app/";
  
  // Open the link in a new tab to bypass the preview iframe block
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
};
// Listen for state changes and execute the redirect
useEffect(() => {
  if (gdsRedirectState?.isRedirecting && gdsRedirectState.targetUrl) {
    window.location.href = gdsRedirectState.targetUrl;
  }
}, [gdsRedirectState]);
  
  // Bookings state
  const [activeBookings, setActiveBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('bharat_travels_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlistState, setWishlistState] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('bharat_travels_wishlist');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const toggleWishlist = (id: string) => {
    setWishlistState(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('bharat_travels_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Date formatting utility for modern Agoda/MMT style search widget
  const formatMarketplaceDate = (dateStr: string) => {
    if (!dateStr) return { day: '--', month: 'Select Date', weekday: '---' };
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return { day: '--', month: 'Select Date', weekday: '---' };
      const day = date.getDate().toString().padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = `${monthNames[date.getMonth()]}'${date.getFullYear().toString().slice(-2)}`;
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const weekday = weekdays[date.getDay()];
      return { day, month, weekday };
    } catch (e) {
      return { day: '--', month: 'Select Date', weekday: '---' };
    }
  };

  // Search Widget state
  const [searchCategory, setSearchCategory] = useState<'hotel' | 'resort' | 'tour' | 'transport'>('hotel');
  const [searchDestination, setSearchDestination] = useState('Puri');
  const [searchCheckIn, setSearchCheckIn] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split('T')[0];
  });
  const [searchCheckOut, setSearchCheckOut] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 10);
    return nextWeek.toISOString().split('T')[0];
  });
  const [searchGuests, setSearchGuests] = useState('2');
  const [searchRooms, setSearchRooms] = useState('1');
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(1);
  const [hudCollapsed, setHudCollapsed] = useState(false);

  // Premium Marketplace State Additions
  const [searchPriceRange, setSearchPriceRange] = useState<'all' | '1000-3000' | '3000-5000' | '5000+'>('all');
  const [searchAmenityFilter, setSearchAmenityFilter] = useState<'all' | 'free-wifi' | 'swimming-pool' | 'beach-access'>('all');
  const [searchSortOrder, setSearchSortOrder] = useState<'price-low-to-high' | 'price-high-to-low'>('price-low-to-high');
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isDestFocus, setIsDestFocus] = useState(false);
  
  // Real-time filtering / interactive selection
  const [hotelCityTab, setHotelCityTab] = useState<'Puri' | 'Bhubaneswar'>('Puri');
  const [filteredHotels, setFilteredHotels] = useState<Property[]>(() => HOTELS.filter(h => h.location.includes('Puri')));
  const [filteredResorts, setFilteredResorts] = useState<Property[]>(RESORTS);

  // Property Detail Modal state
  const [selectedProp, setSelectedProp] = useState<Property | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Booking Portal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);

  // Standalone Transport Checkout state
  const [isTransportBookingOpen, setIsTransportBookingOpen] = useState(false);
  const [selectedTransportVehicle, setSelectedTransportVehicle] = useState<Vehicle | null>(null);

  // Property Onboarding Form State
  const [partnerFormData, setPartnerFormData] = useState({
    propertyName: '',
    propertyType: 'Hotel',
    contactPerson: '',
    mobileNumber: '',
    email: '',
    city: '',
    state: '',
    message: ''
  });
  const [partnerFormSubmitted, setPartnerFormSubmitted] = useState(false);

  // Dynamic booking status update handler (for Transport operations console)
  const handleUpdateBookingFields = (id: string, updatedFields: Partial<Booking>) => {
    setActiveBookings(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
  };

  // My Bookings Dashboard Modal
  const [isBookingsDashboardOpen, setIsBookingsDashboardOpen] = useState(false);

  // Stats Counters
  const [stats, setStats] = useState({
    properties: 198,
    destinations: 45,
    satisfaction: 99.6,
    supportOnline: true
  });

  // Trigger search filters
  useEffect(() => {
    let lowerQuery = searchDestination.toLowerCase().trim();
    if (!lowerQuery) {
      setFilteredHotels(HOTELS.filter(h => h.location.includes(hotelCityTab)));
      setFilteredResorts(RESORTS);
    } else {
      const matchedHotels = HOTELS.filter(h => 
        h.name.toLowerCase().includes(lowerQuery) || 
        h.location.toLowerCase().includes(lowerQuery) || 
        h.state.toLowerCase().includes(lowerQuery)
      );
      setFilteredHotels(matchedHotels);

      const matchedResorts = RESORTS.filter(r => 
        r.name.toLowerCase().includes(lowerQuery) || 
        r.location.toLowerCase().includes(lowerQuery) || 
        r.state.toLowerCase().includes(lowerQuery)
      );
      setFilteredResorts(matchedResorts);
    }
  }, [searchDestination, hotelCityTab]);

  // Sync Bookings database
  useEffect(() => {
    localStorage.setItem('bharat_travels_bookings', JSON.stringify(activeBookings));
  }, [activeBookings]);

  // Smooth scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchSubmitted(true);
    setActiveJourneyStep(3);
    setTimeout(() => {
      scrollToSection('search-results-section');
    }, 120);
  };

  const handleAddBooking = (newBooking: Booking) => {
    setActiveBookings(prev => [newBooking, ...prev]);
    setActiveJourneyStep(6);
    setTimeout(() => {
      setIsBookingOpen(false);
      setIsBookingsDashboardOpen(true);
    }, 800);
  };

  const handleCancelBooking = (id: string) => {
    if (confirm('Cancel this verified travel pass with 100% immediate escrow refund to your wallet?')) {
      setActiveBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  // Triggers booking portal for hotels or resorts
  const triggerPropertyBookingForm = (property: Property) => {
    setIsDetailsOpen(false);
    triggerGdsRedirect(property.name);
  };

  // Triggers booking portal for transport
  const triggerVehicleBookingForm = (vehicle: Vehicle) => {
    setBookingProperty(null);
    setBookingVehicle(vehicle);
    setIsBookingOpen(true);
  };

  // Opens property details modal
  const openPropertyDetails = (property: Property) => {
    triggerGdsRedirect(property.name);
  };

  // Adds property locally via partner onboarding form list
  const handleAddNewOnboardedProperty = (newProperty: Property) => {
    setLocalProperties(prev => [newProperty, ...prev]);
    if (newProperty.category === 'resort') {
      setFilteredResorts(prev => [newProperty, ...prev]);
    } else {
      setFilteredHotels(prev => [newProperty, ...prev]);
    }
    setStats(prev => ({ ...prev, properties: prev.properties + 1 }));
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 relative selection:bg-saffron-500 selection:text-white overflow-x-hidden">
      
      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[800px] h-[400px] bg-saffron-100/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-navy-100/30 rounded-full blur-[150px] pointer-events-none" />
      
      {/* 1. Navbar */}
      {activePropertyPageView === 'marketplace' && workspace === 'customer' && (
        <Navbar 
          onNavigate={scrollToSection} 
          onOpenOwnerDemo={() => setIsPortalLoginOpen(true)}
          onOpenMyBookings={() => setIsBookingsDashboardOpen(true)}
          bookingCount={activeBookings.length}
          onOpenPortal={() => setIsPortalLoginOpen(true)}
        />
      )}

      <main className={activePropertyPageView === 'marketplace' ? "block" : "hidden"}>
        {/* 2. Hero Presentation (Section 1: Hero & Search Experience) */}
        <section id="hero" className="relative w-full">
          {/* A beautiful high banner with majestic Rath Yatra scenery */}
          <div className="relative h-[530px] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
            {/* Majestic Rath Yatra festival background */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1600&q=85" 
                alt="Puri Rath Yatra Chariots Festival" 
                className="w-full h-full object-cover opacity-35"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/90" />
            </div>



            {/* Classical Odissi Dancer on the right of the hero banner */}
            <div className="absolute right-6 md:right-16 bottom-16 md:bottom-28 z-10 hidden md:block font-serif">
              <img 
                src="https://images.unsplash.com/photo-1599707367072-cd6adb2bc374?auto=format&fit=crop&w=350&q=80" 
                alt="Odissi Traditional Dancer" 
                className="w-36 h-48 md:w-44 md:h-60 object-cover rounded-3xl border-2 border-saffron-550/80 shadow-2xl rotate-3"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-3 -right-3 bg-saffron-500 text-white text-[9px] font-mono font-bold px-2 py-1 rounded-lg shadow-lg">
                ODISSI CLASSICAL HERITAGE
              </div>
            </div>

            {/* Central overlay heading and subtitle */}
            <div className="text-center px-4 max-w-4xl mx-auto z-10 text-white space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron-500/20 border border-saffron-500/30 shadow-inner">
                <Sparkles className="w-4 h-4 text-saffron-400 animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-saffron-300">
                  DISCOVER • STAY • EXPERIENCE • SHUTTLE
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-serif text-white font-extrabold leading-tight tracking-tight">
                Experience the Divine Land <br />
                of <span className="bg-gradient-to-r from-saffron-400 via-saffron-350 to-gold-400 bg-clip-text text-transparent italic">{`Lord Jagannath`}</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
                Your Travel Celebrations Begin Here Only with Bharat Travels. Directly connecting stays, experiences, and handpicked local transit operators.
              </p>
            </div>
          </div>

          {/* Redesigned Premium Travel Marketplace Search Experience */}
          <div className="relative z-35 max-w-7xl mx-auto px-4 -mt-20 md:-mt-24 mb-16">
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(10,32,60,0.12)] border border-slate-100 p-6 md:p-8 relative">
              
              {/* Top Row: Horizontal Tabs for Stays, Resorts, Activities, Transport */}
              <div className="flex flex-wrap items-center gap-6 border-b border-slate-100 pb-4 mb-6">
                {[
                  { key: 'hotel', label: 'Stays', icon: <Building2 className="w-4 h-4" /> },
                  { key: 'resort', label: 'Resorts', icon: <Compass className="w-4 h-4" /> },
                  { key: 'tour', label: 'Activities', icon: <Star className="w-4 h-4" /> },
                  { key: 'transport', label: 'Transport', icon: <Car className="w-4 h-4" /> }
                ].map(cat => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => {
                      setSearchCategory(cat.key as any);
                      setIsGuestDropdownOpen(false);
                      setIsPriceDropdownOpen(false);
                      setIsDestFocus(false);
                    }}
                    className={`flex items-center gap-2 pb-3.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 border-b-2 cursor-pointer ${
                      searchCategory === cat.key 
                        ? 'border-orange-500 text-orange-600 font-extrabold' 
                        : 'border-transparent text-slate-400 hover:text-navy-500'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Main Search Marketplace Card with 5-Column Grid */}
              <form onSubmit={handleSearchSubmit} className="relative pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y sm:divide-y-0 md:divide-x divide-slate-150 border border-slate-200 rounded-3xl bg-white overflow-visible">
                  
                  {/* Column 1: Destination */}
                  <div className="relative p-5 text-left hover:bg-slate-50/50 transition-colors duration-150 rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none md:rounded-r-none">
                    <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      {searchCategory === 'transport' ? 'PICKUP FROM' : 'DESTINATION'}
                    </span>
                    <input 
                      type="text"
                      required
                      placeholder="City, Property Name or Destination"
                      value={searchDestination}
                      onChange={(e) => setSearchDestination(e.target.value)}
                      onFocus={() => {
                        setIsDestFocus(true);
                        setIsGuestDropdownOpen(false);
                        setIsPriceDropdownOpen(false);
                      }}
                      className="w-full bg-transparent text-lg md:text-xl font-bold text-navy-500 placeholder-slate-350 outline-none border-none p-0 focus:ring-0 leading-tight block"
                    />
                    
                    {isDestFocus && (
                      <>
                        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsDestFocus(false)} />
                        <div className="absolute left-4 top-full mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-left animate-fade-in animate-duration-150">
                          <span className="text-[9px] font-mono text-slate-400 block pb-1 border-b uppercase font-bold mb-2">
                            Popular Destinations
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {["Puri", "Bhubaneswar", "Goa", "Jaipur", "Manali", "Varanasi"].map(city => (
                              <button
                                key={city}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSearchDestination(city);
                                  setIsDestFocus(false);
                                }}
                                className="px-3 py-2 bg-slate-50 hover:bg-orange-50 hover:text-orange-700 text-slate-650 text-xs font-mono text-left rounded-xl transition-all cursor-pointer border border-transparent hover:border-orange-200 flex items-center gap-1.5"
                              >
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span>{city}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Column 2: Check-In */}
                  <div className="relative p-5 text-left hover:bg-slate-50/50 transition-colors duration-150">
                    <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {searchCategory === 'transport' ? 'TRAVEL DATE' : 'CHECK-IN'}
                    </span>
                    
                    {(() => {
                      const { day, month, weekday } = formatMarketplaceDate(searchCheckIn);
                      return (
                        <div className="relative flex items-center gap-2 cursor-pointer group">
                          <span className="text-3xl font-mono font-black text-navy-500 tracking-tighter leading-none">
                            {day}
                          </span>
                          <div className="text-left leading-tight flex flex-col">
                            <span className="text-[11px] font-sans font-extrabold text-navy-500 uppercase tracking-tight">
                              {month}
                            </span>
                            <span className="text-[9px] font-sans text-slate-500 font-medium">
                              {weekday}
                            </span>
                          </div>
                          {/* Invisible date input filling content */}
                          <input 
                            type="date"
                            required
                            value={searchCheckIn}
                            onChange={(e) => setSearchCheckIn(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                        </div>
                      );
                    })()}
                  </div>

                  {/* Column 3: Check-Out OR Drop Location */}
                  <div className="relative p-5 text-left hover:bg-slate-50/50 transition-colors duration-150">
                    {searchCategory === 'transport' ? (
                      <>
                        <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          DROP LOCATION
                        </span>
                        <input 
                          type="text"
                          required
                          placeholder="e.g. Niladri Shore, Station"
                          defaultValue="Niladri Shore Resort"
                          className="w-full bg-transparent text-base md:text-lg font-bold text-navy-500 placeholder-slate-400 outline-none border-none p-0 focus:ring-0 leading-tight block mt-1"
                        />
                      </>
                    ) : (
                      <>
                        <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          CHECK-OUT
                        </span>
                        
                        {(() => {
                          const { day, month, weekday } = formatMarketplaceDate(searchCheckOut);
                          return (
                            <div className="relative flex items-center gap-2 cursor-pointer group">
                              <span className="text-3xl font-mono font-black text-navy-500 tracking-tighter leading-none">
                                {day}
                              </span>
                              <div className="text-left leading-tight flex flex-col">
                                <span className="text-[11px] font-sans font-extrabold text-navy-500 uppercase tracking-tight">
                                  {month}
                                </span>
                                <span className="text-[9px] font-sans text-slate-500 font-medium">
                                  {weekday}
                                </span>
                              </div>
                              <input 
                                type="date"
                                required
                                value={searchCheckOut}
                                onChange={(e) => setSearchCheckOut(e.target.value)}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              />
                            </div>
                          );
                        })()}
                      </>
                    )}
                  </div>

                  {/* Column 4: Guests & Rooms / Passengers */}
                  <div 
                    onClick={() => {
                      setIsGuestDropdownOpen(!isGuestDropdownOpen);
                      setIsPriceDropdownOpen(false);
                      setIsDestFocus(false);
                    }}
                    className="relative p-5 text-left hover:bg-slate-50/50 transition-colors duration-150 cursor-pointer"
                  >
                    <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {searchCategory === 'transport' ? 'PASSENGERS' : 'GUESTS & ROOMS'}
                    </span>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-base md:text-lg font-bold text-navy-500 block leading-tight font-sans">
                        {searchCategory === 'transport' 
                          ? `${searchGuests} Passengers` 
                          : `${searchGuests} Adults, ${searchRooms} Room`}
                      </span>
                      <span className="text-slate-400 text-[10px] shrink-0 font-bold">▼</span>
                    </div>

                    {isGuestDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40 bg-transparent" onClick={(e) => { e.stopPropagation(); setIsGuestDropdownOpen(false); }} />
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 left-0 md:left-4 top-full mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-left animate-fade-in animate-duration-150"
                        >
                          <span className="text-[9px] font-mono text-slate-400 block pb-2 mb-3 border-b uppercase font-bold leading-none">
                            Select Travellers
                          </span>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xs font-bold text-navy-500 block">
                                  {searchCategory === 'transport' ? 'Passengers' : 'Adults'}
                                </span>
                                <span className="text-[9px] text-slate-400">Ages 12 or above</span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <button
                                  type="button"
                                  disabled={parseInt(searchGuests) <= 1}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchGuests(prev => Math.max(1, parseInt(prev) - 1).toString());
                                  }}
                                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-705 disabled:opacity-40 rounded-lg font-bold flex items-center justify-center transition-all cursor-pointer text-xs border-0"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs font-bold text-navy-500 w-4 text-center">{searchGuests}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchGuests(prev => (parseInt(prev) + 1).toString());
                                  }}
                                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-705 rounded-lg font-bold flex items-center justify-center transition-all cursor-pointer text-xs border-0"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {searchCategory !== 'transport' && (
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-xs font-bold text-navy-500 block">Rooms</span>
                                  <span className="text-[9px] text-slate-400">Total rooms requested</span>
                                </div>
                                <div className="flex items-center gap-2.5 font-mono">
                                  <button
                                    type="button"
                                    disabled={parseInt(searchRooms) <= 1}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSearchRooms(prev => Math.max(1, parseInt(prev) - 1).toString());
                                    }}
                                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-705 disabled:opacity-40 rounded-lg font-bold flex items-center justify-center transition-all cursor-pointer text-xs border-0"
                                  >
                                    -
                                  </button>
                                  <span className="font-mono text-xs font-bold text-navy-500 w-4 text-center">{searchRooms}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSearchRooms(prev => (parseInt(prev) + 1).toString());
                                    }}
                                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-705 rounded-lg font-bold flex items-center justify-center transition-all cursor-pointer text-xs border-0"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsGuestDropdownOpen(false);
                            }}
                            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[10px] py-2 rounded-xl uppercase tracking-wider transition-all border-none cursor-pointer shadow"
                          >
                            Apply Selection
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Column 5: Price Range */}
                  <div 
                    onClick={() => {
                      setIsPriceDropdownOpen(!isPriceDropdownOpen);
                      setIsGuestDropdownOpen(false);
                      setIsDestFocus(false);
                    }}
                    className="relative p-5 text-left hover:bg-slate-50/50 transition-colors duration-150 cursor-pointer rounded-b-3xl sm:rounded-r-3xl sm:rounded-bl-none md:rounded-l-none"
                  >
                    <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      PRICE PER NIGHT
                    </span>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-base font-bold text-navy-500 block leading-tight font-mono">
                        {searchPriceRange === 'all' ? 'All Prices' : searchPriceRange}
                      </span>
                      <span className="text-slate-400 text-[10px] shrink-0 font-bold">▼</span>
                    </div>

                    {isPriceDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40 bg-transparent" onClick={(e) => { e.stopPropagation(); setIsPriceDropdownOpen(false); }} />
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-4 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-left font-mono animate-fade-in animate-duration-150"
                        >
                          <span className="text-[9px] font-mono text-slate-400 block px-3 py-1 pb-2 mb-1 border-b uppercase font-bold leading-none">
                            Price Ceiling
                          </span>
                          {[
                            { key: 'all', label: 'All price levels' },
                            { key: '1000-3000', label: '₹1000 - ₹3000' },
                            { key: '3000-5000', label: '₹3000 - ₹5000' },
                            { key: '5000+', label: '₹5000+' }
                          ].map(tier => (
                            <button
                              key={tier.key}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchPriceRange(tier.key as any);
                                setIsPriceDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center hover:bg-slate-50 font-bold transition-all border-none cursor-pointer ${
                                searchPriceRange === tier.key ? 'text-orange-600 bg-orange-50/50' : 'text-slate-650'
                              }`}
                            >
                              <span>{tier.label}</span>
                              {searchPriceRange === tier.key && <Check className="w-3.5 h-3.5 text-orange-600" />}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                </div>

                {/* Overlapping Primary Search Trigger Button centered below the card */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-30">
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-[15px] px-14 py-4 rounded-full tracking-[0.14em] shadow-xl hover:shadow-2xl transition-all hover:scale-102 cursor-pointer flex items-center justify-center gap-2 uppercase font-sans border-none"
                    id="marketplace-search-submit"
                  >
                    <Search className="w-4 h-4 text-white animate-pulse" />
                    SEARCH
                  </button>
                </div>
              </form>

              {/* Trending Searches chips below search card */}
              <div className="mt-12 pt-4 border-t border-slate-100 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                <span className="text-[10px] text-slate-400 font-mono tracking-wider font-extrabold uppercase shrink-0">
                  Trending Searches:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Puri", "Bhubaneswar", "Goa", "Jaipur", "Manali", "Varanasi"].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setSearchDestination(city);
                        setIsSearchSubmitted(true);
                        setActiveJourneyStep(3);
                        setTimeout(() => scrollToSection('search-results-section'), 120);
                      }}
                      className="text-[11px] font-mono bg-white hover:bg-orange-50 text-slate-650 hover:text-orange-600 px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-orange-200 shadow-sm transition-all duration-150 cursor-pointer"
                    >
                      🔥 {city}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      {/* Dynamic Search Results Section */}
      {isSearchSubmitted && (
        <section id="search-results-section" className="py-20 bg-slate-50 border-t border-b border-slate-250 relative">
          <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-saffron-100/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Search Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-saffron-600 uppercase tracking-widest mb-1.5 font-bold animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  DIRECT TO GDS MARKETPLACE SEARCH RESULTS
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-navy-500 font-bold">
                  {searchCategory === 'transport' ? 'Direct Synced Chauffeur Caravans' : 'Live Matching Accommodations'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {searchCategory === 'transport' 
                    ? 'Premium active fleet operators online. Direct tariffs without standard OTA markup fees.'
                    : '1 Premium direct-synced hotel partner available. Guaranteed best direct resort tariff (0% Commission).'}
                </p>
              </div>
              
              {/* Dynamic Parameter Badge */}
              <div className="flex flex-wrap items-center gap-2 z-10 font-mono text-xs">
                <span className="bg-saffron-50 text-[#bb5a06] border border-saffron-200 px-3 py-1.5 rounded-lg font-bold">
                  📍 {searchDestination || 'Puri, Odisha'}
                </span>
                {searchCheckIn && (
                  <span className="bg-white text-slate-650 border border-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm font-bold">
                    <Calendar className="w-3.5 h-3.5 text-navy-400" />
                    {searchCategory === 'transport' ? `Transfer Date: ${searchCheckIn}` : `${searchCheckIn} to ${searchCheckOut || 'Flexible'}`}
                  </span>
                )}
                <span className="bg-white text-slate-650 border border-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm font-bold font-mono">
                  <Users className="w-3.5 h-3.5 text-navy-400" />
                  {searchCategory === 'transport' 
                    ? `${searchGuests} Pax Selection`
                    : `${searchGuests} Guest${searchGuests !== '1' ? 's' : ''} / {searchRooms} Room${searchRooms !== '1' ? 's' : ''}`}
                </span>
                <button 
                  onClick={() => {
                    setIsSearchSubmitted(false);
                    setActiveJourneyStep(1);
                  }} 
                  className="text-slate-400 hover:text-saffron-600 font-mono text-xs uppercase underline ml-2 transition-colors cursor-pointer font-bold"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Dynamic Rendering Loop for Active Direct Synced Partners */}
            <div className="space-y-12">
              {searchCategory === 'transport' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="transport-marketplace-grid">
                  {VEHICLES.map((vehicle) => {
                    const luggageCapacity = 
                      vehicle.type === 'Auto' ? '1 Compact Handbag' :
                      vehicle.type === 'Sedan' ? '3 Large Bags' :
                      vehicle.type === 'SUV' || vehicle.type === 'Innova' ? '5 Large Bags' :
                      vehicle.type === 'Tempo Traveller' ? '12 Bags' : '30+ Travel Bags / Cargo Trunk';

                    const isAC = vehicle.type !== 'Auto';
                    const acFeature = isAC ? 'Fully Air-Conditioned Cabin' : 'Optimal Breeze Ventilation';
                    const basePriceQuote = Math.round(vehicle.pricePerKm * 65);

                    return (
                      <motion.div
                        key={vehicle.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="bg-white rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-saffron-550/25"
                      >
                        {/* Upper image + badge ribbon */}
                        <div className="h-48 relative overflow-hidden bg-slate-100">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 bg-navy-500 text-white font-mono text-[9px] font-extrabold px-2 py-1 rounded">
                            {vehicle.type.toUpperCase()} CLASS
                          </div>
                          <div className="absolute top-3 right-3 bg-saffron-50 px-2 py-1 text-[#bb5a06] text-[9px] font-mono font-bold border border-saffron-200 rounded">
                            ₹{vehicle.pricePerKm}/km direct
                          </div>
                        </div>

                        {/* Middle details panel */}
                        <div className="p-5 flex-1 space-y-4">
                          <div>
                            <h4 className="font-serif text-lg font-bold text-navy-500">{vehicle.name}</h4>
                            <p className="text-[10px] text-slate-400 font-mono tracking-wide mt-0.5">
                              PREMIUM ALLOCATION CODE: BT-FL-{vehicle.id.toUpperCase()}
                            </p>
                          </div>

                          {/* Dynamic detailed spec tags */}
                          <div className="space-y-2 border-t border-slate-100 pt-3">
                            <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                              <span className="text-slate-400 uppercase text-[9px] font-black">Capacity</span>
                              <span className="font-sans font-bold text-slate-800">{vehicle.seater} Passengers max</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                              <span className="text-slate-400 uppercase text-[9px] font-black">Luggage Slot</span>
                              <span className="font-sans font-bold text-slate-850 truncate max-w-[150px]">{luggageCapacity}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                              <span className="text-slate-400 uppercase text-[9px] font-black">Climate Class</span>
                              <span className="font-sans font-bold text-slate-850">{acFeature}</span>
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-505 leading-normal bg-slate-50 p-2.5 rounded-xl border border-slate-150 font-sans">
                            <strong>Service Perks:</strong> {vehicle.features.join(' • ')}
                          </div>
                        </div>

                        {/* Price quote and Action call */}
                        <div className="p-5 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-mono block font-bold leading-none font-bold">Standard Segment</span>
                            <span className="text-xl font-black text-saffron-600 font-mono">₹{basePriceQuote.toLocaleString('en-IN')}</span>
                            <span className="text-[9px] text-slate-450 font-mono block mt-0.5">*65km transfer Flat</span>
                          </div>
                          
                          <button
                            onClick={() => {
                              setSelectedTransportVehicle(vehicle);
                              setIsTransportBookingOpen(true);
                            }}
                            className="bg-saffron-500 hover:bg-saffron-600 font-sans font-bold text-xs uppercase tracking-wider text-white py-2.5 px-4 rounded-xl shadow transition-all cursor-pointer hover:scale-[1.01]"
                          >
                            Rent Carriage
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                (() => {
                  const items = localProperties.filter(property => {
                    const dest = (searchDestination || '').toLowerCase().trim();
                    
                    // Check price filter:
                    const matchesPrice = () => {
                      if (searchPriceRange === 'all') return true;
                      const prices = property.roomCategories?.map(r => r.price) || [5000];
                      const minPrice = Math.min(...prices);
                      if (searchPriceRange === '1000-3000') {
                        return minPrice >= 1000 && minPrice <= 3000;
                      } else if (searchPriceRange === '3000-5000') {
                        return minPrice >= 3000 && minPrice <= 5000;
                      } else if (searchPriceRange === '5000+') {
                        return minPrice >= 5000;
                      }
                      return true;
                    };

                    // Check amenity filter:
                    const matchesAmenity = () => {
                      if (searchAmenityFilter === 'all') return true;
                      const amenitiesLower = property.amenities.map(a => a.toLowerCase());
                      if (searchAmenityFilter === 'free-wifi') {
                        return amenitiesLower.some(a => a.includes('wi-fi') || a.includes('wifi') || a.includes('internet'));
                      }
                      if (searchAmenityFilter === 'swimming-pool') {
                        return amenitiesLower.some(a => a.includes('pool'));
                      }
                      if (searchAmenityFilter === 'beach-access') {
                        return amenitiesLower.some(a => a.includes('beach') || a.includes('estuary') || a.includes('coast'));
                      }
                      return true;
                    };

                    if (!matchesPrice() || !matchesAmenity()) return false;

                    if (dest.includes('puri')) {
                      return property.id === 'hotel-niladri';
                    } else if (dest.includes('konark') || dest.includes('kirtee') || dest.includes('eco')) {
                      return property.id === 'resort-kirtee';
                    }
                    return property.id === 'hotel-niladri' || property.id === 'resort-kirtee';
                  });

                  // Fallback to all if custom combination yielded empty list
                  const displayItems = items.length > 0 ? items : localProperties;
                  const isFilteredFallback = items.length === 0;

                  // Sort items by starting Price
                  const sortedItems = [...displayItems];
                  if (searchSortOrder === 'price-low-to-high') {
                    sortedItems.sort((a, b) => a.startingPrice - b.startingPrice);
                  } else if (searchSortOrder === 'price-high-to-low') {
                    sortedItems.sort((a, b) => b.startingPrice - a.startingPrice);
                  }

                  return (
                    <div className="space-y-6">
                      {/* Filter & Sorting bar */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm relative z-20">
                        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto animate-fade-in">
                          {/* Amenity Filter Dropdown */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Amenities:</span>
                            <div className="relative">
                              <select
                                id="amenities-filter-dropdown"
                                value={searchAmenityFilter}
                                onChange={(e) => setSearchAmenityFilter(e.target.value as any)}
                                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-550 transition cursor-pointer pr-8 appearance-none min-w-[150px]"
                                style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23475569%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E')", backgroundPosition: "right 8px center", backgroundSize: "14px", backgroundRepeat: "no-repeat" }}
                              >
                                <option value="all">All Amenities</option>
                                <option value="free-wifi">Free Wi-Fi</option>
                                <option value="swimming-pool">Swimming Pool</option>
                                <option value="beach-access">Beach Access</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end animate-fade-in">
                          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Sort By:</span>
                          <div className="relative">
                            <select
                              id="price-sort-dropdown"
                              value={searchSortOrder}
                              onChange={(e) => setSearchSortOrder(e.target.value as any)}
                              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-550 transition cursor-pointer pr-8 appearance-none min-w-[160px]"
                              style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23475569%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E')", backgroundPosition: "right 8px center", backgroundSize: "14px", backgroundRepeat: "no-repeat" }}
                            >
                              <option value="price-low-to-high">Price: Low to High</option>
                              <option value="price-high-to-low">Price: High to Low</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {isFilteredFallback && (
                        <div className="bg-orange-50 border border-orange-200 text-orange-850 p-4 rounded-2xl text-xs font-mono font-bold flex items-center justify-between shadow-sm animate-fade-in">
                          <span>💡 No exact matches for selected filter combinations. Showing all premium stays instead:</span>
                          <button 
                            type="button" 
                            id="reset-filters-btn"
                            onClick={() => {
                              setSearchPriceRange('all');
                              setSearchAmenityFilter('all');
                            }}
                            className="bg-orange-600 text-white rounded-lg px-2.5 py-1 hover:bg-orange-700 transition"
                          >
                            Reset Active Filters
                          </button>
                        </div>
                      )}
                      
                      {sortedItems.map((property) => {
                        const isKirtee = property.id === 'resort-kirtee';
                        return (
                          <motion.div 
                            key={property.id} 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className={`bg-white rounded-3xl border overflow-hidden shadow-xl relative transition-all duration-350 hover:shadow-2xl flex flex-col lg:flex-row gap-0 ${
                              isKirtee ? 'border-emerald-200 hover:border-emerald-500/20' : 'border-slate-200 hover:border-saffron-550/20'
                            }`}
                          >
                            {/* Badge Ribbons */}
                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                              <span className={`text-[9px] font-extrabold font-mono px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-widest ${
                                isKirtee ? 'bg-emerald-600 text-white' : 'bg-navy-500 text-white'
                              }`}>
                                Direct PMS Stream Sync
                              </span>
                              <span className="text-[8px] bg-slate-900 text-gold-400 border border-gold-400/20 px-2 py-1 rounded-lg font-mono uppercase tracking-widest font-bold">
                                ★ BHARAT TRAVELS CIRCLE INDEX
                              </span>
                            </div>

                            {/* Property Image Left-panel */}
                            <div className="lg:w-2/5 h-64 sm:h-80 lg:h-auto min-h-[340px] relative overflow-hidden shrink-0">
                              <img 
                                src={property.image} 
                                alt={property.name} 
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-955/80 via-transparent to-transparent opacity-95" />
                              
                              <div className="absolute bottom-6 left-6 font-sans">
                                <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${isKirtee ? 'text-emerald-300' : 'text-saffron-300'}`}>
                                  {property.location}
                                </span>
                                <span className="text-xl font-serif text-white font-bold tracking-tight block">
                                  {isKirtee ? 'Nature. Events. Experiences.' : 'Kalinga Heritage & Coastal Glory'}
                                </span>
                              </div>
                            </div>

                            {/* Property Info Right-panel */}
                            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-white">
                              
                              <div className="space-y-4">
                                <div className="flex flex-wrap justify-between items-start gap-2">
                                  <div>
                                    <h3 className="text-2xl sm:text-3xl font-serif text-navy-500 font-extrabold tracking-tight flex items-center gap-2">
                                      {property.name}
                                      {isKirtee && (
                                        <span className="text-[10px] uppercase font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                                          Second Property Onboarded
                                        </span>
                                      )}
                              </h3>
                              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                <MapPin className={`w-3.5 h-3.5 ${isKirtee ? 'text-emerald-600' : 'text-saffron-550'}`} />
                                {property.location}, {property.state} (Shared Direct GDS Ecosystem)
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                              <div className="text-right">
                                <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold leading-none">GUEST RATING</span>
                                <span className="text-xs text-navy-500 font-mono font-black">Excellent {property.rating}</span>
                              </div>
                              <div className={`w-9 h-9 rounded-lg text-white font-mono font-extrabold flex items-center justify-center text-sm shadow ${
                                isKirtee ? 'bg-emerald-700' : 'bg-navy-500'
                              }`}>
                                {property.rating}
                              </div>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                            {property.description}
                          </p>

                          {/* Amenities tags */}
                          <div className="space-y-2 pt-1">
                            <span className="text-[10px] text-slate-400 font-mono uppercase block tracking-wider font-bold">Direct Integration Perks:</span>
                            <div className="flex flex-wrap gap-1.5 font-sans">
                              {property.amenities.map((tag, idx) => (
                                <span key={idx} className="text-[9px] bg-slate-50 text-slate-705 font-mono px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1 shadow-sm font-bold">
                                  <Check className={`w-3 h-3 ${isKirtee ? 'text-emerald-600' : 'text-saffron-600'}`} />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Pricing & Button Column */}
                        <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Starting Direct Tariff</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-extrabold font-sans text-navy-500 tracking-tight">
                                ₹{property.startingPrice.toLocaleString('en-IN')}
                              </span>
                              <span className="text-slate-500 text-xs font-mono font-bold">/ night</span>
                              <span className={`text-[9px] font-mono ml-2.5 px-2 py-0.5 rounded border font-bold ${
                                isKirtee ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-saffron-50 text-saffron-800 border-saffron-200'
                              }`}>
                                Commission-Free Direct Tariff
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                            {isKirtee ? (
                              <button
                                onClick={() => {
                                  triggerGdsRedirect(property.name);
                                }}
                                className="flex-1 md:flex-none hover:bg-emerald-50 border border-emerald-605 text-emerald-850 font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 font-sans"
                              >
                                <Eye className="w-4 h-4 text-emerald-700" />
                                View Property
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  triggerGdsRedirect(property.name);
                                }}
                                className="flex-1 md:flex-none hover:bg-saffron-50 border border-saffron-600 text-[#bb5a06] font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 font-sans"
                              >
                                <Eye className="w-4 h-4 text-saffron-600" />
                                View Details
                              </button>
                            )}

                            <button
                              onClick={() => {
                                triggerGdsRedirect(property.name);
                              }}
                              className={`flex-1 md:flex-none font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02] duration-300 flex items-center justify-center gap-2 cursor-pointer text-white font-sans ${
                                isKirtee ? 'bg-emerald-700 hover:bg-emerald-650' : 'bg-saffron-500 hover:bg-saffron-600'
                              }`}
                            >
                              Instant GDS Book
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })()
          )}
            </div>

          </div>
        </section>
      )}

      {/* Popular Destinations Section */}
      <section id="destinations-section" className="py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-saffron-600 font-mono tracking-widest font-bold uppercase block mb-1">EXPLORE ODISHA</span>
            <h2 className="text-3xl md:text-5xl font-serif text-navy-500 font-extrabold tracking-tight">Popular Destinations</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2 font-sans">
              Handpicked regions of timeless spiritual heritage, pristine coastal bays, and tranquil sanctuaries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Puri",
                tagline: "Spiritual Coastline",
                hotels: "12+ Heritage Stays",
                image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",
                description: "Famous for the historic Jagannath Temple and pristine golden sands."
              },
              {
                name: "Bhubaneswar",
                tagline: "Ancient Temple City",
                hotels: "18+ Premium Hotels",
                image: "https://images.unsplash.com/photo-1600100397561-4e3ed902d2b3?auto=format&fit=crop&w=600&q=80",
                description: "Over 700 ancient stone temples paired with ultra-modern smart facilities."
              },
              {
                name: "Konark",
                tagline: "Mauryan Architecture",
                hotels: "6+ Luxury Resorts",
                image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=600&q=80",
                description: "Home of the majestic UNESCO Sun Temple and breathtaking marine drives."
              },
              {
                name: "Chilika",
                tagline: "Asia's Largest Lagoon",
                hotels: "8+ Lakeside Resorts",
                image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=400&q=80",
                description: "Famed sanctuary for migratory birds and rare Irrawaddy dolphin pods."
              },
              {
                name: "Gopalpur",
                tagline: "Colonial Haven",
                hotels: "5+ Beach Retreats",
                image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=400&q=80",
                description: "A tranquil colonial sandbeach resort ideal for complete serene wellness."
              }
            ].map((dest, idx) => (
              <div 
                key={idx}
                className="group relative h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm cursor-pointer transition-all duration-550 hover:shadow-xl hover:-translate-y-1 block"
                onClick={() => {
                  // Find destination input field
                  const input = document.querySelector('input[placeholder*="Where do you want to explore?"]') as HTMLInputElement;
                  if (input) {
                    input.value = dest.name;
                    // Trigger native input event
                    const event = new Event('input', { bubbles: true });
                    input.dispatchEvent(event);
                  }
                  scrollToSection('hotels-section');
                }}
              >
                {/* Background image component */}
                <div className="absolute inset-0 z-0">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover opacity-75 group-hover:opacity-60 transition-all duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 p-5 flex flex-col justify-end text-left">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-saffron-300 uppercase bg-navy-950/75 border border-saffron-500/20 px-2 py-0.5 rounded-lg w-max mb-1.5 leading-none">
                    {dest.tagline}
                  </span>
                  <h4 className="font-serif text-xl text-white font-black tracking-tight leading-tight">{dest.name}</h4>
                  <p className="text-[10px] text-slate-300 font-sans mt-1 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {dest.description}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/20 flex justify-between items-center text-[10px] text-slate-200 font-mono">
                    <span className="font-bold">{dest.hotels}</span>
                    <span className="text-saffron-400 group-hover:translate-x-1 transition-transform">Explore →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION 2: Curated Hotels */}
      <section id="hotels-section" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs text-saffron-600 font-mono tracking-widest font-bold uppercase">DIRECT LISTINGS PREVIEW</span>
              <h2 className="text-3xl md:text-5xl font-serif text-navy-500 font-extrabold tracking-tight mt-1">Featured Hotels</h2>
              <p className="text-xs md:text-sm text-slate-500 mt-2">
                Authentic, high-comfort benchmark hotels of Odisha, with direct GDS access connectivity.
              </p>
            </div>

            {/* City Tabs */}
            <div className="flex bg-slate-100 rounded-2xl p-1 border border-slate-200 font-mono text-xs shadow-inner">
              {(['Puri', 'Bhubaneswar'] as const).map(city => (
                <button
                  key={city}
                  onClick={() => setHotelCityTab(city)}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all uppercase tracking-wider text-center ${
                    hotelCityTab === city 
                      ? 'bg-navy-500 text-white shadow-md' 
                      : 'text-slate-650 hover:text-navy-500'
                  }`}
                >
                  {city} Portfolio
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            id="featured-hotels-grid"
          >
            {filteredHotels.length > 0 ? (
              filteredHotels.map((property) => (
                <motion.div 
                  key={property.id}
                  variants={staggerItem}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-saffron-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  {/* Photo area */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-95" />
                    
                    {/* Upper float badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span className="text-[9px] bg-slate-900/90 text-white border border-slate-800 px-2 py-0.5 rounded font-mono uppercase tracking-widest font-bold">
                        {property.location.includes('Puri') ? 'PURI' : 'BHUBANESWAR'}
                      </span>
                      <div className="flex items-center gap-1 bg-slate-900/90 text-gold-300 px-2.5 py-0.5 rounded-lg border border-slate-800 font-mono text-[10px] font-bold">
                        <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                        <span>{property.rating}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="text-[9px] text-slate-300 font-mono uppercase block leading-none font-bold">Direct Tariff Starts</span>
                      <span className="text-base font-extrabold font-mono text-white">₹{property.startingPrice.toLocaleString('en-IN')}+ <span className="text-[9px] text-slate-300 font-normal">/ night</span></span>
                    </div>
                  </div>

                  {/* Body area */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h4 className="font-serif text-lg text-navy-500 font-extrabold leading-snug group-hover:text-saffron-600 transition-colors">
                        {property.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {property.description}
                      </p>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {property.amenities.slice(0, 3).map((am, i) => (
                          <span key={i} className="text-[9px] bg-slate-50 text-slate-500 font-mono px-2 py-0.5 rounded border border-slate-250 font-bold shadow-sm">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Button */}
                    <div className="pt-4 mt-5 border-t border-slate-100">
                      <button
                        onClick={() => openPropertyDetails(property)}
                        className="w-full bg-navy-50 hover:bg-navy-100 text-navy-500 font-bold text-xs py-2.5 rounded-xl uppercase border border-navy-100 transition-all text-center tracking-widest cursor-pointer"
                      >
                        View Property
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                <ShieldAlert className="w-8 h-8 text-saffron-550 mx-auto mb-3 animate-pulse" />
                <p className="text-slate-600 text-sm font-semibold">No hotels matched your query destination in {hotelCityTab}.</p>
                <button onClick={() => setSearchDestination('')} className="text-saffron-600 text-xs font-mono underline uppercase mt-2 font-bold hover:text-saffron-700">See all</button>
              </div>
            )}
          </motion.div>

        </div>
      </section>

      {/* 4. SECTION 3: Curated Resorts */}
      <section id="resorts-section" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-saffron-600 font-mono tracking-widest font-bold uppercase">SOVEREIGN ESCAPES</span>
            <h2 className="text-3xl md:text-5xl font-serif text-navy-500 font-extrabold tracking-tight mt-1">Featured Resorts</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2">
              Breathtaking boutique wellness estates and theme retreats featuring pristine private coastal bays and forests.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            id="featured-resorts-grid"
          >
            {filteredResorts.map((resort) => (
              <motion.div 
                key={resort.id}
                variants={staggerItem}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-saffron-400 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group shadow-md"
              >
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={resort.image} 
                    alt={resort.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-transparent to-transparent opacity-95" />
                  
                  {/* Top floats */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="text-[9px] bg-saffron-50 text-saffron-700 border border-saffron-200 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-wider">
                      {resort.category.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1 bg-slate-900/90 text-gold-300 px-2.5 py-0.5 rounded-lg border border-slate-800 font-mono text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                      <span>{resort.rating}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] text-slate-350 font-mono uppercase block tracking-widest font-bold">{resort.location}</span>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="font-serif text-lg text-navy-500 font-extrabold group-hover:text-saffron-600 transition-colors">
                      {resort.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {resort.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {resort.amenities.slice(0, 3).map((am, i) => (
                        <span key={i} className="text-[9px] bg-slate-50 text-slate-500 font-mono px-2 py-0.5 rounded border border-slate-250 font-bold shadow-sm">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="pt-4 mt-5 border-t border-slate-100">
                    <button
                      onClick={() => triggerGdsRedirect(resort.name)}
                      className="w-full bg-navy-500 hover:bg-navy-600 text-white font-bold text-xs py-2.5 rounded-xl uppercase tracking-widest transition-all text-center cursor-pointer"
                    >
                      View Property
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 5. SECTION 5: Activities */}
      <section id="experiences-section" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-saffron-600 font-mono tracking-widest font-bold uppercase">DRAMATIC DISCOVERIES</span>
            <h2 className="text-3xl md:text-5xl font-serif text-navy-500 font-extrabold tracking-tight mt-1">Activities & Discoveries</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2">
              Unpack majestic ancient sanctuaries and serene eco tours crafted across the golden soul state of India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="odisha-tourism-grid">
            {EXPERIENCES.map((exp) => (
              <div 
                key={exp.id}
                className="group relative h-96 rounded-2xl overflow-hidden border border-slate-200 transition-all duration-500 hover:border-saffron-400 cursor-pointer shadow-md"
              >
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent flex flex-col justify-end p-6 z-10" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <span className="text-[9px] font-mono bg-saffron-500 text-white px-2 py-1 rounded-md mb-2 inline-block font-bold">
                    {exp.countOfPackages} custom guides
                  </span>
                  <h3 className="font-serif text-2xl text-white font-extrabold mb-1 group-hover:text-gold-300 transition-colors">{exp.title}</h3>
                  <p className="text-xs text-slate-200 line-clamp-2 opacity-90 leading-relaxed mb-3">
                    {exp.description}
                  </p>
                  
                  {/* Highlights row */}
                  <div className="pt-2 border-t border-white/20 flex flex-wrap gap-2">
                    {exp.highlights.slice(0, 2).map((hg, idx) => (
                      <span key={idx} className="text-[9px] text-slate-300 font-mono">
                        ● {hg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. SECTION 6: Transport Services */}
      <section id="transport-section" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="text-xs text-saffron-600 font-mono tracking-[0.25em] font-bold uppercase block mb-2">
              BHARAT TRAVELS CONCIERGE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-navy-500 font-extrabold tracking-tight">
              TRANSPORT SERVICES
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-3 max-w-2xl mx-auto">
              Direct, transparent point-to-point transfers and scenic sightseeing sweeps built on 0% commission direct GDS pricing.
            </p>
          </div>

          {/* Core Services Categories */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20" id="transport-classes-services">
            {[
              {
                title: "Airport Transfer",
                desc: "Flight-synchronized arrivals with zero delays delay-buffer tracking.",
                icon: <Plane className="w-5 h-5 text-saffron-600" />
              },
              {
                title: "Railway Station Pickup",
                desc: "Platform greeting with driver assistance across major stations.",
                icon: <Train className="w-5 h-5 text-emerald-600" />
              },
              {
                title: "Local Sightseeing",
                desc: "Flexible hour/day-based tours across Puri, Konark & Chilika.",
                icon: <MapPin className="w-5 h-5 text-[#bb5a06]" />
              },
              {
                title: "Corporate Transport",
                desc: "High-grade premium vehicles tailored for delegate commutes.",
                icon: <Briefcase className="w-5 h-5 text-blue-600" />
              },
              {
                title: "Group Travel",
                desc: "Comfortable high-capacity coaches and Tempo Travellers for families.",
                icon: <Users className="w-5 h-5 text-purple-600" />
              }
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-saffron-400 transition-all duration-300"
              >
                <div>
                  <div className="p-2.5 bg-slate-50 w-fit rounded-xl border border-slate-100 mb-4 shadow-sm">
                    {service.icon}
                  </div>
                  <h4 className="text-sm font-bold text-navy-500 font-serif leading-snug mb-1">{service.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Vehicle Types Display */}
          <div className="border-t border-slate-200/60 pt-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
              <div>
                <span className="text-xs text-saffron-600 font-mono font-bold tracking-wider block uppercase">
                  VEHICLE FLEET SELECTION
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-navy-500 font-extrabold mt-1">
                  Choose Your Ride
                </h3>
              </div>
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-150 px-3.5 py-1.5 rounded-xl text-[10px] font-mono tracking-wider font-extrabold shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ALL FUEL & CHAUFFEUR TAXES INTEGRATED</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="transport-services-grid">
              {VEHICLES.map((veh) => (
                <div 
                  key={veh.id}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-saffron-400 p-4 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-lg relative overflow-hidden"
                >
                  <div>
                    {/* Vehicle Type Label */}
                    <span className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-md text-navy-500 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-lg border border-slate-200 uppercase">
                      {veh.type}
                    </span>

                    {/* Image Area */}
                    <div className="relative h-40 rounded-xl overflow-hidden mb-4 border border-slate-100 bg-slate-100">
                      <img 
                        src={veh.image} 
                        alt={veh.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                    </div>

                    {/* Meta Fields */}
                    <h4 className="font-serif text-sm text-navy-500 font-extrabold mb-1">
                      {veh.name}
                    </h4>

                    {/* Capacity Info */}
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mb-3">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Passenger Capacity: <strong className="text-slate-800">{veh.seater} Seats</strong></span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-5">
                      {veh.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-[10px] text-slate-550 leading-tight">
                          <Check className="w-3 h-3 text-saffron-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action button aligned at bottom */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-450 tracking-wider">
                        Starting Price:
                      </span>
                      <span className="text-sm font-mono font-extrabold text-[#bb5a06]">
                        ₹{veh.pricePerKm}/KM
                      </span>
                    </div>
                    <button 
                      onClick={() => triggerVehicleBookingForm(veh)}
                      className="w-full bg-navy-500 hover:bg-navy-600 text-white font-extrabold text-[11px] py-2.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer text-center"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Holiday Packages Section */}
      <section id="packages-section" className="py-24 bg-white border-t border-slate-200 relative">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-saffron-100/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-saffron-600 font-mono tracking-widest font-bold uppercase block mb-1">All-Inclusive Journeys</span>
            <h2 className="text-3xl md:text-5xl font-serif text-navy-500 font-extrabold tracking-tight">Holiday Packages</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2 font-sans">
              Our pre-vetted curated direct-access itineraries offering incredible price transparency without standard operator commissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Divine Puri & Konark Spiritual Sanctuary",
                duration: "3 Days / 2 Nights",
                price: 5499,
                image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",
                bullets: ["Private AC luxury car transfer", "Heritage Temple Walk with history guide", "Niladri Shore stay integration", "Daily organic Temple Mahaprasad access"]
              },
              {
                title: "Chilika Birding & Golden Sand Beaches Tour",
                duration: "4 Days / 3 Nights",
                price: 8999,
                image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=600&q=80",
                bullets: ["Premium lakeside beach cottages", "Private motorboat dolphin safari", "Gopalpur sandbeach day tour", "Professional ornithologist escort guide"]
              },
              {
                title: "Odisha Golden Circle Heritage Grand Caravan",
                duration: "6 Days / 5 Nights",
                price: 13999,
                image: "https://images.unsplash.com/photo-1600100397561-4e3ed902d2b3?auto=format&fit=crop&w=600&q=80",
                bullets: ["Full-time luxury chauffeur driven SUV", "Bhubaneswar ancient cave guides", "Handpicked premium resort room standard", "All entry cards & monument passes integrated"]
              }
            ].map((pkg, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 hover:border-saffron-400 p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl group font-sans"
              >
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 border border-slate-100 bg-slate-100">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                    <span className="absolute top-3 right-3 bg-white/95 text-navy-500 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-lg border border-slate-200 uppercase">
                      {pkg.duration}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg text-navy-500 font-extrabold mb-3 group-hover:text-saffron-600 transition-colors">
                    {pkg.title}
                  </h4>

                  <ul className="space-y-2 mb-6">
                    {pkg.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-[11px] text-slate-550 leading-tight">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-450 tracking-wider">Starting Tariff:</span>
                    <span className="text-lg font-mono font-extrabold text-[#bb5a06]">₹{pkg.price.toLocaleString('en-IN')}<span className="text-[10px] text-slate-500 font-normal"> / person</span></span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      alert(`Thank you for choosing the "${pkg.title}" package! This direct GDS itinerary is pre-approved. Our travel experts will connect with you under your active session.`);
                    }}
                    className="w-full bg-navy-500 hover:bg-navy-600 text-white font-extrabold text-xs py-3 rounded-xl uppercase tracking-wider transition-all cursor-pointer text-center shadow-sm"
                  >
                    Direct Inquiry & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Partner With Bharat Travels Section */}
      <section id="partner-section" className="py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Info Side */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs text-saffron-600 font-mono tracking-widest font-bold uppercase block mb-1">JOIN THE SYNDICATE</span>
                <h2 className="text-3xl md:text-5xl font-serif text-navy-500 font-extrabold tracking-tight">Partner With Bharat Travels</h2>
                <p className="text-sm text-slate-650 mt-3 font-sans leading-relaxed">
                  Join India's growing hospitality marketplace. Bypass third-party commission middle agents, capture 100% direct customer payouts, and simplify your guest management experience.
                </p>
              </div>

              <div className="space-y-4 font-sans text-xs text-slate-605">
                <div className="flex gap-3.5 items-start p-4 bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                  <div className="p-2 rounded-lg bg-saffron-50 text-saffron-650 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-500 text-sm">0% Direct OTA Commissions</h5>
                    <p className="text-slate-500 mt-1 leading-relaxed">We sync your rates inventories without putting a markup or extracting booking fee chunks.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start p-4 bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                  <div className="p-2 rounded-lg bg-saffron-50 text-saffron-650 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-500 text-sm">Integrated Backoffice PMS</h5>
                    <p className="text-slate-500 mt-1 leading-relaxed">Manage check-ins, guest ledgers, transit vans, and billings using our simplified operations panels.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy-500 to-saffron-500" />
              
              {partnerFormSubmitted ? (
                <div className="py-12 text-center space-y-4 font-sans text-navy-550">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl text-navy-500 font-extrabold">Inquiry Successfully Submitted!</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Thank you for applying to partner with Bharat Travels. Our property onboarding team will review your credentials and contact you within 24 working hours.
                  </p>
                  <button 
                    type="button"
                    onClick={() => {
                      setPartnerFormSubmitted(false);
                      setPartnerFormData({
                        propertyName: '',
                        propertyType: 'Hotel',
                        contactPerson: '',
                        mobileNumber: '',
                        email: '',
                        city: '',
                        state: '',
                        message: ''
                      });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-650 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4 font-sans text-xs text-navy-500">
                  <div>
                    <h3 className="font-serif text-lg text-navy-500 font-extrabold mb-1">Onboarding Inquiry Form</h3>
                    <p className="text-slate-400">Fill in the primary operational details of your enterprise to request integration.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-550 font-bold mb-1.5 font-mono uppercase tracking-widest text-[9px]">Property / Enterprise Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Grand Heritage Palace"
                        value={partnerFormData.propertyName}
                        onChange={e => setPartnerFormData(prev => ({...prev, propertyName: e.target.value}))}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-saffron-500 focus:ring-1 focus:ring-saffron-550 outline-none text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-550 font-bold mb-1.5 font-mono uppercase tracking-widest text-[9px]">Property Type</label>
                      <select 
                        value={partnerFormData.propertyType}
                        onChange={e => setPartnerFormData(prev => ({...prev, propertyType: e.target.value}))}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-saffron-500 outline-none bg-white text-slate-800"
                      >
                        {['Hotel', 'Resort', 'Homestay', 'Travel Agency', 'Tour Operator', 'Transport Provider'].map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-550 font-bold mb-1.5 font-mono uppercase tracking-widest text-[9px]">Contact Person</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={partnerFormData.contactPerson}
                        onChange={e => setPartnerFormData(prev => ({...prev, contactPerson: e.target.value}))}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-saffron-500 outline-none text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-550 font-bold mb-1.5 font-mono uppercase tracking-widest text-[9px]">Mobile Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={partnerFormData.mobileNumber}
                        onChange={e => setPartnerFormData(prev => ({...prev, mobileNumber: e.target.value}))}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-saffron-500 outline-none text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-slate-550 font-bold mb-1.5 font-mono uppercase tracking-widest text-[9px]">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="owner@example.com"
                        value={partnerFormData.email}
                        onChange={e => setPartnerFormData(prev => ({...prev, email: e.target.value}))}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-saffron-500 outline-none text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-550 font-bold mb-1.5 font-mono uppercase tracking-widest text-[9px]">City</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Puri"
                        value={partnerFormData.city}
                        onChange={e => setPartnerFormData(prev => ({...prev, city: e.target.value}))}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-saffron-500 outline-none text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-550 font-bold mb-1.5 font-mono uppercase tracking-widest text-[9px]">State</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Odisha"
                        value={partnerFormData.state}
                        onChange={e => setPartnerFormData(prev => ({...prev, state: e.target.value}))}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-saffron-500 outline-none text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-550 font-bold mb-1.5 font-mono uppercase tracking-widest text-[9px]">Message / Capacity</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Tell us about your room inventory or active transit fleet sizes..."
                      value={partnerFormData.message}
                      onChange={e => setPartnerFormData(prev => ({...prev, message: e.target.value}))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-saffron-500 outline-none text-slate-800 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-mono font-extrabold uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer shadow-md text-center"
                  >
                    Submit Onboarding Inquiry
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 11. Footer details */}
      <footer className="py-16 bg-[#0f172a] text-center text-xs text-slate-400 font-mono border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center items-center gap-1.5">
            <span className="font-sans font-black text-sm tracking-widest text-[#f59e0b]">BHARAT</span>
            <span className="text-white text-[9px] px-1.5 py-0.5 rounded bg-saffron-500 text-white font-bold leading-none">TRAVELS</span>
          </div>
          <p className="text-[10px] text-slate-500 max-w-md mx-auto leading-relaxed">
            Discover. Stay. Travel. Experience. India's premium hospitality marketplace. Bypass third-party commission middle agents securely.
          </p>
          <div className="pt-4 border-t border-slate-800 text-[9px] text-slate-500">
            © 2026-2030 Bharat Travels Hospitality Platform Ltd. All legal rights secured under PCI-DSS GDS standards.
          </div>
        </div>
      </footer>
      </main>

      {activePropertyPageView === 'kirtee' && (
        <KirteePropertyPage 
          onBookNow={(prop) => triggerPropertyBookingForm(prop)}
          onBackToMarketplace={() => {
            setActivePropertyPageView('marketplace');
            setCurrentPropertyName('Niladri Shore Resort');
          }}
          kirteeProperty={localProperties.find(p => p.id === 'resort-kirtee') || localProperties[localProperties.length - 1]}
          onTriggerGdsRedirect={triggerGdsRedirect}
        />
      )}

      {/* Dynamic Overlay Portals */}
      
      {/* Property Details Page/Modal (Section 4) */}
      <PropertyDetailsModal 
        isOpen={isDetailsOpen}
        property={selectedProp}
        onClose={() => setIsDetailsOpen(false)}
        onBookNow={triggerPropertyBookingForm}
      />

      {/* Secure Direct Booking Suite Form (Existing Niladri booking experience passed with property details) */}
      <BookingPortal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedProperty={bookingProperty}
        selectedVehicle={bookingVehicle}
        onAddBooking={handleAddBooking}
        initialCheckIn={searchCheckIn}
        initialCheckOut={searchCheckOut}
        initialGuests={Number(searchGuests)}
      />

      {/* Standalone Transport Marketplace Booking Portal */}
      <TransportBookingPortal
        isOpen={isTransportBookingOpen}
        onClose={() => {
          setIsTransportBookingOpen(false);
          setSelectedTransportVehicle(null);
        }}
        selectedVehicle={selectedTransportVehicle}
        onAddBooking={handleAddBooking}
      />

      {/* Guest Personal Bookings Dashboard Side Sheet */}
      {isBookingsDashboardOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-200 shadow-3xl flex flex-col justify-between animate-slide-left text-slate-800">
          
          <div className="p-6 border-b border-slate-250 flex justify-between items-center bg-slate-50">
            <div>
              <span className="text-[10px] text-saffron-600 font-mono tracking-widest font-extrabold block">PERSONAL MEMBER PORTAL</span>
              <h4 className="font-serif text-lg text-navy-500 font-extrabold mt-0.5">My Travel Ledger</h4>
            </div>
            <button 
              onClick={() => setIsBookingsDashboardOpen(false)}
              className="p-1 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bookings body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeBookings.length > 0 ? (
              <div className="space-y-4">
                {activeBookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3.5 relative shadow-sm">
                    <button 
                      onClick={() => handleCancelBooking(b.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Cancel booking"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </button>

                    <div className="flex justify-between items-start">
                      <div>
                        {/* Selected property name throughout! */}
                        <span className="text-[9px] bg-saffron-50 text-saffron-700 border border-saffron-200 font-mono px-2 py-0.5 rounded-md font-bold uppercase block w-max">
                          {b.type === 'hotel' ? 'Property Booking' : 'Transit Charter'}
                        </span>
                        <h5 className="font-serif text-base text-navy-500 mt-1.5 leading-snug pr-4 font-extrabold">{b.targetName}</h5>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-slate-650 space-y-1.5 border-t border-slate-200 pt-3">
                      <div className="flex justify-between">
                        <span>Check In:</span>
                        <span className="text-slate-800 font-bold">{b.checkIn}</span>
                      </div>
                      {b.checkOut && (
                        <div className="flex justify-between">
                          <span>Check Out:</span>
                          <span className="text-slate-800 font-bold">{b.checkOut}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="text-slate-800 font-bold">{b.guests} Guests</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-sans pt-2 border-t border-dashed border-slate-200">
                        <span className="text-slate-600 font-medium">Total Price:</span>
                        <span className="text-saffron-600 font-heavy text-base">₹{b.totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400 space-y-3">
                <Ticket className="w-10 h-10 mx-auto text-slate-300 animate-pulse" />
                <p className="text-xs font-semibold text-slate-500">No direct vouchers in your ledger.</p>
                <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">Explore hotels or resorts and click Book Now to instantly secure passes.</p>
              </div>
            )}
          </div>

          {/* Ledger footer */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 text-center text-[10px] font-mono text-slate-500 font-bold">
            <span>Direct booking codes are fully validated under national standards.</span>
          </div>

        </div>
      )}

      {/* Premium GDS Handshake Redirect Launcher */}
      {gdsRedirectState && gdsRedirectState.isRedirecting && (
        <GdsRedirectLoader 
          propertyName={gdsRedirectState.propertyName}
          targetUrl={gdsRedirectState.targetUrl}
          onComplete={() => {
            window.location.href = gdsRedirectState.targetUrl;
          }}
        />
      )}

      {/* STAFF OPERATIONS PORTAL */}
      {activePropertyPageView === 'marketplace' && workspace === 'staff' && (
        <div className="min-h-screen bg-slate-100 pb-24 relative z-40">
          {/* Backoffice Header Bar */}
          <div className="bg-slate-900 text-white border-b border-slate-950 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-saffron-500 rounded-xl">
                <Car className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-saffron-500 text-navy-955 font-mono font-extrabold px-1.5 py-0.5 rounded uppercase">STAFF SESSION</span>
                  <span className="text-[10px] text-slate-400 font-mono">ID: BT-STAFF-SYS</span>
                </div>
                <h1 className="text-base md:text-lg font-serif font-extrabold text-white tracking-wide">
                  Bharat Travels Transport Hub & Dispatch Console
                </h1>
              </div>
            </div>
            
            <button 
              onClick={() => setWorkspace('customer')}
              className="bg-red-600 hover:bg-red-700 hover:scale-[1.01] text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <X className="w-4 h-4" />
              Logout Staff Portal
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              {[
                { title: "Fleet Vehicles Active", value: "32 Units", color: "text-blue-600" },
                { title: "Drivers On-Call Duty", value: "18 Chauffeurs", color: "text-emerald-600" },
                { title: "Dispatch Queue Status", value: "Normal Load", color: "text-saffron-600" },
                { title: "Live GPS Tracking Link", value: "Active & Secure", color: "text-purple-600" }
              ].map((m, i) => (
                <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-left">
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider font-bold block uppercase">{m.title}</span>
                  <span className={`text-base font-mono font-black ${m.color} mt-1 block`}>{m.value}</span>
                </div>
              ))}
            </div>

            {/* Render the full Transport Dashboard */}
            <div className="mt-4">
              <TransportDashboard 
                bookings={activeBookings}
                vehicles={VEHICLES}
                onUpdateBookingStatus={handleUpdateBookingFields}
              />
            </div>
          </div>
        </div>
      )}

      {/* OWNER & PARTNER MANAGEMENT WORKSPACE */}
      {activePropertyPageView === 'marketplace' && workspace === 'owner' && (
        <div className="min-h-screen bg-slate-100 pb-24 relative z-40">
          {/* Owner Header Bar */}
          <div className="bg-slate-900 text-white border-b border-slate-900 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500 rounded-xl">
                <Building2 className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-emerald-500 text-navy-950 font-mono font-extrabold px-1.5 py-0.5 rounded uppercase">PARTNER CONSOLE</span>
                  <span className="text-[10px] text-emerald-400 font-mono">DIRECT CHANNEL-SYNC ACTIVE</span>
                </div>
                <h1 className="text-base md:text-lg font-serif font-extrabold text-white tracking-wide">
                  Bharat Travels Hospitality Management Suite
                </h1>
              </div>
            </div>
            
            <button 
              onClick={() => setWorkspace('customer')}
              className="bg-red-600 hover:bg-red-700 hover:scale-[1.01] text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <X className="w-4 h-4" />
              Logout Partner Suite
            </button>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              {[
                { title: "Connected Hotels/Resorts", value: `${localProperties.length} Properties`, color: "text-[#bb5a06]" },
                { title: "Direct Reserver Yield", value: "+38.4% YoY", color: "text-emerald-500" },
                { title: "Direct GDS Booking Shares", value: "100.0% Exact", color: "text-blue-500" },
                { title: "Channel Overbooking Risk", value: "0% Spot Risk", color: "text-purple-500" }
              ].map((m, i) => (
                <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-left">
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider font-bold block uppercase">{m.title}</span>
                  <span className={`text-base font-mono font-black ${m.color} mt-1 block`}>{m.value}</span>
                </div>
              ))}
            </div>

            {/* Render the full Partner Dashboard */}
            <div className="mt-4">
              <PartnerDashboard 
                onAddPropertyLocally={handleAddNewOnboardedProperty}
                existingProperties={localProperties}
              />
            </div>
          </div>
        </div>
      )}

      {/* SECURE PORTAL LOGIN CONSOLE MODAL */}
      {isPortalLoginOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-550 via-emerald-500 to-navy-500" />
            
            <button 
              onClick={() => {
                setIsPortalLoginOpen(false);
                setPortalError('');
                setPortalPasscode('');
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8 text-left">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono text-saffron-600 tracking-wider font-bold uppercase block mb-1">
                  BHARAT TRAVELS SYSTEMS
                </span>
                <h3 className="text-2xl font-serif text-navy-500 font-extrabold tracking-tight">
                  Secure Workspace Sign-In
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Authenticate with your registered security credentials to access staff operations or partner dashboards.
                </p>
              </div>

              {/* Portal Selector Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono font-bold mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setPortalSelect('staff');
                    setPortalError('');
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-center transition-all cursor-pointer ${
                    portalSelect === 'staff' ? 'bg-white text-navy-500 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Operations Portal (Staff)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPortalSelect('owner');
                    setPortalError('');
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-center transition-all cursor-pointer ${
                    portalSelect === 'owner' ? 'bg-white text-navy-500 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Owner Dashboard
                </button>
              </div>

              {/* Enter Credentials form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const cleaned = portalPasscode.trim().toLowerCase();
                  if (portalSelect === 'staff') {
                    if (cleaned === 'staff' || cleaned === 'demo') {
                      setWorkspace('staff');
                      setIsPortalLoginOpen(false);
                      setPortalError('');
                      setPortalPasscode('');
                    } else {
                      setPortalError("Invalid Staff Passcode. Tips: use 'staff' or 'demo'!");
                    }
                  } else {
                    if (cleaned === 'owner' || cleaned === 'demo') {
                      setWorkspace('owner');
                      setIsPortalLoginOpen(false);
                      setPortalError('');
                      setPortalPasscode('');
                    } else {
                      setPortalError("Invalid Owner Passcode. Tips: use 'owner' or 'demo'!");
                    }
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
                    {portalSelect === 'staff' ? "Staff ID / Passcode" : "Partner Owner Passcode"}
                  </label>
                  <input 
                    type="password"
                    placeholder={`Enter '${portalSelect}' or click Quick Bypass below`}
                    value={portalPasscode}
                    onChange={(e) => setPortalPasscode(e.target.value)}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-saffron-500 font-mono"
                    required
                  />
                </div>

                {portalError && (
                  <p className="text-[10px] text-red-650 font-mono font-bold bg-red-50 border border-red-100 p-2 rounded-lg">
                    ⚠️ {portalError}
                  </p>
                )}

                <div className="space-y-2.5 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-navy-500 hover:bg-navy-600 text-white font-extrabold text-sm py-3 rounded-xl uppercase tracking-wider transition-all cursor-pointer text-center"
                  >
                    Authenticate Session
                  </button>

                  {/* Demo Login Bypasses */}
                  <div className="border-t border-slate-100 pt-3 text-center">
                    <span className="text-[10px] text-slate-400 font-mono block mb-2">Reviewer Quick-Bypass:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setWorkspace('staff');
                          setIsPortalLoginOpen(false);
                          setPortalError('');
                          setPortalPasscode('');
                        }}
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-650 font-bold text-[9px] py-2 rounded-lg transition-all font-mono uppercase cursor-pointer"
                      >
                        ⚡ Staff Bypass
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setWorkspace('owner');
                          setIsPortalLoginOpen(false);
                          setPortalError('');
                          setPortalPasscode('');
                        }}
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-650 font-bold text-[9px] py-2 rounded-lg transition-all font-mono uppercase cursor-pointer"
                      >
                        ⚡ Owner Bypass
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Simple icons loader
function Trash2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
