import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMyBookings } from '../api/api';
import UserSidebar from '../components/UserSidebar';

export default function MyBookings() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔹 Read theme state from localStorage on initial render
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('appTheme') === 'dark';
  });

  // 🔹 Synchronize real-time theme changes across components
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('appTheme');
      setIsDarkMode(currentTheme === 'dark');
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // =========================
  // GET MY BOOKINGS
  // =========================
  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await GetMyBookings();

      if (res?.status) {
        setBookings(res.data || []);
      } else {
        setBookings([]);
        setError(res?.message || 'No bookings found');
      }
    } catch (err) {
      console.error('Fetch My Bookings Error:', err);
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  // =========================
  // STATUS COLOR (THEME ADAPTED)
  // =========================
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return isDarkMode
          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
          : 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'Cancelled':
        return isDarkMode
          ? 'bg-red-950/80 text-red-400 border border-red-800/50'
          : 'bg-red-100 text-red-700 border border-red-200';
      case 'Pending':
      default:
        return isDarkMode
          ? 'bg-slate-700/80 text-slate-300 border border-slate-600/50'
          : 'bg-slate-100 text-slate-600 border border-slate-300';
    }
  };

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // =========================
  // UPCOMING BOOKINGS
  // =========================
  const getUpcomingBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((booking) => {
      if (booking.bookingStatus === 'Cancelled') return false;
      if (!booking.flight?.date) return false;

      const flightDate = new Date(booking.flight.date);
      flightDate.setHours(0, 0, 0, 0);

      return flightDate >= today;
    });
  };

  // =========================
  // PAST BOOKINGS
  // =========================
  const getPastBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((booking) => {
      if (booking.bookingStatus === 'Cancelled') return false;
      if (!booking.flight?.date) return false;

      const flightDate = new Date(booking.flight.date);
      flightDate.setHours(0, 0, 0, 0);

      return flightDate < today;
    });
  };

  // =========================
  // CANCELLED BOOKINGS
  // =========================
  const getCancelledBookings = () => {
    return bookings.filter((booking) => booking.bookingStatus === 'Cancelled');
  };

  // =========================
  // FILTER BOOKINGS
  // =========================
  let filteredBookings = [];
  if (activeTab === 'Upcoming') filteredBookings = getUpcomingBookings();
  if (activeTab === 'Past') filteredBookings = getPastBookings();
  if (activeTab === 'Cancelled') filteredBookings = getCancelledBookings();

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        isDarkMode
          ? 'bg-slate-900 text-slate-100 dark'
          : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-3">
            <UserSidebar />
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* ================= HEADER ================= */}
            <div
              className={`p-6 rounded-2xl border shadow-md flex items-center justify-between transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700/80 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div>
                <h1 className="text-xl font-black tracking-tight">
                  My Bookings
                </h1>
                <p
                  className={`text-xs font-medium mt-0.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  View and manage your flight bookings
                </p>
              </div>
            </div>

            {/* ================= TABS ================= */}
            <div
              className={`p-1.5 rounded-2xl border flex max-w-md transition-colors ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700/60'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {['Upcoming', 'Past', 'Cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-md'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ================= LOADING ================= */}
            {loading && (
              <div
                className={`rounded-2xl p-10 text-center border shadow-md transition-colors ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700/80'
                    : 'bg-white border-slate-200'
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Loading your bookings...
                </p>
              </div>
            )}

            {/* ================= ERROR ================= */}
            {!loading && error && (
              <div
                className={`rounded-2xl p-10 text-center border shadow-md transition-colors ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700/80'
                    : 'bg-white border-slate-200'
                }`}
              >
                <p className="text-sm text-red-500 font-medium">{error}</p>
                <button
                  onClick={fetchMyBookings}
                  className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md transition"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* ================= NO BOOKINGS ================= */}
            {!loading && !error && filteredBookings.length === 0 && (
              <div
                className={`rounded-2xl p-10 text-center border shadow-md transition-colors ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700/80'
                    : 'bg-white border-slate-200'
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  No {activeTab.toLowerCase()} bookings found.
                </p>
              </div>
            )}

            {/* ================= BOOKING LIST ================= */}
            {!loading && !error && filteredBookings.length > 0 && (
              <div className="space-y-4">
                {filteredBookings.map((booking) => {
                  const flight = booking.flight;

                  return (
                    <div
                      key={booking._id}
                      className={`rounded-2xl p-6 border shadow-md space-y-4 transition ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700/80 hover:border-slate-600'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* BOOKING HEADER */}
                      <div className="flex items-center justify-between">
                        <div
                          className={`text-sm font-extrabold ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          Booking ID:{' '}
                          <span
                            className={
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }
                          >
                            {booking._id?.slice(-8).toUpperCase()}
                          </span>
                        </div>

                        <span
                          className={`text-[11px] font-bold px-3 py-1 rounded-full ${getStatusStyle(
                            booking.bookingStatus
                          )}`}
                        >
                          {booking.bookingStatus}
                        </span>
                      </div>

                      {/* ROUTE */}
                      <div className="space-y-1">
                        <div
                          className={`flex items-center gap-2 text-sm font-extrabold ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          <span className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]">
                            ✈
                          </span>
                          <span>{flight?.from || 'N/A'}</span>
                          <span
                            className={
                              isDarkMode ? 'text-slate-500' : 'text-slate-400'
                            }
                          >
                            ➔
                          </span>
                          <span>{flight?.to || 'N/A'}</span>
                        </div>

                        <div
                          className={`text-[11px] font-medium pl-7 ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {flight?.airline || 'N/A'} (
                          {flight?.FLightNumber || 'N/A'})
                        </div>
                      </div>

                      {/* DATE / TIME */}
                      <div
                        className={`flex items-center gap-4 text-xs font-medium pt-1 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>📅</span>
                          <span>{formatDate(flight?.date)}</span>
                        </div>

                        <span
                          className={
                            isDarkMode ? 'text-slate-600' : 'text-slate-300'
                          }
                        >
                          |
                        </span>

                        <div>
                          {flight?.departureTime || '--:--'} -{' '}
                          {flight?.arrivalTime || '--:--'}
                        </div>
                      </div>

                      {/* PASSENGER + SEAT + ACTIONS */}
                      <div
                        className={`flex flex-wrap items-center justify-between gap-3 pt-3 border-t ${
                          isDarkMode ? 'border-slate-700/60' : 'border-slate-100'
                        }`}
                      >
                        <div
                          className={`flex items-center gap-3 text-xs font-medium ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>👤</span>
                            <span>
                              {booking.passengers?.length || 0}{' '}
                              {booking.passengers?.length === 1
                                ? 'Passenger'
                                : 'Passengers'}
                            </span>
                          </div>

                          <span
                            className={
                              isDarkMode ? 'text-slate-600' : 'text-slate-300'
                            }
                          >
                            |
                          </span>

                          <span>
                            Seat:{' '}
                            <span
                              className={
                                isDarkMode ? 'text-slate-200' : 'text-slate-800'
                              }
                            >
                              {booking.selectedSeats
                                ?.map((seat) => seat.seatNumber)
                                .join(', ') || 'N/A'}
                            </span>
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate('/bookingstatus', {
                                state: { booking: booking },
                              })
                            }
                            className={`text-xs font-semibold px-4 py-2 rounded-xl border transition ${
                              isDarkMode
                                ? 'bg-blue-950/80 hover:bg-blue-900 text-blue-400 border-blue-800/60'
                                : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200'
                            }`}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}