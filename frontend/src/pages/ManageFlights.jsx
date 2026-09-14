import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function ManageFlights() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Manage Flights');

  // Dummy Initial Data matching image exactly
  const initialFlights = [
    { id: 1, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=150&q=80', flightNo: '6E 215', airline: 'IndiGo', aircraft: 'Airbus A320', fromTo: 'Delhi (DEL) ➔ Mumbai (BOM)', timing: '14:30 - 17:45', date: '2026-09-15', price: '4,299', baggage: '7 KG', status: 'Active' },
    { id: 2, image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=150&q=80', flightNo: 'AI101', airline: 'Air India', aircraft: 'Airbus A320neo', fromTo: 'Delhi (DEL) ➔ Dubai (DXB)', timing: '21:30 - 00:10', date: '2026-09-16', price: '12,999', baggage: '7 KG', status: 'Active' },
    { id: 3, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=150&q=80', flightNo: 'SG782', airline: 'SpiceJet', aircraft: 'Boeing 737', fromTo: 'Mumbai (BOM) ➔ Goa (GOI)', timing: '11:20 - 12:35', date: '2026-09-17', price: '3,499', baggage: '7 KG', status: 'Active' },
    { id: 4, image: 'https://images.unsplash.com/photo-1520437358207-323b43b5752b?auto=format&fit=crop&w=150&q=80', flightNo: 'UK654', airline: 'Vistara', aircraft: 'Airbus A321', fromTo: 'Delhi (DEL) ➔ Bengaluru (BLR)', timing: '14:20 - 17:10', date: '2026-09-18', price: '6,299', baggage: '15 KG', status: 'Active' },
    { id: 5, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=150&q=80', flightNo: '6E732', airline: 'IndiGo', aircraft: 'Airbus A321', fromTo: 'Ahmedabad (AMD) ➔ Delhi (DEL)', timing: '09:15 - 10:55', date: '2026-09-19', price: '3,999', baggage: '7 KG', status: 'Active' },
    { id: 6, image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=150&q=80', flightNo: 'AI203', airline: 'Air India', aircraft: 'Boeing 787', fromTo: 'Delhi (DEL) ➔ Dubai (DXB)', timing: '21:30 - 00:10', date: '2026-09-20', price: '12,999', baggage: '25 KG', status: 'Active' },
    { id: 7, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=150&q=80', flightNo: '6E893', airline: 'IndiGo', aircraft: 'Airbus A320', fromTo: 'Mumbai (BOM) ➔ Kolkata (CCU)', timing: '16:40 - 19:25', date: '2026-09-21', price: '5,499', baggage: '7 KG', status: 'Active' },
    { id: 8, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=150&q=80', flightNo: 'SG274', airline: 'SpiceJet', aircraft: 'Boeing 737 MAX', fromTo: 'Bengaluru (BLR) ➔ Goa (GOI)', timing: '07:45 - 08:55', date: '2026-09-22', price: '2,999', baggage: '7 KG', status: 'Active' },
    { id: 9, image: 'https://images.unsplash.com/photo-1520437358207-323b43b5752b?auto=format&fit=crop&w=150&q=80', flightNo: 'UK812', airline: 'Vistara', aircraft: 'Airbus A320neo', fromTo: 'Mumbai (BOM) ➔ London (LHR)', timing: '23:15 - 05:50', date: '2026-09-23', price: '28,999', baggage: '23 KG', status: 'Active' },
    { id: 10, image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=150&q=80', flightNo: 'QP536', airline: 'Akasa Air', aircraft: 'Boeing 737 MAX', fromTo: 'Ahmedabad (AMD) ➔ Goa (GOI)', timing: '12:30 - 14:10', date: '2026-09-24', price: '4,599', baggage: '7 KG', status: 'Active' },
  ];

  const [flights, setFlights] = useState(initialFlights);

  // Filters State
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
  };

  // Delete Flight Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      setFlights(flights.filter((flight) => flight.id !== id));
    }
  };

  // Filter Logic
  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.flightNo.toLowerCase().includes(search.toLowerCase()) ||
      flight.airline.toLowerCase().includes(search.toLowerCase()) ||
      flight.fromTo.toLowerCase().includes(search.toLowerCase());

    const matchesAirline =
      selectedAirline === 'All Airlines' || flight.airline === selectedAirline;

    const matchesStatus =
      selectedStatus === 'All' || flight.status === selectedStatus;

    return matchesSearch && matchesAirline && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-[#f4f7fb] font-sans overflow-hidden">
      
      {/* 1. LEFT SIDEBAR */}
      <aside>
        <AdminSidebar />
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        


        {/* PAGE CONTENT */}
        <main className="p-8 space-y-6">
          
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
                <span className="absolute left-3.5 top-2.5 text-slate-400">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Airline, Flight No, From, To..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium placeholder-slate-400"
                />
              </div>

              {/* Airline Select */}
              <div className="md:col-span-2">
                <label className="block text-[10px] text-slate-400 font-bold mb-0.5 pl-1">Airline</label>
                <select
                  value={selectedAirline}
                  onChange={(e) => setSelectedAirline(e.target.value)}
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
                  onChange={(e) => setSelectedFrom(e.target.value)}
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
                  onChange={(e) => setSelectedTo(e.target.value)}
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
              <div className="md:col-span-1">
                <label className="block text-[10px] text-slate-400 font-bold mb-0.5 pl-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium bg-white"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

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
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredFlights.length > 0 ? (
                    filteredFlights.map((flight, index) => (
                      <tr key={flight.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4 text-slate-400 font-bold">{index + 1}</td>
                        <td className="py-3 px-4">
                          <img
                            src={flight.image}
                            alt="flight"
                            className="w-12 h-8 rounded-lg object-cover shadow-sm border border-slate-100"
                          />
                        </td>
                        <td className="py-3 px-4 font-extrabold text-slate-900">{flight.flightNo}</td>
                        <td className="py-3 px-4 font-bold">{flight.airline}</td>
                        <td className="py-3 px-4 text-slate-500">{flight.aircraft}</td>
                        <td className="py-3 px-4 text-slate-800 font-semibold">{flight.fromTo}</td>
                        <td className="py-3 px-4 text-slate-600">{flight.timing}</td>
                        <td className="py-3 px-4 text-slate-500">{flight.date}</td>
                        <td className="py-3 px-4 font-extrabold text-slate-900">₹{flight.price}</td>
                        <td className="py-3 px-4 text-slate-500">{flight.baggage}</td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-100">
                            {flight.status}
                          </span>
                        </td>
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
                              onClick={() => handleDelete(flight.id)}
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
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50">
                  ‹
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">
                  1
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
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