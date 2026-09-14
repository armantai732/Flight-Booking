import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Flight, selected seat & total amount passed from FlightBooking page
  const { flight, selectedSeat, totalAmount } = location.state || {};

  if (!flight || !selectedSeat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">No booking details found. Please go back and select a flight & seat.</p>
      </div>
    );
  }

  // Passenger details — matches bookingSchema.passengers: [{ name, age, gender }]
  const [passenger, setPassenger] = useState({ name: '', age: '', gender: '' });
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handlePayNow = async (e) => {
    e.preventDefault();
    setError(null);

    if (!passenger.name || !passenger.age || !passenger.gender) {
      alert('Please fill in all passenger details.');
      return;
    }

    // Find the seat's Mongo _id from the flight's seats array using the selected seat number
    const seatObj = (flight.seats || []).find((s) => s.seatNumber === selectedSeat);

    if (!seatObj) {
      setError('Selected seat could not be found on this flight. Please go back and reselect.');
      return;
    }

    // Build the booking payload exactly matching bookingSchema
    const bookingPayload = {
      // user: comes from logged-in user (auth context / token) on the backend,
      // usually you don't send this from frontend — backend reads it from the auth token.
      flight: flight._id,
      passengers: [
        {
          name: passenger.name,
          age: passenger.age,
          gender: passenger.gender,
        },
      ],
      selectedSeats: [
        {
          seatId: seatObj._id,
          seatNumber: seatObj.seatNumber,
        },
      ],
      totalAmount: Number(totalAmount),
      paymentStatus: 'Pending',
      bookingStatus: 'Pending',
    };

    try {
      setSubmitting(true);

      // TODO: replace BASE_URL/endpoint with your actual booking API route
      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // send auth cookie/token if using cookie-based auth
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) {
        throw new Error(`Booking failed with status ${res.status}`);
      }

      const data = await res.json();

      // Redirect to My Bookings page with the created booking
      navigate('/my-bookings', {
        state: {
          booking: data.booking || data,
        },
      });
    } catch (err) {
      console.error('Booking error:', err);
      setError('Something went wrong while creating your booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen py-10 px-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-md space-y-6">

        {/* Passenger Details Box */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
          <h2 className="font-extrabold text-base text-slate-900">Passenger Details</h2>

          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-800">1. Adult · Seat {selectedSeat}</p>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Aadhaar Name</label>
              <input
                type="text"
                placeholder="Full Aadhaar Name"
                value={passenger.name}
                onChange={(e) => setPassenger({ ...passenger, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Age</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Age"
                  value={passenger.age}
                  onChange={(e) => setPassenger({ ...passenger, age: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={passenger.gender}
                  onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-slate-800 bg-white"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Box */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
          <h2 className="font-extrabold text-base text-slate-900">Payment Method</h2>

          <div className="space-y-3.5 text-xs text-slate-800 font-medium">
            {['UPI', 'Credit / Debit Card', 'Net Banking', 'Wallet'].map((method) => (
              <label key={method} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="w-4 h-4 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>

          {totalAmount != null && (
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-900">Total Amount</span>
              <span className="text-lg font-extrabold text-blue-600">
                ₹ {Number(totalAmount).toLocaleString()}
              </span>
            </div>
          )}

          {error && (
            <p className="text-[11px] text-red-500 font-medium">{error}</p>
          )}

          <button
            onClick={handlePayNow}
            disabled={submitting}
            className={`w-full font-semibold text-xs py-3 rounded-xl shadow-md transition duration-200 mt-2 ${
              submitting
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-[#1d6bf3] hover:bg-blue-700 text-white'
            }`}
          >
            {submitting ? 'Processing...' : 'Pay Now'}
          </button>
        </div>

      </div>
    </div>
  );
}