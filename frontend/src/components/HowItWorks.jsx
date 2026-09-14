import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Search Flight',
      desc: 'Enter your journey details',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      number: '2',
      title: 'Select Flight',
      desc: 'Choose the best option',
      icon: (
        <svg className="w-6 h-6 text-blue-600 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
    {
      number: '3',
      title: 'Enter Details',
      desc: 'Fill passenger information',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      number: '4',
      title: 'Pay & Book',
      desc: 'Make secure payment',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const airlines = [
    { name: 'IndiGo', color: 'text-indigo-900', font: 'font-extrabold' },
    { name: 'AIR INDIA', color: 'text-red-600', font: 'font-bold' },
    { name: 'SpiceJet', color: 'text-red-500', font: 'font-black italic' },
    { name: 'VISTARA', color: 'text-purple-900', font: 'font-bold tracking-wider' },
    { name: 'Akasa Air', color: 'text-orange-600', font: 'font-extrabold' },
  ];

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: How It Works (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How It Works</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Book your flight in 4 simple steps</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Step Item */}
                <div className="flex flex-col items-center text-center relative w-full md:w-auto">
                  
                  {/* Badge & Circle Icon */}
                  <div className="relative mb-3">
                    <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                      {step.number}
                    </span>
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-800">{step.title}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">{step.desc}</p>
                </div>

                {/* Arrow Divider (Desktop only) */}
                {idx !== steps.length - 1 && (
                  <div className="hidden md:block text-gray-300 text-sm font-light">
                    ➔
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Top Airlines (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Top Airlines</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Fly with the best</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {airlines.slice(0, 3).map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-3 h-16 border border-gray-100 shadow-sm flex items-center justify-center">
                <span className={`text-xs ${item.color} ${item.font}`}>{item.name}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {airlines.slice(3, 5).map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-3 h-16 border border-gray-100 shadow-sm flex items-center justify-center">
                <span className={`text-xs ${item.color} ${item.font}`}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}