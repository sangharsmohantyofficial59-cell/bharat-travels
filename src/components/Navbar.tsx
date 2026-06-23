import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, Bell, Globe, ChevronDown, Award, Star, Hotel, LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onOpenOwnerDemo: () => void;
  onOpenMyBookings: () => void;
  bookingCount: number;
  onOpenPortal?: () => void; // Added for Staff & Owner workspace toggle
}

export default function Navbar({ onNavigate, onOpenOwnerDemo, onOpenMyBookings, bookingCount, onOpenPortal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to Bharat Travels', message: 'Explore luxury stays in Puri, Konark & Goa.', time: 'Just now', unread: true },
    { id: 2, title: 'Partner Update', message: 'Niladri Shore Resort joined our Premier Circle.', time: '1 hour ago', unread: true },
    { id: 3, title: 'Direct Booking Benefit', message: 'Earn 15% reward credits on booking today.', time: '1 day ago', unread: false }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md py-3 shadow-[0_1px_15px_rgba(10,37,64,0.06)] border-b border-navy-100' 
        : 'bg-white/90 backdrop-blur-sm py-4 border-b border-navy-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo BHARAT TRAVELS */}
          <div 
            onClick={() => onNavigate('hero')} 
            className="flex items-center gap-3 cursor-pointer group animate-fade-in"
            id="nav-logo-btn"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-navy-500 to-navy-700 shadow-md transition-all duration-300 group-hover:scale-105">
              <Compass className="w-5.5 h-3.5 text-white animate-spin-slow rotate-12" />
              <div className="absolute inset-0 rounded-xl border border-saffron-500/20 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-[20px] tracking-wider text-navy-500">BHARAT</span>
                <span className="text-white text-[9px] px-1.5 py-0.5 rounded-md bg-saffron-500 font-mono scale-95 font-extrabold tracking-widest">TRAVELS</span>
              </div>
              <p className="text-[9px] text-gray-500 tracking-wider uppercase font-mono font-bold">Discover. Stay. Travel. Experience.</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            <button 
              onClick={() => onNavigate('hotels-section')} 
              className="text-navy-500 hover:text-saffron-500 text-[14px] font-semibold tracking-wide transition-colors duration-200"
              id="nav-stays"
            >
              Stays
            </button>
            <button 
              onClick={() => onNavigate('resorts-section')} 
              className="text-navy-500 hover:text-saffron-500 text-[14px] font-semibold tracking-wide transition-colors duration-200"
              id="nav-resorts"
            >
              Resorts
            </button>
            <button 
              onClick={() => onNavigate('experiences-section')} 
              className="text-navy-500 hover:text-saffron-500 text-[14px] font-semibold tracking-wide transition-colors duration-200"
              id="nav-activities"
            >
              Activities
            </button>
            <button 
              onClick={() => onNavigate('transport-section')} 
              className="text-navy-500 hover:text-saffron-500 text-[14px] font-semibold tracking-wide transition-colors duration-200"
              id="nav-transport"
            >
              Transport
            </button>
            <button 
              onClick={() => onNavigate('packages-section')} 
              className="text-navy-500 hover:text-saffron-500 text-[14px] font-semibold tracking-wide transition-colors duration-200"
              id="nav-packages"
            >
              Holiday Packages
            </button>
            <button 
              onClick={() => onNavigate('partner-section')}
              className="text-navy-500 hover:text-saffron-500 text-[14px] font-semibold tracking-wide transition-colors duration-200"
              id="nav-list-property"
            >
              List Your Property
            </button>
          </div>

          {/* Desktop Right Settings & Widgets */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Notifications Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-navy-500 hover:text-saffron-500 transition-colors"
                id="notification-trigger"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-saffron-500 rounded-full" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl overflow-hidden border border-navy-100 z-50 animate-fade-in text-navy-500">
                  <div className="px-4 py-3 border-b border-navy-50 flex justify-between items-center bg-navy-50">
                    <span className="font-semibold text-xs uppercase tracking-wider text-navy-500 font-mono">Platform Updates</span>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-[10px] text-gray-500 hover:text-saffron-500 transition-colors underline">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-navy-50">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-3.5 hover:bg-navy-50/50 transition-colors ${notif.unread ? 'bg-saffron-50/50' : ''}`}>
                        <div className="flex justify-between items-start gap-2">
                          <span className={`text-xs font-semibold ${notif.unread ? 'text-saffron-500' : 'text-navy-500'}`}>{notif.title}</span>
                          <span className="text-[9px] text-gray-400 font-mono whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 text-center bg-navy-50 border-t border-navy-100">
                    <span className="text-[10px] text-gray-400 font-mono">Bharat Travels Secure GDS Connected</span>
                  </div>
                </div>
              )}
            </div>

            {/* Login & Sign Up buttons */}
            <div className="flex items-center gap-2 border-l border-navy-100 pl-6">
              <button 
                onClick={() => alert('Login flow is integrated securely under current session placeholder.')}
                className="text-navy-500 hover:text-saffron-500 font-semibold text-xs tracking-wider uppercase px-3 py-2 border border-transparent rounded-lg flex items-center gap-1 transition-colors"
                id="login-btn"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </button>
              <button 
                onClick={() => alert('Registration platform works via unified sandbox account.')}
                className="bg-navy-500 hover:bg-navy-600 text-white font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1"
                id="signup-btn"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile Menu Action */}
          <div className="flex items-center lg:hidden gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-500 hover:text-navy-500"
              id="nav-hamburger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-saffron-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-navy-100 py-4 px-6 shadow-xl flex flex-col gap-4 animate-fade-in z-50">
          <button 
            onClick={() => { onNavigate('hotels-section'); setMobileMenuOpen(false); }} 
            className="text-left py-2 font-medium text-navy-500 hover:text-saffron-500"
          >
            Stays
          </button>
          <button 
            onClick={() => { onNavigate('resorts-section'); setMobileMenuOpen(false); }} 
            className="text-left py-2 font-medium text-navy-500 hover:text-saffron-500"
          >
            Resorts
          </button>
          <button 
            onClick={() => { onNavigate('experiences-section'); setMobileMenuOpen(false); }} 
            className="text-left py-2 font-medium text-navy-500 hover:text-saffron-500"
          >
            Activities
          </button>
          <button 
            onClick={() => { onNavigate('transport-section'); setMobileMenuOpen(false); }} 
            className="text-left py-2 font-medium text-navy-500 hover:text-saffron-500"
          >
            Transport
          </button>
          <button 
            onClick={() => { onNavigate('packages-section'); setMobileMenuOpen(false); }} 
            className="text-left py-2 font-medium text-navy-500 hover:text-saffron-500"
          >
            Holiday Packages
          </button>
          <button 
            onClick={() => { onNavigate('partner-section'); setMobileMenuOpen(false); }} 
            className="text-left py-2 font-medium text-navy-500 hover:text-saffron-500"
          >
            List Your Property
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-50">
            <button 
              onClick={() => alert('Login flow pre-verified')}
              className="py-2 px-4 rounded-xl border border-navy-200 text-navy-500 hover:bg-navy-50 text-xs font-bold text-center"
            >
              LOGIN
            </button>
            <button 
              onClick={() => alert('Registration pre-verified')}
              className="py-2 px-4 rounded-xl bg-navy-500 text-white hover:bg-navy-600 text-xs font-bold text-center"
            >
              SIGN UP
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
