import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    alert('Thank you! Your message has been sent successfully.');
    setFormData({ fullName: '', email: '', subject: '', message: '' });
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
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      
      {/* TOP HERO SECTION WITH AIRPORT BACKGROUND */}
      <div 
        className="relative bg-cover bg-center text-white py-20 px-6 md:px-16"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(11, 37, 69, 0.95), rgba(11, 37, 69, 0.6)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="max-w-6xl mx-auto space-y-3">
          <p className="text-blue-300 font-semibold text-xs tracking-wider">Contact Us</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            We're Here to Help
          </h1>
          <p className="text-gray-200 text-xs md:text-sm max-w-lg leading-relaxed pt-1">
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
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0 border border-blue-100/50 shadow-sm">
                    {info.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-xs text-slate-900">{info.title}</h4>
                    <p className="text-xs font-semibold text-blue-600">{info.value}</p>
                    <p className="text-[11px] text-gray-400 font-medium">{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons Section */}
            <div className="space-y-3 pt-4 border-t border-gray-200/60">
              <h4 className="font-extrabold text-xs text-slate-900">Follow Us</h4>
              <div className="flex items-center gap-2.5">
                {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((platform, idx) => (
                  <button
                    key={idx}
                    className="w-9 h-9 rounded-full bg-[#0b2545] text-white flex items-center justify-center text-xs hover:bg-blue-600 transition duration-200"
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
          <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-extrabold text-base text-slate-900">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-slate-800 placeholder-gray-400 font-medium transition duration-200"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-slate-800 placeholder-gray-400 font-medium transition duration-200"
                />
              </div>

              {/* Subject Dropdown */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-slate-700 font-medium bg-white transition duration-200"
                >
                  <option value="">Select a subject</option>
                  <option value="Booking Inquiry">Booking Inquiry</option>
                  <option value="Cancellation & Refund">Cancellation & Refund</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-slate-800 placeholder-gray-400 font-medium transition duration-200 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs py-3.5 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 mt-2"
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