import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { ApproveBooking, GetAllBookings } from '../api/api';
import { toast } from 'react-toastify';

export default function Bookings() {
  const navigate = useNavigate();




  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const BOOKINGS_PER_PAGE = 5;

  // Filtered Bookings
  const filteredBookings = bookings.filter((item) => {

    // ================= SEARCH =================
    const searchText = search.toLowerCase().trim();

    const bookingId =
      String(item._id || "").toLowerCase();

    const userName =
      String(item.user?.name || "").toLowerCase();

    const flightNumber =
      String(item.flight?.FLightNumber || "").toLowerCase();

    const airline =
      String(item.flight?.airline || "").toLowerCase();

    const matchesSearch =
      !searchText ||
      bookingId.includes(searchText) ||
      userName.includes(searchText) ||
      flightNumber.includes(searchText) ||
      airline.includes(searchText);


    // ================= STATUS =================
    const matchesStatus =
      statusFilter === "All" ||
      item.bookingStatus === statusFilter;


    // ================= DATE =================
    let matchesDate = true;

    if (dateRange) {

      // Booking/flight date
      const bookingDate = new Date(
        item.flight?.date
      );

      // Current date
      const today = new Date();

      // Time remove karne ke liye
      bookingDate.setHours(0, 0, 0, 0);
      today.setHours(23, 59, 59, 999);

      const selectedDate = new Date(dateRange);
      selectedDate.setHours(0, 0, 0, 0);

      // Selected date se current date tak
      matchesDate =
        bookingDate >= selectedDate &&
        bookingDate <= today;
    }


    return (
      matchesSearch &&
      matchesStatus &&
      matchesDate
    );
  });



  const totalPages = Math.ceil(
    filteredBookings.length / BOOKINGS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * BOOKINGS_PER_PAGE;

  const endIndex =
    startIndex + BOOKINGS_PER_PAGE;

  const currentBookings =
    filteredBookings.slice(startIndex, endIndex);


  // ================= STATS =================

  // Search + Status + Date ke according total
  const totalBookingsCount = filteredBookings.length;


  // Confirmed
  const confirmedBookings = filteredBookings.filter(
    (booking) => booking.bookingStatus === "Confirmed"
  ).length;


  // Pending
  const pendingBookings = filteredBookings.filter(
    (booking) => booking.bookingStatus === "Pending"
  ).length;


  // Cancelled
  const cancelledBookings = filteredBookings.filter(
    (booking) => booking.bookingStatus === "Cancelled"
  ).length;

  const confirmedPercentage =
    totalBookingsCount > 0
      ? Math.round(
        (confirmedBookings / totalBookingsCount) * 100
      )
      : 0;

  const pendingPercentage =
    totalBookingsCount > 0
      ? Math.round(
        (pendingBookings / totalBookingsCount) * 100
      )
      : 0;

  const cancelledPercentage =
    totalBookingsCount > 0
      ? Math.round(
        (cancelledBookings / totalBookingsCount) * 100
      )
      : 0;


  const getStatusBadge = (status) => {
    switch (status) {

      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';

      case 'Pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';

      case 'Cancelled':
        return 'bg-rose-50 text-rose-600 border-rose-100';

      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };


  const handleApproveBooking = async () => {

    if (!selectedBooking?._id) {
      return;
    }

    try {

      const result = await ApproveBooking(
        selectedBooking._id
      );

      if (result?.status) {

        toast.success("Booking Approved Successfully!");

        // Selected booking ka status immediately update
        setSelectedBooking((prev) => ({
          ...prev,
          bookingStatus: "Confirmed",
          paymentStatus: "Paid"
        }));

        // Table ke data me bhi status update
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === selectedBooking._id
              ? {
                ...booking,
                bookingStatus: "Confirmed",
                paymentStatus: "Paid"
              }
              : booking
          )
        );

      }

    } catch (error) {

      console.error(
        "Approve Booking Error:",
        error
      );

      toast.error(
        error.message || "Failed to approve booking"
      );
    }
  };

  const fetchBookings = async () => {

    try {

      setLoading(true);
      setError('');

      const res = await GetAllBookings();


      if (res?.status) {

        const data = res.data || [];

        setBookings(data);

        if (data.length > 0) {
          setSelectedBooking(data[0]);
        }

      } else {

        setBookings([]);
        setSelectedBooking(null);

        setError(
          res?.message || "No bookings found"
        );
      }

    } catch (error) {

      console.error(
        "Fetch Admin Bookings Error:",
        error
      );

      setError(
        error.message || "Failed to fetch bookings"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchBookings();
  }, []);

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
                  <p className="text-lg font-extrabold text-slate-900">
                    {totalBookingsCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
                  👤
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">
                    Confirmed
                  </p>
                  <p className="text-lg font-extrabold text-slate-900">
                    {confirmedBookings}
                  </p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                {confirmedPercentage}%
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold">
                  🕒
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">
                    Pending
                  </p>
                  <p className="text-lg font-extrabold text-slate-900">
                    {pendingBookings}
                  </p>
                </div>
              </div>
              <span className="bg-amber-50 text-amber-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                {pendingPercentage}%
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg font-bold">
                  🚫
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">
                    Cancelled
                  </p>
                  <p className="text-lg font-extrabold text-slate-900">
                    {cancelledBookings}
                  </p>
                </div>
              </div>
              <span className="bg-rose-50 text-rose-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                {cancelledPercentage}%
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
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                      }}
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
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div className="sm:col-span-3">
                    <input
                      type="date"
                      value={dateRange}
                      onChange={(e) => {
                        setDateRange(e.target.value);
                        setCurrentPage(1);
                      }}
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
                        setCurrentPage(1);
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
                    <tbody className="divide-y divide-slate-100">

                      {currentBookings.length > 0 ? (

                        currentBookings.map((booking, index) => (

                          <tr
                            key={booking._id || `booking-${index}`}
                            onClick={() => setSelectedBooking(booking)}
                            className="hover:bg-slate-50/70 transition cursor-pointer"
                          >
                            <td className="py-3.5 px-4">
                              {startIndex + index + 1}
                            </td>

                            <td className="py-3.5 px-4 font-extrabold text-slate-900">
                              {booking._id
                                ? booking._id.slice(-8).toUpperCase()
                                : "N/A"}
                            </td>

                            <td className="py-3.5 px-4">
                              <p className="font-bold text-slate-900">
                                {booking.user?.name || "N/A"}
                              </p>

                              <p className="text-[10px] text-slate-400">
                                {booking.user?.email || "N/A"}
                              </p>
                            </td>

                            <td className="py-3.5 px-4">
                              <p className="font-extrabold text-slate-900">
                                {booking.flight?.airline || "N/A"}
                              </p>

                              <p className="text-[10px] text-slate-400">
                                {booking.flight?.FLightNumber || "N/A"}
                                {" • "}
                                {booking.flight?.from || "N/A"}
                                {" ➔ "}
                                {booking.flight?.to || "N/A"}
                              </p>
                            </td>

                            <td className="py-3.5 px-4 font-bold">
                              {booking.flight?.date || "N/A"}
                            </td>

                            <td className="py-3.5 px-4 font-extrabold">
                              ₹
                              {Number(
                                booking.totalAmount || 0
                              ).toLocaleString("en-IN")}
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                                  booking.bookingStatus
                                )}`}
                              >
                                {booking.bookingStatus || "Pending"}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedBooking(booking);
                                }}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 text-blue-600 hover:bg-blue-50"
                              >
                                View
                              </button>
                            </td>
                          </tr>

                        ))

                      ) : (

                        <tr>
                          <td
                            colSpan={8}
                            className="py-10 text-center text-slate-400 font-semibold"
                          >
                            No bookings found.
                          </td>
                        </tr>

                      )}

                    </tbody>
                  </table>
                </div>

                {/* PAGINATION FOOTER */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 text-xs text-slate-500 font-medium">

                  {/* Showing */}
                  <div>
                    {filteredBookings.length === 0 ? (
                      "Showing 0 bookings"
                    ) : (
                      <>
                        Showing{" "}
                        <span className="font-bold text-slate-800">
                          {startIndex + 1}
                        </span>
                        {" "}to{" "}
                        <span className="font-bold text-slate-800">
                          {Math.min(endIndex, filteredBookings.length)}
                        </span>
                        {" "}of{" "}
                        <span className="font-bold text-slate-800">
                          {filteredBookings.length}
                        </span>
                        {" "}bookings
                      </>
                    )}
                  </div>


                  {/* Pagination Buttons */}
                  {totalPages > 0 && (
                    <div className="flex items-center gap-1">

                      {/* Previous */}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition ${currentPage === 1
                          ? "border-slate-100 text-slate-300 cursor-not-allowed"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        ‹
                      </button>


                      {/* Page Numbers */}
                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold transition ${currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                          {page}
                        </button>
                      ))}


                      {/* Next */}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition ${currentPage === totalPages
                          ? "border-slate-100 text-slate-300 cursor-not-allowed"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        ›
                      </button>

                    </div>
                  )}

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
                      selectedBooking.bookingStatus
                    )}`}
                  >
                    {selectedBooking.bookingStatus}
                  </span>

                  <p className="text-xs font-bold text-slate-500">

                    Booking ID:

                    <span className="font-extrabold text-slate-900 ml-1">
                      {selectedBooking._id?.slice(-8).toUpperCase()}
                    </span>

                  </p>

                </div>

                {/* User Info Card */}
                <div className="flex items-center gap-3.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">

                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                    👤
                  </div>

                  <div>

                    <h4 className="font-extrabold text-xs text-slate-900">
                      {selectedBooking.user?.name || "N/A"}
                    </h4>

                    <p className="text-[10px] text-slate-400 font-medium">
                      {selectedBooking.user?.email || "N/A"}
                    </p>

                    <p className="text-[10px] text-slate-400 font-medium">
                      {selectedBooking.user?.mobile || "N/A"}
                    </p>

                  </div>

                </div>

                {/* Flight Information */}
                <div className="space-y-3">

                  <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                    <span className="text-blue-600">✈</span>
                    Flight Information
                  </h4>


                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">

                    <div className="flex items-center gap-2.5">

                      <div className="w-7 h-7 rounded bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                        ✈
                      </div>

                      <div>

                        <p className="font-extrabold text-xs text-slate-900">
                          {selectedBooking.flight?.airline || "N/A"}
                        </p>

                        <p className="text-[10px] text-slate-400 font-medium">

                          Flight No.

                          <span className="text-blue-600 font-bold ml-1">
                            {selectedBooking.flight?.FLightNumber || "N/A"}
                          </span>

                        </p>

                      </div>

                    </div>


                    {selectedBooking.flight?.image && (
                      <img
                        src={selectedBooking.flight.image}
                        alt="flight"
                        className="w-14 h-9 rounded-lg object-cover"
                      />
                    )}

                  </div>


                  {/* Route */}

                  <div className="flex items-center justify-between text-xs py-1">

                    <div>

                      <p className="font-extrabold text-slate-900">
                        {selectedBooking.flight?.from || "N/A"}
                      </p>

                      <p className="text-slate-400 font-bold text-[11px] mt-0.5">
                        {selectedBooking.flight?.departureTime || "--:--"}
                      </p>

                    </div>


                    <span className="text-blue-500 font-bold text-base">
                      ✈
                    </span>


                    <div className="text-right">

                      <p className="font-extrabold text-slate-900">
                        {selectedBooking.flight?.to || "N/A"}
                      </p>

                      <p className="text-slate-400 font-bold text-[11px] mt-0.5">
                        {selectedBooking.flight?.arrivalTime || "--:--"}
                      </p>

                    </div>

                  </div>


                  {/* Date Aircraft Baggage */}

                  <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 text-center">

                    <div>

                      <p className="text-slate-400 font-medium">
                        📅 Date
                      </p>

                      <p className="font-bold text-slate-800 mt-0.5">
                        {selectedBooking.flight?.date || "N/A"}
                      </p>

                    </div>


                    <div>

                      <p className="text-slate-400 font-medium">
                        ✈ Aircraft
                      </p>

                      <p className="font-bold text-slate-800 mt-0.5">
                        {selectedBooking.flight?.Aircraft || "N/A"}
                      </p>

                    </div>


                    <div>

                      <p className="text-slate-400 font-medium">
                        💼 Baggage
                      </p>

                      <p className="font-bold text-slate-800 mt-0.5">
                        {selectedBooking.flight?.Baggage || 0} KG
                      </p>

                    </div>

                  </div>

                </div>

                {/* Passenger Details */}
                <div className="space-y-2">

                  <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                    <span className="text-blue-600">👥</span>
                    Passenger Details
                  </h4>


                  <div className="border border-slate-100 rounded-xl overflow-hidden text-[11px]">

                    <div className="grid grid-cols-3 bg-slate-50 p-2 font-bold text-slate-400">
                      <span>Name</span>
                      <span>Age</span>
                      <span>Gender</span>
                    </div>


                    {selectedBooking.passengers?.map((passenger, index) => (

                      <div
                        key={index}
                        className="grid grid-cols-3 p-2 font-semibold text-slate-700 border-t border-slate-100"
                      >

                        <span className="truncate">
                          {passenger.name || "N/A"}
                        </span>

                        <span>
                          {passenger.age || "N/A"}
                        </span>

                        <span>
                          {passenger.gender || "N/A"}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Fare Summary */}
                <div className="space-y-2 text-xs">

                  <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="text-blue-600">💳</span>
                    Fare Summary
                  </h4>

                  <div className="space-y-2 pt-1">

                    {/* Base Fare */}
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">
                        Base Fare
                      </span>

                      <span className="font-bold text-slate-800">
                        ₹
                        {Number(
                          selectedBooking.baseFare || 0
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>


                    {/* Taxes & Fees */}
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">
                        Taxes & Fees
                      </span>

                      <span className="font-bold text-slate-800">
                        ₹
                        {Number(
                          selectedBooking.taxes || 0
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>


                    {/* Window Seat Fee */}
                    {Number(selectedBooking.seatExtra || 0) > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">
                          Window Seat Fee
                        </span>

                        <span className="font-bold text-slate-800">
                          ₹
                          {Number(
                            selectedBooking.seatExtra
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}


                    {/* Selected Seats */}
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">
                        Seat
                      </span>

                      <span className="font-bold text-slate-800">
                        {selectedBooking.selectedSeats
                          ?.map((seat) => seat.seatNumber)
                          .join(", ") || "N/A"}
                      </span>
                    </div>


                    {/* Total Amount */}
                    <div className="flex justify-between items-center pt-2.5 border-t border-slate-100">

                      <span className="font-extrabold text-slate-900">
                        Total Amount
                      </span>

                      <span className="font-black text-blue-600 text-base">
                        ₹
                        {Number(
                          selectedBooking.totalAmount || 0
                        ).toLocaleString("en-IN")}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Action Buttons */}
                {/* Action Buttons */}
                <div className="space-y-2 pt-2">

                  {/* APPROVE BOOKING */}
                  {selectedBooking.bookingStatus === "Pending" && (
                    <button
                      onClick={handleApproveBooking}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                    >
                      <span>✓</span>
                      Approve Booking
                    </button>
                  )}


                  {/* CONFIRMED MESSAGE */}
                  {selectedBooking.bookingStatus === "Confirmed" && (
                    <div className="w-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-xs py-3 rounded-xl text-center">
                      ✓ Booking Confirmed
                    </div>
                  )}


                  {/* DOWNLOAD TICKET */}
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>📥</span>
                    Download Ticket
                  </button>


                  {/* CANCEL BOOKING */}
                  {selectedBooking.bookingStatus !== "Cancelled" && (
                    <button
                      className="w-full border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-rose-600 font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <span>🚫</span>
                      Cancel Booking
                    </button>
                  )}

                </div>

              </div>
            )}

          </div>

        </main>
      </div>

    </div>
  );
}