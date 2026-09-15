import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { DeleteFlight, GetFlight } from '../api/api';

export default function ManageFlights() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Manage Flights');
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 6;

  const [search, setSearch] = useState('');
  const [selectedAirline, setSelectedAirline] = useState('All Airlines');
  const [selectedFrom, setSelectedFrom] = useState('All Cities');
  const [selectedTo, setSelectedTo] = useState('All Cities');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Reset Filters
  const handleReset = () => {
    setSearch('');
    setSelectedAirline('All Airlines');
    setSelectedFrom('All Cities');
    setSelectedTo('All Cities');
    setSelectedStatus('All');
    setCurrentPage(1);
  };


  // Filter Logic
  const filteredFlights = flights.filter((flight) => {
    const FLightNumber = String(flight.FLightNumber ?? "");
    const airline = String(flight.airline ?? "");
    const from = String(flight.from ?? "");
    const to = String(flight.to ?? "");

    const searchText = String(search ?? "").toLowerCase();

    const matchesSearch =
      FLightNumber.toLowerCase().includes(searchText) ||
      airline.toLowerCase().includes(searchText) ||
      from.toLowerCase().includes(searchText) ||
      to.toLowerCase().includes(searchText);

    const matchesAirline =
      selectedAirline === "All Airlines" ||
      airline === selectedAirline;

    // From filter
    const matchesFrom =
      selectedFrom === "All Cities" ||
      from.toLowerCase() === selectedFrom.toLowerCase();

    // To filter
    const matchesTo =
      selectedTo === "All Cities" ||
      to.toLowerCase() === selectedTo.toLowerCase();


    return matchesSearch && matchesAirline && matchesFrom && matchesTo;
  });


  // Pagination
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  const startIndex = (currentPage - 1) * flightsPerPage;
  const endIndex = startIndex + flightsPerPage;

  const currentFlights = filteredFlights.slice(startIndex, endIndex);


  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);

        const res = await GetFlight();

        // Adjust this depending on your API response structure
        setFlights(res.Flight || []);
      } catch (err) {
        console.error('Error fetching flights:', err);
        setError('Failed to load flights.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this flight?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const res = await DeleteFlight(id);

      console.log("Delete Response:", res);

      if (res.status || res.success) {
        alert(res.message || "Flight deleted successfully");

        // UI se bhi flight remove
        setFlights((prevFlights) =>
          prevFlights.filter((flight) => flight._id !== id)
        );
      } else {
        alert(res.message || "Failed to delete flight");
      }

    } catch (error) {
      console.error("Delete Flight Error:", error);
      alert(error.message || "Something went wrong");
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



        {/* PAGE CONTENT */}
        <main className="p-8 space-y-10">

          {/* Header & Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span className="text-blue-600">✈</span> Manage Flights
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                View, edit, and delete all flights
              </p>
            </div>

            <button
              onClick={() => navigate('/admin/add-flight')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 self-start sm:self-auto"
            >
              <span>⊕</span> Add New Flight
            </button>
          </div>

          {/* FILTER BAR CARD */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-center text-xs">

              {/* Search Bar */}
              <div className="md:col-span-4 relative">
                <label className="block text-[10px] text-slate-400 font-bold mb-0.5 pl-1">Search</label>
                <span className="absolute left-3.5 top-7 text-slate-400">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={
                    (e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }
                  }
                  placeholder="Search by Airline, Flight No, From, To..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium placeholder-slate-400"
                />
              </div>

              {/* Airline Select */}
              <div className="md:col-span-2">
                <label className="block text-[10px] text-slate-400 font-bold mb-0.5 pl-1">Airline</label>
                <select
                  value={selectedAirline}
                  onChange={(e) => {
                    setSelectedAirline(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium bg-white"
                >
                  <option value="All Airlines">All Airlines</option>
                  <option value="IndiGo">IndiGo</option>
                  <option value="Air India">Air India</option>
                  <option value="SpiceJet">SpiceJet</option>
                  <option value="Vistara">Vistara</option>
                  <option value="Akasa Air">Akasa Air</option>
                </select>
              </div>

              {/* From Select */}
              <div className="md:col-span-2">
                <label className="block text-[10px] text-slate-400 font-bold mb-0.5 pl-1">From</label>
                <select
                  value={selectedFrom}
                  onChange={(e) => {
                    setSelectedFrom(e.target.value);
                    setCurrentPage(1)
                  }}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium bg-white"
                >
                  <option value="All Cities">All Cities</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Bengaluru">Bengaluru</option>
                </select>
              </div>

              {/* To Select */}
              <div className="md:col-span-2">
                <label className="block text-[10px] text-slate-400 font-bold mb-0.5 pl-1">To</label>
                <select
                  value={selectedTo}
                  onChange={(e) => {
                    setSelectedTo(e.target.value);
                    setCurrentPage(1)
                  }}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium bg-white"
                >
                  <option value="All Cities">All Cities</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Goa">Goa</option>
                  <option value="Bengaluru">Bengaluru</option>
                </select>
              </div>

              {/* Status Select */}
              {/* <div className="md:col-span-1">
                <label className="block text-[10px] text-slate-400 font-bold mb-0.5 pl-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium bg-white"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div> */}

              {/* Reset Button */}
              <div className="md:col-span-1 pt-3.5">
                <button
                  onClick={handleReset}
                  className="w-full p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-bold flex items-center justify-center gap-1"
                >
                  ↻ Reset
                </button>
              </div>

            </div>
          </div>

          {/* TABLE SECTION CARD */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase">
                  <tr>
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">Image</th>
                    <th className="py-3.5 px-4">Flight No.</th>
                    <th className="py-3.5 px-4">Airline</th>
                    <th className="py-3.5 px-4">Aircraft</th>
                    <th className="py-3.5 px-4">From ➔ To</th>
                    <th className="py-3.5 px-4">Departure - Arrival</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Baggage</th>
                    {/* <th className="py-3.5 px-4">Status</th> */}
                    <th className="py-3.5 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {currentFlights.length > 0 ? (
                    currentFlights.map((flight, index) => (
                      <tr key={flight._id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4 text-slate-400 font-bold">{startIndex + index + 1}</td>
                        <td className="py-3 px-4">
                          <img
                            src={flight.image}
                            alt="flight"
                            className="w-12 h-8 rounded-lg object-cover shadow-sm border border-slate-100"
                          />
                        </td>
                        <td className="py-3 px-4 font-extrabold text-slate-900">{flight.FLightNumber}</td>
                        <td className="py-3 px-4 font-bold">{flight.airline}</td>
                        <td className="py-3 px-4 text-slate-500">{flight.Aircraft}</td>
                        <td className="py-3 px-4 text-slate-800 font-semibold flex">{flight.from} ➔ {flight.to}</td>
                        <td className="py-3 px-4 text-slate-600">{flight.departureTime} - {flight.arrivalTime}</td>
                        <td className="py-3 px-4 text-slate-500">{flight.date}</td>
                        <td className="py-3 px-4 font-extrabold text-slate-900">₹{flight.price}</td>
                        <td className="py-3 px-4 text-slate-500">{flight.Baggage}</td>
                        {/* <td className="py-3 px-4">
                          <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-100">
                            {flight.status}
                          </span>
                        </td> */}
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Edit Button */}
                            <button
                              onClick={() => navigate(`/admin/edit-flight/${flight.id}`)}
                              className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition text-xs shadow-sm"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(flight._id)}
                              className="w-7 h-7 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition text-xs shadow-sm"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="py-8 text-center text-slate-400 font-semibold">
                        No flights found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION FOOTER */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
              <div>
                Showing 1 to {filteredFlights.length} of {flights.length} flights
              </div>

              <div className="flex items-center gap-1">

                {/* Previous */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ‹
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg font-bold ${currentPage === page
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ›
                </button>

              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}