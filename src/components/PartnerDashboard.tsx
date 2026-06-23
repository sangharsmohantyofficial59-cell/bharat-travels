import React, { useState, useEffect } from 'react';
import { PartnerInquiry, Property } from '../types';
import { Award, Hotel, Building2, TrendingUp, Users, Ship, ShieldCheck, Mail, Phone, ChevronRight, CheckCircle2, ClipboardList, Zap, ArrowUpRight } from 'lucide-react';

interface PartnerDashboardProps {
  onAddPropertyLocally: (newProp: Property) => void;
  existingProperties: Property[];
}

export default function PartnerDashboard({ onAddPropertyLocally, existingProperties }: PartnerDashboardProps) {
  // Simulator State
  const [inquiries, setInquiries] = useState<PartnerInquiry[]>([
    { id: 'INQ-101', propertyName: 'Niladri Shore Resort', ownerName: 'Pradeep Mohapatra', email: 'owner@niladrishore.com', phone: '+91 94370 12000', city: 'Puri', propertyType: 'resort', status: 'Approved', submissionDate: '12-Jun-2026' },
    { id: 'INQ-102', propertyName: 'Jagannatha Homestay Elite', ownerName: 'Sanjay Mishra', email: 'sanjay@jag-stay.com', phone: '+91 98610 54101', city: 'Puri', propertyType: 'villa', status: 'Reviewed', submissionDate: '18-Jun-2026' },
  ]);

  // Form State
  const [propName, setPropName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Puri');
  const [propType, setPropType] = useState<'hotel' | 'resort' | 'villa'>('resort');
  const [startingPrice, setStartingPrice] = useState('8500');
  const [isDemoRequested, setIsDemoRequested] = useState(false);
  const [isOnboardingSuccess, setIsOnboardingSuccess] = useState(false);
  
  // Dashboard Interactive Simulations
  const [activeTab, setActiveTab] = useState<'listings' | 'analytics' | 'inquiries'>('listings');
  const [platformMetrics, setPlatformMetrics] = useState({
    totalRevenue: 1845200,
    activeStays: 42,
    occupancyRate: 88.4,
    directVouchersGenerated: 148
  });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propName || !ownerName || !email) return;

    // Simulate database write
    const newInquiry: PartnerInquiry = {
      id: `INQ-${Math.floor(103 + Math.random() * 900)}`,
      propertyName: propName,
      ownerName: ownerName,
      email: email,
      phone: phone || '+91 99999 55555',
      city: city,
      propertyType: propType,
      status: 'Submitted',
      submissionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setInquiries([newInquiry, ...inquiries]);

    // Create a client-side mock property to inject it instantly into our landing page listings!
    // This perfectly demonstrates real-time listing onboarding.
    const mockPropertyImage = propType === 'resort' 
      ? 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
      : propType === 'villa' 
        ? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

    const newLocalProperty: Property = {
      id: `prop-onboarded-${Math.floor(Math.random() * 10000)}`,
      name: propName,
      location: `${city} Highway Central`,
      state: city === 'Puri' || city === 'Goa' || city === 'Jaipur' ? city : 'Odisha',
      rating: 4.8,
      reviewsCount: 1,
      image: mockPropertyImage,
      startingPrice: Number(startingPrice) || 7500,
      category: propType,
      amenities: ['Direct GDS Console Check-in', 'Revenue Dashboard Integrated', 'Airport Transfer Link', 'Hi-speed Wi-Fi Pro'],
      description: `Newly onboarded premier property in ${city}. Connected securely to the Bharat Travels Hospitality network, fully authorized for immediate guest stays.`
    };

    onAddPropertyLocally(newLocalProperty);

    // Update global metrics live to show partner impact
    setPlatformMetrics(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + 24500,
      directVouchersGenerated: prev.directVouchersGenerated + 1,
      activeStays: prev.activeStays + 1
    }));

    setIsOnboardingSuccess(true);
    // Reset Form
    setPropName('');
    setOwnerName('');
    setEmail('');
    setPhone('');
  };

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoRequested(true);
  };

  const simulateTick = () => {
    // Random platform tick simulations
    setPlatformMetrics(p => {
      const isUp = Math.random() > 0.4;
      const revenueTick = Math.floor(Math.random() * 4500);
      return {
        ...p,
        totalRevenue: p.totalRevenue + (isUp ? revenueTick : -500),
        occupancyRate: Math.max(70, Math.min(100, Number((p.occupancyRate + (isUp ? 0.2 : -0.1)).toFixed(1)))),
        directVouchersGenerated: p.directVouchersGenerated + (Math.random() > 0.85 ? 1 : 0)
      };
    });
  };

  useEffect(() => {
    const interval = setInterval(simulateTick, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="owner-console" className="relative py-24 bg-slate-50 border-t border-navy-100">
      
      {/* Decorative vectors */}
      <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-saffron-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-saffron-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-saffron-600 font-mono tracking-[0.25em] uppercase px-3 py-1 rounded bg-saffron-50 border border-saffron-250 inline-block mb-3 font-bold">
            HOSPITALITY MANAGEMENT SUITE
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-navy-500 font-bold tracking-wide">
            Grow Your Hospitality Business
          </h2>
          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            Eliminate massive commission middle-agents. Join India's preeminent direct-booking ecosystem and guest operating system. From high-end PMS tools to global distribution.
          </p>
        </div>

        {/* Live Interactive Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Interactive Dashboard Sandbox (7 Columns) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl relative">
            
            {/* Top Device Bar */}
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase ml-2 flex items-center gap-1.5 font-bold">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live HMS Sandbox Console
                </span>
              </div>
              
              {/* Tab Toggles */}
              <div className="flex bg-slate-200 rounded-lg p-0.5 border border-slate-250 font-mono text-[10px] font-bold">
                <button 
                  onClick={() => setActiveTab('listings')}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeTab === 'listings' ? 'bg-white text-saffron-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Properties
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeTab === 'analytics' ? 'bg-white text-saffron-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Yield Analytics
                </button>
                <button 
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeTab === 'inquiries' ? 'bg-white text-saffron-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Onboard Logs ({inquiries.length})
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 bg-white min-h-[420px]">
              
              {/* STATS STRIP */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <span className="text-[9px] text-slate-500 font-mono block font-bold">SIMULATED REVENUE</span>
                  <p className="text-base font-black text-saffron-650 font-mono mt-0.5">₹{platformMetrics.totalRevenue.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <span className="text-[9px] text-slate-500 font-mono block font-bold">AVG OCCUPANCY</span>
                  <p className="text-base font-black text-navy-500 font-mono mt-0.5">{platformMetrics.occupancyRate}%</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <span className="text-[9px] text-slate-500 font-mono block font-bold">ACTIVE IN-HOUSE</span>
                  <p className="text-base font-black text-navy-500 font-mono mt-0.5">{platformMetrics.activeStays} Stays</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <span className="text-[9px] text-slate-500 font-mono block font-bold">GUEST VOUCHERS</span>
                  <p className="text-base font-black text-emerald-600 font-mono mt-0.5">{platformMetrics.directVouchersGenerated} issued</p>
                </div>
              </div>

              {/* LISTINGS TAB */}
              {activeTab === 'listings' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-saffron-600 font-mono font-bold tracking-wider">ONBOARDED PORTFOLIO</span>
                    <span className="text-[10px] text-slate-400 font-mono font-semibold">DYNAMICALLY MAPPED</span>
                  </div>
                  
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {existingProperties.map((prop) => (
                      <div key={prop.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-saffron-50 border border-saffron-200 flex items-center justify-center text-saffron-600 font-semibold uppercase shrink-0">
                            {prop.category === 'hotel' ? <Hotel className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                          </div>
                          <div>
                            <h5 className="text-sm font-extrabold text-navy-500">{prop.name}</h5>
                            <span className="text-[11px] text-slate-500 font-mono font-bold uppercase">{prop.category} | {prop.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-saffron-600 block">₹{prop.startingPrice.toLocaleString('en-IN')}+</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-md font-mono font-bold uppercase">ACTIVE DIST</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-saffron-50 rounded-xl border border-saffron-150 text-xs text-saffron-800 flex items-center gap-2 font-medium">
                    <Zap className="w-4 h-4 text-saffron-600 animate-pulse shrink-0" />
                    <span>Onboarding properties on the right instantly populates this sandbox simulation! Try it.</span>
                  </div>
                </div>
              )}

              {/* ANALYTICS TAB */}
              {activeTab === 'analytics' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-xs text-saffron-600 font-mono font-bold">Bespoke Demand and Direct Booking Capture Rate</h5>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg font-mono font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +14.3% YoY Yield
                    </span>
                  </div>

                  {/* CUSTOM GRAPH USING DIRECT SVG */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 h-44 flex flex-col justify-between">
                    
                    {/* SVG Curve */}
                    <div className="flex-1 relative w-full pt-4">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                        <div className="border-b border-slate-200 w-full" />
                        <div className="border-b border-slate-200 w-full" />
                        <div className="border-b border-slate-200 w-full" />
                      </div>

                      {/* SVG Line */}
                      <svg className="w-full h-full text-saffron-500" viewBox="0 0 500 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M0,80 Q75,30 150,55 T300,15 T450,40 L500,20 L500,100 L0,100 Z" fill="url(#chart-grad)" />
                        <path d="M0,80 Q75,30 150,55 T300,15 T450,40 L500,20" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                        
                        {/* Glow indicators */}
                        <circle cx="300" cy="15" r="4.5" fill="#fff" stroke="#f59e0b" strokeWidth="2.5" />
                        <circle cx="500" cy="20" r="4.5" fill="#fff" stroke="#f59e0b" strokeWidth="2.5" />
                      </svg>
                    </div>

                    {/* X-Axis labels */}
                    <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-2 pt-1.5 border-t border-slate-205">
                      <span>MON (JAN)</span>
                      <span>TUE (FEB)</span>
                      <span>WED (MAR)</span>
                      <span>THU (APR)</span>
                      <span>FRI (MAY)</span>
                      <span>SAT (JUN)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">DIRECT CHANNEL YIELD</span>
                      <p className="text-sm font-black text-navy-500 font-mono mt-1">₹14.2 Lakhs secured</p>
                      <span className="text-[9px] text-slate-400 font-medium block">Commission leakage stopped!</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">GUEST LOGS ACCESSED</span>
                      <p className="text-sm font-black text-navy-500 font-mono mt-1">100% digital check-in</p>
                      <span className="text-[9px] text-slate-400 font-medium block">0 min desk waiting times</span>
                    </div>
                  </div>
                </div>
              )}

              {/* INQUIRIES TAB */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-saffron-600 font-mono font-bold">DASHBOARD CONNECTIVITY PORTAL LOGS</span>
                    <span className="text-[10px] text-slate-400 font-mono">REAL-TIME SIMULATOR METADATA</span>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {inquiries.map((inq, idx) => (
                      <div key={inq.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 font-mono text-xs text-slate-700">
                        <div className="flex justify-between items-start">
                          <span className="font-extrabold text-[#0f172a]">{inq.propertyName}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold ${
                            inq.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                            inq.status === 'Reviewed' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                            'bg-saffron-50 text-saffron-700 border border-saffron-200'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-semibold uppercase">
                          <span>Owner: {inq.ownerName}</span>
                          <span>City: {inq.city}</span>
                          <span>Inquired: {inq.submissionDate}</span>
                          <span>HMS ID: {inq.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Brand Bar */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs font-mono text-saffron-700 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-saffron-600" />
                PCI-DSS & direct GDS channel encrypted
              </span>
              <span>188 Active Partners</span>
            </div>

          </div>

          {/* RIGHT: List Your Property Onboarding Form (5 Columns) */}
          <div className="lg:col-span-5 space-y-6" id="owner-cta">
            
            {/* The Form */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 relative overflow-hidden shadow-2xl">
              
              <div className="mb-6">
                <span className="text-[10px] font-mono text-saffron-600 tracking-wider font-bold block mb-1">PARTNERSHIP ONBOARDING</span>
                <h4 className="font-serif text-xl md:text-2xl text-navy-500 font-extrabold">Join Premier Circle</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Onboard your property to instantly simulate how direct bookings will bypass major portals.
                </p>
              </div>

              {isOnboardingSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-4 animate-scale-up">
                  <div className="w-12 h-12 bg-emerald-100/50 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-serif text-lg text-emerald-800 font-extrabold">SUCCESSFULLY ONBOARDED!</h5>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Your property is now mapped to our direct booking ecosystem simulator. Try switching views in the left PMS Console or looking under Destinations.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsOnboardingSuccess(false)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Onboard Another Property
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Property Name *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Puri Heritage Retreat"
                      value={propName}
                      onChange={(e) => setPropName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-saffron-400 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Owner Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. S. Mohanty"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-saffron-400 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Direct Phone</label>
                      <input 
                        type="tel"
                        placeholder="+91 94370..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-saffron-400 focus:bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Owner Professional Email *</label>
                    <input 
                      type="email"
                      required
                      placeholder="owner@yourresort.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-saffron-400 focus:bg-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Property Location</label>
                      <select 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-saffron-400 focus:bg-white select-custom"
                      >
                        <option value="Puri">Puri</option>
                        <option value="Konark">Konark</option>
                        <option value="Chilika">Chilika</option>
                        <option value="Bhubaneswar">Bhubaneswar</option>
                        <option value="Goa">Goa</option>
                        <option value="Jaipur">Jaipur</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Starting Rack Rate (₹)</label>
                      <input 
                        type="number"
                        placeholder="8500"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-saffron-400 focus:bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Property Classification</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['resort', 'hotel', 'villa'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropType(type)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            propType === type 
                              ? 'bg-saffron-50 border-saffron-400 text-saffron-700' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {type.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Instantly List My Property
                  </button>

                </form>
              )}

            </div>

            {/* Request a Demo CTA Block */}
            <div className="bg-white rounded-2xl border border-navy-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              {isDemoRequested ? (
                <div className="w-full text-left py-1 animate-fade-in text-emerald-700">
                  <h5 className="font-serif text-base font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-605" />
                    Demo Inquiry Registered!
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Thank you! A Bharat Travels Enterprise partner consultant will contact you within 2 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <h5 className="font-serif text-base text-navy-500 font-bold">Need an onsite consultation?</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Connect with our enterprise tech consultants.</p>
                  </div>
                  <button 
                    onClick={handleDemoRequest}
                    className="bg-saffron-50 border border-saffron-300 text-saffron-700 hover:bg-saffron-100 px-4 py-2 rounded-lg text-xs tracking-wider uppercase font-bold transition-all whitespace-nowrap cursor-pointer"
                  >
                    Request Demo
                  </button>
                </>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
