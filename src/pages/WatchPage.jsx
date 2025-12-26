import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data';
import { ArrowLeft, ChevronRight, ChevronLeft, BrainCircuit, Play } from 'lucide-react';

const WatchPage = () => {
  const { courseId, episodeId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const episode = course?.episodes.find(e => e.id === parseInt(episodeId));

  // Logic for Next/Previous Buttons
  const currentId = parseInt(episodeId);
  const nextEpisode = course?.episodes.find(e => e.id === currentId + 1);
  const prevEpisode = course?.episodes.find(e => e.id === currentId - 1);

  if (!episode) return <div className="p-10 text-white text-center">Episode not found</div>;

  return (
    <div className="watch-page-wrapper">
      
      {/* 1. TOP NAVIGATION BAR */}
      <div className="video-nav-bar">
        <Link to={`/series/${courseId}`} className="back-link">
          <ArrowLeft size={18} /> Back to Syllabus
        </Link>
        <span className="episode-badge">Episode {episode.id}</span>
      </div>

      <div className="cinema-container">
        
        {/* 2. THE VIDEO PLAYER */}
        <div className="video-frame-border">
          <div className="video-wrapper">
            <iframe 
              src={episode.videoUrl} 
              title={episode.title}
              allow="fullscreen"
              frameBorder="0"
            ></iframe>
          </div>
        </div>

        {/* 3. INFO & CONTROLS */}
        <div className="video-controls">
          <div className="video-text">
            <h1>{episode.title}</h1>
            <p>{episode.desc}</p>
          </div>

          <div className="action-buttons">
            <Link to={`/series/${courseId}/quiz/${episodeId}`} className="quiz-btn-large">
              <BrainCircuit size={20} /> Take Quiz
            </Link>
          </div>
        </div>

        {/* 4. FOOTER NAVIGATION (Prev/Next) */}
        <div className="episode-nav">
          {prevEpisode ? (
            <Link to={`/series/${courseId}/watch/${prevEpisode.id}`} className="nav-btn prev">
              <ChevronLeft size={20} /> Previous: {prevEpisode.title}
            </Link>
          ) : <div></div>}

          {nextEpisode && (
            <Link to={`/series/${courseId}/watch/${nextEpisode.id}`} className="nav-btn next">
              Next: {nextEpisode.title} <ChevronRight size={20} />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default WatchPage;