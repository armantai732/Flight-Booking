import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Reusable Back Button.
 * Usage: <BackButton /> or <BackButton label="Back to Flights" />
 * Drop it into any page — it always goes one step back in browser history.
 */
export default function BackButton({ label = 'Back', className = '' }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition ${className}`}
    >
      <span className="text-base leading-none">←</span>
      <span>{label}</span>
    </button>
  );
}