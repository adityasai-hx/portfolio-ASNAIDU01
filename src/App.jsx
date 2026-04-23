import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SuggestionsPage from './pages/SuggestionsPage';
import PhotographyPage from './pages/PhotographyPage';

function App() {
  return (
    <Router>
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
