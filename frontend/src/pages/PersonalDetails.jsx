import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';
import { GetProfile } from '../api/api'; // Profile Get API function

export default function PersonalDetails() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    dob: '',
  });

  // Fetch User Profile
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await GetProfile();
      if (res?.status && res?.data) {
        setFormData({
          name: res.data.name || 'N/A',
          email: res.data.email || 'N/A',
          mobile: res.data.mobile || 'N/A',
          gender: res.data.gender || 'N/A',
          dob: res.data.dob ? res.data.dob.split('T')[0] : 'N/A',
        });
      }
    } catch (err) {
      console.error('Fetch Profile Error:', err);
    } finally {
      setLoading(false);
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
            
            {/* HEADER WITH BACK BUTTON */}
            <div
              className={`p-6 rounded-2xl border shadow-sm flex items-center gap-4 transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700/80'
                  : 'bg-white border-slate-200'
              }`}
            >
              <button
                onClick={() => navigate('/settings')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border transition shrink-0 ${
                  isDarkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Back to Settings"
              >
                ←
              </button>
              <div>
                <h1
                  className={`text-xl font-black tracking-tight ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  Personal Details
                </h1>
                <p
                  className={`text-xs font-semibold mt-0.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  View your personal profile information
                </p>
              </div>
            </div>

            {/* DETAILS DISPLAY CARD */}
            <div
              className={`p-6 md:p-8 rounded-2xl border shadow-sm transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700/80'
                  : 'bg-white border-slate-200'
              }`}
            >
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-7 h-7 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p
                    className={`text-xs font-semibold ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Loading your details...
                  </p>
                </div>
              ) : (
                <div className="space-y-5 max-w-lg">
                  
                  {/* Full Name */}
                  <div>
                    <label
                      className={`block text-xs font-bold mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Full Name
                    </label>
                    <div
                      className={`w-full px-4 py-2.5 text-xs font-bold border rounded-xl ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700/80 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {formData.name}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className={`block text-xs font-bold mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Email Address
                    </label>
                    <div
                      className={`w-full px-4 py-2.5 text-xs font-bold border rounded-xl ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700/80 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {formData.email}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label
                      className={`block text-xs font-bold mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Mobile Number
                    </label>
                    <div
                      className={`w-full px-4 py-2.5 text-xs font-bold border rounded-xl ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700/80 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {formData.mobile}
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      className={`block text-xs font-bold mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Gender
                    </label>
                    <div
                      className={`w-full px-4 py-2.5 text-xs font-bold border rounded-xl ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700/80 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {formData.gender}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label
                      className={`block text-xs font-bold mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Date of Birth
                    </label>
                    <div
                      className={`w-full px-4 py-2.5 text-xs font-bold border rounded-xl ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700/80 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {formData.dob}
                    </div>
                  </div>

                  {/* BACK BUTTON */}
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => navigate('/settings')}
                      className={`font-bold text-xs px-6 py-2.5 rounded-xl border transition ${
                        isDarkMode
                          ? 'bg-slate-700 hover:bg-slate-600 text-slate-100 border-slate-600'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      Back to Settings
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}