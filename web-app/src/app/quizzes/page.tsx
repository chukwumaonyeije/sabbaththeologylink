'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { dataConnect } from '@/lib/firebase';
import { listQuizzes, ListQuizzesData } from '@/dataconnect-generated';

const QuizzesPage = () => {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<ListQuizzesData['quizzes']>([]);

  // Load quizzes data
  useEffect(() => {
    const loadQuizzes = async () => {
      if (!dataConnect) return;
      
      try {
        setLoading(true);
        const result = await listQuizzes(dataConnect);
        setQuizzes(result.data.quizzes);
      } catch (error) {
        console.error('Error loading quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter(quiz => {
    if (selectedDifficulty !== 'all' && quiz.module?.difficulty !== selectedDifficulty) return false;
    if (selectedTopic !== 'all' && !quiz.module?.theologyTags?.some(topic => topic.toLowerCase().includes(selectedTopic.toLowerCase()))) return false;
    if (searchTerm && !(
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.module?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.module?.theologyTags?.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    )) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateStats = () => {
    // For now, use mock stats since we need user progress data
    // This will be replaced when we implement user progress tracking
    return { 
      completed: Math.floor(quizzes.length * 0.6), 
      total: quizzes.length, 
      avgScore: 82 
    };
  };

  const stats = calculateStats();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ❓ Interactive Quizzes
          </h1>
          <p className="text-gray-600 text-lg">
            Test your knowledge of Scripture, SDA theology, and Bible study lessons 
            with interactive assessments.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading quizzes...</p>
          </div>
        )}

        {!loading && (
          <>
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completed}/{stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(stats.avgScore)}`}>
                  {stats.avgScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Streak</p>
                <p className="text-2xl font-bold text-gray-900">7 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search quizzes by title, module, or topic..."
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Search results for &ldquo;<span className="font-medium">{searchTerm}</span>&rdquo;
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Quizzes</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic Area
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Topics</option>
                <option value="prophecy">Prophecy</option>
                <option value="sanctuary">Sanctuary</option>
                <option value="sabbath">Sabbath</option>
                <option value="faith">Faith & Character</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredQuizzes.map((quiz) => {
            // Estimate time based on number of questions (2 minutes per question)
            const estimatedTime = Math.max(5, quiz.questions.length * 2);
            
            return (
              <div key={quiz.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6">
                  {/* Quiz Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Based on: {quiz.module?.title || 'Standalone Quiz'}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(quiz.module?.difficulty || 'intermediate')}`}>
                      {quiz.module?.difficulty || 'intermediate'}
                    </span>
                  </div>

                  {/* Quiz Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">Questions</p>
                      <p className="text-lg font-semibold text-gray-900">{quiz.questions.length}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">Est. Time</p>
                      <p className="text-lg font-semibold text-gray-900">{estimatedTime} min</p>
                    </div>
                  </div>

                  {/* Ready to start message */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                    <p className="text-sm font-medium text-blue-800 text-center">
                      Ready to test your knowledge!
                    </p>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {quiz.module?.theologyTags?.map((topic) => (
                        <span key={topic} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                          {topic}
                        </span>
                      )) || (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                          General Knowledge
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="flex items-center">
                        🕒 ~{estimatedTime} minutes
                      </span>
                    </div>
                    <button 
                      onClick={() => router.push(`/quizzes/${quiz.id}`)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more quizzes.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Looking for more quizzes?
          </h3>
          <p className="text-blue-700 mb-4">
            Complete more study modules to unlock additional quizzes and assessments.
          </p>
          <button 
            onClick={() => router.push('/modules')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
          >
            Browse Study Modules
          </button>
        </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default QuizzesPage;