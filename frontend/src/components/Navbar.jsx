import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Active link check કરવા માટેનું helper function
    const isActive = (path) => location.pathname === path;

    const token = localStorage.getItem("token");
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("Logout Successfully!");

    navigate("/login");
};

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-[#1d6bf3] text-white p-1.5 rounded-xl">
                            <svg className="w-5 h-5 transform -rotate-45" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                            </svg>
                        </div>
                        <span className="text-xl font-extrabold text-[#0c2340] tracking-tight">
                            SkyFly
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 text-xs font-semibold">
                        <Link
                            to="/"
                            className={`transition ${isActive('/') ? 'text-[#1d6bf3]' : 'text-gray-600 hover:text-[#1d6bf3]'
                                }`}
                        >
                            Home
                        </Link>

                        <Link
                            to="/flights"
                            className={`transition ${isActive('/flights') ? 'text-[#1d6bf3]' : 'text-gray-600 hover:text-[#1d6bf3]'
                                }`}
                        >
                            Flights
                        </Link>

                        <Link
                            to="/about"
                            className={`transition ${isActive('/about') ? 'text-[#1d6bf3]' : 'text-gray-600 hover:text-[#1d6bf3]'
                                }`}
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className={`transition ${isActive('/contact') ? 'text-[#1d6bf3]' : 'text-gray-600 hover:text-[#1d6bf3]'
                                }`}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Right Side Buttons (Login / Sign Up) */}
                    <div className="hidden md:flex items-center space-x-3">
                        {
                            token ? (
                                <>
                                    <Link
                                        to="/my-bookings"
                                        className="text-xs font-semibold text-gray-700 hover:text-[#1d6bf3] px-3 py-2 transition"
                                    >
                                        My Booking
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="text-xs font-semibold text-gray-700 hover:text-[#1d6bf3] px-3 py-2 transition"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        onClick={handleLogout}
                                        to="/login"
                                        className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm hover:shadow transition duration-200"
                                    >
                                        Log Out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-xs font-semibold text-gray-700 hover:text-[#1d6bf3] px-3 py-2 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm hover:shadow transition duration-200"
                                    >
                                        Sign Up
                                    </Link></>
                            )
                        }
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-2 text-xs font-semibold">
                    <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 ${isActive('/') ? 'text-[#1d6bf3]' : 'text-gray-600'}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/flights"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 ${isActive('/flights') ? 'text-[#1d6bf3]' : 'text-gray-600'}`}
                    >
                        Flights
                    </Link>
                    <Link
                        to="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 ${isActive('/about') ? 'text-[#1d6bf3]' : 'text-gray-600'}`}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 ${isActive('/contact') ? 'text-[#1d6bf3]' : 'text-gray-600'}`}
                    >
                        Contact
                    </Link>

                    <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                        {
                            token ? (
                                <>
                                    <Link
                                        to="/my-bookings"
                                        className="text-xs font-semibold text-gray-700 hover:text-[#1d6bf3] px-3 py-2 transition"
                                    >
                                        My Booking
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="text-xs font-semibold text-gray-700 hover:text-[#1d6bf3] px-3 py-2 transition"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        onClick={handleLogout}
                                        to="/login"
                                        className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm hover:shadow transition duration-200"
                                    >
                                        Log Out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-xs font-semibold text-gray-700 hover:text-[#1d6bf3] px-3 py-2 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm hover:shadow transition duration-200"
                                    >
                                        Sign Up
                                    </Link></>
                            )
                        }
                    </div>
                </div>
            )}
        </nav>
    );
}