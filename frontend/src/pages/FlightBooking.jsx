import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function FlightBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Theme Management using localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('appTheme');
    return savedTheme ? savedTheme === 'dark' : true; // Default Dark Theme
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Active Flight Data
  const flight = location.state?.flight;

  const price = Number(flight?.price || 0);
  const taxes = price / 25;

  const seatsList = useMemo(() => flight?.seats || [], [flight]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const columnsLeft = ['A', 'B', 'C'];
  const columnsRight = ['D', 'E', 'F'];

  const getSeatType = (seatCode) => {
    if (!seatCode) return '—';
    const col = seatCode.slice(-1).toUpperCase();

    if (col === 'A' || col === 'F') return 'Window Seat';
    if (col === 'B' || col === 'E') return 'Middle Seat';
    if (col === 'C' || col === 'D') return 'Aisle Seat';
    return '—';
  };

  const WINDOW_SEAT_FEE = 200;
  const seatExtra = selectedSeat && getSeatType(selectedSeat) === 'Window Seat' ? WINDOW_SEAT_FEE : 0;
  const totalAmount = price + taxes + seatExtra;

  const seatRows = useMemo(() => {
    const rows = seatsList.map((s) => parseInt(s.seatNumber, 10)).filter((r) => !isNaN(r));
    return [...new Set(rows)].sort((a, b) => a - b);
  }, [seatsList]);

  const handleSeatClick = (seatCode) => {
    const seatObj = seatsList.find((s) => s.seatNumber === seatCode);
    if (seatObj && seatObj.status?.toLowerCase().trim() !== 'booked') {
      setSelectedSeat(seatCode);
    }
  };

  const handleConfirmSeat = () => {
    if (!selectedSeat) return;
    navigate('/checkout', {
      state: {
        flight,
        selectedSeat,
        price,
        taxes,
        seatExtra,
        totalAmount,
      },
    });
  };

  if (!flight) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
        <p className="font-medium">No flight selected. Please go back and select a flight.</p>
      </div>
    );
  }

  const renderSeatButton = (seatCode) => {
    const seatObj = seatsList.find((s) => s.seatNumber === seatCode);
    if (!seatObj) return <div key={seatCode} className="w-8 h-8 sm:w-9 sm:h-9"></div>;

    const isBooked = seatObj.status?.toLowerCase().trim() === 'booked';
    const isSelected = selectedSeat === seatCode;

    return (
      <button
        key={seatCode}
        disabled={isBooked}
        onClick={() => handleSeatClick(seatCode)}
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-[10px] sm:text-xs font-bold transition flex items-center justify-center ${
          isBooked
            ? isDarkMode
              ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
            : isSelected
              ? 'bg-blue-600 text-white shadow-md border border-blue-500 ring-2 ring-blue-400/40'
              : isDarkMode
                ? 'bg-slate-800 border border-slate-600 text-slate-300 hover:border-blue-400 hover:text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600'
        }`}
      >
        {seatCode}
      </button>
    );
  };

  return (
    <div className={`min-h-screen py-6 px-3 sm:px-6 lg:px-12 font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header Row with Back Button and Theme Toggle */}
        <div className="flex justify-between items-center">
          <BackButton label="Back" />
          
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-2 ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
            }`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* TOP ROW: FLIGHT DETAILS & FARE SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT: FLIGHT CARD (8 COLS) */}
          <div className={`lg:col-span-8 rounded-2xl p-5 sm:p-6 border shadow-md flex flex-col justify-between space-y-6 ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>

            {/* Header: Airline Name & Flight Number */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-red-500 font-extrabold text-lg sm:text-xl tracking-wider">
                  ✈ {flight.airline}
                </div>
              </div>
              <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[11px] font-semibold px-3 py-1 rounded-full">
                {flight.flightNumber || flight.FLightNumber}
              </span>
            </div>

            {/* Departure & Arrival Route Info */}
            <div className="flex items-center justify-between text-center px-2">
              <div className="text-left">
                <div className={`text-xl sm:text-2xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {flight.departureTime}
                </div>
                <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {flight.from}
                </div>
              </div>

              <div className="text-slate-400 text-xs font-medium">Non-stop</div>

              <div className="text-right">
                <div className={`text-xl sm:text-2xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {flight.arrivalTime}
                </div>
                <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {flight.to}
                </div>
              </div>
            </div>

            {/* Sub Info: Aircraft, Baggage, Meals, Date */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t text-xs ${
              isDarkMode ? 'border-slate-700' : 'border-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✈</span>
                <div>
                  <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Aircraft</p>
                  <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{flight.Aircraft || flight.aircraft}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🧳</span>
                <div>
                  <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Baggage</p>
                  <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{flight.Baggage || flight.baggage} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">🍽</span>
                <div>
                  <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Meals</p>
                  <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Available</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">📅</span>
                <div>
                  <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Date</p>
                  <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{flight.date}</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: FARE SUMMARY CARD (4 COLS) */}
          <div className={`lg:col-span-4 rounded-2xl p-5 sm:p-6 border shadow-md flex flex-col justify-between space-y-4 ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <h4 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Fare Summary</h4>

            <div className={`space-y-3 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <div className="flex justify-between items-center">
                <span>Base Fare</span>
                <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>₹ {price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxes & Fees</span>
                <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>₹ {taxes.toLocaleString()}</span>
              </div>
              {seatExtra > 0 && (
                <div className="flex justify-between items-center text-blue-500">
                  <span>Window Seat Fee</span>
                  <span className="font-semibold">₹ {seatExtra.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className={`pt-4 border-t flex justify-between items-center ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
              <span className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Total Amount</span>
              <span className="text-2xl font-extrabold text-blue-500">₹ {totalAmount.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: CHOOSE YOUR SEAT */}
        <div className={`rounded-2xl p-4 sm:p-8 border shadow-md space-y-6 ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div>
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Choose Your Seat</h3>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Select your preferred seat for a comfortable journey.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* SEAT MAP LEFT (7 COLS) */}
            <div className="lg:col-span-7 space-y-6 overflow-x-auto pb-2">

              {/* Legends */}
              <div className={`flex items-center gap-4 sm:gap-6 text-xs font-medium min-w-max ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border ${isDarkMode ? 'border-slate-600 bg-slate-800' : 'border-slate-300 bg-white'}`}></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-600"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border ${isDarkMode ? 'bg-slate-700/50 border-slate-700' : 'bg-slate-200 border-slate-300'}`}></div>
                  <span>Booked</span>
                </div>
              </div>

              {/* Seat Matrix Container */}
              <div className="min-w-[280px] space-y-3">
                {/* Column Headings */}
                <div className={`flex items-center gap-2 text-xs font-semibold pl-6 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <div className="flex gap-2 justify-between w-[104px] sm:w-[116px] px-1">
                    <span>A</span>
                    <span>B</span>
                    <span>C</span>
                  </div>
                  <div className="w-6 sm:w-8"></div>
                  <div className="flex gap-2 justify-between w-[104px] sm:w-[116px] px-1">
                    <span>D</span>
                    <span>E</span>
                    <span>F</span>
                  </div>
                </div>

                {/* Seats Matrix Rows */}
                <div className="space-y-2">
                  {seatRows.map((rowNum) => (
                    <div key={rowNum} className="flex items-center gap-2">
                      <span className={`w-4 text-xs font-semibold text-center ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {rowNum}
                      </span>

                      <div className="flex gap-2">
                        {columnsLeft.map((col) => renderSeatButton(`${rowNum}${col}`))}
                      </div>

                      <div className="w-6 sm:w-8"></div>

                      <div className="flex gap-2">
                        {columnsRight.map((col) => renderSeatButton(`${rowNum}${col}`))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* SELECTION SUMMARY RIGHT CARD (5 COLS) */}
            <div className={`lg:col-span-5 p-5 sm:p-6 rounded-2xl border space-y-5 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex justify-between items-center">
                <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Selected Seat</h4>
                {selectedSeat && (
                  <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>

              <div className={`text-4xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {selectedSeat || '—'}
              </div>

              <div className="space-y-2 text-xs">
                <div className={`flex justify-between ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>Seat Type:</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{getSeatType(selectedSeat)}</span>
                </div>
                <div className={`flex justify-between ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>Price:</span>
                  <span className="font-semibold text-blue-500">
                    {seatExtra > 0 ? `₹ ${seatExtra.toLocaleString()}` : '₹ 0 (Free)'}
                  </span>
                </div>
              </div>

              <div className={`p-3 rounded-xl text-[11px] flex items-center gap-2 border ${
                isDarkMode 
                  ? 'bg-blue-900/20 text-blue-300 border-blue-800/40' 
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                <span>ℹ</span>
                <p>You can change your seat anytime before check-in.</p>
              </div>

              <button
                onClick={handleConfirmSeat}
                disabled={!selectedSeat}
                className={`w-full font-semibold text-xs py-3 rounded-xl transition duration-200 ${
                  selectedSeat
                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-md'
                    : isDarkMode
                      ? 'border border-slate-700 text-slate-500 cursor-not-allowed bg-slate-800/50'
                      : 'border border-slate-300 text-slate-400 cursor-not-allowed bg-slate-200/50'
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