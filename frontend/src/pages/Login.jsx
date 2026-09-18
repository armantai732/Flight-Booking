import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { LoginData } from '../api/api';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  // 🔹 LocalStorage માંથી 'appTheme' વાંચવું (Default: 'dark')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('appTheme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // 🔹 Real-time Theme changes માટે Event Listener
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('appTheme');
      setIsDarkMode(currentTheme === 'dark');
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await LoginData(form);

      if (res?.status) {
        toast.success(res.message);

        localStorage.setItem("token", res.data);
        localStorage.setItem("role", res.role);

        if (res.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }

        setForm({
          email: "",
          password: ""
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#f4f7fb] text-slate-800'
    }`}>
      <div className={`rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-800 border-slate-700/80' : 'bg-white border-gray-100'
      }`}>

        {/* Left Side Banner */}
        <div
          className="relative hidden md:flex flex-col justify-end p-10 text-white bg-cover bg-center min-h-[520px]"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(12, 35, 64, 0.9), rgba(12, 35, 64, 0.2)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop')`
          }}
        >
          <div className="z-10">
            <h2 className="text-3xl font-extrabold tracking-wide leading-tight">
              Fly More<br />Explore More
            </h2>
            <p className="text-[11px] text-gray-300 mt-3 leading-relaxed max-w-xs">
              Login to access your bookings, manage your trips and get exclusive deals.
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">

          <div className="mb-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0c2340]'}`}>
              Welcome Back
            </h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>
              Login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email or Mobile */}
            <div>
              <label className={`block text-[11px] font-semibold mb-1 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Email or Mobile Number
              </label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email or mobile"
                required
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-blue-500 transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                    : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-300'
                }`}
              />
            </div>

            {/* Password */}
            <div>
              <label className={`block text-[11px] font-semibold mb-1 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-blue-500 transition pr-10 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div className="text-right mt-1.5">
                <a href="#" className={`text-[10px] font-bold hover:underline ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs py-3 rounded-xl shadow-md transition duration-200 mt-2"
            >
              Login
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}></div>
            </div>
            <span className={`relative px-3 text-[10px] font-bold tracking-widest uppercase ${
              isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-gray-400'
            }`}>
              OR
            </span>
          </div>

          {/* Sign Up Link */}
          <p className={`text-center text-[11px] mt-6 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}>
            Don't have an account?{' '}
            <Link to="/signup" className={`font-bold hover:underline ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Sign Up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}