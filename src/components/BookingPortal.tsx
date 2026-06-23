import React, { useState } from 'react';
import { Property, Vehicle, Booking } from '../types';
import { Calendar, Users, X, Check, Award, ShieldCheck, CreditCard, Clock, PlaneTakeoff, RefreshCw, Trash2, Car, Sparkles } from 'lucide-react';
import { VEHICLES } from '../data';

interface BookingPortalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
  selectedVehicle?: Vehicle | null;
  onAddBooking: (booking: Booking) => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export default function BookingPortal({ 
  isOpen, 
  onClose, 
  selectedProperty, 
  selectedVehicle, 
  onAddBooking,
  initialCheckIn,
  initialCheckOut,
  initialGuests
}: BookingPortalProps) {
  const [step, setStep] = useState<'details' | 'booking-engine' | 'confirmed'>('details');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState<'standard' | 'premier' | 'sovereign'>('premier');
  const [durationDays, setDurationDays] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Hotel Transport bundle states
  const [needTransport, setNeedTransport] = useState<string>('No');
  const [selectedTransportVehicle, setSelectedTransportVehicle] = useState<Vehicle | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setStep('details');
      const defaultCheckIn = initialCheckIn || (() => {
        const today = new Date();
        today.setDate(today.getDate() + 7);
        return today.toISOString().split('T')[0];
      })();
      setCheckIn(defaultCheckIn);

      const defaultCheckOut = initialCheckOut || (() => {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 10);
        return nextWeek.toISOString().split('T')[0];
      })();
      setCheckOut(defaultCheckOut);

      setGuests(initialGuests || 2);
      setNeedTransport('No');
      setSelectedTransportVehicle(null);
    }
  }, [isOpen, initialCheckIn, initialCheckOut, initialGuests]);

  // Pre-select first vehicle automatically when transport option toggled on
  React.useEffect(() => {
    if (needTransport !== 'No' && !selectedTransportVehicle) {
      setSelectedTransportVehicle(VEHICLES[0] || null);
    }
  }, [needTransport]);

  if (!isOpen) return null;

  const isHotel = !!selectedProperty;
  const isTransport = !!selectedVehicle;

  // Price calculations
  const baseRate = isHotel 
    ? selectedProperty!.startingPrice 
    : selectedVehicle!.pricePerKm * 150; // Assume standard transfer is 150 km average

  const roomMultiplier = roomType === 'standard' ? 0.8 : roomType === 'premier' ? 1.0 : 1.6;
  const nightCalculated = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)));
  
  // Calculate transport extra flat cost if selected
  const transportFlatRate = (isHotel && needTransport !== 'No' && selectedTransportVehicle)
    ? Math.round(selectedTransportVehicle.pricePerKm * 65) // 65km standard distance
    : 0;

  const staySubtotal = isHotel 
    ? baseRate * roomMultiplier * nightCalculated * (guests > 2 ? 1.15 : 1.0)
    : baseRate * guests;

  const subtotal = staySubtotal + transportFlatRate;
  
  const taxRate = 0.18; // 18% GST for luxury products in India
  const taxes = Math.round(subtotal * taxRate);
  const total = Math.round(subtotal + taxes);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury booking response delay
    setTimeout(() => {
      const generatedBookingId = `BT-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: Booking = {
        id: generatedBookingId,
        type: isHotel ? 'hotel' : 'transport',
        targetName: isHotel ? selectedProperty!.name : selectedVehicle!.name,
        locationOrRoute: isHotel 
          ? `${selectedProperty!.location}, ${selectedProperty!.state}`
          : selectedVehicle!.transfers[0],
        checkIn: checkIn,
        checkOut: isHotel ? checkOut : undefined,
        guests: guests,
        totalPrice: total,
        status: 'Confirmed',
        bookingDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        
        // Bundled transport parameters if active
        ...(isHotel && needTransport !== 'No' && selectedTransportVehicle ? {
          transportTypeSelection: needTransport,
          linkedHotelBookingId: generatedBookingId,
          vehicleType: selectedTransportVehicle.type,
          pickupLocation: needTransport === 'Airport Pickup' ? 'Biju Patnaik Airport (BBI), Bhubaneswar' : needTransport === 'Railway Pickup' ? 'Puri Junction Railway Station' : 'Local Sightseeing Outpost',
          dropLocation: selectedProperty!.name,
          travelDate: checkIn,
          travelTime: '12:00',
          assignedVehicle: selectedTransportVehicle.name,
          assignedVehiclePlate: 'OD-02-AX-3920',
          assignedDriver: 'Muralidhar Sahoo',
          assignedDriverPhone: '+91 94371 90841',
          fareBreakdown: {
            fare: transportFlatRate,
            partnerCost: Math.round(transportFlatRate * 0.9),
            commission: Math.round(transportFlatRate * 0.1),
            netRevenue: Math.round(transportFlatRate * 0.1)
          }
        } : {})
      };

      onAddBooking(newBooking);
      setCreatedBooking(newBooking);
      setIsSubmitting(false);
      setStep('confirmed');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-md animate-fade-in" id="booking-portal-overlay">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-saffron-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-3xl overflow-hidden border border-navy-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-navy-100 bg-navy-50 flex justify-between items-center">
          <div>
            <span className="text-[10px] text-saffron-500 font-mono tracking-widest uppercase block mb-0.5 font-bold">
              Secure Direct Checkout
            </span>
            <h3 className="font-serif text-lg text-navy-500 flex items-center gap-2 font-bold">
              <Award className="w-5 h-5 text-saffron-500" />
              {isHotel ? 'Reserve Luxury Stay' : 'Book High-End Transfer'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-navy-100 text-gray-500 hover:text-navy-500 transition-colors"
            id="close-booking-portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-800 bg-white">
          
          {step === 'details' && (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Product Preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row gap-4 items-start md:items-center">
                <img 
                  src={isHotel ? selectedProperty!.image : selectedVehicle!.image} 
                  alt="Service preview" 
                  className="w-full md:w-32 h-20 object-cover rounded-lg border border-navy-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <span className="text-[9px] bg-saffron-50 text-saffron-600 font-mono px-2 py-0.5 rounded uppercase border border-saffron-200 font-bold">
                    {isHotel ? 'Bespoke Property' : 'Premium Mobility'}
                  </span>
                  <h4 className="font-serif text-lg text-navy-500 font-bold mt-1">
                    {isHotel ? selectedProperty!.name : selectedVehicle!.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {isHotel ? selectedProperty!.location : `Seater capacity: ${selectedVehicle!.seater} | Special transfer lines`}
                  </p>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Date Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-saffron-500" />
                    {isHotel ? 'Check-In' : 'Date of Transfer'}
                  </label>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-saffron-500/60 font-mono"
                  />
                </div>

                {isHotel && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-saffron-500" />
                      Check-Out
                    </label>
                    <input 
                      type="date" 
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      min={checkIn}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-saffron-500/60 font-mono"
                    />
                  </div>
                )}

                {/* Guest counter */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-saffron-500" />
                    Guests
                  </label>
                  <select 
                    value={guests} 
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-saffron-500 text-slate-700"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                      <option key={n} value={n} className="bg-white">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Room Tiers / Category multipliers for Luxury Hotels */}
                {isHotel && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-saffron-500" />
                      Sanctuary Class
                    </label>
                    <select 
                      value={roomType} 
                      onChange={(e: any) => setRoomType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-saffron-500 text-slate-700"
                    >
                      <option value="standard" className="bg-white">Club Room (Standard Luxury)</option>
                      <option value="premier" className="bg-white">Sovereign Cottage (Premier Suite)</option>
                      <option value="sovereign" className="bg-white">Emperor Plunge Pool Suite (Ultra Luxe)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Hotel Transport Bundle Integration Options Prompt */}
              {isHotel && (
                <div className="p-4 rounded-xl border border-saffron-200/60 bg-saffron-50/20 space-y-3.5" id="hotel-transport-bundle-selector">
                  <div className="flex items-center gap-2">
                    <Car className="w-4.5 h-4.5 text-saffron-555 shrink-0" />
                    <div>
                      <h5 className="text-[11px] font-mono font-black text-navy-500 uppercase tracking-wider">
                        ★ Integrated Travel-Tech Carrier Transfer
                      </h5>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        Do you require professional transit services synced directly with your boutique room stay?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5 pt-0.5">
                    {[
                      { key: 'No', label: 'No' },
                      { key: 'Airport Pickup', label: 'Airport Pick' },
                      { key: 'Railway Pickup', label: 'Railway Pick' },
                      { key: 'Local Transport', label: 'Local Tour' },
                      { key: 'Sightseeing Vehicle', label: 'Sightseeing' }
                    ].map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setNeedTransport(option.key)}
                        className={`px-1.5 py-2 rounded-lg border text-center font-mono text-[9px] font-bold uppercase transition-all ${
                          needTransport === option.key
                            ? 'bg-[#bb5a06] text-white border-[#bb5a06] shadow'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {needTransport !== 'No' && (
                    <div className="space-y-2 pt-2 border-t border-dashed border-saffron-200/50">
                      <label className="block text-[9px] font-mono font-extrabold text-slate-500 uppercase tracking-widest">
                        Choose Carrier Fleet Car Class:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {VEHICLES.map((vehicle) => (
                          <button
                            key={vehicle.id}
                            type="button"
                            onClick={() => setSelectedTransportVehicle(vehicle)}
                            className={`p-2 rounded-lg border text-left flex items-center justify-between gap-2.5 transition-all ${
                              selectedTransportVehicle?.id === vehicle.id
                                ? 'bg-saffron-50/70 border-saffron-450 ring-1 ring-saffron-400'
                                : 'bg-white border-slate-200 hover:bg-slate-50/50'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img 
                                src={vehicle.image} 
                                alt="" 
                                className="w-8 h-8 rounded-md object-cover border border-slate-100 shrink-0" 
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <p className="text-[10px] font-bold text-slate-800 truncate">{vehicle.name}</p>
                                <p className="text-[8px] text-slate-400 font-mono tracking-tight uppercase">
                                  {vehicle.type} • {vehicle.seater} Pax
                                </p>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono font-black text-saffron-650 shrink-0">
                              ₹{Math.round(vehicle.pricePerKm * 65).toLocaleString('en-IN')}
                            </span>
                          </button>
                        ))}
                      </div>
                      <p className="text-[9px] text-[#aa5c02] font-mono">
                        ✓ Selected vehicle will wait directly at the terminal lobby upon arrival. Checked-in synced.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Price Breakdown Glass Panel */}
              <div className="p-4 rounded-xl bg-saffron-50 border border-saffron-200/50 space-y-2 font-mono text-sm text-slate-800">
                <span className="text-[10px] text-saffron-600 font-bold block mb-1">PRICING TRANSPARENCY (DIRECT SAVINGS)</span>
                
                <div className="flex justify-between text-slate-600">
                  <span>Room Stay Subtotal:</span>
                  <span>₹{Math.round(staySubtotal).toLocaleString('en-IN')}</span>
                </div>

                {isHotel && (
                  <>
                    <div className="flex justify-between text-slate-600 text-xs pl-3">
                      <span>-{nightCalculated} {nightCalculated === 1 ? 'night' : 'nights'} requested</span>
                      <span> {roomType === 'premier' ? '(Premier class)' : roomType === 'standard' ? '(Club Class)' : '(Sovereign royal)'}</span>
                    </div>
                  </>
                )}

                {isHotel && needTransport !== 'No' && selectedTransportVehicle && (
                  <div className="flex justify-between text-[#bb5a06] border-t border-dashed border-saffron-200/30 pt-1">
                    <span>Bundled {selectedTransportVehicle.type} Carrier Transfer ({needTransport}):</span>
                    <span>₹{transportFlatRate.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600 border-t border-dashed border-saffron-200/30 pt-1">
                  <span>Service & Taxable Subtotal:</span>
                  <span>₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Luxury GST (18%):</span>
                  <span>₹{taxes.toLocaleString('en-IN')}</span>
                </div>

                <div className="border-t border-saffron-200 pt-2 flex justify-between font-serif text-lg text-slate-800 leading-none">
                  <span className="font-sans font-bold text-navy-500">Total Quote:</span>
                  <span className="font-sans font-extrabold text-navy-500 text-xl">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Security guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct Partner Verified Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-saffron-500 shrink-0" />
                  <span>Secure zero-credit payment simulator</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-saffron-500 hover:bg-saffron-600 active:bg-saffron-750 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-xl tracking-wider uppercase font-sans text-sm flex items-center justify-center gap-2 hover:scale-[1.01]"
                id="submit-booking-checkout"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    Connecting Secure GDS Channel...
                  </>
                ) : (
                  <>
                    Confirm Direct Reservation
                  </>
                )}
              </button>

            </form>
          )}

          {step === 'confirmed' && createdBooking && (
            <div className="space-y-6 text-center py-6 animate-fade-in bg-white text-slate-800" id="booking-confirmed-panel">
              
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center animate-bounce text-emerald-600">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif text-2xl text-navy-500 font-bold">DIRECT BOOKING SECURED</h4>
                <p className="text-slate-600 text-xs mt-1">
                  Your reservation request was accepted instantly via the Bharat Travels Direct API.
                </p>
              </div>

              {/* Gilded Voucher Ticket Representation */}
              <div className="max-w-md mx-auto rounded-xl border border-saffron-300 bg-slate-50 overflow-hidden relative shadow-lg">
                
                {/* Visual side-cut notched ticket aesthetics */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-white border-r border-saffron-200" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-white border-l border-saffron-200" />

                <div className="p-5 border-b border-dashed border-saffron-200 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-saffron-600 font-mono tracking-widest uppercase font-bold">GUEST LUXURY VOUCHER</span>
                    <span className="text-[11px] font-mono text-saffron-600 bg-saffron-50 border border-saffron-200 px-2 py-0.5 rounded font-bold">
                      {createdBooking.id}
                    </span>
                  </div>
                  <h5 className="font-serif text-lg text-navy-500 font-bold mt-3 leading-tight">{createdBooking.targetName}</h5>
                  <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-saffron-500" />
                    {createdBooking.locationOrRoute || 'Customized Sightseeing route'}
                  </p>
                </div>

                <div className="p-5 text-left grid grid-cols-2 gap-4 font-mono text-xs text-slate-600">
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">SECURED FOR</span>
                    <span className="text-navy-500 font-sans font-bold text-sm">{createdBooking.guests} Guests</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">DATE</span>
                    <span className="text-navy-500 font-sans font-bold text-sm">{createdBooking.checkIn}</span>
                  </div>
                  {createdBooking.checkOut && (
                    <div className="col-span-2">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">CHECK-OUT RETREAT TERMINATION</span>
                      <span className="text-navy-500 font-sans font-bold text-sm">{createdBooking.checkOut}</span>
                    </div>
                  )}

                  {createdBooking.transportTypeSelection && (
                    <div className="col-span-2 bg-[#fffcf5] border border-saffron-150 p-2.5 rounded-lg">
                      <span className="text-[9px] text-saffron-700 block uppercase font-mono font-bold">★ CARRIER TRANSIT SYNCHRONIZED</span>
                      <span className="text-slate-850 font-sans font-bold text-xs mt-0.5 block">
                        🚙 {createdBooking.assignedVehicle} ({createdBooking.transportTypeSelection})
                      </span>
                      <span className="text-[9px] text-slate-500 block font-mono mt-0.5">
                        Chauffeur: {createdBooking.assignedDriver} | Plate: {createdBooking.assignedVehiclePlate}
                      </span>
                    </div>
                  )}

                  <div className="col-span-2 border-t border-slate-200 pt-3 flex justify-between items-center text-sm">
                    <span className="font-sans text-slate-600">Total Premium Remitted:</span>
                    <span className="text-saffron-600 font-sans font-black text-base">₹{createdBooking.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold inline-flex items-center gap-2">
                <PlaneTakeoff className="w-4 h-4 shrink-0" />
                <span>Travel pass issued. Open "My Bookings" in top navbar anytime to review.</span>
              </div>

              <button 
                onClick={onClose}
                className="w-full bg-navy-500 hover:bg-navy-600 text-white font-bold py-3.5 rounded-xl transition-all text-sm uppercase tracking-[0.1em] cursor-pointer shadow-md"
              >
                Close Ticket & Explore More Stays
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
