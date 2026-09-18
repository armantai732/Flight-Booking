import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // ================================
    // Dynamic Theme State Setup
    // ================================
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("appTheme") === "dark";
    });

    useEffect(() => {
        const handleThemeChange = () => {
            const currentTheme = localStorage.getItem("appTheme");
            setIsDark(currentTheme === "dark");
        };

        // Custom Event Listener listen karega jo ThemeSettings se dispatch ho raha hai
        window.addEventListener('themeChange', handleThemeChange);

        return () => {
            window.removeEventListener('themeChange', handleThemeChange);
        };
    }, []);

    // Active link check
    const isActive = (path) => location.pathname === path;

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        toast.success("Logout Successfully!");

        navigate("/login");
    };

    return (
        <nav
            className={`
                sticky top-0 z-50 border-b shadow-sm transition-colors duration-300
                ${isDark
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-gray-100"
                }
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-[#1d6bf3] text-white p-1.5 rounded-xl">
                            <svg
                                className="w-5 h-5 transform -rotate-45"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                            </svg>
                        </div>

                        <span
                            className={`
                                text-xl font-extrabold tracking-tight
                                ${isDark
                                    ? "text-white"
                                    : "text-[#0c2340]"
                                }
                            `}
                        >
                            SkyFly
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 text-xs font-semibold">

                        <Link
                            to="/"
                            className={`
                                transition
                                ${isActive('/')
                                    ? 'text-[#1d6bf3]'
                                    : isDark
                                        ? 'text-slate-300 hover:text-[#1d6bf3]'
                                        : 'text-gray-600 hover:text-[#1d6bf3]'
                                }
                            `}
                        >
                            Home
                        </Link>

                        <Link
                            to="/flights"
                            className={`
                                transition
                                ${isActive('/flights')
                                    ? 'text-[#1d6bf3]'
                                    : isDark
                                        ? 'text-slate-300 hover:text-[#1d6bf3]'
                                        : 'text-gray-600 hover:text-[#1d6bf3]'
                                }
                            `}
                        >
                            Flights
                        </Link>

                        <Link
                            to="/about"
                            className={`
                                transition
                                ${isActive('/about')
                                    ? 'text-[#1d6bf3]'
                                    : isDark
                                        ? 'text-slate-300 hover:text-[#1d6bf3]'
                                        : 'text-gray-600 hover:text-[#1d6bf3]'
                                }
                            `}
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className={`
                                transition
                                ${isActive('/contact')
                                    ? 'text-[#1d6bf3]'
                                    : isDark
                                        ? 'text-slate-300 hover:text-[#1d6bf3]'
                                        : 'text-gray-600 hover:text-[#1d6bf3]'
                                }
                            `}
                        >
                            Contact
                        </Link>

                    </div>

                    {/* Right Side Buttons */}
                    <div className="hidden md:flex items-center space-x-3">

                        {token ? (
                            <>
                                <Link
                                    to="/my-bookings"
                                    className={`
                                        text-xs font-semibold px-3 py-2 transition
                                        ${isDark
                                            ? "text-slate-300 hover:text-[#1d6bf3]"
                                            : "text-gray-700 hover:text-[#1d6bf3]"
                                        }
                                    `}
                                >
                                    My Booking
                                </Link>

                                <Link
                                    to="/profile"
                                    className={`
                                        text-xs font-semibold px-3 py-2 transition
                                        ${isDark
                                            ? "text-slate-300 hover:text-[#1d6bf3]"
                                            : "text-gray-700 hover:text-[#1d6bf3]"
                                        }
                                    `}
                                >
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm hover:shadow transition duration-200"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`
                                        text-xs font-semibold px-3 py-2 transition
                                        ${isDark
                                            ? "text-slate-300 hover:text-[#1d6bf3]"
                                            : "text-gray-700 hover:text-[#1d6bf3]"
                                        }
                                    `}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm hover:shadow transition duration-200"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`
                                hover:text-[#1d6bf3] focus:outline-none p-2
                                ${isDark ? "text-slate-300" : "text-gray-600"}
                            `}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>

                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className={`
                        md:hidden border-b px-4 pt-2 pb-4 space-y-2 text-xs font-semibold
                        ${isDark
                            ? "bg-slate-900 border-slate-800"
                            : "bg-white border-gray-100"
                        }
                    `}
                >
                    <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 ${isActive('/') ? 'text-[#1d6bf3]' : isDark ? 'text-slate-300' : 'text-gray-600'}`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/flights"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 ${isActive('/flights') ? 'text-[#1d6bf3]' : isDark ? 'text-slate-300' : 'text-gray-600'}`}
                    >
                        Flights
                    </Link>

                    <Link
                        to="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 ${isActive('/about') ? 'text-[#1d6bf3]' : isDark ? 'text-slate-300' : 'text-gray-600'}`}
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 ${isActive('/contact') ? 'text-[#1d6bf3]' : isDark ? 'text-slate-300' : 'text-gray-600'}`}
                    >
                        Contact
                    </Link>

                    <div
                        className={`pt-2 border-t flex flex-col gap-2 ${isDark ? "border-slate-800" : "border-gray-100"}`}
                    >
                        {token ? (
                            <>
                                <Link
                                    to="/my-bookings"
                                    className={`text-xs font-semibold px-3 py-2 transition ${isDark ? "text-slate-300 hover:text-[#1d6bf3]" : "text-gray-700 hover:text-[#1d6bf3]"}`}
                                >
                                    My Booking
                                </Link>

                                <Link
                                    to="/profile"
                                    className={`text-xs font-semibold px-3 py-2 transition ${isDark ? "text-slate-300 hover:text-[#1d6bf3]" : "text-gray-700 hover:text-[#1d6bf3]"}`}
                                >
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm hover:shadow transition duration-200 text-left"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`text-xs font-semibold px-3 py-2 transition ${isDark ? "text-slate-300 hover:text-[#1d6bf3]" : "text-gray-700 hover:text-[#1d6bf3]"}`}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm hover:shadow transition duration-200 text-center"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}