import React from 'react';

export default function FeaturedFlights() {
  const flights = [
    {
      airline: 'IndiGo',
      code: '6E 215',
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&auto=format&fit=crop',
      fromCode: 'DEL',
      fromCity: 'Delhi',
      departureTime: '08:10',
      toCode: 'BOM',
      toCity: 'Mumbai',
      arrivalTime: '10:35',
      duration: '2h 25m',
      type: 'Non Stop',
      price: '₹4,299',
    },
    {
      airline: 'Air India',
      code: 'AI 603',
      logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop',
      fromCode: 'DEL',
      fromCity: 'Delhi',
      departureTime: '14:20',
      toCode: 'JFK',
      toCity: 'New York',
      arrivalTime: '01:10',
      duration: '14h 50m',
      type: '1 Stop (AUH)',
      price: '₹52,999',
    },
    {
      airline: 'SpiceJet',
      code: 'SG 812',
      logo: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=100&auto=format&fit=crop',
      fromCode: 'BOM',
      fromCity: 'Mumbai',
      departureTime: '17:40',
      toCode: 'GOI',
      toCity: 'Goa',
      arrivalTime: '19:20',
      duration: '1h 40m',
      type: 'Non Stop',
      price: '₹5,499',
    },
    {
      airline: 'Vistara',
      code: 'UK 836',
      logo: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=100&auto=format&fit=crop',
      fromCode: 'DEL',
      fromCity: 'Delhi',
      departureTime: '22:15',
      toCode: 'BLR',
      toCity: 'Bengaluru',
      arrivalTime: '00:55',
      duration: '2h 40m',
      type: 'Non Stop',
      price: '₹6,299',
    },
  ];

  return (
    <div className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Featured Flights</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Top selling flights from India</p>
          </div>
          <a className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All Flights ➔
          </a>
        </div>

        {/* Flight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {flights.map((flight, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-200/90 p-4 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              {/* Top: Airline Logo & Info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
                  <img src={flight.logo} alt={flight.airline} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 leading-tight">{flight.airline}</h3>
                  <p className="text-[11px] text-gray-400">{flight.code}</p>
                </div>
              </div>

              {/* Middle: Route & Timing Route Line */}
              <div className="my-5 flex items-center justify-between relative">
                {/* From City */}
                <div className="text-left">
                  <span className="font-bold text-xs text-gray-800 block">{flight.fromCode}</span>
                  <span className="text-[10px] text-gray-400 block">{flight.fromCity}</span>
                  <span className="font-extrabold text-sm text-gray-900 mt-1 block">{flight.departureTime}</span>
                </div>

                {/* Duration & Flight Line */}
                <div className="flex-1 px-3 text-center">
                  <span className="text-[10px] text-gray-400 font-medium block">{flight.duration}</span>
                  <div className="relative flex items-center justify-center my-1">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <span className="absolute text-gray-400 text-xs">➔</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block">{flight.type}</span>
                </div>

                {/* To City */}
                <div className="text-right">
                  <span className="font-bold text-xs text-gray-800 block">{flight.toCode}</span>
                  <span className="text-[10px] text-gray-400 block">{flight.toCity}</span>
                  <span className="font-extrabold text-sm text-gray-900 mt-1 block">{flight.arrivalTime}</span>
                </div>
              </div>

              {/* Bottom: Price & Action Button */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <span className="text-base font-extrabold text-slate-900 block">{flight.price}</span>
                  <span className="text-[10px] text-gray-400 block">per person</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-sm transition duration-150">
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}