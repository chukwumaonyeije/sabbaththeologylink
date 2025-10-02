'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { dataConnect } from '@/lib/firebase';
import { 
  getQuizById, 
  submitQuizAttempt, 
  updateProgressWithQuizScore,
  GetQuizByIdData 
} from '@/dataconnect-generated';

interface UserAnswer {
  questionId: string;
  answer: string;
}

const QuizTakingPage = () => {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<GetQuizByIdData['quiz'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizStartTime] = useState(Date.now());
  
  // Results state
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    timeSpent: number;
  } | null>(null);

  // Load quiz data
  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId || !dataConnect) return;
      
      try {
        setLoading(true);
        const result = await getQuizById(dataConnect, { id: quizId });
        
        if (result.data.quiz) {
          setQuiz(result.data.quiz);
        } else {
          setError('Quiz not found');
        }
      } catch (err) {
        console.error('Error loading quiz:', err);
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => {
      const existing = prev.findIndex(ua => ua.questionId === questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionId, answer };
        return updated;
      } else {
        return [...prev, { questionId, answer }];
      }
    });
  };

  const getCurrentAnswer = (questionId: string) => {
    return userAnswers.find(ua => ua.questionId === questionId)?.answer || '';
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    if (!quiz) return { score: 0, correctCount: 0 };
    
    let correctCount = 0;
    quiz.questions.forEach(question => {
      const userAnswer = getCurrentAnswer(question.id);
      if (userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    return { score, correctCount };
  };

  const submitQuiz = async () => {
    if (!quiz || !currentUser || !dataConnect) return;
    
    // Check if all questions are answered
    const unansweredQuestions = quiz.questions.filter(q => !getCurrentAnswer(q.id));
    if (unansweredQuestions.length > 0) {
      const proceed = window.confirm(
        `You have ${unansweredQuestions.length} unanswered question(s). Submit anyway?`
      );
      if (!proceed) return;
    }

    setIsSubmitting(true);
    
    try {
      const timeSpent = Math.round((Date.now() - quizStartTime) / (1000 * 60)); // minutes
      const { score, correctCount } = calculateResults();
      
      // Prepare answers array in order
      const answersArray = quiz.questions.map(q => getCurrentAnswer(q.id) || '');
      
      // Submit quiz attempt
      await submitQuizAttempt(dataConnect, {
        quizId: quiz.id,
        score,
        totalQuestions: quiz.questions.length,
        correctAnswers: correctCount,
        answers: answersArray,
        timeSpentMinutes: timeSpent
      });

      // Update user progress if associated with a module
      if (quiz.module?.id) {
        // Get current attempts count (we'll need to track this better in the future)
        const attempts = 1; // For now, simplified
        
        await updateProgressWithQuizScore(dataConnect, {
          moduleId: quiz.module!.id,
          score,
          attempts
        });
      }

      // Show results
      setQuizResults({
        score,
        correctCount,
        totalQuestions: quiz.questions.length,
        timeSpent
      });
      setShowResults(true);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      alert('Failed to submit quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const retakeQuiz = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizResults(null);
  };

  const goToQuizzes = () => {
    router.push('/quizzes');
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading quiz...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error || !quiz) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The quiz you\'re looking for doesn\'t exist.'}</p>
            <button 
              onClick={goToQuizzes}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (showResults && quizResults) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className="text-gray-600">{quiz.title}</p>
          </div>

          {/* Score Display */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="text-center">
              <div className="text-6xl mb-4">
                {quizResults.score >= 90 ? '🏆' : quizResults.score >= 80 ? '🎉' : quizResults.score >= 70 ? '👍' : '📚'}
              </div>
              <h2 className="text-4xl font-bold mb-2">
                <span className={`${
                  quizResults.score >= 90 ? 'text-green-600' :
                  quizResults.score >= 80 ? 'text-blue-600' :
                  quizResults.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {quizResults.score}%
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                {quizResults.correctCount} out of {quizResults.totalQuestions} correct
              </p>
              <p className="text-sm text-gray-500">
                Completed in {quizResults.timeSpent} minute{quizResults.timeSpent !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Performance Message */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              {quizResults.score >= 90 ? 'Excellent Work!' :
               quizResults.score >= 80 ? 'Great Job!' :
               quizResults.score >= 70 ? 'Good Effort!' : 'Keep Studying!'}
            </h3>
            <p className="text-blue-800">
              {quizResults.score >= 90 ? 'You have mastered this material! Your deep understanding shows through your excellent performance.' :
               quizResults.score >= 80 ? 'You have a solid grasp of the material. A few more study sessions and you\'ll master it completely.' :
               quizResults.score >= 70 ? 'You\'re on the right track. Review the material and try again to improve your score.' :
               'Consider reviewing the study material and taking more time with each question. Every attempt helps you learn!'}
            </p>
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Review</h3>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const userAnswer = getCurrentAnswer(question.id);
                const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
                
                return (
                  <div key={question.id} className={`p-4 rounded-lg border ${
                    isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                      <span className={`text-sm font-medium ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{question.questionText}</p>
                    <div className="text-sm">
                      <p className="mb-1">
                        <span className="font-medium">Your answer:</span> {userAnswer || 'No answer provided'}
                      </p>
                      <p className="mb-2">
                        <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                      </p>
                      {question.explanation && (
                        <p className="text-gray-600">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={retakeQuiz}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Retake Quiz
            </button>
            <button
              onClick={goToQuizzes}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Quizzes
            </button>
            {quiz.module && (
              <button
                onClick={() => router.push(`/modules/${quiz.module!.id}`)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Review Study Material
              </button>
            )}
          </div>
        </div>
      </AppLayout>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
          {quiz.module && (
            <p className="text-gray-600">From: {quiz.module.title}</p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Display */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentQuestion.questionText}
            </h2>
            
            {currentQuestion.questionType === 'mcq' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={getCurrentAnswer(currentQuestion.id) === option}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
            
            {currentQuestion.questionType === 'true_false' && (
              <div className="space-y-3">
                {['True', 'False'].map((option) => (
                  <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={getCurrentAnswer(currentQuestion.id) === option}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
            
            {currentQuestion.questionType === 'fill_blank' && (
              <div>
                <input
                  type="text"
                  value={getCurrentAnswer(currentQuestion.id)}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your answer..."
                />
              </div>
            )}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : getCurrentAnswer(quiz.questions[index].id)
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-blue-600 rounded mr-2"></span>Current
            <span className="inline-block w-3 h-3 bg-green-100 rounded mr-2 ml-4"></span>Answered
            <span className="inline-block w-3 h-3 bg-gray-100 rounded mr-2 ml-4"></span>Not answered
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === quiz.questions.length - 1}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          
          <button
            onClick={submitQuiz}
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default QuizTakingPage;