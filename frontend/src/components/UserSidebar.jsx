import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 લોકલ સ્ટોરેજમાંથી થીમ રીડ કરવા માટે state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('appTheme') === 'dark';
  });

  // 🔹 રિયલ-ટાઇમ થીમ ચેન્જ લીસનર
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

  // હાલમાં કયું પેજ એક્ટિવ છે તે ચકાસવા માટેનું ફંક્શન
  const isActive = (path) => location.pathname === path;

  return (
    <div className="space-y-5">
      {/* Navigation Menu */}
      <div
        className={`p-3 rounded-2xl border shadow-md space-y-1 text-xs font-bold transition-colors ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <button
          onClick={() => navigate('/profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive('/profile')
              ? isDarkMode
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'bg-blue-50 text-blue-600 border border-blue-200'
              : isDarkMode
              ? 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <span>👤</span> Profile
        </button>

        <button
          onClick={() => navigate('/my-bookings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive('/my-bookings')
              ? isDarkMode
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'bg-blue-50 text-blue-600 border border-blue-200'
              : isDarkMode
              ? 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <span>📅</span> My Bookings
        </button>

        {/* <button
          onClick={() => navigate('/wallet')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive('/wallet')
              ? isDarkMode
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'bg-blue-50 text-blue-600 border border-blue-200'
              : isDarkMode
              ? 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <span>👛</span> Wallet
        </button> */}

        <button
          onClick={() => navigate('/settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive('/settings')
              ? isDarkMode
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'bg-blue-50 text-blue-600 border border-blue-200'
              : isDarkMode
              ? 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <span>⚙️</span> Settings
        </button>
      </div>

      {/* Sidebar Promo Card */}
      <div
        className={`relative rounded-2xl overflow-hidden shadow-md h-52 group border transition-colors ${
          isDarkMode ? 'border-slate-700' : 'border-slate-200'
        }`}
      >
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
          alt="Promo"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 flex flex-col justify-end text-white">
          <h4 className="font-extrabold text-sm text-slate-100">
            Explore the World With FlyHigh
          </h4>
          <p className="text-[10px] text-slate-300 font-medium">
            Better journeys, Happier you.
          </p>
        </div>
      </div>
    </div>
  );
}