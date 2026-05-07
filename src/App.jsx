import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import SEO from './pages/services/SEO';
import SEM from './pages/services/SEM';
import SMM from './pages/services/SMM';
import CRO from './pages/services/CRO';
import Strategy from './pages/services/Strategy';
import MarketingAutomation from './pages/services/MarketingAutomation';
import SoftwareDevelopment from './pages/services/SoftwareDevelopment';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';
import CaseStudies from './pages/CaseStudies';
import Services from './pages/Services';
import TopMarketingAgenciesUSA from './pages/TopMarketingAgenciesUSA';
import AustinTX from './pages/locations/AustinTX';
import RoundRockTX from './pages/locations/RoundRockTX';
import CedarParkTX from './pages/locations/CedarParkTX';
import GeorgetownTX from './pages/locations/GeorgetownTX';
import KyleBudaTX from './pages/locations/KyleBudaTX';
import BastropTX from './pages/locations/BastropTX';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services/seo" element={<SEO />} />
        <Route path="/services/sem" element={<SEM />} />
        <Route path="/services/smm" element={<SMM />} />
        <Route path="/services/cro" element={<CRO />} />
        <Route path="/services/strategy" element={<Strategy />} />
        <Route path="/services/marketing-automation" element={<MarketingAutomation />} />
        <Route path="/services/software-development" element={<SoftwareDevelopment />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services/:serviceSlug/:postSlug" element={<BlogPostPage />} />
        <Route path="/services/strategy/top-10-marketing-agencies-usa" element={<TopMarketingAgenciesUSA />} />
        <Route path="/digital-marketing-agency-austin-tx" element={<AustinTX />} />
        <Route path="/digital-marketing-agency-round-rock-tx" element={<RoundRockTX />} />
        <Route path="/digital-marketing-agency-cedar-park-tx" element={<CedarParkTX />} />
        <Route path="/digital-marketing-agency-georgetown-tx" element={<GeorgetownTX />} />
        <Route path="/digital-marketing-agency-kyle-buda-tx" element={<KyleBudaTX />} />
        <Route path="/digital-marketing-agency-bastrop-tx" element={<BastropTX />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App