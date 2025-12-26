import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data';
import { CheckCircle, XCircle, Clock, Trophy, ArrowRight, RefreshCcw } from 'lucide-react';

const QuizPage = () => {
  const { courseId, episodeId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const episode = course?.episodes.find(e => e.id === parseInt(episodeId));
  const questions = episode?.quiz || [];

  // STATE
  const [gameState, setGameState] = useState('playing'); 
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // --- RETRY LOGIC (Soft Reset) ---
  const handleRetry = () => {
    setScore(0);
    setCurrentQIndex(0);
    setTimeLeft(600);
    setSelectedOption(null);
    setIsAnswered(false);
    setGameState('playing'); // Instantly restarts the quiz
  };

  // Timer
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setGameState('result');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Logic
  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === questions[currentQIndex].answer) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setGameState('result');
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;
  const progressPercentage = ((currentQIndex + 1) / questions.length) * 100;

  if (!episode || questions.length === 0) 
    return <div className="p-10 text-white text-center">No Quiz Available</div>;

  return (
    <div className="quiz-page-wrapper">
      
      {/* 1. PLAYING SCREEN */}
      {gameState === 'playing' && (
        <div className="quiz-card-modern">
          
          {/* Header with Timer & Progress */}
          <div className="quiz-header-modern">
            <div className="header-info">
              <span className="q-badge">Question {currentQIndex + 1} / {questions.length}</span>
              <span className={`timer-badge ${timeLeft < 60 ? 'urgent' : ''}`}>
                <Clock size={16} /> {formatTime(timeLeft)}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          {/* Question */}
          <div className="question-section fade-in">
            <h2>{questions[currentQIndex].question}</h2>
          </div>

          {/* Options Grid */}
          <div className="options-list">
            {questions[currentQIndex].options.map((opt, i) => {
              let statusClass = '';
              if (isAnswered) {
                if (opt === questions[currentQIndex].answer) statusClass = 'correct';
                else if (opt === selectedOption) statusClass = 'wrong';
                else statusClass = 'dimmed';
              }

              return (
                <button
                  key={i}
                  className={`option-card ${statusClass}`}
                  onClick={() => handleOptionClick(opt)}
                  disabled={isAnswered}
                >
                  <span className="opt-text">{opt}</span>
                  {statusClass === 'correct' && <CheckCircle size={20} className="icon-success" />}
                  {statusClass === 'wrong' && <XCircle size={20} className="icon-error" />}
                </button>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="quiz-footer">
            <Link to={`/series/${courseId}/watch/${episodeId}`} className="cancel-link">
              Exit Quiz
            </Link>
            
            {isAnswered && (
              <button onClick={handleNext} className="btn-next-animated">
                {currentQIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. RESULT SCREEN */}
      {gameState === 'result' && (
        <div className="quiz-card-modern result-view fade-in">
          <Trophy size={80} className="trophy-icon" />
          <h1>Quiz Completed!</h1>
          
          <div className="score-box">
            <div className="score-circle">
              <span>{Math.round((score / questions.length) * 100)}%</span>
            </div>
            <p>You scored <strong>{score}</strong> out of <strong>{questions.length}</strong></p>
          </div>

          <div className="result-buttons">
            {/* UPDATED RETRY BUTTON */}
            <button onClick={handleRetry} className="btn-primary-large">
              <RefreshCcw size={18} /> Retry
            </button>
            <Link to={`/series/${courseId}`} className="btn-secondary-large">
              Back to Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;