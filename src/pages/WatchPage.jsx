import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  BrainCircuit,
  List,
  X,
  Maximize2,
  Minimize2,
  NotebookPen,
} from 'lucide-react';

const WatchPage = () => {
  const { courseId, episodeId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const episode = course?.episodes.find(e => e.id === parseInt(episodeId));

  const currentId = parseInt(episodeId);
  const nextEpisode = course?.episodes.find(e => e.id === currentId + 1);
  const prevEpisode = course?.episodes.find(e => e.id === currentId - 1);

  if (!episode) return <div className="p-10 text-white text-center">Episode not found</div>;

  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [noteStatus, setNoteStatus] = useState(''); // '', 'Saving…', 'Saved'
  const saveTimerRef = useRef(null);
  const [playerSrc, setPlayerSrc] = useState(episode.videoUrl);

  const lastWatchedKey = 'gdg:lastWatched';
  const notesKey = `gdg:notes:${courseId}:${episodeId}`;

  useEffect(() => {
    // keep iframe src in sync when switching episodes
    setPlayerSrc(episode.videoUrl);
  }, [episode.videoUrl]);

  // Persist "Continue Watching" pointer (course + episode)
  useEffect(() => {
    try {
      const payload = {
        courseId,
        episodeId: Number(episodeId),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(lastWatchedKey, JSON.stringify(payload));
    } catch (e) {
      // ignore storage failures (private mode / blocked)
    }
  }, [courseId, episodeId]);

  // Focus mode: hide header/footer and maximize viewing area (no backend needed)
  useEffect(() => {
    try {
      if (isFocusMode) document.body.classList.add('focus-mode');
      else document.body.classList.remove('focus-mode');
    } catch (e) {
      // ignore
    }
    return () => {
      try {
        document.body.classList.remove('focus-mode');
      } catch (e) {
        // ignore
      }
    };
  }, [isFocusMode]);

  const episodeList = useMemo(() => course?.episodes ?? [], [course]);

  // Load notes for this episode
  useEffect(() => {
    try {
      const raw = localStorage.getItem(notesKey);
      setNoteText(raw || '');
      setNoteStatus('');
    } catch (e) {
      setNoteText('');
      setNoteStatus('');
    }
    // cleanup any pending save when switching episodes
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [notesKey]);

  // Auto-save notes (debounced)
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setNoteStatus(noteText ? 'Saving…' : '');

    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(notesKey, noteText);
        setNoteStatus(noteText ? 'Saved' : '');
      } catch (e) {
        setNoteStatus('');
      }
    }, 500);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [noteText, notesKey]);

  return (
    <div className="watch-page-wrapper">
      
      {/* 1. TOP NAVIGATION */}
      <div className="video-nav-bar">
        <Link to={`/series/${courseId}`} className="back-link">
          <ArrowLeft size={18} />
        </Link>
        <span className="episode-badge">Episode {episode.id}</span>

        <button
          type="button"
          className="playlist-toggle"
          onClick={() => setIsPlaylistOpen(true)}
          aria-label="Open episode list"
        >
          <List size={18} /> Episodes
        </button>

        <button
          type="button"
          className="focus-toggle"
          onClick={() => setIsFocusMode((v) => !v)}
          aria-label={isFocusMode ? 'Exit focus mode' : 'Enter focus mode'}
        >
          {isFocusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          {isFocusMode ? 'Exit Focus' : 'Focus Mode'}
        </button>
      </div>

      <div className="watch-layout">
        {/* Left: Video */}
        <div className="cinema-container">
          <div className="video-text">
            <h1 style={{ fontSize: "1.3rem", textAlign: "center", marginBottom: "20px" }}>{episode.title}</h1>
          </div>
          
        {/* 2. VIDEO PLAYER (FIXED FOR MOBILE) */}
        <div className="video-frame-border">
          <div className="video-wrapper">
            <iframe 
              key={playerSrc}
              src={playerSrc} 
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
        <div className="video-controls">
          <div className="video-actions-row">
            <Link to={`/series/${courseId}/quiz/${episodeId}`} className="quiz-btn-large">
              <BrainCircuit size={20} /> Take Quiz
            </Link>
          </div>
        </div>

        {/* 3.5 NOTES (Student-friendly) */}
        <div className="notes-card">
          <div className="notes-header">
            <div className="notes-title">
              <NotebookPen size={18} /> Notes for this Episode
            </div>
            {noteStatus && <span className="notes-status">{noteStatus}</span>}
          </div>
          <textarea
            className="notes-textarea"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your key points here… (auto-saved)"
            rows={6}
          />
          <div className="notes-hint">
            Tip: write summary + important definitions. Your notes are saved on this device.
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

      {/* Right: Desktop playlist */}
      <aside className="episode-sidebar">
        <div className="episode-sidebar-header">
          <h3>Episodes</h3>
          <span className="episode-count">{episodeList.length}</span>
        </div>
        <div className="episode-sidebar-list">
          {episodeList.map((ep) => {
            const isActive = ep.id === Number(episodeId);
            return (
              <Link
                key={ep.id}
                to={`/series/${courseId}/watch/${ep.id}`}
                className={`episode-item ${isActive ? 'active' : ''}`}
              >
                <span className="episode-item-id">EP {ep.id}</span>
                <span className="episode-item-title">{ep.title}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile playlist drawer */}
      {isPlaylistOpen && (
        <div className="episode-drawer-overlay" role="dialog" aria-modal="true">
          <div className="episode-drawer">
            <div className="episode-drawer-header">
              <h3>Episodes</h3>
              <button
                type="button"
                className="drawer-close"
                onClick={() => setIsPlaylistOpen(false)}
                aria-label="Close episode list"
              >
                <X size={18} />
              </button>
            </div>
            <div className="episode-drawer-list">
              {episodeList.map((ep) => {
                const isActive = ep.id === Number(episodeId);
                return (
                  <Link
                    key={ep.id}
                    to={`/series/${courseId}/watch/${ep.id}`}
                    className={`episode-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsPlaylistOpen(false)}
                  >
                    <span className="episode-item-id">EP {ep.id}</span>
                    <span className="episode-item-title">{ep.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default WatchPage;