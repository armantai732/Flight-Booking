import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateRazorpayOrder, VerifyRazorpayPayment } from '../api/api';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Theme Management using localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('appTheme');
    return savedTheme ? savedTheme === 'dark' : false;
  });



  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Flight + Seat + Fare details
  const {
    flight,
    selectedSeat,
    price,
    taxes,
    seatExtra,
  } = location.state || {};

  const [passenger, setPassenger] = useState({
    name: '',
    age: '',
    gender: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!flight || !selectedSeat) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
        }`}>
        <p className="font-medium">
          No booking details found. Please go back and select a flight & seat.
        </p>
      </div>
    );
  }

  // Safe values
  const baseFare = Number(price ?? flight.price ?? 0);
  const taxAmount = Number(taxes ?? baseFare / 25);
  const extraSeatCharge = Number(seatExtra ?? 0);

  // Final total
  const finalTotal = baseFare + taxAmount + extraSeatCharge;

  const handlePayNow = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login")
    } else {

      setError(null);

      if (!passenger.name || !passenger.age || !passenger.gender) {
        toast.error('Please fill in all passenger details.');
        return;
      }
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

    try {
      setSubmitting(true);

      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setError('Razorpay SDK failed to load. Please check your internet connection.');
        setSubmitting(false);
        return;
      }

      // 1. Create Razorpay order on backend
      const orderData = await CreateRazorpayOrder(finalTotal);

      if (!orderData || !orderData.order) {
        throw new Error(orderData?.message || 'Failed to initiate Razorpay order');
      }

      const { order, key } = orderData;

      // 2. Open Razorpay modal options
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: 'SkyFly Flight Booking',
        description: `Booking for Flight ${flight.FLightNumber || flight.flightNumber} (Seat ${selectedSeat})`,
        order_id: order.id,
        prefill: {
          name: passenger.name,
        },
        theme: {
          color: '#2563eb',
        },
        handler: async function (response) {
          try {
            setSubmitting(true);
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              FLightNumber: flight.FLightNumber || flight.flightNumber,
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
            };

            const result = await VerifyRazorpayPayment(verifyPayload);

            navigate('/my-bookings', {
              state: {
                booking: result.booking || result.data || result,
              },
            });
          } catch (verifyErr) {
            console.error('Payment Verification Error:', verifyErr);
            setError(verifyErr.message || 'Payment verification failed.');
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (response) {
        console.error('Payment Failed:', response.error);
        setError(response.error.description || 'Payment Failed');
        setSubmitting(false);
      });
      razorpayInstance.open();

    } catch (err) {
      console.error('Razorpay Payment Error:', err);
      setError(
        err.message ||
        'Something went wrong while creating your booking. Please try again.'
      );
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen py-10 px-4 flex justify-center font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}>

      <div className="w-full max-w-md space-y-6">

        {/* Header Options */}
        <div className="flex justify-between items-center">
          <BackButton label="Back" />
          {/* <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-2 ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
            }`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button> */}
        </div>

        {/* PASSENGER DETAILS */}
        <div className={`rounded-2xl p-6 border shadow-md space-y-5 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>

          <h2 className={`font-extrabold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Passenger Details
          </h2>

          <div className="space-y-4">

            <p className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              1. Adult · Seat {selectedSeat}
            </p>

            {/* Name */}
            <div>
              <label className={`block text-[11px] font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Full Identity Name
              </label>

              <input
                type="text"
                placeholder="Full Identity Name"
                value={passenger.name}
                onChange={(e) =>
                  setPassenger({
                    ...passenger,
                    name: e.target.value
                  })
                }
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-blue-500 transition ${isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
              />
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
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
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-blue-500 transition ${isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
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
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-blue-500 cursor-pointer transition ${isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-slate-100'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                >
                  <option value="" className={isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-500'}>Select</option>
                  <option value="Male" className={isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>Male</option>
                  <option value="Female" className={isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>Female</option>
                  <option value="Other" className={isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>Other</option>
                </select>
              </div>

            </div>

          </div>

        </div>

        {/* PAYMENT METHOD */}
        <div className={`rounded-2xl p-6 border shadow-md space-y-5 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>

          <h2 className={`font-extrabold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Payment Method
          </h2>

          <div className={`space-y-3.5 text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>

            {[
              'UPI',
              'Credit / Debit Card',
              'Net Banking',
              'Wallet'
            ].map((method) => (

              <label
                key={method}
                className={`flex items-center gap-3 cursor-pointer transition ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}
              >

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

          {/* FARE SUMMARY */}
          <div className={`pt-4 border-t space-y-3 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>

            <h3 className={`font-extrabold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Fare Summary
            </h3>

            {/* Base Fare */}
            <div className="flex justify-between items-center text-xs">
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                Base Fare
              </span>
              <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                ₹ {baseFare.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Taxes */}
            <div className="flex justify-between items-center text-xs">
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                Taxes & Fees
              </span>
              <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                ₹ {taxAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Seat Extra */}
            {extraSeatCharge > 0 && (
              <div className="flex justify-between items-center text-xs">
                <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                  Window Seat Fee
                </span>
                <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  ₹ {extraSeatCharge.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            {/* Selected Seat */}
            <div className="flex justify-between items-center text-xs">
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                Selected Seat
              </span>
              <span className="font-semibold text-blue-500">
                {selectedSeat}
              </span>
            </div>

            {/* Total */}
            <div className={`pt-3 border-t flex justify-between items-center ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Total Amount
              </span>
              <span className="text-xl font-extrabold text-blue-500">
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
            className={`w-full font-semibold text-xs py-3 rounded-xl shadow-md transition duration-200 mt-2 ${submitting
                ? 'bg-blue-800/50 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
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