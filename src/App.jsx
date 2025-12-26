import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SeriesDetails from './pages/SeriesDetails';
import WatchPage from './pages/WatchPage';
import QuizPage from './pages/QuizPage'; // We will create this next

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/series/:courseId" element={<SeriesDetails />} />
            <Route path="/series/:courseId/watch/:episodeId" element={<WatchPage />} />
            <Route path="/series/:courseId/quiz/:episodeId" element={<QuizPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;