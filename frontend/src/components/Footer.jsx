import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#001935] text-white border-t border-white/10 pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
          
          {/* Column 1: Brand Logo & Social */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="w-7 h-7 text-white -rotate-45" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
              <span className="text-xl font-bold tracking-wide">SkyFly</span>
            </Link>

            <p className="text-xs text-gray-400 mt-2">
              Your journey, our priority.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 mt-5">
              {['f', 'ig', 'X', 'yt', 'in'].map((icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 transition flex items-center justify-center text-xs font-bold text-white border border-white/10"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/flights" className="hover:text-blue-400 transition">Flights</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition">My Bookings</a></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Refund Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Contact Us</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✉</span>
                <span>support@skyfly.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Download Our App */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Download Our App</h4>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              {/* Google Play Button */}
              <a href="#" className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 rounded-lg transition">
                <span className="text-lg">▶</span>
                <div className="text-left">
                  <span className="text-[9px] block text-gray-300 uppercase leading-none">GET IT ON</span>
                  <span className="text-xs font-semibold text-white block">Google Play</span>
                </div>
              </a>

              {/* App Store Button */}
              <a href="#" className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 rounded-lg transition">
                <span className="text-lg">🍏</span>
                <div className="text-left">
                  <span className="text-[9px] block text-gray-300 uppercase leading-none">Download on the</span>
                  <span className="text-xs font-semibold text-white block">App Store</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© 2026 SkyFly. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}