import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetProfile, UpdateProfile } from '../api/api'; // UpdateProfile API જરૂરિયાત મુજબ ઉમેરો

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Profile');
  const [user, setUser] = useState(null);

  // Modal Control & Edit Form State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    mobile: '',
    date: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await GetProfile();
    if (res?.status) {
      setUser(res.data);
      setEditData({
        name: res.data?.name || '',
        email: res.data?.email || '',
        mobile: res.data?.mobile || '',
        date: res.data?.date || '',
        gender: res.data?.gender || '',
      });
    }
  };

  // Open Edit Modal with current data
  const handleOpenEdit = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      date: user?.date || '',
      gender: user?.gender || '',
    });
    setIsEditOpen(true);
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Call Update Profile API if available
    try {
      if (typeof UpdateProfile === 'function') {
        const res = await UpdateProfile(editData);
        if (res?.status) {
          alert('Profile updated successfully!');
          fetchProfile();
        }
      } else {
        // Fallback UI update
        setUser({ ...user, ...editData });
        alert('Profile details updated locally!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
      setIsEditOpen(false);
    }
  };

  const sidebarMenu = [
    { name: 'Profile', icon: '👤', path: '/profile' },
    { name: 'My Bookings', icon: '📅', path: '/my-bookings' },
    { name: 'Saved Passengers', icon: '👥', path: '/passengers' },
    { name: 'Wallet', icon: '👛', path: '/wallet' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  const quickActions = [
    { title: 'Edit Profile', desc: 'Update your personal details', icon: '✏️', action: handleOpenEdit },
    { title: 'Change Password', desc: 'Keep your account secure', icon: '🔒', action: () => navigate("/change-password") },
    { title: 'Manage Saved Passengers', desc: 'Add / Edit passenger details', icon: '👥', action: () => navigate('/passengers') },
    { title: 'Payment Methods', desc: 'Manage your cards & wallets', icon: '💳', action: () => navigate('/wallet') },
  ];

  return (
    <div className="bg-[#f4f7fb] min-h-screen font-sans relative">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

          {/* LEFT SIDEBAR */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm space-y-1">
              {sidebarMenu.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    if (item.path !== '/profile') navigate(item.path);
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

            {/* MIDDLE CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Personal Information (7 Cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <span>👤</span>
                    <h3>Personal Information</h3>
                  </div>
                  <button 
                    onClick={handleOpenEdit}
                    className="text-xs text-blue-600 font-bold border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-50 transition"
                  >
                    ✏️ Edit
                  </button>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <p className="text-slate-400 font-medium text-[11px]">Full Name</p>
                    <p className="font-bold text-slate-800 mt-0.5">{user?.name || "Loading..."}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium text-[11px]">Email Address</p>
                    <p className="font-bold text-slate-800 mt-0.5">{user?.email || "Loading..."}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium text-[11px]">Mobile Number</p>
                    <p className="font-bold text-slate-800 mt-0.5">+91 {user?.mobile || "Loading..."}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium text-[11px]">Date of Birth</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-800 mt-0.5">{user?.date || "--"}</p>
                      {user?.date ? (
                        <span className="bg-emerald-100 text-emerald-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full">Verified</span>
                      ) : (
                        <span className="bg-red-100 text-red-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full">Not Verified</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium text-[11px]">Gender</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-800 mt-0.5">{user?.gender || "--"}</p>
                      {user?.gender ? (
                        <span className="bg-emerald-100 text-emerald-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full">Verified</span>
                      ) : (
                        <span className="bg-red-100 text-red-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full">Not Verified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions (5 Cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm pb-2 border-b border-slate-100">
                  <span>⚡</span>
                  <h3>Quick Actions</h3>
                </div>

                <div className="space-y-2">
                  {quickActions.map((action, idx) => (
                    <div
                      key={idx}
                      onClick={action.action}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-blue-600 bg-blue-50 p-2 rounded-lg text-xs">{action.icon}</span>
                        <div>
                          <h4 className="font-bold text-xs text-slate-800">{action.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{action.desc}</p>
                        </div>
                      </div>
                      <span className="text-slate-400 font-bold text-xs">&gt;</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* BOTTOM CARD */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg shrink-0">
                  💼
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900">Your Upcoming Trip</h4>
                  <p className="text-[11px] text-slate-400 font-medium">No upcoming flights at the moment. Start booking your next adventure!</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/flights')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition whitespace-nowrap"
              >
                🔍 Search Flights
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* EDIT PROFILE MODAL POPUP */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">Edit Profile Details</h3>
              <button 
                onClick={() => setIsEditOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 font-bold text-xs hover:bg-slate-200 transition flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={editData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={editData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={editData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md transition"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}