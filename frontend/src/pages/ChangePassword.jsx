import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';
import { GetProfile, changePassword } from '../api/api';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🔹 Read theme from localStorage on initial render
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('appTheme') === 'dark';
  });

  // 🔹 Listen to real-time theme changes dispatched from ThemeSettings
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

  // Form Field States
  const [OldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password Visibility States
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await GetProfile();
        if (res?.status) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Fetch Profile Error:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!OldPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'All fields are required!' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirm password do not match!' });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    setLoading(true);

    try {
      const res = await changePassword({
        oldPassword: OldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      if (res?.success || res?.status) {
        setMessage({
          type: 'success',
          text: res.message || 'Password updated successfully!',
        });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({
          type: 'error',
          text: res?.message || 'Failed to update password.',
        });
      }
    } catch (err) {
      console.error("Change Password Error:", err);
      setMessage({
        type: 'error',
        text: err.message || 'Something went wrong. Please try again.',
      });
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

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
                  Change Password
                </h1>
                <p
                  className={`text-xs font-semibold mt-0.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Keep your account secure with a strong password
                </p>
              </div>
            </div>

            {/* HERO PROFILE BANNER */}
            <div
              className={`relative rounded-2xl p-6 text-white bg-cover bg-center shadow-sm flex items-center justify-between min-h-[120px] border ${
                isDarkMode ? 'border-slate-800' : 'border-slate-200'
              }`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.6)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80')`,
              }}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-slate-800/80 border-2 border-slate-700 text-slate-200 flex items-center justify-center text-2xl font-bold shadow-md">
                  👤
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-lg font-extrabold tracking-tight">
                    {user?.name || "Loading..."}
                  </h2>
                  <p className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                    ✉️ {user?.email || "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            {/* FORM CARD */}
            <div
              className={`rounded-2xl p-6 md:p-8 border shadow-sm space-y-6 transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700/80'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Alert Message */}
              {message.text && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-bold transition-all ${
                    message.type === 'success'
                      ? isDarkMode
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : isDarkMode
                      ? 'bg-red-950/60 text-red-400 border border-red-800/60'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">

                {/* Current Password */}
                <div>
                  <label
                    className={`block text-xs font-bold mb-1.5 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Current Password
                  </label>
                  <div className="relative flex items-center">
                    <span
                      className={`absolute left-3.5 text-sm ${
                        isDarkMode ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      🔒
                    </span>
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={OldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter your current password"
                      required
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 font-semibold transition ${
                        isDarkMode
                          ? 'border-slate-700 text-slate-100 placeholder-slate-500 bg-slate-900'
                          : 'border-slate-200 text-slate-800 placeholder-slate-400 bg-slate-50'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className={`absolute right-3.5 text-xs focus:outline-none ${
                        isDarkMode
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {showCurrent ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label
                    className={`block text-xs font-bold mb-1.5 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <span
                      className={`absolute left-3.5 text-sm ${
                        isDarkMode ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      🔒
                    </span>
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      required
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 font-semibold transition ${
                        isDarkMode
                          ? 'border-slate-700 text-slate-100 placeholder-slate-500 bg-slate-900'
                          : 'border-slate-200 text-slate-800 placeholder-slate-400 bg-slate-50'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className={`absolute right-3.5 text-xs focus:outline-none ${
                        isDarkMode
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {showNew ? "👁️" : "🙈"}
                    </button>
                  </div>
                  <p
                    className={`text-[11px] font-medium mt-1 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Password must be at least 8 characters long.
                  </p>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label
                    className={`block text-xs font-bold mb-1.5 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Confirm New Password
                  </label>
                  <div className="relative flex items-center">
                    <span
                      className={`absolute left-3.5 text-sm ${
                        isDarkMode ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      🔒
                    </span>
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      required
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 font-semibold transition ${
                        isDarkMode
                          ? 'border-slate-700 text-slate-100 placeholder-slate-500 bg-slate-900'
                          : 'border-slate-200 text-slate-800 placeholder-slate-400 bg-slate-50'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className={`absolute right-3.5 text-xs focus:outline-none ${
                        isDarkMode
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {showConfirm ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-md disabled:opacity-50"
                  >
                    {loading ? 'Updating Password...' : 'Update Password'}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/settings')}
                    className={`font-bold text-xs px-5 py-2.5 rounded-xl transition border ${
                      isDarkMode
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}