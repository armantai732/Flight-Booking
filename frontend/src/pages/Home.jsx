import React from 'react';
import Hero from '../components/Hero';
import PopularDestinations from '../components/PopularDestinations';
import FeaturedFlights from '../components/FeaturedFlights';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import CustomerReviews from '../components/CustomerReviews';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularDestinations />
      <FeaturedFlights />
      <WhyChooseUs />
      <HowItWorks />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
}