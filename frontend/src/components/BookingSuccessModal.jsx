import React from 'react';

export default function BookingSuccessModal({ 
  bookingDetails = {
    id: 'SF12345678',
    airline: 'IndiGo',
    flightNo: '21S',
    route: 'DEL ➔ BOM',
    totalPaid: '4,799',
  }, 
  onClose,
  onViewBookings 
}) {
  return (
    <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg border border-slate-100 text-center relative overflow-hidden">
        
        {/* GREEN CHECK & CONFETTI HEADER */}
        <div className="relative flex justify-center items-center mb-6">
          {/* Confetti Lines Decoration */}
          <div className="absolute w-44 h-24 pointer-events-none flex justify-between items-center px-2">
            <span className="w-1.5 h-3 bg-blue-400 rounded-full rotate-[-45deg]"></span>
            <span className="w-1.5 h-3 bg-purple-400 rounded-full rotate-[-20deg]"></span>
            <span className="w-1.5 h-3 bg-amber-400 rounded-full rotate-[20deg]"></span>
            <span className="w-1.5 h-3 bg-emerald-400 rounded-full rotate-[45deg]"></span>
          </div>

          {/* Green Circle Icon */}
          <div className="w-20 h-20 rounded-full bg-[#10b981] text-white flex items-center justify-center text-3xl font-bold shadow-md relative z-10">
            ✓
          </div>
        </div>

        {/* TITLE & SUBTITLE */}
        <h2 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
          Booking Confirmed!
        </h2>
        <p className="text-slate-500 text-xs mt-1.5 font-medium">
          Your flight has been booked successfully.
        </p>

        {/* BOOKING DETAILS CARD */}
        <div className="mt-6 bg-slate-50/70 border border-slate-100 rounded-2xl p-5 text-left space-y-3.5">
          
          {/* Row 1: ID & Logo */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Booking ID</p>
              <p className="text-xs font-extrabold text-slate-900 mt-0.5">{bookingDetails.id}</p>
            </div>
            <div className="bg-slate-100 px-3 py-1 rounded-md text-[11px] font-bold text-slate-700">
              {bookingDetails.airline}
            </div>
          </div>

          {/* Row 2: Airline & Flight No */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Airline</span>
            <span className="font-bold text-slate-800">{bookingDetails.airline}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Flight No</span>
            <span className="font-bold text-slate-800">Flight {bookingDetails.flightNo}</span>
          </div>

          {/* Row 3: Route */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Route</span>
            <span className="font-extrabold text-slate-900">{bookingDetails.route}</span>
          </div>

          {/* Row 4: Total Paid */}
          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200/60">
            <span className="text-slate-400 font-medium">Total Paid</span>
            <span className="font-extrabold text-slate-900 text-sm">₹ {bookingDetails.totalPaid}</span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-3 ">
            <button 
              onClick={() => alert('Downloading Ticket...')}
              className="w-full bg-[#0066ff] hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl shadow-sm transition"
            >
              Download Ticket
            </button>
            {/* <button 
              onClick={onViewBookings}
              className="w-full bg-white hover:bg-slate-50 text-[#0066ff] border border-slate-200 text-xs font-bold py-3 rounded-xl transition"
            >
              View My Bookings
            </button> */}
          </div>

        </div>

        {/* FOOTER NOTE */}
        <p className="text-[10px] text-slate-400 font-medium mt-5">
          A confirmation email has been sent to your registered email address.
        </p>

      </div>
    </div>
  );
}