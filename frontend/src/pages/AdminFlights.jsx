import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminFlights() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Flights');

  // Flight List State
  const [flights, setFlights] = useState([
    { id: 1, airline: 'IndiGo', route: 'DEL ➔ BOM', departure: '06:10', price: '₹ 4,799', status: 'Active' },
    { id: 2, airline: 'Air India', route: 'DEL ➔ BOM', departure: '09:30', price: '₹ 5,199', status: 'Active' },
    { id: 3, airline: 'SpiceJet', route: 'DEL ➔ BOM', departure: '14:20', price: '₹ 5,299', status: 'Active' },
    { id: 4, airline: 'Vistara', route: 'DEL ➔ BOM', departure: '18:45', price: '₹ 5,499', status: 'Active' },
  ]);

  // Menu Items Navigation Logic
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    if (menuName === 'Dashboard') {
      navigate('/admin/dashboard');
    }
  };

  // Delete Flight Logic
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      setFlights(flights.filter((f) => f.id !== id));
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Flights', icon: '✈️' },
    { name: 'Bookings', icon: '🎫' },
    { name: 'Users', icon: '👥' },
    { name: 'Reports', icon: '📊' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="bg-[#f4f7fb] min-h-screen font-sans flex flex-col">
      
      {/* TOP NAVBAR */}
      <header className="bg-[#0b2545] text-white px-8 py-3.5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 font-extrabold text-lg tracking-wide">
          <span>✈</span>
          <span>SkyFly Admin</span>
        </div>
        
        <div className="w-8 h-8 rounded-full bg-slate-400/40 flex items-center justify-center text-xs border border-white/20">
          👤
        </div>
      </header>

      <div className="flex flex-1">
        
        {/* LEFT SIDEBAR MENU */}
        <aside className="w-64 bg-[#0b2545] text-white p-4 space-y-2 border-t border-slate-800">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item.name)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition duration-200 ${
                activeMenu === item.name
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}

          <button 
            onClick={() => {
              alert('Logged out!');
              navigate('/admin/login');
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition duration-200 mt-8"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-8 space-y-6">
          
          {/* Header & Add Flight Button */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-slate-900">Manage Flights</h1>
            <button 
              onClick={() => alert('Add Flight Modal / Page')}
              className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition duration-200"
            >
              Add Flight
            </button>
          </div>

          {/* FLIGHTS TABLE CARD */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold">
                    <th className="py-3 px-3">Airline</th>
                    <th className="py-3 px-3">From ➔ To</th>
                    <th className="py-3 px-3">Departure</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-slate-800 font-medium">
                  {flights.map((flight) => (
                    <tr key={flight.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-3 font-bold text-slate-900">{flight.airline}</td>
                      <td className="py-4 px-3 font-semibold text-slate-700">{flight.route}</td>
                      <td className="py-4 px-3 text-gray-500">{flight.departure}</td>
                      <td className="py-4 px-3 font-bold text-slate-900">{flight.price}</td>
                      <td className="py-4 px-3 text-center">
                        <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-600">
                          {flight.status}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => alert(`Edit ${flight.airline}`)}
                            className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center text-xs transition"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(flight.id)}
                            className="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center text-xs transition"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}