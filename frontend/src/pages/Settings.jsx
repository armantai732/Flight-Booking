import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';

export default function Settings() {
  const navigate = useNavigate();
  const [selectedSetting, setSelectedSetting] = useState('Personal Details');

  // 🔹 Read theme from localStorage on initial render
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('appTheme') === 'dark';
  });

  // 🔹 Listen to real-time theme changes
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

  const settingsOptions = [
    {
      id: 'personal',
      title: 'Personal Details',
      description: 'Update your personal information',
      icon: '👤',
      bgColor: isDarkMode ? 'bg-blue-950/60' : 'bg-blue-50',
      iconColor: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      path: '/settings/personal-details',
    },
    {
      id: 'password',
      title: 'Change Password',
      description: 'Keep your account secure',
      icon: '🔒',
      bgColor: isDarkMode ? 'bg-purple-950/60' : 'bg-purple-50',
      iconColor: isDarkMode ? 'text-purple-400' : 'text-purple-600',
      path: '/settings/change-password',
    },
    {
      id: 'theme',
      title: 'Theme',
      description: 'Choose your preferred theme',
      icon: '🎨',
      bgColor: isDarkMode ? 'bg-amber-950/60' : 'bg-amber-50',
      iconColor: isDarkMode ? 'text-amber-400' : 'text-amber-600',
      path: '/settings/theme',
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Manage your privacy settings',
      icon: '🛡️',
      bgColor: isDarkMode ? 'bg-rose-950/60' : 'bg-rose-50',
      iconColor: isDarkMode ? 'text-rose-400' : 'text-rose-600',
    },
  ];

  const handleItemClick = (item) => {
    setSelectedSetting(item.title);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        isDarkMode
          ? 'bg-slate-900 text-slate-100 dark'
          : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-3">
            <UserSidebar />
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="lg:col-span-9 space-y-6">

            {/* HEADER */}
            <div
              className={`p-6 rounded-2xl border shadow-sm flex items-center gap-4 transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700/80'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl font-black shadow-sm shrink-0 ${
                  isDarkMode
                    ? 'bg-blue-950 text-blue-400 border-blue-800/50'
                    : 'bg-blue-50 text-blue-600 border-blue-200'
                }`}
              >
                ⚙️
              </div>
              <div>
                <h1
                  className={`text-xl font-black tracking-tight ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  Settings
                </h1>
                <p
                  className={`text-xs font-semibold mt-0.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Manage your account settings and preferences
                </p>
              </div>
            </div>

            {/* SETTINGS OPTIONS LIST */}
            <div className="space-y-3.5">
              {settingsOptions.map((item) => {
                const isSelected = selectedSetting === item.title;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between shadow-sm hover:shadow-md ${
                      isDarkMode
                        ? isSelected
                          ? 'bg-slate-800/90 border-blue-500 ring-2 ring-blue-500/20'
                          : 'bg-slate-800 border-slate-700/80 hover:border-slate-600'
                        : isSelected
                        ? 'bg-white border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-xl ${item.bgColor} ${item.iconColor} border flex items-center justify-center text-lg shrink-0 ${
                          isDarkMode ? 'border-slate-700/50' : 'border-slate-200'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3
                          className={`font-extrabold text-sm ${
                            isDarkMode ? 'text-slate-100' : 'text-slate-800'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`text-xs font-medium mt-0.5 ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-lg font-bold transition ${
                        isSelected
                          ? 'text-blue-500 translate-x-1'
                          : isDarkMode
                          ? 'text-slate-500'
                          : 'text-slate-400'
                      }`}
                    >
                      ›
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}