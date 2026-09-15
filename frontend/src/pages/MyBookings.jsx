import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMyBookings } from '../api/api';

export default function MyBookings() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setError(res?.message || "No bookings found");
      }

    } catch (err) {
      console.error("Fetch My Bookings Error:", err);

      setError(
        err.message || "Failed to fetch bookings"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);


  // =========================
  // STATUS COLOR
  // =========================
  const getStatusStyle = (status) => {

    switch (status) {

      case "Confirmed":
        return "bg-emerald-100 text-emerald-600";

      case "Cancelled":
        return "bg-red-100 text-red-600";

      case "Pending":
      default:
        return "bg-gray-100 text-gray-600";
    }
  };


  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    const d = new Date(date);

    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };


  // =========================
  // UPCOMING BOOKINGS
  // =========================
  const getUpcomingBookings = () => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((booking) => {

      if (booking.bookingStatus === "Cancelled") {
        return false;
      }

      if (!booking.flight?.date) {
        return false;
      }

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

      if (booking.bookingStatus === "Cancelled") {
        return false;
      }

      if (!booking.flight?.date) {
        return false;
      }

      const flightDate = new Date(booking.flight.date);
      flightDate.setHours(0, 0, 0, 0);

      return flightDate < today;
    });
  };


  // =========================
  // CANCELLED BOOKINGS
  // =========================
  const getCancelledBookings = () => {

    return bookings.filter(
      (booking) =>
        booking.bookingStatus === "Cancelled"
    );
  };


  // =========================
  // FILTER BOOKINGS
  // =========================
  let filteredBookings = [];

  if (activeTab === "Upcoming") {
    filteredBookings = getUpcomingBookings();
  }

  if (activeTab === "Past") {
    filteredBookings = getPastBookings();
  }

  if (activeTab === "Cancelled") {
    filteredBookings = getCancelledBookings();
  }


  return (
    <div className="bg-[#f4f7fb] min-h-screen font-sans">

      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">

        {/* ================= HEADER ================= */}

        <div>

          <h1 className="text-2xl font-extrabold text-slate-900">
            My Bookings
          </h1>

          <p className="text-xs text-gray-400 mt-1">
            View and manage your flight bookings
          </p>

        </div>


        {/* ================= TABS ================= */}

        <div className="bg-slate-100/70 p-1 rounded-2xl flex max-w-lg">

          {['Upcoming', 'Past', 'Cancelled'].map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition duration-200 ${activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
                }`}
            >
              {tab}
            </button>

          ))}

        </div>


        {/* ================= LOADING ================= */}

        {loading && (

          <div className="bg-white rounded-2xl p-10 text-center">

            <p className="text-sm text-gray-400">
              Loading your bookings...
            </p>

          </div>

        )}


        {/* ================= ERROR ================= */}

        {!loading && error && (

          <div className="bg-white rounded-2xl p-10 text-center">

            <p className="text-sm text-red-500">
              {error}
            </p>

            <button
              onClick={fetchMyBookings}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-semibold"
            >
              Try Again
            </button>

          </div>

        )}


        {/* ================= NO BOOKINGS ================= */}

        {!loading &&
          !error &&
          filteredBookings.length === 0 && (

            <div className="bg-white rounded-2xl p-10 text-center">

              <p className="text-sm text-gray-400">
                No {activeTab.toLowerCase()} bookings found.
              </p>

            </div>

          )}


        {/* ================= BOOKING LIST ================= */}

        {!loading &&
          !error &&
          filteredBookings.length > 0 && (

            <div className="space-y-4">

              {filteredBookings.map((booking) => {

                const flight = booking.flight;

                return (

                  <div
                    key={booking._id}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4"
                  >

                    {/* ================= BOOKING HEADER ================= */}

                    <div className="flex items-center justify-between">

                      <div className="text-sm font-extrabold text-slate-800">

                        Booking ID:

                        <span className="text-slate-900 ml-1">

                          {booking._id
                            ?.slice(-8)
                            .toUpperCase()}

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


                    {/* ================= ROUTE ================= */}

                    <div className="space-y-1">

                      <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">

                        <span className="w-5 h-5 rounded bg-blue-900 text-white flex items-center justify-center text-[10px]">
                          ✈
                        </span>

                        <span>
                          {flight?.from || "N/A"}
                        </span>

                        <span className="text-gray-400 font-normal">
                          ➔
                        </span>

                        <span>
                          {flight?.to || "N/A"}
                        </span>

                      </div>


                      <div className="text-[11px] text-gray-400 font-medium pl-7">

                        {flight?.airline || "N/A"}

                        {" ("}

                        {flight?.FLightNumber || "N/A"}

                        {")"}

                      </div>

                    </div>


                    {/* ================= DATE / TIME ================= */}

                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium pt-1">

                      <div className="flex items-center gap-1.5">

                        <span>
                          📅
                        </span>

                        <span>
                          {formatDate(flight?.date)}
                        </span>

                      </div>

                      <span className="text-gray-300">
                        |
                      </span>

                      <div>

                        {flight?.departureTime || "--:--"}

                        {" - "}

                        {flight?.arrivalTime || "--:--"}

                      </div>

                    </div>


                    {/* ================= PASSENGER + SEAT ================= */}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">

                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">

                        <div className="flex items-center gap-1.5">

                          <span>
                            👤
                          </span>

                          <span>

                            {booking.passengers?.length || 0}

                            {" "}

                            {booking.passengers?.length === 1
                              ? "Passenger"
                              : "Passengers"}

                          </span>

                        </div>


                        <span className="text-gray-300">
                          |
                        </span>


                        <span>

                          Seat{" "}

                          {booking.selectedSeats
                            ?.map(
                              (seat) => seat.seatNumber
                            )
                            .join(", ") || "N/A"}

                        </span>

                      </div>


                      {/* ================= ACTIONS ================= */}

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            navigate("/bookingstatus", {
                              state: {
                                booking: booking
                              }
                            })
                          }
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-xl transition"
                        >
                          View Details
                        </button>


                        {/* <button
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-xl transition"
                        >
                          Download Ticket
                        </button> */}

                      </div>

                    </div>

                  </div>

                );
              })}

            </div>

          )}

      </div>

    </div>
  );
}