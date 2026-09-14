import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { GetFlight } from '../api/api';

const AIRLINES_LIST = ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'Akasa Air'];
const FLIGHTS_PER_PAGE = 5;

export default function Flights() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search params passed from Hero.jsx ({ from, to, departureDate, returnDate, tripType })
  const searchState = location.state || {};
  const { from, to, departureDate, tripType } = searchState;

  // --- Filters & pagination now live in the URL, not local state ---
  // This is what makes the Back button restore exactly where you left off:
  // going back in history restores the previous URL, and we read state from it.

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

        // Adjust this depending on your API response structure
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

  // Small helper to patch just a few keys of the URL search params, keeping the rest intact
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

  // Extract just the city name from "Delhi (DEL)" -> "delhi" for matching against flight.from/to
  const getCityName = (value) => (value ? value.split(' (')[0].trim().toLowerCase() : null);

  // Convert a "DD/MM/YYYY" string (as stored in DB) to "YYYY-MM-DD" (as given by <input type="date">)
  // so both sides can be compared as plain strings.
  const normalizeToISO = (dateStr) => {
    if (!dateStr) return null;

    // already in ISO format (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

    // DB format DD/MM/YYYY
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      if (!day || !month || !year) return null;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    return null;
  };

  // Normalize an airline name for safe comparison (handles case/spacing differences from the DB)
  const normalizeAirline = (name) => (name ? name.trim().toLowerCase() : '');

  const fromCity = getCityName(from);
  const toCity = getCityName(to);
  const searchDateISO = departureDate || null; // already "YYYY-MM-DD" from the date input

  // First apply route + date filter (this is what the airline counts are based on)
  const routeDateFilteredFlights = flights.filter((flight) => {
    const flightFrom = flight.from?.trim().toLowerCase();
    const flightTo = flight.to?.trim().toLowerCase();
    const flightDateISO = normalizeToISO(flight.date);

    const matchesRoute = !fromCity || !toCity || (flightFrom === fromCity && flightTo === toCity);
    const matchesDate = !searchDateISO || flightDateISO === searchDateISO;

    return matchesRoute && matchesDate;
  });

  // Count how many flights (matching route/date) exist per airline, for the sidebar counts
  const airlineCounts = AIRLINES_LIST.reduce((acc, airline) => {
    acc[airline] = routeDateFilteredFlights.filter(
      (f) => normalizeAirline(f.airline) === normalizeAirline(airline)
    ).length;
    return acc;
  }, {});

  const normalizedSelectedAirlines = selectedAirlines.map(normalizeAirline);

  // Now apply airline + price filters on top
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

  // Toggle a single airline checkbox on/off — writes straight to the URL and resets to page 1
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

  // Handle Select Flight Button Click
  const handleSelectFlight = (flight) => {
    navigate('/flight-booking', { state: { flight } });
  };

  // Nicely formatted date for display in the summary bar, e.g. "2026-09-12" -> "12 Sep 2026"
  const formatDisplayDate = (isoStr) => {
    if (!isoStr) return null;
    const d = new Date(isoStr);
    if (isNaN(d)) return isoStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Build a compact page number list with ellipses for large page counts, e.g. 1 ... 4 5 6 ... 12
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
    <div className="bg-[#f4f7fb] min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Top Search Summary Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4 text-slate-800 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-3">
            <span className="text-blue-600 text-lg">✈</span>
            <span className={from ? '' : 'text-gray-400 font-medium'}>{from || 'Select From'}</span>
            <span className="text-gray-400">➔</span>
            <span className={to ? '' : 'text-gray-400 font-medium'}>{to || 'Select To'}</span>
          </div>

          <div className="flex items-center gap-6 text-gray-500 font-medium text-xs">
            <div className="flex items-center gap-1.5">
              <span>📅</span>
              <span className={departureDate ? '' : 'text-gray-400'}>
                {formatDisplayDate(departureDate) || 'Select Date'}
              </span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              ✏ Edit Search
            </button>
          </div>
        </div>

        {/* Main Content (Sidebar Filters + Flight Listing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Filters Sidebar */}
          <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-sm text-slate-900 border-b border-gray-100 pb-3">Filters</h3>

            {/* Airlines */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 mb-2.5">Airlines</h4>
              <div className="space-y-2 text-xs text-gray-600">
                {AIRLINES_LIST.map((airlineName, idx) => (
                  <label key={idx} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.map(normalizeAirline).includes(normalizeAirline(airlineName))}
                        onChange={() => toggleAirline(airlineName)}
                        className="rounded text-blue-600 focus:ring-0"
                      />
                      <span>{airlineName}</span>
                    </div>
                    <span className="text-gray-400 text-[10px]">{airlineCounts[airlineName] ?? 0}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold text-slate-700">Price Range</h4>
                <span className="text-[11px] font-semibold text-blue-600">₹3,000 - ₹{Number(priceRange).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="100000"
                step="500"
                value={priceRange}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Flight Listing Cards */}
          <div className="lg:col-span-9 space-y-4">
            {loading && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center text-sm text-gray-500">
                Loading flights...
              </div>
            )}

            {!loading && error && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center text-sm text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && filteredFlights.length === 0 && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center text-sm text-gray-500 space-y-1">
                <p className="font-semibold text-slate-700">No flights found</p>
                <p>
                  No flights match your current filters
                  {from && to ? (
                    <> from <span className="font-semibold">{from}</span> to{' '}
                    <span className="font-semibold">{to}</span></>
                  ) : null}
                  {departureDate ? (
                    <> on <span className="font-semibold">{formatDisplayDate(departureDate)}</span></>
                  ) : null}
                  . Try adjusting the airline or price filters.
                </p>
              </div>
            )}

            {!loading && !error && filteredFlights.length > 0 && (
              <>
                {/* Results count */}
                <div className="text-xs text-gray-500 font-medium px-1">
                  Showing {(safeCurrentPage - 1) * FLIGHTS_PER_PAGE + 1}
                  –{Math.min(safeCurrentPage * FLIGHTS_PER_PAGE, filteredFlights.length)} of{' '}
                  {filteredFlights.length} flights
                </div>

                {paginatedFlights.map((flight) => (
                  <div
                    key={flight._id || flight.id}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    {/* Airline Name & Flight Number */}
                    <div className="w-full sm:w-32">
                      <span className={`text-base font-extrabold block ${flight.color}`}>
                        {flight.airline}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold">{flight.Aircraft}</span>
                    </div>

                    {/* Route and Timings */}
                    <div className="flex items-center gap-6 sm:gap-10 text-center flex-1 justify-center">
                      <div>
                        <div className="text-base font-bold text-slate-900">{flight.departureTime}</div>
                        <div className="text-[11px] text-gray-400 font-medium">{flight.from}</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 my-0.5">
                          <div className="w-8 sm:w-12 h-[1px] bg-gray-300"></div>
                          <span className="text-gray-300 text-xs">✈</span>
                          <div className="w-8 sm:w-12 h-[1px] bg-gray-300"></div>
                        </div>
                      </div>

                      <div>
                        <div className="text-base font-bold text-slate-900">{flight.arrivalTime}</div>
                        <div className="text-[11px] text-gray-400 font-medium">{flight.to}</div>
                      </div>
                    </div>

                    {/* Price and Action Button */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                      <div className="text-right">
                        <span className="text-lg font-extrabold text-slate-900">₹{flight.price}</span>
                      </div>
                      <button
                        onClick={() => handleSelectFlight(flight)}
                        className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md transition"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center justify-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => goToPage(safeCurrentPage - 1)}
                      disabled={safeCurrentPage === 1}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                    >
                      ← Prev
                    </button>

                    {getPageNumbers().map((page, idx) =>
                      page === '...' ? (
                        <span key={`dots-${idx}`} className="px-2 text-xs text-gray-400">
                          …
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                            page === safeCurrentPage
                              ? 'bg-[#1d6bf3] text-white shadow-md'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => goToPage(safeCurrentPage + 1)}
                      disabled={safeCurrentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
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