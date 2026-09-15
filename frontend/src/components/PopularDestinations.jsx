import React, { useEffect, useState } from 'react';
import { GetFlight } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function PopularDestinations() {
  // ૧. Popular Destinations Data
  // const destinations = [
  //   { name: 'Mumbai', country: 'India', price: '₹4,299', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&auto=format&fit=crop' },
  //   { name: 'Delhi', country: 'India', price: '₹3,999', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&auto=format&fit=crop' },
  //   { name: 'Goa', country: 'India', price: '₹5,499', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&auto=format&fit=crop' },
  //   { name: 'Dubai', country: 'UAE', price: '₹12,999', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop' },
  //   { name: 'London', country: 'UK', price: '₹28,999', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&auto=format&fit=crop' },
  //   { name: 'Paris', country: 'France', price: '₹32,499', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop' },
  // ];

  // ૨. Small Offers Data
  const smallOffers = [
    { title: 'Domestic Flights', discount: 'Flat 15% Off', code: 'DOM15', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop' },
    { title: 'International Flights', discount: 'Flat 20% Off', code: 'INT20', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop' },
    { title: 'Weekend Getaways', discount: 'Up to 25% Off', code: 'WEEKEND', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&auto=format&fit=crop' },
  ];

    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
      const fetchFlights = async () => {
        try {
          setLoading(true);
  
          const res = await GetFlight();
  
          const latestFlights = (res.Flight || [])
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);


          // Adjust this depending on your API response structure
          setFlights(latestFlights);
        } catch (err) {
          console.error('Error fetching flights:', err);
          setError('Failed to load flights.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchFlights();
    }, []);

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ================= SECTION 1: POPULAR DESTINATIONS ================= */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Popular Destinations</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Explore top destinations at the best prices</p>
            </div>
            <a className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All ➔
            </a>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {flights.map((item, index) => (
              <div onClick={()=>navigate("/flights")} key={index} className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-md transition cursor-pointer group">
                <div className="h-28 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-slate-800">{item.to}</h3>
                      {/* <p className="text-xs text-gray-400">{item.country}</p> */}
                    </div>
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-xs flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                      ➔
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[10px] text-gray-400 block">From</span>
                    <span className="text-xs font-bold text-blue-600">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 2: SPECIAL OFFERS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Big Banner Offer */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#004b93] via-[#002f6c] to-[#011a38] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px]">
            <div className="relative z-10 max-w-xs">
              <span className="text-xs font-semibold text-blue-200">Special Offers</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 leading-tight">
                Up to 30% Off
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-1">on International Flights</p>
              
              <div className="flex items-center gap-3 mt-6 flex-wrap">
                <span className="bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  Use Code: <strong className="text-white">FLY30</strong>
                </span>
                <button className="bg-transparent border border-white hover:bg-white hover:text-blue-900 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition">
                  Explore Deals ➔
                </button>
              </div>
            </div>

            {/* Background Image Effect inside Big Banner */}
            <img 
              src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&auto=format&fit=crop" 
              alt="Window view" 
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-60 pointer-events-none"
            />
          </div>

          {/* 3 Small Offer Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {smallOffers.map((offer, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="h-24 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-semibold text-slate-700">{offer.title}</h4>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">{offer.discount}</p>
                  
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400">Use Code: <strong className="text-gray-600">{offer.code}</strong></span>
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-xs flex items-center justify-center">
                      ➔
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}