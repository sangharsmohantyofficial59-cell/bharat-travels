import React, { useState } from 'react';
import { Property } from '../types';
import { X, Star, MapPin, Award, CheckCircle2, ShieldCheck, Mail, Phone, CalendarCheck, Send, Bookmark } from 'lucide-react';

interface PropertyDetailsModalProps {
  isOpen: boolean;
  property: Property | null;
  onClose: () => void;
  onBookNow: (property: Property) => void;
}

export default function PropertyDetailsModal({ isOpen, property, onClose, onBookNow }: PropertyDetailsModalProps) {
  const [activeImage, setActiveImage] = useState<string>('');
  const [isInquirySuccess, setIsInquirySuccess] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isContactActive, setIsContactActive] = useState(false);

  React.useEffect(() => {
    if (property) {
      setActiveImage(property.image);
      setIsInquirySuccess(false);
      setIsContactActive(false);
      setInquiryName('');
      setInquiryMessage('');
    }
  }, [property]);

  if (!isOpen || !property) return null;

  // Use property gallery or default to activeImage
  const galleryImages = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.image];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInquirySuccess(true);
    setTimeout(() => {
      setIsInquirySuccess(false);
      setInquiryName('');
      setInquiryMessage('');
      setIsContactActive(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-md animate-fade-in" id="property-details-overlay">
      
      {/* Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-saffron-100/35 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-navy-100 max-h-[95vh] flex flex-col animate-scale-up text-slate-800">
        
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-navy-100 bg-navy-50 flex justify-between items-center z-10">
          <div>
            <span className="text-[10px] text-saffron-500 font-mono tracking-widest uppercase block mb-0.5">
              {property.category === 'resort' ? 'Exquisite Premium Resort' : 'Luxury Direct Hotel'}
            </span>
            <h3 className="font-serif text-lg md:text-xl text-navy-500 font-bold">
              {property.name}
            </h3>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-navy-100 text-gray-500 hover:text-navy-500 transition-colors"
            id="close-details-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
          
          {/* Gallery + Main Stats Top row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Gallery Left Component */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden border border-navy-100">
                <img 
                  src={activeImage || property.image} 
                  alt={property.name} 
                  className="w-full h-full object-cover transition-all"
                  id="main-detail-photo"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float tags */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                  <span className="text-[10px] bg-navy-500/90 backdrop-blur-sm text-white font-mono px-3 py-1 rounded-full border border-saffron-500/20 uppercase font-bold">
                    {property.location}, {property.state}
                  </span>
                  <div className="flex items-center gap-1.5 text-saffron-500 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-navy-100 font-mono text-xs shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-saffron-500 text-saffron-500" />
                    <span className="font-bold">{property.rating}</span>
                    <span className="text-gray-500 text-[10px] sm:text-xs">({property.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails row */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1" id="photo-thumbnails">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-14 rounded-md overflow-hidden border shrink-0 transition-opacity ${
                        activeImage === img ? 'border-saffron-500 opacity-100' : 'border-gray-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick summary panel Right (5 cols) */}
            <div className="lg:col-span-5 bg-navy-50 border border-navy-100 rounded-xl p-5 space-y-4">
              <div className="text-xs font-mono text-navy-500 uppercase tracking-widest leading-none font-bold">Starting Premium Price</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-sans text-navy-500">₹{property.startingPrice.toLocaleString('en-IN')}</span>
                <span className="text-gray-500 text-xs font-mono">/ night</span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed pt-2 border-t border-navy-100">
                {property.description}
              </p>

              {/* Key Amenities */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] text-navy-500 font-mono uppercase block tracking-wider font-bold">Highlight Conveniences:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {property.amenities.map((am, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 shrink-0" />
                      <span className="line-clamp-1">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action columns */}
              <div className="pt-4 border-t border-navy-100 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onBookNow(property)}
                  className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs py-3 rounded-lg text-center uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
                  id="details-book-now-btn"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book Now
                </button>
                <button
                  onClick={() => setIsContactActive(!isContactActive)}
                  className="bg-transparent border border-navy-200 hover:border-saffron-300 text-slate-750 hover:text-saffron-500 font-bold text-xs py-3 rounded-lg text-center uppercase tracking-wider transition-all"
                  id="details-contact-property-btn"
                >
                  {isContactActive ? 'View Details' : 'Contact Host'}
                </button>
              </div>
            </div>

          </div>

          {/* Conditional Contact Host Display or Details layout */}
          {isContactActive ? (
            <div className="p-6 rounded-xl bg-saffron-50/50 border border-saffron-200 space-y-4 animate-scale-up text-slate-800" id="contact-host-panel">
              <div className="flex justify-between items-center">
                <h4 className="font-serif text-lg text-navy-500 font-bold flex items-center gap-2">
                  <Mail className="w-5 h-5 text-saffron-500" />
                  Direct Merchant Messenger
                </h4>
                <div className="text-[10px] text-saffron-600 font-mono bg-saffron-50 px-2.5 py-0.5 rounded border border-saffron-200 uppercase font-bold">
                  Responds in ~15 mins
                </div>
              </div>

              {isInquirySuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-center space-y-2 text-xs text-emerald-650">
                  <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600 animate-bounce" />
                  <span>Your direct query was dispatched to the manager of <strong>{property.name}</strong>.</span>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5 text-xs text-slate-755">
                  <p className="text-slate-600">
                    Your credentials will be routed into their PMS instantly. Message verified encryption is active.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider mb-1 text-slate-500 font-bold">Your Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Priyanshu Mohapatra"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-saffron-500/60"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider mb-1 text-slate-500 font-bold">Preferred Call Line</label>
                      <input 
                        type="text"
                        placeholder="e.g. +91 9437..."
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-saffron-500/60"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider mb-1 text-slate-500 font-bold">Direct Message / Specifications</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Ask about temple transfer schedules, early check-in hours, custom cuisines..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-saffron-500/60 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs py-2 px-5 rounded uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Transmit Inquiry
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              {/* Room Categories Section */}
              <div className="space-y-4" id="room-categories-container">
                <div className="border-b border-gray-100 pb-2">
                  <h4 className="font-serif text-lg text-navy-500 font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-saffron-500" />
                    Available Sanctuary Room Tiers
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.roomCategories && property.roomCategories.length > 0 ? (
                    property.roomCategories.map((room, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-slate-50 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="font-serif text-base text-navy-500 font-bold">{room.name}</span>
                            <span className="text-sm font-semibold font-mono text-saffron-500">₹{room.price.toLocaleString('en-IN')}/night</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {room.description}
                          </p>
                        </div>
                        
                        <div className="pt-3 mt-3 border-t border-slate-200 flex flex-wrap gap-1.5 justify-between items-center">
                          <div className="flex flex-wrap gap-1">
                            {room.amenities.slice(0, 3).map((ram, i) => (
                              <span key={i} className="text-[9px] bg-white text-slate-600 font-mono px-1.5 py-0.5 rounded border border-slate-200">
                                {ram}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => onBookNow(property)}
                            className="text-saffron-500 font-mono text-[10px] uppercase font-bold underline hover:text-saffron-600 transition-colors"
                          >
                            Reserve Tier
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl border border-gray-200 bg-slate-50 flex justify-between items-center col-span-2">
                      <div>
                        <span className="font-serif text-base text-navy-500 font-bold">Club Premium Sanctuary Room</span>
                        <p className="text-xs text-slate-600 mt-1">Our finest suite option, customized directly for couples and spiritual travelers.</p>
                      </div>
                      <span className="text-sm font-semibold font-mono text-saffron-500 whitespace-nowrap">₹{property.startingPrice.toLocaleString('en-IN')}/night</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews and Nearby listings row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                
                {/* Genuine Guest Reviews columns */}
                <div className="space-y-4" id="reviews-detail-panel">
                  <h4 className="font-serif text-base text-navy-500 font-bold">Verified Guest Experiences</h4>
                  
                  <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                    {property.reviewsList && property.reviewsList.length > 0 ? (
                      property.reviewsList.map((rev, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-gray-250 rounded-lg text-xs space-y-1.5">
                          <div className="flex justify-between items-center text-slate-500">
                            <span className="font-bold text-navy-500">{rev.author}</span>
                            <span className="font-mono text-[10px]">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-saffron-500 font-mono text-[10px]">
                            <Star className="w-3 h-3 fill-saffron-500" />
                            <span>{rev.score} / 5.0</span>
                          </div>
                          <p className="text-slate-600 italic">
                            "{rev.content}"
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-slate-50 border border-gray-200 rounded-lg text-xs space-y-1.5">
                        <div className="flex justify-between items-center text-slate-500">
                          <span className="font-bold text-navy-500">Anand Patnaik</span>
                          <span className="font-mono text-[10px]">10-Jun-2026</span>
                        </div>
                        <div className="flex items-center gap-1 text-saffron-500 font-mono text-[10px]">
                          <Star className="w-3 h-3 fill-saffron-500" />
                          <span>4.9 / 5.0</span>
                        </div>
                        <p className="text-slate-600 italic">
                          "Prisistne coastal atmosphere. The directly synced booking process works flawlessly. High class direct check-in with zero queues."
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Nearby Attractions */}
                <div className="space-y-4">
                  <h4 className="font-serif text-base text-navy-500 font-bold">Nearby Attractions</h4>
                  
                  <div className="space-y-2.5">
                    {property.nearbyAttractions && property.nearbyAttractions.length > 0 ? (
                      property.nearbyAttractions.map((att, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-gray-205 flex gap-2 items-center text-xs text-slate-700 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-saffron-500 shrink-0" />
                          <span>{att}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="p-3 rounded-lg bg-slate-50 border border-gray-200 flex gap-2 items-center text-xs text-slate-700 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-saffron-500 shrink-0" />
                          <span>Bay of Bengal Shoreline (0.1 km)</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 border border-gray-200 flex gap-2 items-center text-xs text-slate-700 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-saffron-500 shrink-0" />
                          <span>Prathyusha Sand Art Museum (2.5 km)</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>
            </>
          )}

        </div>

        {/* Footer Security block */}
        <div className="px-6 py-3.5 border-t border-navy-100 bg-navy-50 flex justify-between items-center text-[10px] font-mono text-gray-500">
          <span className="flex items-center gap-1.5 text-navy-500 font-bold">
            <ShieldCheck className="w-4 h-4 text-saffron-500 shrink-0" />
            Bharat Travels Direct GDS Encrypted
          </span>
          <span>Security Class Code: BT-SEC-770x</span>
        </div>

      </div>
    </div>
  );
}
