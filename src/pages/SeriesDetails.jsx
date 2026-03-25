import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data';
import { PlayCircle, Play } from 'lucide-react';

const SeriesDetails = () => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);

  if (!course) return <div className="text-white text-center mt-10">Course not found</div>;

  const resumeEpisode = useMemo(() => {
    try {
      const raw = localStorage.getItem('gdg:lastWatched');
      const lastWatched = raw ? JSON.parse(raw) : null;
      if (!lastWatched || lastWatched.courseId !== courseId) return null;
      return course.episodes.find((e) => e.id === Number(lastWatched.episodeId)) || null;
    } catch (e) {
      return null;
    }
  }, [courseId, course.episodes]);

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h1>{course.title}</h1>
        <p>Follow the roadmap below to master the skills.</p>

        {resumeEpisode && (
          <div className="timeline-resume">
            <Link to={`/series/${courseId}/watch/${resumeEpisode.id}`} className="resume-btn">
              <Play size={18} /> Resume EP {resumeEpisode.id}
            </Link>
          </div>
        )}
      </div>

      <div className="timeline-container">
        {course.episodes.map((ep) => (
          <div key={ep.id} className="card-wrapper">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <span className="tag">Episode {ep.id}</span>
              <h2>{ep.title}</h2>
              <p>{ep.desc}</p>
              <Link to={`/series/${courseId}/watch/${ep.id}`} className="watch-btn">
                <PlayCircle size={18} /> Watch Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesDetails;