import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetProfile, UpdateProfile } from '../api/api';
import UserSidebar from '../components/UserSidebar';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

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

  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    date: '',
    gender: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await GetProfile();
      if (response?.status && response?.data) {
        setUser(response.data);
        setEditFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          mobile: response.data.mobile || '',
          date: response.data.date || '',
          gender: response.data.gender || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      const res = await UpdateProfile(editFormData);
      if (res?.status) {
        setUser({ ...user, ...editFormData });
        setIsEditOpen(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(res?.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile.');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen font-sans relative transition-colors duration-200 ${
        isDarkMode
          ? 'bg-slate-900 text-slate-100 dark'
          : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-3">
            <UserSidebar />
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* HERO USER CARD */}
            <div
              className={`relative rounded-2xl overflow-hidden shadow-lg border p-6 md:p-8 flex items-center justify-between transition-colors ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-5 z-10">
                <div
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-extrabold text-2xl shadow-md ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-slate-100 border-slate-300 text-slate-600'
                  }`}
                >
                  👤
                </div>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight">
                    {loading ? 'Loading...' : user?.name || 'User Name'}
                  </h2>
                  <p
                    className={`text-xs font-medium mt-0.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {loading ? '...' : user?.email || 'N/A'}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {loading ? '...' : user?.mobile ? `${user.mobile}` : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 z-10">
                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">
                  Account Status
                </p>
                <p className="text-sm font-extrabold text-emerald-500">
                  Verified Member ✓
                </p>
                <button
                  onClick={() => setIsEditOpen(true)}
                  className={`mt-1 text-xs px-3 py-1 rounded-lg border transition ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  ✏️ Edit Profile
                </button>
              </div>

            </div>

            {/* QUICK ACTIONS & HUB */}
            <div
              className={`p-6 rounded-2xl border shadow-sm space-y-4 transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700/80'
                  : 'bg-white border-slate-200'
              }`}
            >
              <h3
                className={`font-extrabold text-sm ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-800'
                }`}
              >
                Flight Services & Shortcuts
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  onClick={() => navigate('/my-bookings')}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-center space-y-2 group ${
                    isDarkMode
                      ? 'bg-blue-950/40 hover:bg-blue-900/50 border-blue-800/40'
                      : 'bg-blue-50/60 hover:bg-blue-100/60 border-blue-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold mx-auto group-hover:scale-110 transition">
                    ✈️
                  </div>
                  <p
                    className={`font-extrabold text-xs ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    My Flights
                  </p>
                  <p
                    className={`text-[10px] font-medium ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    View active tickets
                  </p>
                </div>

                <div 
                  onClick={() => navigate('/wallet')}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-center space-y-2 group ${
                    isDarkMode
                      ? 'bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-800/40'
                      : 'bg-emerald-50/60 hover:bg-emerald-100/60 border-emerald-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold mx-auto group-hover:scale-110 transition">
                    💳
                  </div>
                  <p
                    className={`font-extrabold text-xs ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    Refunds & Wallet
                  </p>
                  <p
                    className={`text-[10px] font-medium ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Check balance
                  </p>
                </div>

                <div 
                  onClick={() => navigate('/web-checkin')}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-center space-y-2 group ${
                    isDarkMode
                      ? 'bg-amber-950/40 hover:bg-amber-900/50 border-amber-800/40'
                      : 'bg-amber-50/60 hover:bg-amber-100/60 border-amber-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg font-bold mx-auto group-hover:scale-110 transition">
                    🎫
                  </div>
                  <p
                    className={`font-extrabold text-xs ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    Web Check-in
                  </p>
                  <p
                    className={`text-[10px] font-medium ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Get boarding pass
                  </p>
                </div>

                <div 
                  onClick={() => navigate('/settings')}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-center space-y-2 group ${
                    isDarkMode
                      ? 'bg-purple-950/40 hover:bg-purple-900/50 border-purple-800/40'
                      : 'bg-purple-50/60 hover:bg-purple-100/60 border-purple-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg font-bold mx-auto group-hover:scale-110 transition">
                    ⚙️
                  </div>
                  <p
                    className={`font-extrabold text-xs ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    Preferences
                  </p>
                  <p
                    className={`text-[10px] font-medium ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    App & Security
                  </p>
                </div>
              </div>
            </div>

            {/* UPCOMING TRIP BANNER */}
            <div
              className={`p-5 rounded-2xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700/80'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 border ${
                    isDarkMode
                      ? 'bg-blue-950 text-blue-400 border-blue-800/50'
                      : 'bg-blue-50 text-blue-600 border-blue-200'
                  }`}
                >
                  🧳
                </div>
                <div>
                  <h4
                    className={`font-extrabold text-xs ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-800'
                    }`}
                  >
                    Your Upcoming Trip
                  </h4>
                  <p
                    className={`text-[11px] font-medium ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    No upcoming flights at the moment. Start booking your next adventure!
                  </p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/flights')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shrink-0 shadow-md"
              >
                🔍 Search Flights
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditOpen && (
        <div
          className={`fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 ${
            isDarkMode ? 'bg-slate-950/70' : 'bg-slate-900/40'
          }`}
        >
          <div
            className={`rounded-3xl max-w-md w-full p-6 shadow-2xl border space-y-4 max-h-[90vh] overflow-y-auto ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
          >
            <div
              className={`flex justify-between items-center border-b pb-3 ${
                isDarkMode ? 'border-slate-700' : 'border-slate-200'
              }`}
            >
              <h3
                className={`font-extrabold text-sm ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-800'
                }`}
              >
                Edit Profile
              </h3>
              <button 
                onClick={() => setIsEditOpen(false)}
                className={`w-7 h-7 rounded-full font-bold text-xs transition ${
                  isDarkMode
                    ? 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-3 text-xs">
              <div>
                <label
                  className={`block font-bold mb-1 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={editFormData.name} 
                  onChange={handleInputChange} 
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-blue-500 ${
                    isDarkMode
                      ? 'border-slate-700 bg-slate-900 text-slate-100'
                      : 'border-slate-300 bg-slate-50 text-slate-800'
                  }`}
                  required
                />
              </div>

              <div>
                <label
                  className={`block font-bold mb-1 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={editFormData.email} 
                  disabled
                  className={`w-full px-3 py-2 border rounded-xl cursor-not-allowed ${
                    isDarkMode
                      ? 'border-slate-800 bg-slate-950 text-slate-500'
                      : 'border-slate-200 bg-slate-100 text-slate-400'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block font-bold mb-1 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Mobile Number
                </label>
                <input 
                  type="text" 
                  name="mobile" 
                  value={editFormData.mobile} 
                  onChange={handleInputChange} 
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-blue-500 ${
                    isDarkMode
                      ? 'border-slate-700 bg-slate-900 text-slate-100'
                      : 'border-slate-300 bg-slate-50 text-slate-800'
                  }`}
                  required
                />
              </div>

              {/* Date of Birth Field */}
              <div>
                <label
                  className={`block font-bold mb-1 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Date of Birth
                </label>
                <input 
                  type="date" 
                  name="date" 
                  value={editFormData.date} 
                  onChange={handleInputChange} 
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-blue-500 ${
                    isDarkMode
                      ? 'border-slate-700 bg-slate-900 text-slate-100'
                      : 'border-slate-300 bg-slate-50 text-slate-800'
                  }`}
                />
              </div>

              {/* Gender Selection Field */}
              <div>
                <label
                  className={`block font-bold mb-1 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Gender
                </label>
                <select
                  name="gender"
                  value={editFormData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-blue-500 ${
                    isDarkMode
                      ? 'border-slate-700 bg-slate-900 text-slate-100'
                      : 'border-slate-300 bg-slate-50 text-slate-800'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditOpen(false)}
                  className={`w-1/2 font-bold py-2 rounded-xl transition ${
                    isDarkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={updateLoading}
                  className="w-1/2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl shadow-md transition"
                >
                  {updateLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}