import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterData, SendOTP } from '../api/api';
import { toast } from 'react-toastify';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    otp: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);

  // 🔹 LocalStorage માંથી 'appTheme' મેળવવું (Default: 'dark')
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
    setError(null);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setInfoMsg(null);

    if (!form.name || !form.email || !form.mobile || !form.password) {
      setError('Please fill in all required fields first.');
      return;
    }

    try {
      setLoading(true);
      const res = await SendOTP({ mobile: form.mobile, email: form.email });

      if (res?.status) {
        setOtpSent(true);
        setInfoMsg(res.message || 'OTP sent successfully to your mobile number!');
      } else {
        setError(res?.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      console.error('Send OTP error:', err);
      setError(err.message || 'Something went wrong while sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfoMsg(null);

    if (!form.otp) {
      setError('Please enter the OTP received on your mobile.');
      return;
    }

    try {
      setLoading(true);
      const res = await RegisterData(form);

      if (res?.status) {
        toast.success(res.message || 'Registration successful!');
        navigate('/login');
      } else {
        setError(res?.message || 'Invalid OTP or registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#f4f7fb] text-slate-800'
    }`}>
      <div className={`rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-800 border-slate-700/80' : 'bg-white border-gray-100'
      }`}>

        {/* Left Side: Airplane Banner */}
        <div
          className="relative hidden md:flex flex-col justify-end p-10 text-white bg-cover bg-center min-h-[600px]"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(12, 35, 64, 0.9), rgba(12, 35, 64, 0.2)), url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1000&auto=format&fit=crop')`
          }}
        >
          <div className="z-10">
            <h2 className="text-3xl font-extrabold tracking-wide leading-tight">
              Join SkyFly
            </h2>
            <p className="text-[11px] text-gray-300 mt-3 leading-relaxed max-w-xs">
              Create your account and start booking flights today.
            </p>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">

          <div className="mb-5">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0c2340]'}`}>
              Create Account
            </h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>
              {otpSent ? 'Enter the OTP sent to your mobile' : 'Sign up to get started'}
            </p>
          </div>

          {infoMsg && (
            <div className={`mb-3 p-3 text-xs rounded-xl font-medium ${
              isDarkMode ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' : 'bg-emerald-50 text-emerald-700'
            }`}>
              {infoMsg}
            </div>
          )}

          {error && (
            <div className={`mb-3 p-3 text-xs rounded-xl font-medium ${
              isDarkMode ? 'bg-red-950/60 text-red-400 border border-red-800/50' : 'bg-red-50 text-red-600'
            }`}>
              {error}
            </div>
          )}

          <form onSubmit={otpSent ? handleSubmit : handleSendOTP} className="space-y-3.5">

            {/* Full Name */}
            <div>
              <label className={`block text-[11px] font-semibold mb-1 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={otpSent}
                placeholder="Enter your full name"
                required
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-blue-500 transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 disabled:bg-slate-800/50 disabled:text-slate-500'
                    : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-300 disabled:bg-gray-100'
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className={`block text-[11px] font-semibold mb-1 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={otpSent}
                placeholder="Enter your email"
                required
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-blue-500 transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 disabled:bg-slate-800/50 disabled:text-slate-500'
                    : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-300 disabled:bg-gray-100'
                }`}
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className={`block text-[11px] font-semibold mb-1 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                disabled={otpSent}
                placeholder="Enter 10-digit mobile number"
                required
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-blue-500 transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 disabled:bg-slate-800/50 disabled:text-slate-500'
                    : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-300 disabled:bg-gray-100'
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
                  disabled={otpSent}
                  placeholder="Create a password"
                  required
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-blue-500 transition pr-10 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 disabled:bg-slate-800/50 disabled:text-slate-500'
                      : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-300 disabled:bg-gray-100'
                  }`}
                />
                {!otpSent && (
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
                )}
              </div>
            </div>

            {/* OTP Input Field */}
            {otpSent && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`block text-[11px] font-bold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Enter OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className={`text-[10px] hover:underline font-semibold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    Change Details / Resend
                  </button>
                </div>
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  placeholder="Enter 6-digit OTP"
                  required
                  maxLength={6}
                  className={`w-full px-3.5 py-2.5 text-xs font-bold tracking-widest text-center rounded-xl border-2 focus:outline-none transition ${
                    isDarkMode
                      ? 'bg-slate-900 border-blue-500 text-white focus:border-blue-400 placeholder:text-slate-600'
                      : 'bg-white border-blue-500 text-gray-800 focus:border-blue-700 placeholder:text-gray-300'
                  }`}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold text-xs py-3 rounded-xl shadow-md transition duration-200 mt-2 ${
                loading
                  ? 'bg-blue-400/50 cursor-not-allowed'
                  : 'bg-[#1d6bf3] hover:bg-blue-700'
              }`}
            >
              {loading
                ? 'Please wait...'
                : otpSent
                  ? 'Verify OTP & Register'
                  : 'Send OTP'}
            </button>
          </form>

          {/* Footer Navigation Link */}
          <p className={`text-center text-[11px] mt-5 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}>
            Already have an account?{' '}
            <Link to="/login" className={`font-bold hover:underline ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}