import React, { useState, useEffect } from 'react';
import { Vehicle, Booking } from '../types';
import { Calendar, Clock, MapPin, Users, Phone, FileText, CheckCircle, Award, CreditCard, Shield, Sparkles, X, ChevronRight } from 'lucide-react';

interface TransportBookingPortalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicle: Vehicle;
  onAddBooking: (booking: Booking) => void;
  // If linked to an existing reservation or property
  linkedHotelBookingId?: string;
  linkedPropertyName?: string;
  onSuccess?: () => void;
}

export default function TransportBookingPortal({
  isOpen,
  onClose,
  selectedVehicle,
  onAddBooking,
  linkedHotelBookingId,
  linkedPropertyName,
  onSuccess
}: TransportBookingPortalProps) {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelTime, setTravelTime] = useState('10:00');
  const [passengers, setPassengers] = useState(1);
  const [passengerName, setPassengerName] = useState('');
  const [passengerAge, setPassengerAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tripType, setTripType] = useState<'One Way' | 'Round Trip' | 'Local Sightseeing' | 'Airport Transfer' | 'Railway Transfer' | 'Corporate Travel' | 'Group Travel'>('One Way');

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Prefill travel date with a week from today if empty
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      const today = new Date();
      today.setDate(today.getDate() + 5);
      setTravelDate(today.toISOString().split('T')[0]);
      setPassengers(Math.min(selectedVehicle.seater, 2));
      
      // Auto-prefill pickup/drop if linked to property
      if (linkedPropertyName) {
        setTripType('Airport Transfer');
        setPickup('Biju Patnaik Airport (BBI), Bhubaneswar');
        setDrop(linkedPropertyName);
      } else {
        setPickup('');
        setDrop('');
      }
    }
  }, [isOpen, selectedVehicle, linkedPropertyName]);

  if (!isOpen) return null;

  // Let's calculate standard distance or standard flat rates based on trip types and vehicle pricing
  const baseMultiplier = 
    tripType === 'Round Trip' ? 1.8 :
    tripType === 'Local Sightseeing' ? 1.5 :
    tripType === 'Corporate Travel' ? 1.4 :
    tripType === 'Group Travel' ? 1.6 : 1.0;

  const estimatedDistanceKm = 
    tripType === 'Airport Transfer' ? 70 : // Bhubaneswar to Puri is about 70km
    tripType === 'Railway Transfer' ? 10 :
    tripType === 'Local Sightseeing' ? 120 : 50;

  // Customer Fare calculation
  const calculatedFare = Math.round(selectedVehicle.pricePerKm * estimatedDistanceKm * baseMultiplier);
  
  // Revenue split (Fare = Partner Cost + Commission, where Net Revenue is Commission)
  // Owner Board requires:
  // - Customer Fare
  // - Partner Cost
  // - Bharat Travels Commission
  // - Net Revenue
  const commissionRatio = 0.10; // 10% commission flat
  const calculatedCommission = Math.round(calculatedFare * commissionRatio);
  const calculatedPartnerCost = calculatedFare - calculatedCommission;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !drop || !travelDate || !travelTime || !passengerName || !contactNumber) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `BT-TR-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: Booking = {
        id: generatedId,
        type: 'transport',
        targetName: selectedVehicle.name,
        locationOrRoute: `${pickup} → ${drop}`,
        checkIn: travelDate,
        guests: passengers,
        totalPrice: calculatedFare,
        status: 'Pending', // Default status upon creation
        bookingDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        
        // Transport details
        pickupLocation: pickup,
        dropLocation: drop,
        travelDate: travelDate,
        travelTime: travelTime,
        tripType: tripType,
        vehicleType: selectedVehicle.type,
        contactNumber: contactNumber,
        specialInstructions: `${passengerName} (Age: ${passengerAge || 'N/A'}). ${instructions}`,
        assignedVehicle: 'Not Assigned Yet',
        assignedVehiclePlate: 'TBD',
        assignedDriver: 'Pending operations dispatch',
        assignedDriverPhone: 'TBD',
        fareBreakdown: {
          fare: calculatedFare,
          partnerCost: calculatedPartnerCost,
          commission: calculatedCommission,
          netRevenue: calculatedCommission
        },
        linkedHotelBookingId: linkedHotelBookingId,
        transportTypeSelection: tripType
      };

      onAddBooking(newBooking);
      setCreatedBooking(newBooking);
      setIsSubmitting(false);
      setStep('success');
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in" id="transport-checkout-portal">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4.5 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-saffron-650 font-mono tracking-widest uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5 text-saffron-550 shrink-0" />
              ECOSYSTEM DIRECT DISPATCH V1
            </div>
            <h3 className="font-serif text-xl text-navy-500 font-bold mt-1">
              {linkedPropertyName ? `Arrange Transfer for ${linkedPropertyName}` : 'Book Luxury Chauffeur Caravan'}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-white text-slate-800">
          
          {step === 'form' ? (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Selected Vehicle Card Preview */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-150">
                <img 
                  src={selectedVehicle.image} 
                  alt={selectedVehicle.name} 
                  className="w-full sm:w-28 h-20 object-cover rounded-xl border border-slate-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold bg-[#fcf2e6] text-[#b85600] border border-saffron-200 px-2 py-0.5 rounded uppercase">
                      {selectedVehicle.type}
                    </span>
                    <span className="text-xs text-slate-500 font-mono font-semibold">
                      Capacity: {selectedVehicle.seater} Pax
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-navy-500 font-bold">{selectedVehicle.name}</h4>
                  <p className="text-[11px] text-slate-500 font-sans leading-normal">
                    {selectedVehicle.features.slice(0, 2).join(' • ')}
                  </p>
                </div>
                <div className="text-right shrink-0 sm:border-l sm:pl-4 sm:border-slate-200 flex flex-col justify-center">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Rates FROM</span>
                  <span className="text-lg font-black text-saffron-650 font-mono">₹{selectedVehicle.pricePerKm}/km</span>
                  <span className="text-[9px] text-slate-500 font-mono leading-none block mt-0.5">Plus luxury tolls</span>
                </div>
              </div>

              {/* Trip Parameters */}
              <div className="space-y-4">
                <h5 className="text-xs font-mono font-black text-navy-500 tracking-wider uppercase border-b border-rose-100 pb-1.5 flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-saffron-550" />
                  1. Trip Classification
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Trip Type</label>
                    <select
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 font-sans focus:outline-none focus:border-saffron-500"
                    >
                      <option value="One Way">Go-Direct (One Way)</option>
                      <option value="Round Trip">Double Route (Round Trip)</option>
                      <option value="Local Sightseeing">Full Day Sightseeing (Kalinga Explorer)</option>
                      <option value="Airport Transfer">BBI Airport Transfer</option>
                      <option value="Railway Transfer">Puri Railway Station Shuttle</option>
                      <option value="Corporate Travel">Luxe Corporate Delegation</option>
                      <option value="Group Travel">Cooperative Family Group Travel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Passengers count</label>
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-saffron-500 font-mono font-bold"
                    >
                      {Array.from({ length: selectedVehicle.seater }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pickup location */}
                  <div>
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      Pickup Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BBI Airport / Puri Station / Hotel Lobby"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-saffron-500"
                    />
                  </div>

                  {/* Drop location */}
                  <div>
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Drop Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Niladri Shore Resort / Konark Sun Temple"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-saffron-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Travel Date */}
                  <div>
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-saffron-650 shrink-0" />
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-805 placeholder-slate-400 focus:outline-none focus:border-saffron-500 font-mono"
                    />
                  </div>

                  {/* Travel Time */}
                  <div>
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-saffron-650 shrink-0" />
                      Travel Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={travelTime}
                      onChange={(e) => setTravelTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-805 placeholder-slate-400 focus:outline-none focus:border-saffron-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Passenger & Contact Info */}
              <div className="space-y-4">
                <h5 className="text-xs font-mono font-black text-navy-500 tracking-wider uppercase border-b border-rose-100 pb-1.5 flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-saffron-550" />
                  2. Lead Passenger & Contact
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-8">
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Passenger Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amitabha Patnaik"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-saffron-500"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Age</label>
                    <input
                      type="number"
                      placeholder="35"
                      value={passengerAge}
                      onChange={(e) => setPassengerAge(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-saffron-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-sky-650 shrink-0" />
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-saffron-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      Special Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Need child booster seat / flight code UK-812"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-saffron-500"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing transparency panel based on REVENUE MODEL */}
              <div className="p-4 rounded-2xl bg-[#fffbf5] border border-saffron-200 space-y-2.5">
                <span className="text-[10px] font-mono bg-[#b55800]/10 border border-[#b55800]/20 text-[#b55800] px-2 py-0.5 rounded uppercase font-bold tracking-wider inline-block">
                  Direct Tariff Break-Down
                </span>
                
                <div className="grid grid-cols-2 gap-y-1.5 text-xs font-mono text-slate-600">
                  <span>Standard Vehicle Rate:</span>
                  <span className="text-right text-slate-800 font-bold">₹{selectedVehicle.pricePerKm}/km</span>
                  
                  <span>Planned Transit Span:</span>
                  <span className="text-right text-slate-800 font-bold">~{estimatedDistanceKm} km ({tripType})</span>
                  
                  {baseMultiplier !== 1.0 && (
                    <>
                      <span>Trip Multiplier:</span>
                      <span className="text-right text-slate-800 font-bold">{baseMultiplier}x</span>
                    </>
                  )}

                  <div className="col-span-2 border-t border-dashed border-slate-200 my-1 pt-1 flex justify-between font-bold text-sm text-navy-500 font-sans">
                    <span>Ecosystem Direct Fare:</span>
                    <span>₹{calculatedFare.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 leading-normal font-mono border-t border-slate-100 pt-1.5 flex justify-between">
                  <span>* Subject to toll plaza taxes. Guaranteed Direct Commission-Free pricing.</span>
                  <span className="text-[#b55800] font-sans font-bold">Safe Travels Escort Included</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all duration-200 uppercase text-xs tracking-widest shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Filing dispatch voucher...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-white" />
                    Secure Transfer Voucher
                  </>
                )}
              </button>

            </form>
          ) : (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-250 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif text-2xl text-navy-500 font-bold">CHAUFFEUR ALLOCATION RECEIVED</h4>
                <p className="text-slate-600 text-xs mt-1.5 max-w-md mx-auto">
                  Your transport request was synced to our Bharat Travels Hub. A licensed professional driver & vehicle will be allocated instantly by the back-office concierge.
                </p>
              </div>

              {/* Gilded Voucher Representation */}
              <div className="max-w-md mx-auto bg-slate-50 border border-saffron-300 rounded-2xl p-5 relative shadow-md">
                {/* Visual side notches */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-white border-r border-saffron-200" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-white border-l border-saffron-200" />

                <div className="border-b border-dashed border-saffron-250 pb-4 text-left font-mono">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                    <span>BHARAT TRAVELS TRANSPORT DIRECT</span>
                    <span className="text-[#b55800] bg-amber-50 px-2 py-0.5 border border-amber-200 rounded">
                      {createdBooking?.id}
                    </span>
                  </div>
                  <h5 className="font-serif text-base text-navy-500 font-bold mt-2.5">
                    {createdBooking?.targetName} ({createdBooking?.vehicleType})
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Route: <span className="font-bold text-slate-700">{createdBooking?.pickupLocation}</span> to <span className="font-bold text-slate-700">{createdBooking?.dropLocation}</span>
                  </p>
                </div>

                <div className="pt-4 text-left grid grid-cols-2 gap-3.5 font-mono text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">TRAVEL DATE</span>
                    <span className="font-sans font-bold text-slate-800">{createdBooking?.travelDate}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">TRAVEL TIME</span>
                    <span className="font-sans font-bold text-slate-800">{createdBooking?.travelTime} hrs</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">PASSENGERS</span>
                    <span className="font-sans font-bold text-slate-800">{createdBooking?.guests} Traveller{createdBooking && createdBooking.guests > 1 ? 's' : ''}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">SERVICE TYPE</span>
                    <span className="font-sans font-bold text-slate-800">{createdBooking?.tripType}</span>
                  </div>

                  <div className="col-span-2 border-t border-slate-200 pt-3 flex justify-between font-sans font-bold text-sm text-slate-800 mt-1">
                    <span>Total Cost Reputed:</span>
                    <span className="text-saffron-650 text-base">₹{createdBooking?.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Linked Notification if applicable */}
              {linkedPropertyName && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl max-w-md mx-auto text-xs text-emerald-850 font-medium">
                  ★ Linked successfully to your stay reservation at <strong>{linkedPropertyName}</strong>.
                </div>
              )}

              <div className="space-y-2 border-t border-slate-100 pt-5 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-navy-500 hover:bg-navy-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
                >
                  Verify Ticket & Return
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer info panels */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between font-mono text-[10px] text-slate-400 shrink-0">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            Active direct GDS channel
          </span>
          <span>Security Token: BT-{Math.floor(1000 + Math.random() * 9000)}-TR</span>
        </div>

      </div>
    </div>
  );
}
