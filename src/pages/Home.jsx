import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data';
import { Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
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

      {/* CARDS GRID */}
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className={`card-banner ${course.episodes.length === 0 ? 'locked' : ''}`}>
              <span className="course-icon">{course.icon}</span>
            </div>
            
            <div className="card-content">
              <span className="series-label">Series 1</span>
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