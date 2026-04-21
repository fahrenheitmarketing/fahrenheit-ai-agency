import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ClientMarquee from '../components/home/ClientMarquee';
import ServicesOverview from '../components/home/ServicesOverview';
import ReposSection from '../components/home/ReposSection';
import OutcomesSection from '../components/home/OutcomesSection';
import ProcessSection from '../components/home/ProcessSection';
import CTASection from '../components/shared/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientMarquee />
      <ServicesOverview />
      <ReposSection />
      <OutcomesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}