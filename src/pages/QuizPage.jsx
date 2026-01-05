import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data';
import { CheckCircle, XCircle, Clock, Trophy, ArrowRight, RefreshCcw, User, Hash } from 'lucide-react';
import { submitQuizResultsGET } from '../services/googleSheets';

const QuizPage = () => {
  const { courseId, episodeId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const episode = course?.episodes.find(e => e.id === parseInt(episodeId));
  const questions = episode?.quiz || [];

  // Check localStorage for existing student info
  const getStoredStudentInfo = () => {
    const stored = localStorage.getItem('studentInfo');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  // STATE
  const [studentInfo, setStudentInfo] = useState(getStoredStudentInfo());
  const [registrationForm, setRegistrationForm] = useState({
    name: studentInfo?.name || '',
    rollNumber: studentInfo?.rollNumber || ''
  });
  const [gameState, setGameState] = useState(studentInfo ? 'playing' : 'registration'); 
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Registration Form Submission
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (!registrationForm.name.trim() || !registrationForm.rollNumber.trim()) {
      alert('Please fill in both name and roll number');
      return;
    }
    
    // Save to localStorage
    const studentData = {
      name: registrationForm.name.trim(),
      rollNumber: registrationForm.rollNumber.trim()
    };
    localStorage.setItem('studentInfo', JSON.stringify(studentData));
    setStudentInfo(studentData);
    setGameState('playing');
  };

  // --- RETRY LOGIC (Soft Reset) ---
  const handleRetry = () => {
    setScore(0);
    setCurrentQIndex(0);
    setTimeLeft(600);
    setSelectedOption(null);
    setIsAnswered(false);
    setGameState('playing'); // Instantly restarts the quiz
  };

  // Submit quiz results to Google Sheets
  const submitResults = async () => {
    if (!studentInfo || isSubmitting) return;
    
    setIsSubmitting(true);
    // Only send essential data: name, roll number, episode ID, and final score
    const quizData = {
      studentName: studentInfo.name,
      rollNumber: studentInfo.rollNumber,
      episodeId: parseInt(episodeId),
      score: score,
    };

    try {
      await submitQuizResultsGET(quizData);
    } catch (error) {
      console.error('Failed to submit results:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Timer
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('result');
      // Submit results when time runs out
      submitResults();
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
      // Submit results when quiz completes
      submitResults();
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;
  const progressPercentage = ((currentQIndex + 1) / questions.length) * 100;

  if (!episode || questions.length === 0) 
    return <div className="p-10 text-white text-center">No Quiz Available</div>;

  return (
    <div className="quiz-page-wrapper">
      
      {/* 0. REGISTRATION SCREEN */}
      {gameState === 'registration' && (
        <div className="quiz-card-modern result-view fade-in">
          <User size={60} className="trophy-icon" style={{ color: 'var(--accent)' }} />
          <h1>Enter your Details and go!!</h1>
         
          
          <form onSubmit={handleRegistrationSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="studentName">
                <User size={18} /> Full Name
              </label>
              <input
                type="text"
                id="studentName"
                value={registrationForm.name}
                onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                placeholder="Enter your full name"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="rollNumber">
                <Hash size={18} /> Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                value={registrationForm.rollNumber}
                onChange={(e) => setRegistrationForm({ ...registrationForm, rollNumber: e.target.value })}
                placeholder="Enter your roll number"
                required
                className="form-input"
              />
            </div>
            
            <button type="submit" className="btn-primary-large" style={{ width: '100%', marginTop: '20px' }}>
              Start Quiz <ArrowRight size={18} />
            </button>
          </form>
        </div>
      )}
      
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
          
          {studentInfo && (
            <div style={{ 
              background: 'rgba(100, 255, 218, 0.1)', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              border: '1px solid rgba(100, 255, 218, 0.2)'
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--accent)' }}>Student:</strong> {studentInfo.name} ({studentInfo.rollNumber})
              </p>
            </div>
          )}
          
          <div className="score-box">
            <div className="score-circle">
              <span>{Math.round((score / questions.length) * 100)}%</span>
            </div>
            <p>You scored <strong>{score}</strong> out of <strong>{questions.length}</strong></p>
          </div>

          {isSubmitting && (
            <p style={{ color: 'var(--accent)', marginBottom: '20px', fontSize: '0.9rem' }}>
              Submitting results...
            </p>
          )}

          <div className="result-buttons">
            {/* UPDATED RETRY BUTTON */}
            <button onClick={handleRetry} className="btn-primary-large" disabled={isSubmitting}>
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