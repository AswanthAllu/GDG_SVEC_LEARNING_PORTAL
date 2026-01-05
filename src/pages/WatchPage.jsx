import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data';
import { ArrowLeft, ChevronRight, ChevronLeft, BrainCircuit } from 'lucide-react';

const WatchPage = () => {
  const { courseId, episodeId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const episode = course?.episodes.find(e => e.id === parseInt(episodeId));

  const currentId = parseInt(episodeId);
  const nextEpisode = course?.episodes.find(e => e.id === currentId + 1);
  const prevEpisode = course?.episodes.find(e => e.id === currentId - 1);

  if (!episode) return <div className="p-10 text-white text-center">Episode not found</div>;

  return (
    <div className="watch-page-wrapper">
      
      {/* 1. TOP NAVIGATION */}
      <div className="video-nav-bar">
        <Link to={`/series/${courseId}`} className="back-link">
          <ArrowLeft size={18} />
        </Link>
        <span className="episode-badge">Episode {episode.id}</span>
      </div>

      <div className="cinema-container">
          <div className="video-text">
            <h1 style={{ fontSize: "1.3rem", textAlign: "center", marginBottom: "20px" }}>{episode.title}</h1>
          </div>
          
        {/* 2. VIDEO PLAYER (FIXED FOR MOBILE) */}
        <div className="video-frame-border">
          <div className="video-wrapper">
            <iframe 
              src={episode.videoUrl} 
              title={episode.title}
              // FIX: Specific mobile permissions
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              // FIX: Prevent mobile fullscreen takeover
              playsInline 
              webkit-playsinline="true"
            ></iframe>
          </div>
        </div>

        {/* 3. CONTROLS */}
        <div className="video-controls" style={{ justifyContent: 'center', marginTop: '20px' }}>
          <div className="action-buttons">
            <Link to={`/series/${courseId}/quiz/${episodeId}`} className="quiz-btn-large">
              <BrainCircuit size={20} /> Take Quiz
            </Link>
          </div>
        </div>

        {/* 4. FOOTER NAV */}
        <div className="episode-nav">
          {prevEpisode ? (
            <Link to={`/series/${courseId}/watch/${prevEpisode.id}`} className="nav-btn prev">
              <ChevronLeft size={20} /> Prev
            </Link>
          ) : <div></div>}

          {nextEpisode && (
            <Link to={`/series/${courseId}/watch/${nextEpisode.id}`} className="nav-btn next">
              Next <ChevronRight size={20} />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default WatchPage;