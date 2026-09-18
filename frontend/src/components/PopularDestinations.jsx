import React, { useEffect, useState } from 'react';
import { GetFlight } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

export default function PopularDestinations() {
  const smallOffers = [
    { title: 'Domestic Flights', discount: 'Flat 15% Off', code: 'DOM15', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop' },
    { title: 'International Flights', discount: 'Flat 20% Off', code: 'INT20', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop' },
    { title: 'Weekend Getaways', discount: 'Up to 25% Off', code: 'WEEKEND', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&auto=format&fit=crop' },
  ];

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const res = await GetFlight();
        const latestFlights = (res.Flight || [])
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setFlights(latestFlights);
      } catch (err) {
        console.error('Error fetching flights:', err);
        setError('Failed to load flights.');
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  return (
    <div
      className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDarkMode
          ? 'bg-slate-900 text-slate-100 dark'
          : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className={`text-xl sm:text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Popular Destinations
              </h2>
              <p
                className={`text-xs sm:text-sm mt-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Explore top destinations at the best prices
              </p>
            </div>
            <Link
              to="/flights"
              className="text-xs sm:text-sm font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1"
            >
              View All ➔
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {flights.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate('/flights')}
                className={`rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition cursor-pointer group ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="h-28 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <h3
                      className={`font-bold text-sm ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-800'
                      }`}
                    >
                      {item.to}
                    </h3>
                    <span
                      className={`w-5 h-5 rounded-full text-xs flex items-center justify-center transition ${
                        isDarkMode
                          ? 'bg-blue-900/50 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                          : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                      }`}
                    >
                      ➔
                    </span>
                  </div>
                  <div className="mt-3">
                    <span
                      className={`text-[10px] block ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      From
                    </span>
                    <span className="text-xs font-bold text-blue-500">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div
            className={`lg:col-span-6 relative rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between min-h-[220px] border shadow-md ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white border-slate-800'
                : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white border-blue-400'
            }`}
          >
            <div className="relative z-10 max-w-xs">
              <span
                className={`text-xs font-semibold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-100'
                }`}
              >
                Special Offers
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 leading-tight">
                Up to 30% Off
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 ${
                  isDarkMode ? 'text-slate-300' : 'text-blue-50'
                }`}
              >
                on International Flights
              </p>

              <div className="flex items-center gap-3 mt-6 flex-wrap">
                <span
                  className={`border text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm ${
                    isDarkMode
                      ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                      : 'bg-white/20 border-white/30 text-white'
                  }`}
                >
                  Use Code: <strong className="text-white">FLY30</strong>
                </span>
                <button
                  className={`border text-xs font-semibold px-4 py-1.5 rounded-lg transition ${
                    isDarkMode
                      ? 'border-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-white text-blue-600 hover:bg-blue-50 border-white'
                  }`}
                >
                  Explore Deals ➔
                </button>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&auto=format&fit=crop"
              alt="Window view"
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-40 pointer-events-none"
            />
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {smallOffers.map((offer, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="h-24 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4
                    className={`text-xs font-semibold ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    {offer.title}
                  </h4>
                  <p className="text-xs font-bold text-blue-500 mt-0.5">
                    {offer.discount}
                  </p>
                  <div
                    className={`flex items-center justify-between mt-3 pt-2 border-t ${
                      isDarkMode ? 'border-slate-700' : 'border-slate-100'
                    }`}
                  >
                    <span
                      className={`text-[10px] ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Use Code:{' '}
                      <strong
                        className={
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }
                      >
                        {offer.code}
                      </strong>
                    </span>
                    <span
                      className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                        isDarkMode
                          ? 'bg-blue-900/50 text-blue-400'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      ➔
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}