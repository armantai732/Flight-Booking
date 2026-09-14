import React from 'react';

export default function CustomerReviews() {
  const reviews = [
    {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      rating: 5,
      comment: '"Amazing experience! The booking process was super easy and the prices were really good. Will book again for sure!"',
      location: 'Mumbai, India',
    },
    {
      name: 'Rahul Verma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      rating: 5,
      comment: '"Great service and very responsive support team. Got my tickets without any hassle. Highly recommended!"',
      location: 'Delhi, India',
    },
    {
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      rating: 5,
      comment: '"Best platform for flight booking. Lots of options and the UI is very user-friendly. Loved it!"',
      location: 'Bengaluru, India',
    },
  ];

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Customer Reviews</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">What our customers say about us</p>
          </div>
          <a href="#" className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All Reviews ➔
          </a>
        </div>

        {/* Carousel / Cards Container with Navigation Buttons */}
        <div className="relative flex items-center">
          
          {/* Left Arrow Button */}
          <button className="hidden sm:flex absolute -left-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-600 hover:bg-gray-50 transition">
            ⟨
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-3">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{review.name}</h3>
                      
                      {/* Star Rating */}
                      <div className="flex text-amber-400 text-xs mt-0.5">
                        {'★'.repeat(review.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-gray-600 leading-relaxed italic mt-3">
                    {review.comment}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-6 pt-3 border-t border-gray-50">
                  <span className="text-blue-500">📍</span>
                  <span>{review.location}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button className="hidden sm:flex absolute -right-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-600 hover:bg-gray-50 transition">
            ⟩
          </button>

        </div>

      </div>
    </section>
  );
}