import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../api/api';
import AdminSidebar from './AdminSidebar';

export default function AdminDashboard() {

  const [statsData, setStatsData] = useState({
    totalFlights: 0,
    totalBookings: 0,
    totalUsers: 0
  });

  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {

    const fetchDashboardStats = async () => {
      try {

        const data = await getDashboardStats();

        console.log("Dashboard Stats:", data);

        setStatsData({
          totalFlights: data.totalFlights || 0,
          totalBookings: data.totalBookings || 0,
          totalUsers: data.totalUsers || 0
        });

        setRecentBookings(data.recentBookings || []);

      } catch (error) {

        console.error("Dashboard Error:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchDashboardStats();

  }, []);


  // =========================
  // STATS CARDS
  // =========================

  const stats = [
    {
      title: 'Total Flights',
      value: loading ? '...' : statsData.totalFlights,
      icon: '✈️',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Total Bookings',
      value: loading ? '...' : statsData.totalBookings,
      icon: '🎫',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Total Users',
      value: loading ? '...' : statsData.totalUsers,
      icon: '👥',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Total Revenue',
      value: '₹0',
      icon: '₹',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    }
  ];


  return (

    <div className="min-h-screen bg-[#f4f7fb] font-sans flex">

      {/* =====================================
          LEFT SIDEBAR
      ===================================== */}

      <aside className="w-64 min-h-screen bg-[#0b2545] text-white flex-shrink-0">

        <AdminSidebar />

      </aside>


      {/* =====================================
          RIGHT SIDE CONTENT
      ===================================== */}

      <div className="flex-1 min-w-0">

        <main className="p-6 md:p-8 space-y-8">

          {/* =====================================
              HEADER
          ===================================== */}

          <div>

            <h1 className="text-2xl font-extrabold text-slate-900">
              Dashboard
            </h1>

            <p className="text-xs text-gray-400 font-medium mt-1">
              Welcome back, Admin!
            </p>

          </div>


          {/* =====================================
              STATS CARDS
          ===================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {stats.map((card, idx) => (

              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
              >

                <div>

                  <p className="text-[11px] font-semibold text-gray-400">
                    {card.title}
                  </p>

                  <p className="text-xl font-extrabold text-slate-900 mt-1">
                    {card.value}
                  </p>

                </div>

                <div
                  className={`w-11 h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center text-lg font-bold`}
                >
                  {card.icon}
                </div>

              </div>

            ))}

          </div>


          {/* =====================================
              RECENT BOOKINGS
          ===================================== */}

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

            <div className="flex items-center justify-between mb-5">

              <h2 className="font-extrabold text-base text-slate-900">
                Recent Bookings
              </h2>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full text-left text-xs border-collapse">

                {/* TABLE HEADER */}

                <thead>

                  <tr className="border-b border-gray-100 text-gray-400 font-bold">

                    <th className="py-3 px-2">
                      ID
                    </th>

                    <th className="py-3 px-2">
                      User
                    </th>

                    <th className="py-3 px-2">
                      Passenger
                    </th>

                    <th className="py-3 px-2">
                      Flight
                    </th>

                    <th className="py-3 px-2">
                      Date
                    </th>

                    <th className="py-3 px-2 text-center">
                      Status
                    </th>

                  </tr>

                </thead>


                {/* TABLE BODY */}

                <tbody className="divide-y divide-gray-50 text-slate-800 font-medium">

                  {loading ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="py-10 text-center text-gray-400"
                      >
                        Loading bookings...
                      </td>

                    </tr>

                  ) : recentBookings.length > 0 ? (

                    recentBookings.map((booking) => (

                      <tr
                        key={booking._id}
                        className="hover:bg-slate-50/50 transition"
                      >

                        {/* BOOKING ID */}

                        <td className="py-3.5 px-2 font-bold text-slate-900">

                          {booking._id}

                        </td>


                        {/* USER */}

                        <td className="py-3.5 px-2">

                          <div>

                            <p className="font-semibold text-slate-700">

                              {booking.user?.name || "N/A"}

                            </p>

                            <p className="text-[10px] text-gray-400 mt-1">

                              {booking.user?._id || "N/A"}

                            </p>

                          </div>

                        </td>


                        {/* PASSENGER */}

                        <td className="py-3.5 px-2">

                          <div>

                            {booking.passengers?.length > 0 ? (

                              booking.passengers.map((passenger, index) => (

                                <div key={index}>

                                  <p className="font-semibold text-slate-700">

                                    {passenger.name}

                                  </p>

                                </div>

                              ))

                            ) : (

                              <span className="text-gray-400">
                                N/A
                              </span>

                            )}

                          </div>

                        </td>


                        {/* FLIGHT */}

                        <td className="py-3.5 px-2">

                          <p className="font-bold text-slate-700">

                            {booking.flight?.FLightNumber || "N/A"}

                          </p>

                          <p className="text-[10px] text-gray-400 mt-1">

                            {booking.flight?.from || "N/A"}

                            {" → "}

                            {booking.flight?.to || "N/A"}

                          </p>

                        </td>


                        {/* DATE */}

                        <td className="py-3.5 px-2 text-gray-500">

                          {booking.flight?.date || "N/A"}

                        </td>


                        {/* STATUS */}

                        <td className="py-3.5 px-2 text-center">

                          <span
                            className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full
                            
                            ${
                              booking.bookingStatus === "Confirmed"
                                ? "bg-emerald-100 text-emerald-600"
                                : booking.bookingStatus === "Pending"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >

                            {booking.bookingStatus || "N/A"}

                          </span>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="py-10 text-center text-gray-400"
                      >

                        No bookings found

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}