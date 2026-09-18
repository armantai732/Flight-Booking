import React, { useState, useEffect } from 'react';

export default function AboutUs() {
  // 🔹 Read initial theme from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('appTheme') === 'dark';
  });

  // 🔹 Listen for theme change events in real-time
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

  const features = [
    {
      title: 'Best Price Guarantee',
      desc: 'Get the lowest fares, always.',
      icon: '✈️',
    },
    {
      title: 'Secure Booking',
      desc: 'Your data and payments are safe with us.',
      icon: '🛡️',
    },
    {
      title: '24/7 Support',
      desc: "We're always here to help",
      icon: '🎧',
    },
    {
      title: 'Global Reach',
      desc: 'Fly to 100+ destinations worldwide.',
      icon: '🌐',
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-900 text-slate-100 dark' : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >
      
      {/* TOP HERO SECTION (BACKGROUND WITH AIRPLANE) */}
      <div 
        className="relative bg-cover bg-center text-white py-24 px-6 md:px-16"
        style={{
          backgroundImage: isDarkMode
            ? `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.6)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')`
            : `linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.5)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="max-w-6xl mx-auto space-y-4">
          <p className="text-blue-400 font-medium text-xs tracking-wider uppercase">About Us</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Your Journey <br /> Our Priority
          </h1>
          <p className="text-slate-200 text-xs md:text-sm max-w-lg leading-relaxed pt-2">
            At FlyHigh, we believe that travel is not just about reaching a destination, it's about creating memories. We make flight booking simple, fast and reliable, so you can focus on what truly matters — your journey.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className="max-w-6xl mx-auto py-16 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: WHO WE ARE & FEATURES */}
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-3">
              <h2 className={`text-2xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Who We Are
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                FlyHigh is a modern flight booking platform designed to make your travel experience smooth and stress-free. We bring you the best flight options, competitive prices, and a seamless booking process — all in one place.
              </p>
            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl flex items-center gap-3.5 border shadow-md transition-colors ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700/80 text-slate-100'
                      : 'bg-white border-slate-200/80 text-slate-800'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border ${
                      isDarkMode
                        ? 'bg-blue-900/40 text-blue-400 border-blue-800/50'
                        : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold text-xs ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PASSENGER IMAGE & BOTTOM CARD */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Passenger Image Window View */}
            <div
              className={`overflow-hidden rounded-2xl shadow-md border ${
                isDarkMode ? 'border-slate-700' : 'border-slate-200'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                alt="Traveler looking at airport runway"
                className="w-full h-56 object-cover opacity-90 hover:opacity-100 transition duration-300"
              />
            </div>

            {/* Bottom Info Card */}
            <div
              className={`p-6 rounded-2xl border space-y-2 shadow-md transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                <span>✈</span>
                <h3>More Than Just Flights</h3>
              </div>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                We're not just a booking platform, we're your travel partner for every adventure, big or small.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}