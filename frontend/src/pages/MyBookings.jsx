import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const location = useLocation();
  const newBooking = location.state?.booking;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Upcoming');

  // Static Bookings + Dynamic New Booking
  const defaultBookings = [
    {
      id: 'SF12345678',
      from: 'Delhi (DEL)',
      to: 'Mumbai (BOM)',
      airline: 'IndiGo (6E 215)',
      date: '12 Sep 2026',
      time: '06:10 AM - 08:25 AM',
      passengers: '1 Adult',
      classType: 'Economy',
      status: 'Confirmed',
      statusColor: 'bg-emerald-100 text-emerald-600',
    },
    {
      id: 'SF12345679',
      from: 'Mumbai (BOM)',
      to: 'Goa (GOI)',
      airline: 'Air India (AI 689)',
      date: '20 Sep 2026',
      time: '11:20 AM - 01:45 PM',
      passengers: '2 Adults',
      classType: 'Economy',
      status: 'Pending',
      statusColor: 'bg-gray-100 text-gray-600',
    },
  ];

  const bookingsList = newBooking
    ? [
        {
          id: `SF${Math.floor(10000000 + Math.random() * 90000000)}`,
          from: newBooking.flight?.from || 'Delhi (DEL)',
          to: newBooking.flight?.to || 'Mumbai (BOM)',
          airline: `${newBooking.flight?.airline || 'SpiceJet'} (${newBooking.flight?.flightNo || 'SG 8161'})`,
          date: '15 Sep 2026',
          time: `${newBooking.flight?.depTime || '14:20'} - ${newBooking.flight?.arrTime || '16:45'}`,
          passengers: `${newBooking.passenger?.fullName || '1 Adult'}`,
          classType: 'Economy',
          status: 'Confirmed',
          statusColor: 'bg-emerald-100 text-emerald-600',
        },
        ...defaultBookings,
      ]
    : defaultBookings;

  return (
    <div className="bg-[#f4f7fb] min-h-screen font-sans">

      {/* CONTENT AREA */}
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My Bookings</h1>
          <p className="text-xs text-gray-400 mt-1">View and manage your flight bookings</p>
        </div>

        {/* Tabs Section */}
        <div className="bg-slate-100/70 p-1 rounded-2xl flex max-w-lg">
          {['Upcoming', 'Past', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition duration-200 ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {activeTab === 'Upcoming' && (
          <div className="space-y-4">
            {bookingsList.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                
                {/* Header: Booking ID & Status */}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold text-slate-800">
                    Booking ID: <span className="text-slate-900">{item.id}</span>
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>

                {/* Route & Airline */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <span className="w-5 h-5 rounded bg-blue-900 text-white flex items-center justify-center text-[10px]">
                      ✈
                    </span>
                    <span>{item.from}</span>
                    <span className="text-gray-400 font-normal">➔</span>
                    <span>{item.to}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium pl-7">
                    {item.airline}
                  </div>
                </div>

                {/* Date, Time & Passengers Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium pt-1">
                  <div className="flex items-center gap-1.5">
                    <span>📅</span>
                    <span>{item.date}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div>{item.time}</div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span>👤</span>
                      <span>{item.passengers}</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span>{item.classType}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={()=>navigate("/bookingstatus")} className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-xl transition">
                      View Details
                    </button>
                    <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-xl transition">
                      Download Ticket
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {activeTab !== 'Upcoming' && (
          <div className="bg-white rounded-2xl p-10 text-center text-xs text-gray-400 font-medium">
            No {activeTab.toLowerCase()} bookings found.
          </div>
        )}

      </div>
    </div>
  );
}