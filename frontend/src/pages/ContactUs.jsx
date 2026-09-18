import React, { useState, useEffect } from 'react';
import { sendContactMessage } from '../api/api';
import { toast } from 'react-toastify';

export default function ContactUs() {
  // 🔹 Read initial theme from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('appTheme') === 'dark';
  });

  // 🔹 Listen for theme change events in real-time
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
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendContactMessage(formData);
      toast.success(res.message); // Success Message
      setFormData({ name: "", email: "", subject: "", message: "" }); // Form clear
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    }
  };

  const contactInfo = [
    {
      title: 'Email Us',
      value: 'support@flyhigh.com',
      subtext: 'We typically respond within 24 hours.',
      icon: '✉️',
    },
    {
      title: 'Call Us',
      value: '+91 98765 43210',
      subtext: 'Mon - Sun, 9:00 AM - 9:00 PM (IST)',
      icon: '📞',
    },
    {
      title: 'Our Office',
      value: '123 Travel Street, Green Park',
      subtext: 'New Delhi - 110016, India',
      icon: '📍',
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-900 text-slate-100 dark' : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >

      {/* TOP HERO SECTION WITH AIRPORT BACKGROUND */}
      <div
        className="relative bg-cover bg-center text-white py-20 px-6 md:px-16"
        style={{
          backgroundImage: isDarkMode
            ? `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.6)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')`
            : `linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.5)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="max-w-6xl mx-auto space-y-3">
          <p className="text-blue-400 font-semibold text-xs tracking-wider uppercase">Contact Us</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            We're Here to Help
          </h1>
          <p className="text-slate-200 text-xs md:text-sm max-w-lg leading-relaxed pt-1">
            Have a question, feedback or need assistance? <br />
            Our team is always ready to support you. <br />
            Get in touch with us — we'd love to hear from you.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className="max-w-6xl mx-auto py-16 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* LEFT COLUMN: CONTACT INFO & SOCIAL LINKS */}
          <div className="md:col-span-5 space-y-8">

            {/* Info Cards List */}
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 border shadow-sm ${
                      isDarkMode
                        ? 'bg-blue-950/60 text-blue-400 border-blue-800/50'
                        : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}
                  >
                    {info.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className={`font-extrabold text-xs ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {info.title}
                    </h4>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{info.value}</p>
                    <p className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {info.subtext}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons Section */}
            <div className={`space-y-3 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <h4 className={`font-extrabold text-xs ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Follow Us
              </h4>
              <div className="flex items-center gap-2.5">
                {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((platform, idx) => (
                  <button
                    key={idx}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-200 ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-600 shadow-sm'
                    }`}
                  >
                    {platform === 'facebook' && 'f'}
                    {platform === 'instagram' && '📷'}
                    {platform === 'twitter' && '𝕏'}
                    {platform === 'linkedin' && 'in'}
                    {platform === 'youtube' && '▶'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SEND MESSAGE FORM CARD */}
          <div
            className={`md:col-span-7 rounded-3xl p-8 border shadow-lg space-y-6 transition-colors ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700/80'
                : 'bg-white border-slate-200'
            }`}
          >
            <h2 className={`font-extrabold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className={`block text-[11px] font-semibold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-xs rounded-xl border focus:outline-none focus:border-blue-500 font-medium transition duration-200 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Email Address */}
              <div>
                <label className={`block text-[11px] font-semibold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-xs rounded-xl border focus:outline-none focus:border-blue-500 font-medium transition duration-200 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Subject Dropdown */}
              <div>
                <label className={`block text-[11px] font-semibold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-xs rounded-xl border focus:outline-none focus:border-blue-500 font-medium transition duration-200 cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-slate-100'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="" className={isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-400'}>
                    Select a subject
                  </option>
                  <option value="Booking Inquiry" className={isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>
                    Booking Inquiry
                  </option>
                  <option value="Cancellation & Refund" className={isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>
                    Cancellation & Refund
                  </option>
                  <option value="Technical Support" className={isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>
                    Technical Support
                  </option>
                  <option value="Feedback" className={isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>
                    Feedback
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className={`block text-[11px] font-semibold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-xs rounded-xl border focus:outline-none focus:border-blue-500 font-medium transition duration-200 resize-none ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                  }`}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3.5 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 mt-2"
              >
                <span>🚀</span>
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}