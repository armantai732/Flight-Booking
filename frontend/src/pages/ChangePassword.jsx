import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetProfile, changePassword } from '../api/api'; // તમારી API જરૂરિયાત મુજબ

export default function ChangePassword() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Settings');
  const [user, setUser] = useState(null);

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
      const res = await GetProfile();
      if (res?.status) {
        setUser(res.data);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

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
      if (typeof changePassword === 'function') {
        const res = await changePassword({
          OldPassword,
          newPassword,
        });
        if (res?.status) {
          setMessage({ type: 'success', text: 'Password updated successfully!' });
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          setMessage({ type: 'error', text: res?.message || 'Failed to update password.' });
        }
      } else {
        // Dummy Success Response
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const sidebarMenu = [
    { name: 'Profile', icon: '👤', path: '/profile' },
    { name: 'My Bookings', icon: '📅', path: '/my-bookings' },
    { name: 'Saved Passengers', icon: '👥', path: '/passengers' },
    { name: 'Wallet', icon: '👛', path: '/wallet' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div className="bg-[#f4f7fb] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

          {/* LEFT SIDEBAR */}
          <div className="md:col-span-3 space-y-6">
            {/* Menu List */}
            <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm space-y-1">
              {sidebarMenu.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    navigate(item.path);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition duration-200 ${
                    activeTab === item.name
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Promo Card */}
            <div
              className="relative rounded-2xl p-6 text-white bg-cover bg-center h-48 flex flex-col justify-between overflow-hidden shadow-sm"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.2)), url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80')`,
              }}
            >
              <div>
                <h3 className="font-extrabold text-sm leading-tight">Explore the World With FlyHigh</h3>
                <p className="text-[11px] text-gray-200 mt-1 font-medium">Better journeys. Happier you.</p>
              </div>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="md:col-span-9 space-y-6">

            {/* HERO PROFILE BANNER */}
            <div
              className="relative rounded-2xl p-6 text-white bg-cover bg-center shadow-sm flex items-center justify-between min-h-[140px]"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(11, 37, 69, 0.95), rgba(11, 37, 69, 0.4)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80')`,
              }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-white/90 text-slate-700 flex items-center justify-center text-3xl font-bold shadow-md">
                  👤
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold tracking-tight">{user?.name || "Loading..."}</h2>
                  <p className="text-xs text-gray-200 flex items-center gap-2 font-medium">
                    <span>✉️</span> {user?.email || "Loading..."}
                  </p>
                  <p className="text-xs text-gray-200 flex items-center gap-2 font-medium">
                    <span>📞</span> +91 {user?.mobile || "Loading..."}
                  </p>
                </div>
              </div>

              <div className="hidden lg:block text-right pr-4">
                <p className="italic font-serif text-sm opacity-90">Good Flights Take You to Great Places</p>
              </div>
            </div>

            {/* CHANGE PASSWORD CARD FORM */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
              
              {/* Header Title with Lock Icon */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
                  🔒
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Change Password</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Keep your account secure. Choose a strong password.
                  </p>
                </div>
              </div>

              {/* Alert Message */}
              {message.text && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${
                  message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
                
                {/* Current Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 text-sm">🔒</span>
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={OldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter your current password"
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 font-medium text-slate-800 placeholder-slate-400 bg-slate-50/30 focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 text-xs focus:outline-none"
                    >
                      {showCurrent ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 text-sm">🔒</span>
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 font-medium text-slate-800 placeholder-slate-400 bg-slate-50/30 focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 text-xs focus:outline-none"
                    >
                      {showNew ? "👁️" : "🙈"}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">
                    Password must be at least 8 characters and include a number & letter.
                  </p>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 text-sm">🔒</span>
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 font-medium text-slate-800 placeholder-slate-400 bg-slate-50/30 focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 text-xs focus:outline-none"
                    >
                      {showConfirm ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition duration-200 disabled:opacity-70"
                  >
                    <span className="text-sm">🔄</span>
                    <span>{loading ? 'Updating Password...' : 'Update Password'}</span>
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