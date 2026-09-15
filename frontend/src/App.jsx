import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Flights from './pages/Flights';
import FlightBooking from './pages/FlightBooking';
import Checkout from './pages/Checkout';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import AdminFlights from './pages/AdminFlights';
import ScrollToTop from './components/ScrollToTop';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import BookingSuccessModal from './components/BookingSuccessModal';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
import AddFlight from './pages/AddFlight';
import ManageFlights from './pages/ManageFlights';
import Bookings from './pages/Bookings';


function AppContent() {

  const location = useLocation();

  // Admin ke saare pages
  const isAdminPage = location.pathname.startsWith('/admin');
  const bookingstatus = location.pathname.startsWith('/bookingstatus');


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none">

      {/* Navbar - Admin pages par hide */}
      {!isAdminPage && !bookingstatus && <Navbar />}

      {/* Main Content */}
      <main className="flex-grow">
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/flight-booking" element={<FlightBooking />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/flights" element={<AdminFlights />} />
          <Route path="/admin/addflight" element={<AddFlight />} />
          <Route path="/admin/manage-flights" element={<ManageFlights />} />
          <Route path="/admin/bookings" element={<Bookings />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/bookingstatus" element={<BookingSuccessModal />} />
        </Routes>

      </main>

      {/* Footer - Admin pages par hide */}
      {!isAdminPage && !bookingstatus &&  <Footer />}

    </div>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;