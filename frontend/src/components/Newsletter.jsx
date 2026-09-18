import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Newsletter() {
  const [email, setEmail] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success(`Subscribed successfully with: ${email}`);
      setEmail('');
    }
  };

  return (
    <section
      className={`py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDarkMode
          ? 'bg-slate-900 text-slate-100 dark'
          : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl overflow-hidden relative border py-8 px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all duration-200 ${
          isDarkMode ? 'border-slate-700' : 'border-slate-200'
        }`}
        style={{
          backgroundImage: isDarkMode
            ? `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.85)), url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1920&auto=format&fit=crop')`
            : `linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(241, 245, 249, 0.88)), url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1920&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center gap-4 z-10 w-full md:w-auto">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div>
            <h3
              className={`text-xl sm:text-2xl font-bold tracking-wide ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Get the Best Flight Deals
            </h3>
            <p
              className={`text-xs sm:text-sm mt-0.5 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Subscribe to our newsletter and never miss out on exclusive offers.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="z-10 w-full md:w-auto flex-1 max-w-md">
          <div
            className={`border p-1.5 rounded-xl flex items-center shadow-md transition duration-200 ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className={`w-full px-4 text-xs sm:text-sm outline-none bg-transparent ${
                isDarkMode
                  ? 'text-white placeholder-slate-400'
                  : 'text-slate-800 placeholder-slate-400'
              }`}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-lg transition duration-200 shrink-0 shadow-sm"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}