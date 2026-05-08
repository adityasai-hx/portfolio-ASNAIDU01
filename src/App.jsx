import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SuggestionsPage from './pages/SuggestionsPage';
import PhotographyPage from './pages/PhotographyPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router basename="/portfolio-ASNAIDU01">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
        <Route path="/photography" element={<PhotographyPage />} />
        {/* Fallback to Home for unknown routes */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
