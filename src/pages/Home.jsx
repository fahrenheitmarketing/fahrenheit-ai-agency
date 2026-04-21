import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesOverview from '../components/home/ServicesOverview';
import TrustSection from '../components/home/TrustSection';
import RetainerBanner from '../components/home/RetainerBanner';
import ProcessSection from '../components/home/ProcessSection';
import CTASection from '../components/shared/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <TrustSection />
      <ProcessSection />
      <RetainerBanner />
      <CTASection />
    </>
  );
}