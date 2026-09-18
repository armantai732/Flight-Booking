import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { AddFlightAdmin } from '../api/api';
import { toast } from "react-toastify";

export default function AddFlight() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Add Flight');
  const [imageFile, setImageFile] = useState(null);
  // Form State with Preview sync
  const [form, setform] = useState({
    airline: '',
    FLightNumber: '',
    Aircraft: '',
    image: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    Baggage: '',
    date: '',
    price: '',
    seatRows: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      // Sirf preview ke liye blob URL
      setform((prev) => ({
        ...prev,
        image: URL.createObjectURL(file)
      }));
    }
  };

  const handleReset = () => {
    setform({
      airline: '',
      FLightNumber: '',
      Aircraft: '',
      image: '',
      from: '',
      to: '',
      departureTime: '',
      arrivalTime: '',
      Baggage: '',
      date: '',
      price: '',
      seatRows: '',
    });

    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!imageFile) {
        toast.error("Please select flight image");
        return;
      }

      const formData = new FormData();

      formData.append("airline", form.airline);
      formData.append("FLightNumber", form.FLightNumber);
      formData.append("Aircraft", form.Aircraft);

      // IMPORTANT:
      // blob URL nahi, actual File bhejna hai
      formData.append("image", imageFile);

      formData.append("from", form.from);
      formData.append("to", form.to);
      formData.append("departureTime", form.departureTime);
      formData.append("arrivalTime", form.arrivalTime);
      formData.append("Baggage", form.Baggage);
      formData.append("date", form.date);
      formData.append("price", form.price);
      formData.append("seatRows", form.seatRows);

      const res = await AddFlightAdmin(formData);

      if (res.status) {
        toast.success(res.message);

        setform({
          airline: '',
          FLightNumber: '',
          Aircraft: '',
          image: '',
          from: '',
          to: '',
          departureTime: '',
          arrivalTime: '',
          Baggage: '',
          date: '',
          price: '',
          seatRows: '',
        });

        setImageFile(null);

      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.log("Add Flight Error:", error);
      toast.error(error.message || "Failed to add flight");
    }
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
                      value={form.airline}
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
                      name="FLightNumber"
                      value={form.FLightNumber}
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
                      name="Aircraft"
                      value={form.Aircraft}
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
                    <span className="text-[10px] text-slate-400 px-2 truncate">
                      {imageFile ? imageFile.name : "No file chosen"}
                    </span>
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
                      value={form.from}
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
                      value={form.to}
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
                      value={form.departureTime}
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
                      value={form.arrivalTime}
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
                      name="Baggage"
                      value={form.Baggage}
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
                      value={form.date}
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
                    value={form.price}
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
                    value={form.seatRows}
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
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Flight Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm flex items-center h-full justify-center font-semibold text-slate-400">
                    No Preview
                  </span>
                )}
              </div>

              {/* Flight Main Header */}
              <div className="flex justify-between items-start pt-1">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{form.airline || 'Airline Name'}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{form.Aircraft || 'Aircraft'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-medium">Flight No.</p>
                  <p className="font-extrabold text-xs text-slate-900">{form.FLightNumber || '---'}</p>
                </div>
              </div>

              {/* Route & Timings */}
              <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">📍</span>
                  <div>
                    <p className="font-bold text-slate-800">{form.from || 'From'}</p>
                    <p className="text-slate-400 font-medium text-[11px]">{form.departureTime || '--:--'}</p>
                  </div>
                </div>

                <span className="text-blue-500 font-bold">✈</span>

                <div className="flex items-center gap-2 text-right">
                  <div>
                    <p className="font-bold text-slate-800">{form.to || 'To'}</p>
                    <p className="text-slate-400 font-medium text-[11px]">{form.arrivalTime || '--:--'}</p>
                  </div>
                  <span className="text-blue-600">📍</span>
                </div>
              </div>

              {/* Details grid: Baggage, Date, Price */}
              <div className="grid grid-cols-3 gap-2 text-[11px] text-center bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                <div>
                  <p className="text-slate-400 font-medium flex items-center justify-center gap-1">💼 Baggage</p>
                  <p className="font-bold text-slate-800 mt-0.5">{form.Baggage ? `${form.Baggage} KG` : '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium flex items-center justify-center gap-1">📅 Date</p>
                  <p className="font-bold text-slate-800 mt-0.5">{form.date || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium flex items-center justify-center gap-1">₹ Price</p>
                  <p className="font-bold text-slate-800 mt-0.5">{form.price ? `₹${form.price}` : '-'}</p>
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