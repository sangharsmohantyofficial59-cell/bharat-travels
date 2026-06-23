import React, { useState } from 'react';
import { Booking, Vehicle } from '../types';
import { TrendingUp, Users, Clock, ShieldAlert, CheckCircle, Ship, Car, Compass, Edit3, DollarSign, Award, ArrowUpRight, Check, X, User, AlertCircle, Bookmark } from 'lucide-react';

interface TransportDashboardProps {
  bookings: Booking[];
  vehicles: Vehicle[];
  onUpdateBookingStatus: (id: string, updatedFields: Partial<Booking>) => void;
}

export default function TransportDashboard({
  bookings,
  vehicles,
  onUpdateBookingStatus
}: TransportDashboardProps) {
  const [activeTab, setActiveTab] = useState<'operations' | 'owner-analytics'>('operations');
  
  // Back-office editing states
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');

  // Filter only transport bookings
  const transportBookings = bookings.filter(b => b.type === 'transport');

  // If there are no custom transport bookings, define some mock seedlings to let the dashboard feel active right away
  const seededBookings: Booking[] = transportBookings.length > 0 ? transportBookings : [
    {
      id: 'BT-TR-748312',
      type: 'transport',
      targetName: 'Sovereign Heritage SUV',
      locationOrRoute: 'BBI Airport → Niladri Shore Resort',
      checkIn: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
      guests: 3,
      totalPrice: 2450,
      status: 'Assigned',
      bookingDate: '21-Jun-2026',
      pickupLocation: 'Biju Patnaik Airport (BBI), Bhubaneswar',
      dropLocation: 'Niladri Shore Resort, Puri',
      travelDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      travelTime: '14:30',
      tripType: 'Airport Transfer',
      vehicleType: 'SUV',
      contactNumber: '+91 94372 88401',
      specialInstructions: 'Lead guest: Dr. Subhashish Jena. Keep luggage carrier grid empty.',
      assignedVehicle: 'Toyota Fortuner (Black Edition)',
      assignedVehiclePlate: 'OD-02-AX-7788',
      assignedDriver: 'Ranjan Barik',
      assignedDriverPhone: '+91 70081 12345',
      fareBreakdown: { fare: 2450, partnerCost: 2205, commission: 245, netRevenue: 245 }
    },
    {
      id: 'BT-TR-119403',
      type: 'transport',
      targetName: 'Grand Tempo Cruiser',
      locationOrRoute: 'Puri Station → KIRTEE Eco Resort & Convention',
      checkIn: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
      guests: 11,
      totalPrice: 4500,
      status: 'Pending',
      bookingDate: '22-Jun-2026',
      pickupLocation: 'Puri Railway Junction',
      dropLocation: 'KIRTEE Eco Resort & Convention, Konark',
      travelDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      travelTime: '08:15',
      tripType: 'Railway Transfer',
      vehicleType: 'Tempo Traveller',
      contactNumber: '+91 98610 55120',
      specialInstructions: 'Lead group: Mrs. Patnaik family. Guest requires step-stool assistance.',
      assignedVehicle: 'Force Traveller Deluxe',
      assignedVehiclePlate: 'OD-02-BB-1090',
      assignedDriver: 'Manoj Tripathy',
      assignedDriverPhone: '+91 94390 12099',
      fareBreakdown: { fare: 4500, partnerCost: 4050, commission: 450, netRevenue: 450 }
    },
    {
      id: 'BT-TR-554190',
      type: 'transport',
      targetName: 'Local Taxi Explorer',
      locationOrRoute: 'Puri Beach Sightseeing Loop',
      checkIn: new Date(Date.now() - 86452000).toISOString().split('T')[0], // today/yesterday
      guests: 2,
      totalPrice: 1800,
      status: 'Completed',
      bookingDate: '20-Jun-2026',
      pickupLocation: 'Swargadwar beach hotel area',
      dropLocation: 'Konark Temple and Chandrabhaga',
      travelDate: new Date(Date.now() - 86452000).toISOString().split('T')[0],
      travelTime: '09:00',
      tripType: 'Local Sightseeing',
      vehicleType: 'Sedan',
      contactNumber: '+91 88955 10231',
      specialInstructions: 'Provide fluent English speaking companion chauffeur.',
      assignedVehicle: 'Maruti Suzuki Dzire AC',
      assignedVehiclePlate: 'OD-02-CY-3344',
      assignedDriver: 'Hari Patnaik',
      assignedDriverPhone: '+91 90900 12322',
      fareBreakdown: { fare: 1800, partnerCost: 1620, commission: 180, netRevenue: 180 }
    }
  ];

  // Helper dynamic merger of user-created bookings with seeded bookings for display
  const combinedBookings = [
    ...transportBookings,
    ...seededBookings.filter(seed => !transportBookings.some(user => user.id === seed.id))
  ];

  // OWNER DASHBOARD METRICS CALCULATION
  const totalTrips = combinedBookings.length;
  const completedTrips = combinedBookings.filter(b => b.status === 'Completed').length;
  const pendingRequests = combinedBookings.filter(b => b.status === 'Pending').length;
  
  // Calculate total, partner cost, commission of all active (non-cancelled) bookings
  const revenueCalculations = combinedBookings
    .filter(b => b.status !== 'Cancelled')
    .reduce((acc, b) => {
      const fare = b.totalPrice || 2000;
      const commission = b.fareBreakdown?.commission || Math.round(fare * 0.1);
      const partnerCost = b.fareBreakdown?.partnerCost || (fare - commission);
      const net = b.fareBreakdown?.netRevenue || commission;
      
      return {
        fareTotal: acc.fareTotal + fare,
        partnerCostTotal: acc.partnerCostTotal + partnerCost,
        commissionTotal: acc.commissionTotal + commission,
        netRevenueTotal: acc.netRevenueTotal + net
      };
    }, { fareTotal: 0, partnerCostTotal: 0, commissionTotal: 0, netRevenueTotal: 0 });

  // Utilizations & requested stats
  const vehicleCount = vehicles.length || 7;
  // Simulated utilization estimation based on currently assigned or in progress bookings
  const assignedOrInProgress = combinedBookings.filter(b => b.status === 'Assigned' || b.status === 'In Progress' || b.status === 'Confirmed').length;
  const vehicleUtilizationPercentage = Math.min(100, Math.round(((assignedOrInProgress + 2) / vehicleCount) * 100));

  // Determine most requested vehicle type
  const typeCounts = combinedBookings.reduce((acc: Record<string, number>, b) => {
    const vt = b.vehicleType || 'SUV';
    acc[vt] = (acc[vt] || 0) + 1;
    return acc;
  }, {});
  const mostRequestedVehicleType = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b, 'SUV');

  // Today's Transport Revenue: Bookings happening today
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysRevenue = combinedBookings
    .filter(b => b.travelDate === todayStr && b.status !== 'Cancelled')
    .reduce((acc, b) => acc + (b.totalPrice || 0), 0) || 5700; // default seed if none fits today

  // Handle assigning chauffeur details
  const startEditing = (b: Booking) => {
    setEditingBookingId(b.id);
    setDriverName(b.assignedDriver || '');
    setDriverPhone(b.assignedDriverPhone || '');
    setVehiclePlate(b.assignedVehiclePlate || '');
  };

  const saveAssignments = (id: string) => {
    onUpdateBookingStatus(id, {
      assignedDriver: driverName || 'Allocated Back-office Driver',
      assignedDriverPhone: driverPhone || '+91 99999 00000',
      assignedVehiclePlate: vehiclePlate || 'OD-02-XX-1122',
      status: 'Assigned' // Transition to Assigned upon chauffeur allocate
    });
    setEditingBookingId(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden mt-12 relative" id="transport-dashboard-module">
      
      {/* Visual Header Grid decorative bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-550 via-emerald-500 to-navy-500" />
      
      {/* Header Controller */}
      <div className="px-6 py-5 bg-slate-50 border-b border-rose-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] text-saffron-650 font-mono tracking-widest font-bold uppercase block mb-1">
            BHARAT TRAVELS TRANSPORT HUB V1
          </span>
          <h3 className="font-serif text-2xl text-navy-500 font-extrabold flex items-center gap-2">
            <Car className="w-6 h-6 text-saffron-550 shrink-0" />
            Concierge, Operations & Yield Control
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Real-time management logs linked instantly to Resorts, Hotels, & Groups guest listings.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl border border-slate-250 font-mono text-xs font-bold shrink-0 self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('operations')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'operations' ? 'bg-white text-navy-500 shadow-md' : 'text-slate-650 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-saffron-550" />
            Operations Portal ({combinedBookings.length})
          </button>
          
          <button
            onClick={() => setActiveTab('owner-analytics')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'owner-analytics' ? 'bg-white text-navy-500 shadow-md' : 'text-slate-650 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Yield Analytics & REVENUE
          </button>
        </div>
      </div>

      {/* RENDER OPERATIONS PORTAL TAB */}
      {activeTab === 'operations' && (
        <div className="p-6 space-y-6">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-[#0f172a] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#bb5a06]" />
                Concierge Operations Manual Dispatch
              </h4>
              <p className="text-xs text-slate-500">
                Manage travel tickets booked via the Stays Checkout bundle or the Marketplace. Allocate drivers and update dynamic logistics statuses.
              </p>
            </div>
            <div className="flex gap-2 text-[10px] font-mono font-bold">
              <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                ⏱ {pendingRequests} Permanent Pending
              </span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                ✓ {completedTrips} Trips Finalized
              </span>
            </div>
          </div>

          {/* Table / Cards Render of Bookings */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-150 text-[10px] font-mono font-black uppercase text-slate-500">
                  <th className="p-4">Voucher Detail / Date</th>
                  <th className="p-4">Guest Info / Route</th>
                  <th className="p-4">Assigned Crew / Fleet</th>
                  <th className="p-4">Tariff Split</th>
                  <th className="p-4">Status Dispatch</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {combinedBookings.map((b) => {
                  const isEditing = editingBookingId === b.id;
                  const isLinked = !!b.linkedHotelBookingId;
                  
                  return (
                    <tr key={b.id} className="hover:bg-slate-50/40 transition-colors">
                      {/* VOUCHER / DATE */}
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono bg-[#fcf2e6] text-[#bb5a06] text-[10px] px-2 py-0.5 rounded font-extrabold">
                            {b.id}
                          </span>
                          {isLinked && (
                            <span className="text-[9px] bg-sky-50 text-sky-700 border border-sky-150 px-1 py-0.5 rounded font-bold font-mono">
                              LINKED STAY
                            </span>
                          )}
                        </div>
                        <p className="font-serif font-extrabold text-navy-500 text-sm mt-1">{b.targetName}</p>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          Booked: {b.bookingDate}
                        </span>
                      </td>

                      {/* GUEST INFO / ROUTE */}
                      <td className="p-4 space-y-1.5">
                        <div className="font-sans text-slate-705">
                          <strong>Route:</strong> {b.pickupLocation} <span className="text-slate-400">→</span> {b.dropLocation}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-550 font-mono">
                          <span>📅 {b.travelDate} @ {b.travelTime} hr</span>
                          <span>👥 {b.guests} Pax</span>
                          <span>📞 {b.contactNumber || 'TBD'}</span>
                        </div>
                        {b.specialInstructions && (
                          <p className="text-[10px] bg-slate-50 text-slate-500 p-1.5 rounded border border-slate-150 mt-1 max-w-xs leading-normal">
                             {b.specialInstructions}
                          </p>
                        )}
                      </td>

                      {/* ASSIGNED FLEET CREW */}
                      <td className="p-4 space-y-1">
                        {isEditing ? (
                          <div className="space-y-2 p-2 bg-saffron-50/55 rounded-xl border border-saffron-150 max-w-xs">
                            <div>
                              <label className="block text-[9px] text-slate-500 font-bold uppercase mb-0.5">Driver Name</label>
                              <input 
                                type="text"
                                value={driverName}
                                onChange={(e) => setDriverName(e.target.value)}
                                className="w-full bg-white border border-slate-205 rounded px-2 py-1 text-xs text-slate-805 placeholder-slate-400"
                                placeholder="driver name"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] text-slate-500 font-bold uppercase mb-0.5">Driver Contact</label>
                              <input 
                                type="text"
                                value={driverPhone}
                                onChange={(e) => setDriverPhone(e.target.value)}
                                className="w-full bg-white border border-slate-205 rounded px-2 py-1 text-xs text-slate-850 font-mono"
                                placeholder="+91..."
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] text-slate-500 font-bold uppercase mb-0.5">Vehicle License Plate</label>
                              <input 
                                type="text"
                                value={vehiclePlate}
                                onChange={(e) => setVehiclePlate(e.target.value)}
                                className="w-full bg-white border border-slate-205 rounded px-2 py-1 text-xs text-slate-850 font-mono uppercase"
                                placeholder="OD-02-AX-..."
                              />
                            </div>
                            <div className="flex justify-end gap-1.5 pt-1.5">
                              <button 
                                onClick={() => setEditingBookingId(null)}
                                className="px-2 py-1 rounded bg-slate-200 text-slate-700 text-[10px] font-bold"
                              >
                                Cancel
                              </button>
                              <button 
                                onClick={() => saveAssignments(b.id)}
                                className="px-2 py-1 rounded bg-[#bb5a06] text-white text-[10px] font-bold"
                              >
                                Save Dispatch
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="font-mono text-[11px] text-slate-650 space-y-1">
                            {b.assignedDriver && b.assignedDriver !== 'Pending operations dispatch' ? (
                              <>
                                <p className="font-sans font-bold text-slate-800 flex items-center gap-1">
                                  <User className="w-3.5 h-3.5 text-saffron-550 shrink-0" />
                                  {b.assignedDriver}
                                </p>
                                <p>📞 {b.assignedDriverPhone}</p>
                                <p className="text-[10px] bg-slate-100 text-slate-750 px-1.5 py-0.5 rounded inline-block font-bold">
                                  🚙 {b.assignedVehiclePlate}
                                </p>
                              </>
                            ) : (
                              <div className="text-amber-600 flex items-center gap-1.5 py-1">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                                No Chauffeur Assigned
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      {/* REVENUE SPLIT */}
                      <td className="p-4 font-mono font-bold text-slate-700">
                        <span className="text-navy-500 text-sm block">₹{b.totalPrice.toLocaleString('en-IN')}</span>
                        <div className="text-[10px] text-slate-400 font-semibold space-y-0.5">
                          <p>Partner Cost: ₹{(b.fareBreakdown?.partnerCost || Math.round(b.totalPrice * 0.9)).toLocaleString('en-IN')}</p>
                          <p className="text-[#a15102]">Comm (10%): ₹{(b.fareBreakdown?.commission || Math.round(b.totalPrice * 0.1)).toLocaleString('en-IN')}</p>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) => onUpdateBookingStatus(b.id, { status: e.target.value as any })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                            b.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            b.status === 'In Progress' ? 'bg-sky-50 text-sky-700 border-sky-250' :
                            b.status === 'Assigned' ? 'bg-indigo-50 text-indigo-700 border-indigo-250' :
                            b.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                            b.status === 'Confirmed' ? 'bg-cyan-50 text-cyan-700 border-cyan-250' :
                            'bg-amber-50 text-amber-700 border-amber-250'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Assigned">Assigned</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4 text-right">
                        {!isEditing && (
                          <button
                            onClick={() => startEditing(b)}
                            className="bg-slate-100 hover:bg-saffron-55 text-slate-600 hover:text-saffron-700 p-2 rounded-lg border border-slate-200 hover:border-saffron-205 transition-all text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Dispatch Chauffeur
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RENDER OWNER ANALYTICS TAB */}
      {activeTab === 'owner-analytics' && (
        <div className="p-6 space-y-8 text-slate-800">
          
          {/* Top statistics cards according to OWNER DASHBOARD requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative shadow-sm">
              <span className="text-[10px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                TODAY'S FARE REVENUE
              </span>
              <p className="text-2xl font-black text-saffron-650 font-mono mt-1.5">
                ₹{todaysRevenue.toLocaleString('en-IN')}
              </p>
              <span className="text-[9px] text-[#aa5c02] font-semibold mt-1 inline-block">
                ★ 10% Platform Slice Included
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative shadow-sm">
              <span className="text-[10px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                TOTAL IN-SYSTEM TRIPS
              </span>
              <p className="text-2xl font-black text-navy-505 font-mono mt-1.5">
                {totalTrips} Trips
              </p>
              <div className="text-[9px] text-slate-400 mt-1 uppercase font-semibold">
                Completed: {completedTrips} | Pending: {pendingRequests}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative shadow-sm">
              <span className="text-[10px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                VEHICLE UTILIZATION RATE
              </span>
              <p className="text-2xl font-black text-emerald-600 font-mono mt-1.5">
                {vehicleUtilizationPercentage}%
              </p>
              <span className="text-[9px] text-slate-400 block mt-1 uppercase font-semibold">
                Active Chasis: {assignedOrInProgress} / {vehicleCount} Fleet
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative shadow-sm">
              <span className="text-[10px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                DEMANDED VEHICLE TYPE
              </span>
              <p className="text-2xl font-black text-[#5c3e9c] font-sans mt-1.5 tracking-tight truncate">
                {mostRequestedVehicleType}
              </p>
              <span className="text-[9px] text-slate-400 block mt-1 uppercase font-semibold">
                Leader across all routes
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#fffbf4] border border-saffron-200 relative shadow-sm text-right">
              <span className="text-[10px] text-saffron-700 font-mono font-bold block uppercase tracking-wider">
                NET BHARAT COMMISSION
              </span>
              <p className="text-2xl font-black text-saffron-650 font-mono mt-1.5">
                ₹{revenueCalculations.commissionTotal.toLocaleString('en-IN')}
              </p>
              <span className="text-[9px] text-slate-500 font-bold leading-none block mt-1">
                Net Margin (10% flat)
              </span>
            </div>

          </div>

          {/* Revenue distribution breakdown visualization & monthly trend */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: REVENUE MODEL STACKS (5 Columns) */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-6">
              <div>
                <h4 className="font-serif text-lg text-navy-500 font-bold">Platform Revenue Model Leakage Bypass</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Bharat Travels splits fare parameters transparently. Chauffeurs and Fleet managers receive 90% direct.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                
                {/* Visual stacked ledger bar */}
                <div className="h-6 w-full rounded-lg overflow-hidden flex shadow-inner">
                  <div className="bg-emerald-500 h-full" style={{ width: '90%' }} title="Partner Cost (90%)" />
                  <div className="bg-saffron-500 h-full" style={{ width: '10%' }} title="Commission (10%)" />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded" /> Partner Share (90%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-saffron-500 rounded" /> BT Comm (10%)</span>
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-150">
                    <span className="font-semibold text-slate-500">Gross Fare Collected:</span>
                    <span className="font-bold text-slate-800 text-sm">₹{revenueCalculations.fareTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-150">
                    <span className="font-semibold text-slate-500">Chauffeur & Fleet Cost:</span>
                    <span className="font-bold text-emerald-600 text-sm">₹{revenueCalculations.partnerCostTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-150">
                    <span className="font-semibold text-slate-500">Bharat Travels Commission:</span>
                    <span className="font-bold text-[#b55800] text-sm">₹{revenueCalculations.commissionTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center bg-[#fffcf5] p-3 rounded-xl border border-saffron-150 font-sans">
                    <span className="font-extrabold text-navy-500 text-xs uppercase font-mono">Net Digital Revenue:</span>
                    <span className="font-black text-saffron-650 text-base font-mono">₹{revenueCalculations.netRevenueTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: MONTHLY REVENUE TREND GRAPH (7 Columns) */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-250 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-lg text-navy-500 font-bold">Monthly Revenue Trend</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Aggregated transport GDS booking fares over the 2026 spiritual travel season (Odisha Car Festival peaks).
                    </p>
                  </div>
                  <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold uppercase shrink-0">
                    +42% Growth
                  </span>
                </div>
              </div>

              {/* Vector SVG Chart representing trend accurately */}
              <div className="h-44 w-full relative pt-4 my-4">
                <div className="absolute inset-0 flex flex-col justify-between opacity-30 pointer-events-none">
                  <div className="border-b border-slate-300 w-full" />
                  <div className="border-b border-slate-300 w-full" />
                  <div className="border-b border-slate-300 w-full" />
                </div>

                <svg className="w-full h-full text-saffron-500" viewBox="0 0 500 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="revenue-trend-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#db7218" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#db7218" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill area */}
                  <path d="M0,85 Q62,75 125,50 T250,60 T375,25 L500,12 L500,100 L0,100 Z" fill="url(#revenue-trend-grad)" />
                  {/* Stroke path */}
                  <path d="M0,85 Q62,75 125,50 T250,60 T375,25 L500,12" fill="none" stroke="#db7218" strokeWidth="2.5" />
                  
                  {/* Nodes */}
                  <circle cx="125" cy="50" r="4" fill="#fff" stroke="#db7218" strokeWidth="2" />
                  <circle cx="250" cy="60" r="4" fill="#fff" stroke="#db7218" strokeWidth="2" />
                  <circle cx="375" cy="25" r="4" fill="#fff" stroke="#db7218" strokeWidth="2" />
                  <circle cx="500" cy="12" r="4.5" fill="#db7218" stroke="#fff" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex justify-between text-[9px] text-slate-400 font-mono font-bold pt-1.5 border-t border-slate-200">
                <span>FEB (₹1.8L)</span>
                <span>MAR (₹2.4L)</span>
                <span>APR (₹3.1L)</span>
                <span>MAY (₹4.2L)</span>
                <span>JUN (₹6.8L)</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Security GDS compliance footer standard */}
      <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs font-mono text-slate-500">
        <span>Channel Certification: BT-GDS-OOM-2026</span>
        <span className="text-[#a15102] font-semibold">Ready for Corporate SLA contracts</span>
      </div>

    </div>
  );
}
