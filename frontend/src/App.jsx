import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Directory from './pages/Directory';
import Events from './pages/Events';
import ContactUs from './pages/ContactUs';
import DirectoryStartupTemplate from './pages/DirectoryStartupTemplate';
import DirectoryConsortiumTemplate from './pages/DirectoryConsortiumTemplate';
import EventNewsTemplate from './pages/EventNewsTemplate';
import analytics from './services/analyticsTracker';
import './App.css';

// Analytics tracking wrapper component
function AnalyticsWrapper({ children }) {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view when location changes
    analytics.trackPageView(location.pathname, document.title);
  }, [location]);
  
  return children;
}

function App() {
  useEffect(() => {
    // Initialize analytics tracking
    analytics.init();
  }, []);

  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/SCALE-NCR-WEBSITE-GITHUBPAGES' : ''}>
      <AnalyticsWrapper>
        <ScrollToTop />
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/directory/startup/:slug" element={<DirectoryStartupTemplate />} />
              <Route path="/directory/consortium/:slug" element={<DirectoryConsortiumTemplate />} />
              <Route path="/events/:slug" element={<EventNewsTemplate />} />
            </Routes>
          </Layout>
        </div>
      </AnalyticsWrapper>
    </Router>
  );
}

export default App;