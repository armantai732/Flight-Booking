import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetFlight } from '../api/api';
import { toast } from 'react-toastify';

export default function Hero() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('One Way');

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);

  // ================================
  // Dynamic Theme State Setup
  // ================================
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("appTheme") === "dark";
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem("appTheme");
      setIsDark(currentTheme === "dark");
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await GetFlight();
        const flightList = res?.Flight || res?.data || [];

        const uniqueFrom = [...new Set(flightList.map((f) => f.from?.trim()).filter(Boolean))].sort();
        const uniqueTo = [...new Set(flightList.map((f) => f.to?.trim()).filter(Boolean))].sort();

        setFromCities(uniqueFrom);
        setToCities(uniqueTo);
      } catch (err) {
        console.error('Error fetching flight cities for Hero component:', err);
      }
    };

    fetchCities();
  }, []);

  const handleSearch = () => {
    if (from && to && from === to) {
      toast.error('Origin and destination cannot be the same.');
      return;
    }

    navigate('/flights', {
      state: {
        from: from || null,
        to: to || null,
        departureDate: departureDate || null,
        returnDate: tripType === 'Round Trip' ? returnDate : null,
        tripType,
      },
    });
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{
        backgroundImage: isDark
          ? `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop')`
          : `linear-gradient(to right, rgba(2, 28, 68, 0.85), rgba(2, 28, 68, 0.3)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop')`
      }}
    >
      {/* Top Hero Text Section */}
      <div className="max-w-7xl mx-auto w-full pt-8">
        <span className={`text-xs sm:text-sm font-semibold tracking-wider uppercase ${isDark ? 'text-blue-400' : 'text-blue-300'}`}>
          YOUR JOURNEY, OUR PRIORITY
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mt-2 leading-tight">
          Book Your <br />
          <span className={isDark ? "text-blue-500" : "text-blue-400"}>Next Flight</span>
        </h1>

        <p className="text-gray-200 mt-4 text-sm sm:text-base max-w-lg">
          Explore the world with the best flight deals. <br />
          Fast. Easy. Reliable.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 text-xs sm:text-sm font-medium text-white">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Best Prices
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            ✈ Trusted Airlines
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            ✦ 24/7 Support
          </div>
        </div>
      </div>

      {/* Flight Search Widget Container */}
      <div className="max-w-7xl mx-auto w-full mt-12">
        <div className={`rounded-2xl shadow-2xl p-4 sm:p-6 transition-colors duration-300 ${
          isDark 
            ? "bg-slate-900 border border-slate-800 text-slate-100" 
            : "bg-white text-gray-800"
        }`}>
          
          {/* Trip Type Tabs */}
          <div className={`flex items-center gap-2 border-b pb-4 mb-4 overflow-x-auto ${
            isDark ? "border-slate-800" : "border-gray-100"
          }`}>
            {['One Way'].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2 whitespace-nowrap ${
                  tripType === type
                    ? 'bg-blue-600 text-white shadow-md'
                    : isDark 
                      ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                ✈ {type}
              </button>
            ))}
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {/* From */}
            <div>
              <label className={`block text-xs font-semibold mb-1 ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>From</label>
              <div className={`flex items-center border rounded-lg px-3 py-2 transition-colors ${
                isDark 
                  ? "bg-slate-800/60 border-slate-700 text-slate-100" 
                  : "bg-gray-50 border-gray-200 text-gray-800"
              }`}>
                <span className={isDark ? "text-slate-400 mr-2" : "text-gray-400 mr-2"}>📍</span>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className={`w-full bg-transparent text-xs sm:text-sm font-semibold outline-none ${
                    from 
                      ? (isDark ? 'text-slate-100' : 'text-gray-700') 
                      : (isDark ? 'text-slate-400' : 'text-gray-400')
                  }`}
                >
                  <option value="" disabled hidden className={isDark ? "bg-slate-900 text-slate-400" : ""}>
                    Select From
                  </option>
                  {fromCities.map((city) => (
                    <option key={city} value={city} className={isDark ? "bg-slate-900 text-slate-100" : "text-gray-700"}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* To */}
            <div>
              <label className={`block text-xs font-semibold mb-1 ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>To</label>
              <div className={`flex items-center border rounded-lg px-3 py-2 transition-colors ${
                isDark 
                  ? "bg-slate-800/60 border-slate-700 text-slate-100" 
                  : "bg-gray-50 border-gray-200 text-gray-800"
              }`}>
                <span className={isDark ? "text-slate-400 mr-2" : "text-gray-400 mr-2"}>📍</span>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className={`w-full bg-transparent text-xs sm:text-sm font-semibold outline-none ${
                    to 
                      ? (isDark ? 'text-slate-100' : 'text-gray-700') 
                      : (isDark ? 'text-slate-400' : 'text-gray-400')
                  }`}
                >
                  <option value="" disabled hidden className={isDark ? "bg-slate-900 text-slate-400" : ""}>
                    Select To
                  </option>
                  {toCities.map((city) => (
                    <option key={city} value={city} className={isDark ? "bg-slate-900 text-slate-100" : "text-gray-700"}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <label className={`block text-xs font-semibold mb-1 ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>Departure Date</label>
              <div className={`relative flex items-center border rounded-lg px-3 py-2 transition-colors ${
                isDark 
                  ? "bg-slate-800/60 border-slate-700 text-slate-100" 
                  : "bg-gray-50 border-gray-200 text-gray-800"
              }`}>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className={`w-full bg-transparent text-xs sm:text-sm font-medium outline-none ${
                    isDark ? "text-slate-100 [color-scheme:dark]" : "text-gray-700"
                  } ${
                    !departureDate ? '[&::-webkit-datetime-edit]:text-transparent' : ''
                  }`}
                />
                {!departureDate && (
                  <span className={`absolute left-3 text-xs sm:text-sm font-medium pointer-events-none ${
                    isDark ? "text-slate-400" : "text-gray-400"
                  }`}>
                    Select Date
                  </span>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div>
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-lg shadow-md transition flex items-center justify-center gap-2"
              >
                <span>🔍</span> Search Flights
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}