import React, { useEffect, useState } from 'react';

export default function WhyChooseUs() {
  const features = [
    { title: 'Best Prices', description: 'Get the lowest fares with no hidden charges.', icon: (<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>) },
    { title: 'Wide Selection', description: 'Choose from 1000+ airlines and destinations.', icon: (<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>) },
    { title: 'Safe & Secure', description: 'Your data and payments are always protected.', icon: (<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>) },
    { title: '24/7 Support', description: "We're here to help you anytime, anywhere.", icon: (<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a5 5 0 010-7.072m0 0l2.829 2.829m-4.243-2.829L3 3m0 0l2.829 2.829" /></svg>) },
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
    <section
      className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDarkMode
          ? 'bg-slate-900 text-slate-100 dark'
          : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2
            className={`text-xl sm:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Why Choose Us?
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            We make your flight booking experience simple and secure
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl p-5 border shadow-sm flex items-center gap-4 transition duration-200 ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
                {feature.icon}
              </div>
              <div>
                <h3
                  className={`font-bold text-sm mb-1 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}