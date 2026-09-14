import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AddFlight() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Add Flight');

  // Form State with Preview sync
  const [formData, setFormData] = useState({
    airline: 'IndiGo',
    flightNumber: '6E 215',
    aircraft: 'Airbus A320',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
    from: 'Delhi (DEL)',
    to: 'Mumbai (BOM)',
    departureTime: '14:30',
    arrivalTime: '17:45',
    baggage: '7',
    date: '2026-09-15',
    price: '4,299',
    seatRows: '10',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleReset = () => {
    setFormData({
      airline: '',
      flightNumber: '',
      aircraft: '',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
      from: '',
      to: '',
      departureTime: '',
      arrivalTime: '',
      baggage: '',
      date: '',
      price: '',
      seatRows: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Flight Added:', formData);
    alert('Flight added successfully!');
  };

  return (
    <div className="flex h-screen bg-[#f4f7fb] font-sans overflow-hidden">
      
      {/* 1. LEFT SIDEBAR */}
      <aside >
        <AdminSidebar />
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        


        {/* PAGE CONTENT */}
        <main className="p-8 space-y-6">
          
          {/* Title Header */}
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="text-blue-600">✈</span> Add Flight
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Fill in the details below to add a new flight
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 2. FORM SECTION (7 COLS) */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 text-xs">
              
              {/* Airline & Flight Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Airline *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400">🏛</span>
                    <select
                      name="airline"
                      value={formData.airline}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium bg-white"
                    >
                      <option value="">Select Airline</option>
                      <option value="IndiGo">IndiGo</option>
                      <option value="Air India">Air India</option>
                      <option value="SpiceJet">SpiceJet</option>
                      <option value="Vistara">Vistara</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Flight Number *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold">#</span>
                    <input
                      type="text"
                      name="flightNumber"
                      value={formData.flightNumber}
                      onChange={handleChange}
                      placeholder="e.g. 6E 215"
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Aircraft & Image Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aircraft *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">✈</span>
                    <select
                      name="aircraft"
                      value={formData.aircraft}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium bg-white"
                    >
                      <option value="">Select Aircraft</option>
                      <option value="Airbus A320">Airbus A320</option>
                      <option value="Boeing 737">Boeing 737</option>
                      <option value="Airbus A350">Airbus A350</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Image *</label>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden p-1 bg-white">
                    <label className="bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blue-100 transition whitespace-nowrap">
                      🖼 Choose Image
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    <span className="text-[10px] text-slate-400 px-2 truncate">No file chosen</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Upload flight image (JPG, PNG, WEBP - Max 5MB)</p>
                </div>
              </div>

              {/* From & To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">From *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">📍</span>
                    <input
                      type="text"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      placeholder="e.g. Delhi (DEL)"
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">To *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">📍</span>
                    <input
                      type="text"
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai (BOM)"
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Departure & Arrival Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Departure Time *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">🕒</span>
                    <input
                      type="text"
                      name="departureTime"
                      value={formData.departureTime}
                      onChange={handleChange}
                      placeholder="e.g. 14:30"
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Arrival Time *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">🕒</span>
                    <input
                      type="text"
                      name="arrivalTime"
                      value={formData.arrivalTime}
                      onChange={handleChange}
                      placeholder="e.g. 17:45"
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Baggage & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Baggage (KG) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">💼</span>
                    <input
                      type="text"
                      name="baggage"
                      value={formData.baggage}
                      onChange={handleChange}
                      placeholder="e.g. 7"
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">📅</span>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Price *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 4299"
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Seat Rows */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Seat Rows *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">💺</span>
                  <select
                    name="seatRows"
                    value={formData.seatRows}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-slate-800 font-medium bg-white"
                  >
                    <option value="">Select Number of Rows (e.g. 10)</option>
                    <option value="5">5 Rows</option>
                    <option value="10">10 Rows</option>
                    <option value="15">15 Rows</option>
                    <option value="20">20 Rows</option>
                  </select>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Each row will have 6 seats (A, B, C, D, E, F)</p>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  ↻ Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition flex items-center gap-2"
                >
                  <span>⊕</span> Add Flight
                </button>
              </div>

            </form>

            {/* 3. LIVE PREVIEW CARD (5 COLS) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <span>👁</span> Preview
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">This is how your flight will look</p>
              </div>

              {/* Flight Image */}
              <div className="h-40 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={formData.image}
                  alt="Flight Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Flight Main Header */}
              <div className="flex justify-between items-start pt-1">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{formData.airline || 'Airline Name'}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{formData.aircraft || 'Aircraft'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-medium">Flight No.</p>
                  <p className="font-extrabold text-xs text-slate-900">{formData.flightNumber || '---'}</p>
                </div>
              </div>

              {/* Route & Timings */}
              <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">📍</span>
                  <div>
                    <p className="font-bold text-slate-800">{formData.from || 'From'}</p>
                    <p className="text-slate-400 font-medium text-[11px]">{formData.departureTime || '--:--'}</p>
                  </div>
                </div>

                <span className="text-blue-500 font-bold">✈</span>

                <div className="flex items-center gap-2 text-right">
                  <div>
                    <p className="font-bold text-slate-800">{formData.to || 'To'}</p>
                    <p className="text-slate-400 font-medium text-[11px]">{formData.arrivalTime || '--:--'}</p>
                  </div>
                  <span className="text-blue-600">📍</span>
                </div>
              </div>

              {/* Details grid: Baggage, Date, Price */}
              <div className="grid grid-cols-3 gap-2 text-[11px] text-center bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                <div>
                  <p className="text-slate-400 font-medium flex items-center justify-center gap-1">💼 Baggage</p>
                  <p className="font-bold text-slate-800 mt-0.5">{formData.baggage ? `${formData.baggage} KG` : '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium flex items-center justify-center gap-1">📅 Date</p>
                  <p className="font-bold text-slate-800 mt-0.5">{formData.date || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium flex items-center justify-center gap-1">₹ Price</p>
                  <p className="font-bold text-slate-800 mt-0.5">{formData.price ? `₹${formData.price}` : '-'}</p>
                </div>
              </div>

              {/* Seats Preview Grid */}
              <div className="space-y-2 pt-2">
                <p className="text-[11px] text-slate-400 font-bold">Seats Preview (First 3 rows)</p>
                <div className="space-y-1.5">
                  {['1', '2', '3'].map((row) => (
                    <div key={row} className="grid grid-cols-6 gap-1.5 text-center">
                      {['A', 'B', 'C', 'D', 'E', 'F'].map((seat) => (
                        <div
                          key={seat}
                          className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 text-[10px] font-bold text-slate-600 hover:border-blue-400 transition cursor-pointer"
                        >
                          {row}{seat}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}