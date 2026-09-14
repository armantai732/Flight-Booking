import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CITIES = [
  'Delhi (DEL)',
  'Mumbai (BOM)',
  'Bangalore (BLR)',
  'Chennai (MAA)',
  'Kolkata (CCU)',
  'Hyderabad (HYD)',
  'Pune (PNQ)',
  'Goa (GOI)',
  'Ahmedabad (AMD)',
  'Jaipur (JAI)',
];

export default function Hero() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('One Way');

  // Empty by default -> shows the "Select From/To/Date" placeholder,
  // and means "no filter" (all flights) if the user doesn't pick one.
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = () => {
    if (from && to && from === to) {
      alert('Origin and destination cannot be the same.');
      return;
    }

    navigate('/flights', {
      state: {
        from: from || null,
        to: to || null,
        departureDate: departureDate || null,
        returnDate: tripType === 'Round Trip' ? returnDate : null,
        tripType,
      },
    });
  };

  return (
    <div className="relative  bg-cover bg-center bg-no-repeat flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundImage: `linear-gradient(to right, rgba(2, 28, 68, 0.85), rgba(2, 28, 68, 0.3)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop')` }}>
      
      {/* Top Hero Text Section */}
      <div className="max-w-7xl mx-auto w-full pt-8">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-blue-300 uppercase">
          YOUR JOURNEY, OUR PRIORITY
        </span>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mt-2 leading-tight">
          Book Your <br />
          <span className="text-blue-400">Next Flight</span>
        </h1>
        
        <p className="text-gray-200 mt-4 text-sm sm:text-base max-w-lg">
          Explore the world with the best flight deals. <br />
          Fast. Easy. Reliable.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 text-xs sm:text-sm font-medium text-white">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Best Prices
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            ✈ Trusted Airlines
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            ✦ 24/7 Support
          </div>
        </div>
      </div>

      {/* Flight Search Widget Container */}
      <div className="max-w-7xl mx-auto w-full mt-12">
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-gray-800">
          
          {/* Trip Type Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-4 overflow-x-auto">
            {['One Way'].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2 whitespace-nowrap ${
                  tripType === type
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                ✈ {type}
              </button>
            ))}
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-end">
            
            {/* From */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">From</label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <span className="text-gray-400 mr-2">📍</span>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className={`w-full bg-transparent text-xs sm:text-sm font-semibold outline-none ${
                    from ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  <option value="" disabled hidden>
                    Select From
                  </option>
                  {CITIES.map((city) => (
                    <option key={city} value={city} className="text-gray-700">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* To */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">To</label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <span className="text-gray-400 mr-2">📍</span>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className={`w-full bg-transparent text-xs sm:text-sm font-semibold outline-none ${
                    to ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  <option value="" disabled hidden>
                    Select To
                  </option>
                  {CITIES.map((city) => (
                    <option key={city} value={city} className="text-gray-700">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Departure Date */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Departure Date</label>
              <div className="relative flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className={`w-full bg-transparent text-xs sm:text-sm font-medium outline-none text-gray-700 ${
                    !departureDate ? '[&::-webkit-datetime-edit]:text-transparent' : ''
                  }`}
                />
                {!departureDate && (
                  <span className="absolute left-3 text-xs sm:text-sm font-medium text-gray-400 pointer-events-none">
                    Select Date
                  </span>
                )}
              </div>
            </div>

            {/* Return Date - only shown when Round Trip is selected */}
            {/* <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Return Date</label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-medium outline-none text-gray-700"
                  />
                </div>
              </div> */}

            {/* Search Button */}
            <div className="lg:col-span-1">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-lg shadow-md transition flex items-center justify-center gap-2"
              >
                <span>🔍</span> Search Flights
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}