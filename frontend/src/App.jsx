import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import CollegeDetails from './pages/CollegeDetails';
import Chatbot from './chatbot/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative font-sans text-slate-800 bg-slate-50">
        <Navbar />
        <main className="pt-20 pb-16 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/college/:id" element={<CollegeDetails />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
