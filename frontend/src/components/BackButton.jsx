import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Reusable Back Button with LocalStorage Theme Support.
 * Usage: <BackButton /> or <BackButton label="Back to Flights" />
 */
export default function BackButton({ label = 'Back', className = '' }) {
  const navigate = useNavigate();

  // LocalStorage માંથી appTheme મેળવવું (Default: 'dark')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'dark';
  });

  useEffect(() => {
    // LocalStorage માં appTheme નો બદલાવ સાંભળવા માટેનો ઈવેન્ટ
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem('appTheme') || 'dark';
      setTheme(currentTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition ${
        isDark 
          ? 'text-slate-300 hover:text-blue-400' 
          : 'text-slate-600 hover:text-blue-600'
      } ${className}`}
    >
      <span className="text-base leading-none">←</span>
      <span>{label}</span>
    </button>
  );
}