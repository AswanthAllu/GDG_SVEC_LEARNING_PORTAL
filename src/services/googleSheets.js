// Google Sheets integration service
// This will submit quiz results to Google Sheets via Google Apps Script

/**
 * Submit quiz results to Google Sheets (simplified - only essential data)
 * @param {Object} quizData - Quiz result data
 * @param {string} quizData.studentName - Student's name
 * @param {string} quizData.rollNumber - Student's roll number
 * @param {number} quizData.episodeId - Episode ID
 * @param {number} quizData.score - Final score obtained
 */
export const submitQuizResultsGET = async (quizData) => {
  const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  if (!SCRIPT_URL) {
    console.error('Google Script URL not configured. Please set VITE_GOOGLE_SCRIPT_URL in .env');
    return false;
  }

  try {
    // Build query parameters - only essential fields
    const params = new URLSearchParams({
      studentName: quizData.studentName || '',
      rollNumber: quizData.rollNumber || '',
      episodeId: quizData.episodeId?.toString() || '',
      score: quizData.score?.toString() || '0',
    });

    const response = await fetch(`${SCRIPT_URL}?${params.toString()}`, {
      method: 'GET',
      mode: 'no-cors',
    });

    return true;
  } catch (error) {
    console.error('Error submitting quiz results:', error);
    return false;
  }
};
