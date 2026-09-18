import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';

export default function ThemeSettings() {
  const navigate = useNavigate();

  // 🔹 Read theme state from localStorage on initial render
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('appTheme');
    return savedTheme === 'dark';
  });

  // 🔹 Update DOM class, localStorage & dispatch custom event when isDarkMode state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('appTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('appTheme', 'light');
    }

    // Dispatch custom event to notify other components instantly
    window.dispatchEvent(new Event('themeChange'));
  }, [isDarkMode]);

  // 🔹 Synchronize real-time theme changes if changed from another component/header
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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="bg-[#f4f7fb] dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-3">
            <UserSidebar />
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* HEADER WITH BACK BUTTON */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center gap-4 transition-colors">
              <button
                onClick={() => navigate('/settings')}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center text-sm font-bold border border-slate-200 dark:border-slate-600 transition shrink-0"
                title="Back to Settings"
              >
                ←
              </button>
              <div>
                <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Theme Settings
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                  Customize the appearance of your application
                </p>
              </div>
            </div>

            {/* TOGGLE CONTAINER */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6 transition-colors">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 flex items-center justify-center text-xl shrink-0">
                    {isDarkMode ? '🌙' : '☀️'}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {isDarkMode
                        ? 'Switch to light mode for bright display'
                        : 'Switch to dark mode for reduced eye strain'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isDarkMode ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isDarkMode ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}