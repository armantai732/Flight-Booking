import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { downloadTicket } from './DownloadTicket.js';

export default function BookingSuccessModal() {

  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
  const ticketRef = useRef(null);


  if (!booking) {
    return (
      <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg text-center">

          <h2 className="text-xl font-bold text-slate-900">
            Booking Details Not Found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Booking information is not available.
          </p>

          <button
            onClick={() => navigate("/mybookings")}
            className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-bold"
          >
            Go to My Bookings
          </button>

        </div>
      </div>
    );
  }

  const flight = booking.flight;


  return (
    <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center p-4 font-sans">

      <div ref={ticketRef}
        className="bg-white rounded-3xl px-8 py-4 max-w-md w-full shadow-lg border border-slate-100 text-center relative overflow-hidden">

        {/* ================= GREEN CHECK ================= */}

        <div className="relative flex justify-center items-center mb-4">

          <div className="absolute w-60 h-24 pointer-events-none flex justify-between items-center px-2">

            <span className="w-1.5 h-3 bg-blue-400 rounded-full rotate-[-45deg]"></span>

            <span className="w-1.5 h-3 bg-purple-400 rounded-full rotate-[-20deg]"></span>

            <span className="w-1.5 h-3 bg-amber-400 rounded-full rotate-[20deg]"></span>

            <span className="w-1.5 h-3 bg-emerald-400 rounded-full rotate-[45deg]"></span>

          </div>

          <div className="w-14 h-14 rounded-full bg-[#10b981] text-white flex items-center justify-center text-3xl font-bold shadow-md relative z-10">
            ✓
          </div>

        </div>


        {/* ================= TITLE ================= */}

        <h2 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
          Booking Confirmed!
        </h2>

        <p className="text-slate-500 text-xs mt-1.5 font-medium">
          Your flight has been booked successfully.
        </p>


        {/* ================= BOOKING DETAILS ================= */}

        <div className="mt-6 bg-slate-50/70 border border-slate-100 rounded-2xl p-5 text-left space-y-3.5">


          {/* BOOKING ID + AIRLINE */}

          <div className="flex justify-between items-start">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Booking ID
              </p>

              <p className="text-xs font-extrabold text-slate-900 mt-0.5">
                {booking._id?.slice(-8).toUpperCase()}
              </p>

            </div>


            <div className="bg-slate-100 px-3 py-1 rounded-md text-[11px] font-bold text-slate-700">
              {flight?.airline || "N/A"}
            </div>

          </div>


          {/* AIRLINE */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Airline
            </span>

            <span className="font-bold text-slate-800">
              {flight?.airline || "N/A"}
            </span>

          </div>


          {/* FLIGHT NUMBER */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Flight No
            </span>

            <span className="font-bold text-slate-800">
              Flight {flight?.FLightNumber || "N/A"}
            </span>

          </div>


          {/* ROUTE */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Route
            </span>

            <span className="font-extrabold text-slate-900">
              {flight?.from || "N/A"} ➔ {flight?.to || "N/A"}
            </span>

          </div>


          {/* DATE */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Date
            </span>

            <span className="font-bold text-slate-800">
              {flight?.date || "N/A"}
            </span>

          </div>


          {/* TIME */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Time
            </span>

            <span className="font-bold text-slate-800">
              {flight?.departureTime || "--:--"}
              {" - "}
              {flight?.arrivalTime || "--:--"}
            </span>

          </div>


          {/* PASSENGERS */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Passengers
            </span>

            <span className="font-bold text-slate-800">
              {booking.passengers?.length || 0}
            </span>

          </div>


          {/* PASSENGER NAME */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Passenger Name
            </span>

            <span className="font-bold text-slate-800">
              {booking.passengers?.[0]?.name || "N/A"}
            </span>

          </div>


          {/* SEAT */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Seat
            </span>

            <span className="font-bold text-slate-800">
              {booking.selectedSeats
                ?.map((seat) => seat.seatNumber)
                .join(", ") || "N/A"}
            </span>

          </div>


          {/* PAYMENT STATUS */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Payment
            </span>

            <span className="font-bold text-emerald-600">
              {booking.paymentStatus || "Pending"}
            </span>

          </div>


          {/* BOOKING STATUS */}

          <div className="flex justify-between items-center text-xs">

            <span className="text-slate-400 font-medium">
              Booking Status
            </span>

            <span
              className={`font-bold ${booking.bookingStatus === "Confirmed"
                ? "text-emerald-600"
                : booking.bookingStatus === "Cancelled"
                  ? "text-red-600"
                  : "text-amber-600"
                }`}
            >
              {booking.bookingStatus || "Pending"}
            </span>

          </div>

          {/* ================= FARE SUMMARY ================= */}

          <div className="pt-3 border-t border-slate-200/60 space-y-2.5">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Fare Summary
            </p>

            {/* BASE FARE */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">
                Base Fare
              </span>

              <span className="font-bold text-slate-800">
                ₹ {Number(booking.baseFare || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {/* TAXES */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">
                Taxes & Fees
              </span>

              <span className="font-bold text-slate-800">
                ₹ {Number(booking.taxes || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {/* WINDOW SEAT FEE */}
            {Number(booking.seatExtra || 0) > 0 && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">
                  Window Seat Fee
                </span>

                <span className="font-bold text-slate-800">
                  ₹ {Number(booking.seatExtra).toLocaleString("en-IN")}
                </span>
              </div>
            )}

          </div>
          {/* TOTAL PAID */}

          <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-200/60">

            <span className="text-slate-400 font-medium">
              Total Paid
            </span>

            <span className="font-extrabold text-slate-900 text-sm">
              ₹ {Number(booking.totalAmount || 0).toLocaleString("en-IN")}
            </span>

          </div>


          {/* DOWNLOAD */}

          <div className="pt-3">

            <button
              onClick={() => downloadTicket(ticketRef.current)}
              className="w-full bg-[#0066ff] hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl shadow-sm transition"
            >
              Download Ticket
            </button>

          </div>


        </div>
        <button
          onClick={() => navigate("/my-bookings")}
          className=" text-blue-600 text-xs font-bold hover:underline"
        >
          ← Back to My Bookings
        </button>

      </div>
    </div>
  );
}