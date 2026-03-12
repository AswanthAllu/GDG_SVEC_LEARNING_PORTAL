import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

const Home = () => {
  const lastWatched = useMemo(() => {
    try {
      const raw = localStorage.getItem('gdg:lastWatched');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const resumeCourse = lastWatched ? courses.find((c) => c.id === lastWatched.courseId) : null;
  const resumeEpisode =
    lastWatched && resumeCourse
      ? resumeCourse.episodes.find((e) => e.id === Number(lastWatched.episodeId))
      : null;

  return (
    <div className="home-wrapper">
      
      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="hero-badge">
          <Sparkles size={16} /> Official Learning Portal
        </div>
        <h1 className="hero-title">
          GDG <span className="highlight-text">SVEC</span>
        </h1>
        <p className="hero-subtitle">
          Empowering students to build the future. 
          Dive into our curated tech series, master new skills, and innovate with code.
        </p>
      </div>

      {/* CONTINUE WATCHING */}
      {resumeCourse && resumeEpisode && (
        <div className="resume-strip">
          <div className="resume-strip-content">
            <div className="resume-strip-text">
              <span className="resume-label">Continue Watching</span>
              <div className="resume-title">
                {resumeCourse.title} — EP {resumeEpisode.id}: {resumeEpisode.title}
              </div>
            </div>
            <Link to={`/series/${resumeCourse.id}/watch/${resumeEpisode.id}`} className="resume-btn">
              <Play size={18} /> Resume
            </Link>
          </div>
        </div>
      )}

      {/* CARDS GRID */}
      <div className="course-grid">
        {/* Added the 'index' parameter here 👇 */}
        {courses.map((course, index) => (
          <div key={course.id} className="course-card">
            <div className={`card-banner ${course.episodes.length === 0 ? 'locked' : ''}`}>
              <span className="course-icon">{course.icon}</span>
            </div>
            
            <div className="card-content">
              {/* Used the index to dynamically output Series 1, Series 2, etc. 👇 */}
              <span className="series-label">SERIES {index + 1}</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              
              <div className="card-footer">
                {course.episodes.length > 0 ? (
                  <Link to={`/series/${course.id}`} className="btn-start">
                    Start Learning <ArrowRight size={16} />
                  </Link>
                ) : (
                  <button className="btn-disabled">Coming Soon</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;