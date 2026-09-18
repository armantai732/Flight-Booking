import React, { useEffect, useState } from 'react';

export default function FeaturedFlights() {
  const flights = [
    { airline: 'IndiGo', code: '6E 215', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&auto=format&fit=crop', fromCode: 'DEL', fromCity: 'Delhi', departureTime: '08:10', toCode: 'BOM', toCity: 'Mumbai', arrivalTime: '10:35', duration: '2h 25m', type: 'Non Stop', price: '₹4,299' },
    { airline: 'Air India', code: 'AI 603', logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop', fromCode: 'DEL', fromCity: 'Delhi', departureTime: '14:20', toCode: 'JFK', toCity: 'New York', arrivalTime: '01:10', duration: '14h 50m', type: '1 Stop (AUH)', price: '₹52,999' },
    { airline: 'SpiceJet', code: 'SG 812', logo: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=100&auto=format&fit=crop', fromCode: 'BOM', fromCity: 'Mumbai', departureTime: '17:40', toCode: 'GOI', toCity: 'Goa', arrivalTime: '19:20', duration: '1h 40m', type: 'Non Stop', price: '₹5,499' },
    { airline: 'Vistara', code: 'UK 836', logo: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=100&auto=format&fit=crop', fromCode: 'DEL', fromCity: 'Delhi', departureTime: '22:15', toCode: 'BLR', toCity: 'Bengaluru', arrivalTime: '00:55', duration: '2h 40m', type: 'Non Stop', price: '₹6,299' },
  ];

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

  return (
    <div
      className={`py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDarkMode
          ? 'bg-slate-900 text-slate-100 dark'
          : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className={`text-xl sm:text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Featured Flights
            </h2>
            <p
              className={`text-xs sm:text-sm mt-0.5 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Top selling flights from India
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {flights.map((flight, index) => (
            <div
              key={index}
              className={`rounded-xl border p-4 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center overflow-hidden border shrink-0 ${
                    isDarkMode
                      ? 'bg-slate-700 border-slate-600'
                      : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <img
                    src={flight.logo}
                    alt={flight.airline}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3
                    className={`font-bold text-sm leading-tight ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {flight.airline}
                  </h3>
                  <p
                    className={`text-[11px] ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {flight.code}
                  </p>
                </div>
              </div>

              <div className="my-5 flex items-center justify-between relative">
                <div className="text-left">
                  <span
                    className={`font-bold text-xs block ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    {flight.fromCode}
                  </span>
                  <span
                    className={`text-[10px] block ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {flight.fromCity}
                  </span>
                  <span
                    className={`font-extrabold text-sm mt-1 block ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {flight.departureTime}
                  </span>
                </div>

                <div className="flex-1 px-3 text-center">
                  <span
                    className={`text-[10px] font-medium block ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {flight.duration}
                  </span>
                  <div className="relative flex items-center justify-center my-1">
                    <div
                      className={`w-full h-[1px] ${
                        isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                      }`}
                    ></div>
                    <span
                      className={`absolute text-xs ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-400'
                      }`}
                    >
                      ➔
                    </span>
                  </div>
                  <span
                    className={`text-[10px] block ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {flight.type}
                  </span>
                </div>

                <div className="text-right">
                  <span
                    className={`font-bold text-xs block ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    {flight.toCode}
                  </span>
                  <span
                    className={`text-[10px] block ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {flight.toCity}
                  </span>
                  <span
                    className={`font-extrabold text-sm mt-1 block ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {flight.arrivalTime}
                  </span>
                </div>
              </div>

              <div
                className={`flex items-center justify-between pt-3 border-t ${
                  isDarkMode ? 'border-slate-700' : 'border-slate-100'
                }`}
              >
                <div>
                  <span className="text-base font-extrabold text-blue-500 block">
                    {flight.price}
                  </span>
                  <span
                    className={`text-[10px] block ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    per person
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}