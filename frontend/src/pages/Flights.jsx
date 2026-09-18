import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { GetFlight } from '../api/api';

const AIRLINES_LIST = ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'Akasa Air'];
const FLIGHTS_PER_PAGE = 5;

export default function Flights() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 Read theme state from localStorage on initial render
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('appTheme') === 'dark';
  });

  // 🔹 Synchronize real-time theme changes across components
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('appTheme');
      setIsDarkMode(currentTheme === 'dark');
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // Search params passed from Hero.jsx ({ from, to, departureDate, returnDate, tripType })
  const searchState = location.state || {};
  const { from, to, departureDate } = searchState;

  // --- Filters & pagination from URL ---
  const pageFromUrl = parseInt(searchParams.get('page'), 10);
  const currentPage = Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  const priceFromUrl = parseInt(searchParams.get('price'), 10);
  const priceRange = Number.isNaN(priceFromUrl) ? 100000 : priceFromUrl;

  const airlinesFromUrl = searchParams.get('airlines');
  const selectedAirlines = airlinesFromUrl ? airlinesFromUrl.split(',') : AIRLINES_LIST;

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const res = await GetFlight();
        setFlights(res.Flight || []);
      } catch (err) {
        console.error('Error fetching flights:', err);
        setError('Failed to load flights.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next, { replace: false, state: location.state });
  };

  const getCityName = (value) => (value ? value.split(' (')[0].trim().toLowerCase() : null);

  const normalizeToISO = (dateStr) => {
    if (!dateStr) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      if (!day || !month || !year) return null;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return null;
  };

  const normalizeAirline = (name) => (name ? name.trim().toLowerCase() : '');

  const fromCity = getCityName(from);
  const toCity = getCityName(to);
  const searchDateISO = departureDate || null;

  const routeDateFilteredFlights = flights.filter((flight) => {
    const flightFrom = flight.from?.trim().toLowerCase();
    const flightTo = flight.to?.trim().toLowerCase();
    const flightDateISO = normalizeToISO(flight.date);

    const matchesRoute = !fromCity || !toCity || (flightFrom === fromCity && flightTo === toCity);
    const matchesDate = !searchDateISO || flightDateISO === searchDateISO;

    return matchesRoute && matchesDate;
  });

  const airlineCounts = AIRLINES_LIST.reduce((acc, airline) => {
    acc[airline] = routeDateFilteredFlights.filter(
      (f) => normalizeAirline(f.airline) === normalizeAirline(airline)
    ).length;
    return acc;
  }, {});

  const normalizedSelectedAirlines = selectedAirlines.map(normalizeAirline);

  const filteredFlights = routeDateFilteredFlights.filter((flight) => {
    const matchesAirline =
      selectedAirlines.length === 0 ||
      normalizedSelectedAirlines.includes(normalizeAirline(flight.airline));
    const matchesPrice = Number(flight.price) <= Number(priceRange);
    return matchesAirline && matchesPrice;
  });

  const totalPages = Math.max(1, Math.ceil(filteredFlights.length / FLIGHTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedFlights = filteredFlights.slice(
    (safeCurrentPage - 1) * FLIGHTS_PER_PAGE,
    safeCurrentPage * FLIGHTS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    updateParams({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAirline = (name) => {
    const isSelected = selectedAirlines.map(normalizeAirline).includes(normalizeAirline(name));
    const next = isSelected
      ? selectedAirlines.filter((a) => normalizeAirline(a) !== normalizeAirline(name))
      : [...selectedAirlines, name];

    updateParams({ airlines: next.join(','), page: 1 });
  };

  const handlePriceChange = (value) => {
    updateParams({ price: value, page: 1 });
  };

  const handleSelectFlight = (flight) => {
    navigate('/flight-booking', { state: { flight } });
  };

  const formatDisplayDate = (isoStr) => {
    if (!isoStr) return null;
    const d = new Date(isoStr);
    if (isNaN(d)) return isoStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;
    const range = [];

    for (let i = Math.max(2, safeCurrentPage - delta); i <= Math.min(totalPages - 1, safeCurrentPage + delta); i++) {
      range.push(i);
    }

    pages.push(1);
    if (range[0] > 2) pages.push('...');
    pages.push(...range);
    if (range[range.length - 1] < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div
      className={`min-h-screen py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-900 text-slate-100 dark' : 'bg-[#f4f7fb] text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Top Search Summary Bar */}
        <div
          className={`rounded-2xl p-4 shadow-md border flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-semibold transition-colors ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700 text-slate-200'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-blue-500 text-lg">✈</span>
            <span className={from ? (isDarkMode ? 'text-white' : 'text-slate-900') : 'text-slate-400 font-medium'}>
              {from || 'Select From'}
            </span>
            <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>➔</span>
            <span className={to ? (isDarkMode ? 'text-white' : 'text-slate-900') : 'text-slate-400 font-medium'}>
              {to || 'Select To'}
            </span>
          </div>

          <div className="flex items-center gap-6 font-medium text-xs">
            <div className="flex items-center gap-1.5">
              <span>📅</span>
              <span className={departureDate ? (isDarkMode ? 'text-slate-300' : 'text-slate-600') : 'text-slate-400'}>
                {formatDisplayDate(departureDate) || 'Select Date'}
              </span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 transition"
            >
              ✏ Edit Search
            </button>
          </div>
        </div>

        {/* Main Content (Sidebar Filters + Flight Listing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Filters Sidebar */}
          <div
            className={`lg:col-span-3 p-5 rounded-2xl border shadow-md space-y-6 transition-colors ${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className={`font-bold text-sm border-b pb-3 ${isDarkMode ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'}`}>
              Filters
            </h3>

            {/* Airlines */}
            <div>
              <h4 className={`text-xs font-bold mb-2.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Airlines
              </h4>
              <div className="space-y-2 text-xs">
                {AIRLINES_LIST.map((airlineName, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between cursor-pointer transition ${
                      isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.map(normalizeAirline).includes(normalizeAirline(airlineName))}
                        onChange={() => toggleAirline(airlineName)}
                        className={`rounded focus:ring-0 focus:ring-offset-0 cursor-pointer ${
                          isDarkMode
                            ? 'border-slate-600 bg-slate-700 text-blue-500'
                            : 'border-slate-300 bg-slate-100 text-blue-600'
                        }`}
                      />
                      <span>{airlineName}</span>
                    </div>
                    <span className={isDarkMode ? 'text-slate-500 text-[10px]' : 'text-slate-400 text-[10px]'}>
                      {airlineCounts[airlineName] ?? 0}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Price Range
                </h4>
                <span className="text-[11px] font-semibold text-blue-500 dark:text-blue-400">
                  ₹3,000 - ₹{Number(priceRange).toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="100000"
                step="500"
                value={priceRange}
                onChange={(e) => handlePriceChange(e.target.value)}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                }`}
              />
            </div>
          </div>

          {/* Flight Listing Cards */}
          <div className="lg:col-span-9 space-y-4">
            {loading && (
              <div
                className={`rounded-2xl p-8 border shadow-md text-center text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                Loading flights...
              </div>
            )}

            {!loading && error && (
              <div
                className={`rounded-2xl p-8 border shadow-md text-center text-sm text-red-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                {error}
              </div>
            )}

            {!loading && !error && filteredFlights.length === 0 && (
              <div
                className={`rounded-2xl p-8 border shadow-md text-center text-sm space-y-1 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>No flights found</p>
                <p>
                  No flights match your current filters
                  {from && to ? (
                    <>
                      {' '}from <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{from}</span> to{' '}
                      <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{to}</span>
                    </>
                  ) : null}
                  {departureDate ? (
                    <>
                      {' '}on <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{formatDisplayDate(departureDate)}</span>
                    </>
                  ) : null}
                  . Try adjusting the airline or price filters.
                </p>
              </div>
            )}

            {!loading && !error && filteredFlights.length > 0 && (
              <>
                {/* Results count */}
                <div className={`text-xs font-medium px-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Showing {(safeCurrentPage - 1) * FLIGHTS_PER_PAGE + 1}
                  –{Math.min(safeCurrentPage * FLIGHTS_PER_PAGE, filteredFlights.length)} of{' '}
                  {filteredFlights.length} flights
                </div>

                {paginatedFlights.map((flight) => (
                  <div
                    key={flight._id || flight.id}
                    className={`rounded-2xl p-5 border shadow-md transition flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Airline Name & Flight Number */}
                    <div className="w-full sm:w-32">
                      <span className={`text-base font-extrabold block ${flight.color || 'text-blue-600 dark:text-blue-400'}`}>
                        {flight.airline}
                      </span>
                      <span className={`text-[10px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {flight.Aircraft}
                      </span>
                    </div>

                    {/* Route and Timings */}
                    <div className="flex items-center gap-6 sm:gap-10 text-center flex-1 justify-center">
                      <div>
                        <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {flight.departureTime}
                        </div>
                        <div className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {flight.from}
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 my-0.5">
                          <div className={`w-8 sm:w-12 h-[1px] ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                          <span className={isDarkMode ? 'text-slate-500 text-xs' : 'text-slate-400 text-xs'}>✈</span>
                          <div className={`w-8 sm:w-12 h-[1px] ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                        </div>
                      </div>

                      <div>
                        <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {flight.arrivalTime}
                        </div>
                        <div className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {flight.to}
                        </div>
                      </div>
                    </div>

                    {/* Price and Action Button */}
                    <div className={`flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 ${
                      isDarkMode ? 'border-slate-700' : 'border-slate-200'
                    }`}>
                      <div className="text-right">
                        <span className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          ₹{flight.price}
                        </span>
                      </div>
                      <button
                        onClick={() => handleSelectFlight(flight)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md transition shrink-0"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div
                    className={`rounded-2xl p-3 border shadow-md flex items-center justify-center gap-1.5 flex-wrap transition ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => goToPage(safeCurrentPage - 1)}
                      disabled={safeCurrentPage === 1}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition ${
                        isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      ← Prev
                    </button>

                    {getPageNumbers().map((page, idx) =>
                      page === '...' ? (
                        <span key={`dots-${idx}`} className={`px-2 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          …
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                            page === safeCurrentPage
                              ? 'bg-blue-600 text-white shadow-md'
                              : isDarkMode
                              ? 'text-slate-300 hover:bg-slate-700'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => goToPage(safeCurrentPage + 1)}
                      disabled={safeCurrentPage === totalPages}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition ${
                        isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}