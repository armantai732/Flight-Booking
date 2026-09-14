import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed successfully with: ${email}`);
      setEmail('');
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div 
        className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative bg-cover bg-center py-8 px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 60, 115, 0.85), rgba(40, 100, 175, 0.7)), url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1920&auto=format&fit=crop')`
        }}
      >
        {/* Left Side: Mail Icon & Text */}
        <div className="flex items-center gap-4 text-white z-10 w-full md:w-auto">
          {/* White Circle Mail Icon */}
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-wide">
              Get the Best Flight Deals
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
              Subscribe to our newsletter and never miss out on exclusive offers.
            </p>
          </div>
        </div>

        {/* Right Side: Email Input Box */}
        <form onSubmit={handleSubmit} className="z-10 w-full md:w-auto flex-1 max-w-md">
          <div className="bg-white p-1.5 rounded-xl flex items-center shadow-md">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              required
              className="w-full px-4 text-xs sm:text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-lg transition duration-200 shrink-0 shadow-sm"
            >
              Subscribe
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}