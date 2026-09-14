import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function Bookings() {
  const navigate = useNavigate();

  // Initial Bookings Data matching image exactly
  const initialBookings = [
    {
      id: 1,
      pnr: 'FH123456',
      user: { name: 'Rahul Sharma', email: 'rahul@gmail.com', phone: '+91 98765 43210' },
      flight: {
        airline: 'IndiGo',
        flightNo: '6E 215',
        aircraft: 'Airbus A320',
        from: 'Ahmedabad (AMD)',
        to: 'Mumbai (BOM)',
        depTime: '14:30',
        arrTime: '17:45',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80',
        baggage: '7 KG',
      },
      passenger: { name: 'Rahul Sharma', seatNo: '12A', email: 'rahul@gmail.com', phone: '+91 98765 43210' },
      fare: { baseFare: '3,699', tax: '600', total: '4,299' },
      date: '2026-09-15',
      amount: '4,299',
      status: 'Completed',
    },
    {
      id: 2,
      pnr: 'FH123457',
      user: { name: 'Priya Patel', email: 'priya@gmail.com', phone: '+91 98123 45678' },
      flight: {
        airline: 'Air India',
        flightNo: 'AI101',
        aircraft: 'Airbus A320neo',
        from: 'Delhi (DEL)',
        to: 'Dubai (DXB)',
        depTime: '21:30',
        arrTime: '00:10',
        image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=300&q=80',
        baggage: '7 KG',
      },
      passenger: { name: 'Priya Patel', seatNo: '14B', email: 'priya@gmail.com', phone: '+91 98123 45678' },
      fare: { baseFare: '11,500', tax: '1,499', total: '12,999' },
      date: '2026-09-16',
      amount: '12,999',
      status: 'Completed',
    },
    {
      id: 3,
      pnr: 'FH123458',
      user: { name: 'Amit Verma', email: 'amit@gmail.com', phone: '+91 97234 56789' },
      flight: {
        airline: 'SpiceJet',
        flightNo: 'SG782',
        aircraft: 'Boeing 737',
        from: 'Mumbai (BOM)',
        to: 'Goa (GOI)',
        depTime: '11:20',
        arrTime: '12:35',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80',
        baggage: '7 KG',
      },
      passenger: { name: 'Amit Verma', seatNo: '08C', email: 'amit@gmail.com', phone: '+91 97234 56789' },
      fare: { baseFare: '2,999', tax: '500', total: '3,499' },
      date: '2026-09-17',
      amount: '3,499',
      status: 'Pending',
    },
    {
      id: 4,
      pnr: 'FH123459',
      user: { name: 'Neha Singh', email: 'neha@gmail.com', phone: '+91 96345 67890' },
      flight: {
        airline: 'Vistara',
        flightNo: 'UK654',
        aircraft: 'Airbus A321',
        from: 'Delhi (DEL)',
        to: 'Bengaluru (BLR)',
        depTime: '14:20',
        arrTime: '17:10',
        image: 'https://images.unsplash.com/photo-1520437358207-323b43b5752b?auto=format&fit=crop&w=300&q=80',
        baggage: '15 KG',
      },
      passenger: { name: 'Neha Singh', seatNo: '05F', email: 'neha@gmail.com', phone: '+91 96345 67890' },
      fare: { baseFare: '5,400', tax: '899', total: '6,299' },
      date: '2026-09-18',
      amount: '6,299',
      status: 'Completed',
    },
    {
      id: 5,
      pnr: 'FH123450',
      user: { name: 'Rohit Tiwari', email: 'rohit@gmail.com', phone: '+91 95456 78901' },
      flight: {
        airline: 'IndiGo',
        flightNo: '6E732',
        aircraft: 'Airbus A321',
        from: 'Ahmedabad (AMD)',
        to: 'Delhi (DEL)',
        depTime: '09:15',
        arrTime: '10:55',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80',
        baggage: '7 KG',
      },
      passenger: { name: 'Rohit Tiwari', seatNo: '16A', email: 'rohit@gmail.com', phone: '+91 95456 78901' },
      fare: { baseFare: '3,400', tax: '599', total: '3,999' },
      date: '2026-09-19',
      amount: '3,999',
      status: 'Completed',
    },
    {
      id: 6,
      pnr: 'FH123461',
      user: { name: 'Sneha Reddy', email: 'sneha@gmail.com', phone: '+91 94567 89012' },
      flight: {
        airline: 'Air India',
        flightNo: 'AI203',
        aircraft: 'Boeing 787',
        from: 'Delhi (DEL)',
        to: 'Dubai (DXB)',
        depTime: '21:30',
        arrTime: '00:10',
        image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=300&q=80',
        baggage: '25 KG',
      },
      passenger: { name: 'Sneha Reddy', seatNo: '02B', email: 'sneha@gmail.com', phone: '+91 94567 89012' },
      fare: { baseFare: '11,200', tax: '1,799', total: '12,999' },
      date: '2026-09-20',
      amount: '12,999',
      status: 'Completed',
    },
    {
      id: 7,
      pnr: 'FH123462',
      user: { name: 'Karan Mehta', email: 'karan@gmail.com', phone: '+91 93678 90123' },
      flight: {
        airline: 'IndiGo',
        flightNo: '6E893',
        aircraft: 'Airbus A320',
        from: 'Mumbai (BOM)',
        to: 'Kolkata (CCU)',
        depTime: '16:40',
        arrTime: '19:25',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80',
        baggage: '7 KG',
      },
      passenger: { name: 'Karan Mehta', seatNo: '18D', email: 'karan@gmail.com', phone: '+91 93678 90123' },
      fare: { baseFare: '4,800', tax: '699', total: '5,499' },
      date: '2026-09-21',
      amount: '5,499',
      status: 'Pending',
    },
    {
      id: 8,
      pnr: 'FH123463',
      user: { name: 'Pooja Gupta', email: 'pooja@gmail.com', phone: '+91 92789 01234' },
      flight: {
        airline: 'SpiceJet',
        flightNo: 'SG274',
        aircraft: 'Boeing 737 MAX',
        from: 'Bengaluru (BLR)',
        to: 'Goa (GOI)',
        depTime: '07:45',
        arrTime: '08:55',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80',
        baggage: '7 KG',
      },
      passenger: { name: 'Pooja Gupta', seatNo: '20E', email: 'pooja@gmail.com', phone: '+91 92789 01234' },
      fare: { baseFare: '2,500', tax: '499', total: '2,999' },
      date: '2026-09-22',
      amount: '2,999',
      status: 'Cancelled',
    },
  ];

  const [bookings] = useState(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState(initialBookings[0]); // Default first booking selected like image

  // Filters state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState('');

  // Filtered Bookings
  const filteredBookings = bookings.filter((item) => {
    const matchesSearch =
      item.pnr.toLowerCase().includes(search.toLowerCase()) ||
      item.user.name.toLowerCase().includes(search.toLowerCase()) ||
      item.flight.flightNo.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="flex h-screen bg-[#f4f7fb] font-sans overflow-hidden">
      
      {/* 1. LEFT SIDEBAR */}
      <aside>
        <AdminSidebar />
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* PAGE CONTENT CONTAINER */}
        <main className="p-6 md:p-8 space-y-6">
          
          {/* Header & Export Button */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span className="text-blue-600">📅</span> Bookings
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                View and manage all flight bookings
              </p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2">
              <span>📥</span> Export Report
            </button>
          </div>

          {/* STATS CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
                  📋
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">Total Bookings</p>
                  <p className="text-lg font-extrabold text-slate-900">24</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
                  👤
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">Completed</p>
                  <p className="text-lg font-extrabold text-slate-900">18</p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                75%
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold">
                  🕒
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">Pending</p>
                  <p className="text-lg font-extrabold text-slate-900">4</p>
                </div>
              </div>
              <span className="bg-amber-50 text-amber-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                17%
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg font-bold">
                  🚫
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">Cancelled</p>
                  <p className="text-lg font-extrabold text-slate-900">2</p>
                </div>
              </div>
              <span className="bg-rose-50 text-rose-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                8%
              </span>
            </div>

          </div>

          {/* MAIN CONTENT SPLIT LAYOUT (TABLE + DETAILS PANEL) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT TABLE SECTION */}
            <div className={`${selectedBooking ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4 transition-all duration-300`}>
              
              {/* FILTER BAR */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
                  
                  {/* Search */}
                  <div className="sm:col-span-5 relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400">🔍</span>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by PNR, User, or Flight No..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium placeholder-slate-400"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="sm:col-span-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium bg-white"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      placeholder="Select Date Range"
                      className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium bg-white"
                    />
                  </div>

                  {/* Reset */}
                  <div className="sm:col-span-1">
                    <button
                      onClick={() => {
                        setSearch('');
                        setStatusFilter('All');
                        setDateRange('');
                      }}
                      className="w-full p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-bold text-center"
                      title="Reset"
                    >
                      ↻
                    </button>
                  </div>

                </div>
              </div>

              {/* TABLE CARD */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="py-3.5 px-4">#</th>
                        <th className="py-3.5 px-4">PNR No.</th>
                        <th className="py-3.5 px-4">User</th>
                        <th className="py-3.5 px-4">Flight Details</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">Total Amount</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking, index) => (
                          <tr
                            key={booking.id}
                            className={`hover:bg-slate-50/70 transition ${
                              selectedBooking?.id === booking.id ? 'bg-blue-50/40' : ''
                            }`}
                          >
                            <td className="py-3.5 px-4 text-slate-400 font-bold">{index + 1}</td>
                            <td className="py-3.5 px-4 font-extrabold text-slate-900">{booking.pnr}</td>
                            <td className="py-3.5 px-4">
                              <p className="font-bold text-slate-900">{booking.user.name}</p>
                              <p className="text-[10px] text-slate-400">{booking.user.email}</p>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-blue-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                                  ✈
                                </div>
                                <div>
                                  <p className="font-extrabold text-slate-900 leading-tight">
                                    {booking.flight.airline}
                                  </p>
                                  <p className="text-[10px] text-slate-400">
                                    {booking.flight.from.split(' ')[0]} ➔ {booking.flight.to.split(' ')[0]}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-500">{booking.date}</td>
                            <td className="py-3.5 px-4 font-extrabold text-slate-900">₹{booking.amount}</td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                                  booking.status
                                )}`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => setSelectedBooking(booking)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                  selectedBooking?.id === booking.id
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'border border-slate-200 text-blue-600 hover:bg-blue-50'
                                }`}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="py-8 text-center text-slate-400 font-semibold">
                            No bookings found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION FOOTER */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  <div>
                    Showing 1 to {filteredBookings.length} of {bookings.length} bookings
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                      ‹
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">
                      1
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                      2
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                      3
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                      ›
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT BOOKING DETAILS SIDEBAR / DRAWER */}
            {selectedBooking && (
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5 sticky top-20">
                
                {/* Header with Close Icon */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-slate-900">Booking Details</h3>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-slate-400 hover:text-slate-600 font-bold text-base"
                  >
                    ✕
                  </button>
                </div>

                {/* Status & PNR */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status}
                  </span>
                  <p className="text-xs font-bold text-slate-500">
                    PNR: <span className="font-extrabold text-slate-900">{selectedBooking.pnr}</span>
                  </p>
                </div>

                {/* User Info Card */}
                <div className="flex items-center gap-3.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                    👤
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{selectedBooking.user.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{selectedBooking.user.email}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{selectedBooking.user.phone}</p>
                  </div>
                </div>

                {/* Flight Information */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                    <span className="text-blue-600">✈</span> Flight Information
                  </h4>

                  {/* Flight Header Card */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                        ✈
                      </div>
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">{selectedBooking.flight.airline}</p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Flight No. <span className="text-blue-600 font-bold">{selectedBooking.flight.flightNo}</span>
                        </p>
                      </div>
                    </div>
                    <img
                      src={selectedBooking.flight.image}
                      alt="flight"
                      className="w-14 h-9 rounded-lg object-cover"
                    />
                  </div>

                  {/* Route & Timings */}
                  <div className="flex items-center justify-between text-xs py-1">
                    <div>
                      <p className="font-extrabold text-slate-900">{selectedBooking.flight.from}</p>
                      <p className="text-slate-400 font-bold text-[11px] mt-0.5">{selectedBooking.flight.depTime}</p>
                    </div>

                    <span className="text-blue-500 font-bold text-base">✈</span>

                    <div className="text-right">
                      <p className="font-extrabold text-slate-900">{selectedBooking.flight.to}</p>
                      <p className="text-slate-400 font-bold text-[11px] mt-0.5">{selectedBooking.flight.arrTime}</p>
                    </div>
                  </div>

                  {/* Date, Aircraft, Baggage */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <div>
                      <p className="text-slate-400 font-medium">📅 Date</p>
                      <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.date}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">✈ Aircraft</p>
                      <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.flight.aircraft}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">💼 Baggage</p>
                      <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.flight.baggage}</p>
                    </div>
                  </div>
                </div>

                {/* Passenger Details */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                    <span className="text-blue-600">👥</span> Passenger Details
                  </h4>

                  <div className="border border-slate-100 rounded-xl overflow-hidden text-[11px]">
                    <div className="grid grid-cols-4 bg-slate-50 p-2 font-bold text-slate-400">
                      <span>Name</span>
                      <span>Seat No</span>
                      <span>Email</span>
                      <span className="text-right">Phone</span>
                    </div>
                    <div className="grid grid-cols-4 p-2 font-semibold text-slate-700">
                      <span className="truncate">{selectedBooking.passenger.name}</span>
                      <span className="font-extrabold text-blue-600">{selectedBooking.passenger.seatNo}</span>
                      <span className="truncate text-slate-400">{selectedBooking.passenger.email}</span>
                      <span className="text-right text-slate-400">{selectedBooking.passenger.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Fare Summary */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="text-blue-600">💳</span> Fare Summary
                  </h4>

                  <div className="space-y-1.5 pt-1 text-slate-500 font-medium">
                    <div className="flex justify-between">
                      <span>Base Fare</span>
                      <span className="font-bold text-slate-800">₹{selectedBooking.fare.baseFare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Fees</span>
                      <span className="font-bold text-slate-800">₹{selectedBooking.fare.tax}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm">
                      <span className="font-extrabold text-slate-900">Total Amount</span>
                      <span className="font-black text-blue-600 text-base">₹{selectedBooking.fare.total}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2">
                    <span>📥</span> Download Ticket
                  </button>
                  <button className="w-full border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-rose-600 font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5">
                    <span>🚫</span> Cancel Booking
                  </button>
                </div>

              </div>
            )}

          </div>

        </main>
      </div>

    </div>
  );
}