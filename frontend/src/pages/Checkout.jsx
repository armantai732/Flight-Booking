import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateBooking } from '../api/api';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Flight + Seat + Fare details
  const {
    flight,
    selectedSeat,
    price,
    taxes,
    seatExtra,
    totalAmount
  } = location.state || {};

  if (!flight || !selectedSeat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">
          No booking details found. Please go back and select a flight & seat.
        </p>
      </div>
    );
  }

  const [passenger, setPassenger] = useState({
    name: '',
    age: '',
    gender: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Safe values
  const baseFare = Number(price ?? flight.price ?? 0);
  const taxAmount = Number(taxes ?? baseFare / 25);
  const extraSeatCharge = Number(seatExtra ?? 0);

  // Final total
  const finalTotal =
    baseFare +
    taxAmount +
    extraSeatCharge;

  const handlePayNow = async (e) => {
    e.preventDefault();
    setError(null);

    if (!passenger.name || !passenger.age || !passenger.gender) {
      alert('Please fill in all passenger details.');
      return;
    }

    const seatObj = (flight.seats || []).find(
      (s) => s.seatNumber === selectedSeat
    );

    if (!seatObj) {
      setError(
        'Selected seat could not be found on this flight. Please go back and reselect.'
      );
      return;
    }

    const bookingPayload = {
      flight: flight._id,

      FLightNumber: flight.FLightNumber,

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

      // IMPORTANT:
      // Base Fare + Tax + Seat Extra Charge
      totalAmount: finalTotal,

      paymentStatus: 'Pending',
      bookingStatus: 'Pending',
    };

    console.log("Booking Payload:", bookingPayload);

    try {
      setSubmitting(true);

      const data = await CreateBooking(bookingPayload);

      navigate('/my-bookings', {
        state: {
          booking: data.booking || data.data || data,
        },
      });

    } catch (err) {
      console.error('Booking error:', err);

      setError(
        err.message ||
        'Something went wrong while creating your booking. Please try again.'
      );

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen py-10 px-4 flex items-center justify-center font-sans">

      <div className="w-full max-w-md space-y-6">

        {/* ========================= */}
        {/* PASSENGER DETAILS */}
        {/* ========================= */}

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">

          <h2 className="font-extrabold text-base text-slate-900">
            Passenger Details
          </h2>

          <div className="space-y-4">

            <p className="text-xs font-bold text-slate-800">
              1. Adult · Seat {selectedSeat}
            </p>

            {/* Name */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Full Aadhaar Name
              </label>

              <input
                type="text"
                placeholder="Full Aadhaar Name"
                value={passenger.name}
                onChange={(e) =>
                  setPassenger({
                    ...passenger,
                    name: e.target.value
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-slate-800"
              />
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Age
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="Age"
                  value={passenger.age}
                  onChange={(e) =>
                    setPassenger({
                      ...passenger,
                      age: e.target.value
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Gender
                </label>

                <select
                  value={passenger.gender}
                  onChange={(e) =>
                    setPassenger({
                      ...passenger,
                      gender: e.target.value
                    })
                  }
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


        {/* ========================= */}
        {/* PAYMENT METHOD */}
        {/* ========================= */}

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">

          <h2 className="font-extrabold text-base text-slate-900">
            Payment Method
          </h2>

          <div className="space-y-3.5 text-xs text-slate-800 font-medium">

            {[
              'UPI',
              'Credit / Debit Card',
              'Net Banking',
              'Wallet'
            ].map((method) => (

              <label
                key={method}
                className="flex items-center gap-3 cursor-pointer"
              >

                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === method}
                  onChange={() =>
                    setPaymentMethod(method)
                  }
                  className="w-4 h-4 text-blue-600 focus:ring-0 cursor-pointer"
                />

                <span>{method}</span>

              </label>

            ))}

          </div>


          {/* ========================= */}
          {/* FARE SUMMARY */}
          {/* ========================= */}

          <div className="pt-4 border-t border-gray-100 space-y-3">

            <h3 className="font-extrabold text-sm text-slate-900">
              Fare Summary
            </h3>

            {/* Base Fare */}
            <div className="flex justify-between items-center text-xs">

              <span className="text-slate-500">
                Base Fare
              </span>

              <span className="font-semibold text-slate-800">
                ₹ {baseFare.toLocaleString('en-IN')}
              </span>

            </div>


            {/* Taxes */}
            <div className="flex justify-between items-center text-xs">

              <span className="text-slate-500">
                Taxes & Fees
              </span>

              <span className="font-semibold text-slate-800">
                ₹ {taxAmount.toLocaleString('en-IN')}
              </span>

            </div>


            {/* Seat Extra */}
            {extraSeatCharge > 0 && (
              <div className="flex justify-between items-center text-xs">

                <span className="text-slate-500">
                  Window Seat Fee
                </span>

                <span className="font-semibold text-slate-800">
                  ₹ {extraSeatCharge.toLocaleString('en-IN')}
                </span>

              </div>
            )}


            {/* Selected Seat */}
            <div className="flex justify-between items-center text-xs">

              <span className="text-slate-500">
                Selected Seat
              </span>

              <span className="font-semibold text-blue-600">
                {selectedSeat}
              </span>

            </div>


            {/* Total */}
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">

              <span className="text-xs font-bold text-slate-900">
                Total Amount
              </span>

              <span className="text-xl font-extrabold text-blue-600">
                ₹ {finalTotal.toLocaleString('en-IN')}
              </span>

            </div>

          </div>


          {/* Error */}
          {error && (
            <p className="text-[11px] text-red-500 font-medium">
              {error}
            </p>
          )}


          {/* Pay Button */}
          <button
            onClick={handlePayNow}
            disabled={submitting}
            className={`w-full font-semibold text-xs py-3 rounded-xl shadow-md transition duration-200 mt-2 ${
              submitting
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-[#1d6bf3] hover:bg-blue-700 text-white'
            }`}
          >
            {submitting
              ? 'Processing...'
              : `Pay ₹ ${finalTotal.toLocaleString('en-IN')}`}
          </button>

        </div>

      </div>

    </div>
  );
}