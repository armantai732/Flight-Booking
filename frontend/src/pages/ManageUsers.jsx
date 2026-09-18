import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUser } from '../api/api'; // Tor API function file directory hisabe path adjust korbi
import { toast } from 'react-toastify';
import AdminSidebar from './AdminSidebar';

export default function ManageUsers() {
  const navigate = useNavigate();

  // State initialization
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Modal State for Edit
  const [editingUser, setEditingUser] = useState(null);

  // Database tekhe user-oloder fetch korar hook
  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const res = await GetUser();
      // Database tekhe 'data' asle set korba, res format check kore 'data.users' o hote pare
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else if (Array.isArray(res)) {
        setUsers(res);
      } else {
        setUsers([]);
      }
    } catch (error) {
      toast.error('Failed to fetch users from database');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Metric Stats Calculation
  const totalUsersCount = users.length;
  const activeUsersCount = users.filter((u) => u.role === 'user').length;
  const adminCount = users.filter((u) => u.role === 'admin').length;

  // Reset Filters Function
  const handleReset = () => {
    setSearch('');
    setSelectedRole('All Roles');
    setCurrentPage(1);
  };

  // Filter Logic
  const filteredUsers = users.filter((user) => {
    const nameStr = String(user.name || '').toLowerCase();
    const emailStr = String(user.email || '').toLowerCase();
    const mobileStr = String(user.mobile || '').toLowerCase();
    const searchText = search.toLowerCase();

    const matchesSearch =
      nameStr.includes(searchText) ||
      emailStr.includes(searchText) ||
      mobileStr.includes(searchText);

    const matchesRole =
      selectedRole === 'All Roles' || user.role === selectedRole;



    return matchesSearch && matchesRole;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);


  return (
    <div className="flex min-h-screen bg-[#f7f9fc] font-sans text-slate-800">
      {/* SIDEBAR WRAPPER */}
      <aside className="w-64 shrink-0">
        <AdminSidebar />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* 1. TOP HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              👤
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Users</h1>
              <p className="text-xs text-slate-500 font-medium">
                Manage and view all registered users
              </p>
            </div>
          </div>

          {/* <button
            onClick={() => navigate('/admin/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 self-start sm:self-auto"
          >
            <span>+ Add User</span>
          </button> */}
        </div>

        {/* 2. STATS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
              👥
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Users</p>
              <h3 className="text-xl font-extrabold text-slate-900">{totalUsersCount}</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
              👤
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Active Users</p>
              <h3 className="text-xl font-extrabold text-slate-900">{activeUsersCount}</h3>
            </div>
          </div>


          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
              🛡️
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Admins</p>
              <h3 className="text-xl font-extrabold text-slate-900">{adminCount}</h3>
            </div>
          </div>
        </div>

        {/* 3. FILTER & SEARCH BAR */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
            <div className="w-full md:w-1/2 relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name, email or mobile..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium placeholder-slate-400"
              />
            </div>

            <div className="w-full md:w-auto flex flex-wrap items-center gap-2 justify-end">
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-600 font-medium bg-white"
              >
                <option value="All Roles">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              

              <button
                onClick={handleReset}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-medium flex items-center gap-1"
              >
                ↻ Reset
              </button>
            </div>
          </div>
        </div>

        {/* 4. USERS TABLE CARD */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Mobile</th>
                  <th className="py-3.5 px-4">Gender</th>
                  <th className="py-3.5 px-4">Date of Birth</th>
                  <th className="py-3.5 px-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan="10" className="py-8 text-center text-slate-500 font-semibold">
                      Loading users from database...
                    </td>
                  </tr>
                ) : currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={user._id || index} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 text-slate-400 font-semibold">
                        {startIndex + index + 1}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                              {user.name?.charAt(0) || 'U'}
                            </div>
                          )}
                          <span className="font-bold text-slate-900">{user.name || 'N/A'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500">{user.email || 'N/A'}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-semibold">{user.mobile || 'N/A'}</td>
                      <td className="py-3.5 px-4 text-slate-500">{user.gender || 'N/A'}</td>
                      <td className="py-3.5 px-4 text-slate-500">{user.dob || 'N/A'}</td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            user.role === 'Admin'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {user.role || 'User'}
                        </span>
                      </td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="py-8 text-center text-slate-400 font-semibold">
                      No users found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 5. PAGINATION FOOTER */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
            <div>
              Showing {filteredUsers.length > 0 ? startIndex + 1 : 0} to{' '}
              {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg font-bold ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 6. EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-100 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-base font-bold text-slate-900">Edit User Details</h2>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={editingUser.name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Mobile</label>
                <input
                  type="text"
                  value={editingUser.mobile || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Role</label>
                  <select
                    value={editingUser.role || 'User'}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Status</label>
                  <select
                    value={editingUser.status || 'Active'}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}