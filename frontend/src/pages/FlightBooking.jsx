import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton'; // adjust the path to wherever you place BackButton.jsx

export default function FlightBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  // Active Flight Data (Transferred from Flights.jsx)
  const flight = location.state?.flight;

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">No flight selected. Please go back and select a flight.</p>
      </div>
    );
  }

  const price = Number(flight.price);
  const taxes = price / 25;

  // Seats now come from the database (flight.seats: [{ seatNumber, status, _id }])
  const seatsList = flight.seats || [];

  // Selected Seat State
  const [selectedSeat, setSelectedSeat] = useState(null);

  const columnsLeft = ['A', 'B', 'C'];
  const columnsRight = ['D', 'E', 'F'];

  const getSeatType = (seatCode) => {
    if (!seatCode) return '—';
    const col = seatCode.slice(-1); // last character nikal lo, jaise "12A" se "A"

    if (col === 'A' || col === 'F') return 'Window Seat';
    if (col === 'B' || col === 'E') return 'Middle Seat';
    if (col === 'C' || col === 'D') return 'Aisle Seat';
    return '—';
  };

  // Window seat par extra ₹200 charge lagega
  const WINDOW_SEAT_FEE = 200;
  const seatExtra = selectedSeat && getSeatType(selectedSeat) === 'Window Seat' ? WINDOW_SEAT_FEE : 0;

  const totalAmount = price + taxes + seatExtra;

  // Build the unique, sorted list of row numbers from the DB seat numbers (e.g. "1A" -> 1)
  const seatRows = [...new Set(seatsList.map((s) => parseInt(s.seatNumber, 10)))].sort(
    (a, b) => a - b
  );

  const handleSeatClick = (seatCode) => {
    const seatObj = seatsList.find((s) => s.seatNumber === seatCode);
    if (seatObj && seatObj.status?.toLowerCase().trim() !== 'booked') {
      setSelectedSeat(seatCode);
    }
  };

  // Navigate to Checkout Page on Confirm Seat Click
  const handleConfirmSeat = () => {
    if (!selectedSeat) return;
    navigate('/checkout', {
      state: {
        flight,
        selectedSeat,
        totalAmount,
      },
    });
  };

  const renderSeatButton = (seatCode) => {
    const seatObj = seatsList.find((s) => s.seatNumber === seatCode);
    if (!seatObj) return null; // seat number doesn't exist in this flight's seat map

    const isBooked = seatObj.status?.toLowerCase().trim() === 'booked';
    const isSelected = selectedSeat === seatCode;

    return (
      <button
        key={seatCode}
        disabled={isBooked}
        onClick={() => handleSeatClick(seatCode)}
        className={`w-8 h-8 rounded-lg text-[10px] font-bold transition flex items-center justify-center ${
          isBooked
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200'
            : isSelected
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-400'
        }`}
      >
        {seatCode}
      </button>
    );
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen py-8 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Back Button */}
        <BackButton label="Back" />

        {/* TOP ROW: FLIGHT DETAILS & FARE SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT: FLIGHT CARD (8 COLS) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-6">

            {/* Header: Airline Name & Non Stop Badge */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-red-500 font-extrabold text-xl tracking-wider">
                  ✈ {flight.airline}
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-3 py-1 rounded-full">
                {flight.FLightNumber}
              </span>
            </div>

            {/* Departure & Arrival Route Info */}
            <div className="flex items-center justify-between text-center px-2">
              {/* Departure */}
              <div className="text-left">
                <div className="text-2xl font-extrabold text-slate-900">{flight.departureTime}</div>
                <div className="text-xs font-semibold text-slate-700">{flight.from}</div>
              </div>

              {/* Arrival */}
              <div className="text-right">
                <div className="text-2xl font-extrabold text-slate-900">{flight.arrivalTime}</div>
                <div className="text-xs font-semibold text-slate-700">{flight.to}</div>
              </div>
            </div>

            {/* Sub Info: Aircraft, Baggage, Meals */}
            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✈</span>
                <div>
                  <p className="text-[10px] text-gray-400">Aircraft</p>
                  <p className="font-bold text-slate-800">{flight.Aircraft}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🧳</span>
                <div>
                  <p className="text-[10px] text-gray-400">Baggage</p>
                  <p className="font-bold text-slate-800">{flight.Baggage} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">🍽</span>
                <div>
                  <p className="text-[10px] text-gray-400">Meals</p>
                  <p className="font-bold text-slate-800">Available</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">🍽</span>
                <div>
                  <p className="text-[10px] text-gray-400">Date</p>
                  <p className="font-bold text-slate-800">{flight.date}</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: FARE SUMMARY CARD (4 COLS) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
            <h4 className="font-bold text-base text-slate-900">Fare Summary</h4>

            <div className="space-y-3 text-xs text-gray-500">
              <div className="flex justify-between items-center">
                <span>Base Fare</span>
                <span className="font-semibold text-slate-800">₹ {price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxes & Fees</span>
                <span className="font-semibold text-slate-800">₹ {taxes.toLocaleString()}</span>
              </div>
              {seatExtra > 0 && (
                <div className="flex justify-between items-center">
                  <span>Window Seat Fee</span>
                  <span className="font-semibold text-slate-800">₹ {seatExtra.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-base text-slate-900">Total Amount</span>
              <span className="text-2xl font-extrabold text-blue-600">₹ {totalAmount.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: CHOOSE YOUR SEAT */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Choose Your Seat</h3>
            <p className="text-xs text-gray-400 mt-0.5">Select your preferred seat for a comfortable journey.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* SEAT MAP LEFT (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Legends */}
              <div className="flex items-center gap-6 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-gray-300 bg-white"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-600"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-300"></div>
                  <span>Booked</span>
                </div>
              </div>

              {/* Column Headings */}
              <div className="flex gap-2 text-xs font-semibold text-gray-400 pl-6">
                <div className="flex gap-2 w-28 justify-between px-1">
                  <span>A</span>
                  <span>B</span>
                  <span>C</span>
                </div>
                <div className="w-8"></div> {/* Aisle gap */}
                <div className="flex gap-2 w-28 justify-between px-1">
                  <span>D</span>
                  <span>E</span>
                  <span>F</span>
                </div>
              </div>

              {/* Seats Matrix Rows — built dynamically from flight.seats */}
              <div className="space-y-2">
                {seatRows.map((rowNum) => (
                  <div key={rowNum} className="flex items-center gap-2">
                    {/* Row Number */}
                    <span className="w-4 text-xs font-semibold text-gray-400 text-center">
                      {rowNum}
                    </span>

                    {/* ABC Seats */}
                    <div className="flex gap-2">
                      {columnsLeft.map((col) => renderSeatButton(`${rowNum}${col}`))}
                    </div>

                    {/* Aisle Space */}
                    <div className="w-8"></div>

                    {/* DEF Seats */}
                    <div className="flex gap-2">
                      {columnsRight.map((col) => renderSeatButton(`${rowNum}${col}`))}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* SELECTION SUMMARY RIGHT CARD (5 COLS) */}
            <div className="lg:col-span-5 bg-[#f8fafc] p-6 rounded-2xl border border-gray-100 space-y-5">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900">Selected Seat</h4>
                {selectedSeat && (
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>

              {/* Large Seat Code */}
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {selectedSeat || '—'}
              </div>

              {/* Details List */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Seat Type:</span>
                  <span className="font-semibold text-slate-800">{getSeatType(selectedSeat)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Price:</span>
                  <span className="font-semibold text-blue-600">
                    {seatExtra > 0 ? `₹ ${seatExtra.toLocaleString()}` : '₹ 0 (Free)'}
                  </span>
                </div>
              </div>

              {/* Alert Info Box */}
              <div className="bg-blue-50/80 text-blue-600 p-3 rounded-xl text-[11px] flex items-center gap-2">
                <span>ℹ</span>
                <p>You can change your seat anytime before check-in.</p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleConfirmSeat}
                disabled={!selectedSeat}
                className={`w-full font-semibold text-xs py-3 rounded-xl transition duration-200 ${
                  selectedSeat
                    ? 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    : 'border border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Seat
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}