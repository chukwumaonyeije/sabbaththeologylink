'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { dataConnect } from '@/lib/firebase';
import { listQuizzes, ListQuizzesData } from '@/dataconnect-generated';

// Type guard and validation functions
function isValidQuizObject(quiz: unknown): quiz is NonNullable<ListQuizzesData['quizzes'][0]> {
  // Explicit null/undefined checks
  if (quiz === null) {
    console.warn('Quiz validation failed: quiz is null');
    return false;
  }
  if (quiz === undefined) {
    console.warn('Quiz validation failed: quiz is undefined');
    return false;
  }
  if (typeof quiz !== 'object') {
    console.warn('Quiz validation failed: not an object', quiz);
    return false;
  }
  
  const quizObj = quiz as Record<string, unknown>;
  
  if (!quizObj.id || typeof quizObj.id !== 'string') {
    console.warn('Quiz validation failed: invalid id', quiz);
    return false;
  }
  
  if (!quizObj.title || typeof quizObj.title !== 'string') {
    console.warn('Quiz validation failed: invalid title', quiz);
    return false;
  }
  
  if (!Array.isArray(quizObj.questions) || quizObj.questions.length === 0) {
    console.warn('Quiz validation failed: invalid questions', quiz);
    return false;
  }
  
  // Validate module structure if present
  if (quizObj.module !== null && quizObj.module !== undefined) {
    if (typeof quizObj.module !== 'object') {
      console.warn('Quiz validation failed: invalid module structure', quiz);
      return false;
    }
    const moduleObj = quizObj.module as Record<string, unknown>;
    // Check critical module properties
    if (moduleObj.title && typeof moduleObj.title !== 'string') {
      console.warn('Quiz validation failed: invalid module title', quiz);
      return false;
    }
    if (moduleObj.theologyTags && !Array.isArray(moduleObj.theologyTags)) {
      console.warn('Quiz validation failed: invalid theology tags', quiz);
      return false;
    }
  }
  
  return true;
}

function sanitizeQuizArray(rawQuizzes: unknown[]): NonNullable<ListQuizzesData['quizzes'][0]>[] {
  if (!Array.isArray(rawQuizzes)) {
    console.error('Quiz data is not an array:', rawQuizzes);
    return [];
  }
  
  const validQuizzes: NonNullable<ListQuizzesData['quizzes'][0]>[] = [];
  
  rawQuizzes.forEach((quiz, index) => {
    if (isValidQuizObject(quiz)) {
      validQuizzes.push(quiz);
    } else {
      console.warn(`Filtering out invalid quiz at index ${index}:`, quiz);
    }
  });
  
  return validQuizzes;
}

const QuizzesPage = () => {
  console.log('🔥 QUIZZES PAGE COMPONENT LOADING - Latest version e0fe22e');
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizzes, setQuizzes] = useState<ListQuizzesData['quizzes']>([]);

  // Load quizzes data
  useEffect(() => {
    const loadQuizzes = async () => {
      if (!dataConnect) {
        console.warn('DataConnect not available');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        console.log('🛑 ABOUT TO CALL listQuizzes...');
        const result = await listQuizzes(dataConnect);
        console.log('🚀 listQuizzes RESULT:', result);
        
        // Ensure we have a valid response structure
        const rawQuizzes = result.data?.quizzes || [];
        console.log('🔍 DETAILED Raw quizzes analysis:', {
          result,
          dataExists: !!result.data,
          quizzesExists: !!result.data?.quizzes,
          count: rawQuizzes?.length || 0,
          data: rawQuizzes,
          hasNulls: rawQuizzes?.some(q => q === null),
          hasUndefined: rawQuizzes?.some(q => q === undefined),
          types: rawQuizzes?.map(q => typeof q)
        });
        
        // First, filter out any null or undefined values from the array
        const nonNullQuizzes = Array.isArray(rawQuizzes) 
          ? rawQuizzes.filter((quiz, index) => {
              if (quiz === null) {
                console.warn(`Filtering out null quiz at index ${index}`);
                return false;
              }
              if (quiz === undefined) {
                console.warn(`Filtering out undefined quiz at index ${index}`);
                return false;
              }
              return true;
            })
          : [];
          
        console.log('After null/undefined filtering:', {
          original: rawQuizzes?.length || 0,
          filtered: nonNullQuizzes.length,
          removed: (rawQuizzes?.length || 0) - nonNullQuizzes.length
        });
        
        // Use comprehensive validation function
        const validQuizzes = sanitizeQuizArray(nonNullQuizzes);
        
        if (validQuizzes.length !== (result.data.quizzes?.length || 0)) {
          console.warn(`Filtered out ${(result.data.quizzes?.length || 0) - validQuizzes.length} invalid quiz objects`);
        }
        
        console.log('Setting valid quizzes:', {
          count: validQuizzes.length,
          hasNulls: validQuizzes.some(q => q === null),
          sample: validQuizzes[0]
        });
        
        // Final safety check before setting state
        const safeQuizzes = validQuizzes.filter(quiz => quiz !== null && quiz !== undefined);
        setQuizzes(safeQuizzes);
      } catch (error) {
        console.error('Error loading quizzes:', error);
        setError(error instanceof Error ? error.message : 'Failed to load quizzes');
        setQuizzes([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter(quiz => {
    // Explicit null/undefined checks first
    if (quiz === null) {
      console.warn('Filtering out null quiz object');
      return false;
    }
    if (quiz === undefined) {
      console.warn('Filtering out undefined quiz object');
      return false;
    }
    // Skip invalid quiz objects
    if (typeof quiz !== 'object' || !quiz.id || !quiz.title || typeof quiz.title !== 'string') {
      console.warn('Invalid quiz object detected:', quiz);
      return false;
    }
    
    // Validate quiz has questions array
    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      console.warn('Quiz missing questions:', quiz.id);
      return false;
    }
    
    // Safe difficulty filter
    if (selectedDifficulty !== 'all') {
      const difficulty = quiz.module?.difficulty;
      if (!difficulty || difficulty !== selectedDifficulty) return false;
    }
    
    // Safe topic filter
    if (selectedTopic !== 'all') {
      const theologyTags = quiz.module?.theologyTags;
      if (!Array.isArray(theologyTags) || !theologyTags.some(topic => 
        typeof topic === 'string' && topic.toLowerCase().includes(selectedTopic.toLowerCase())
      )) return false;
    }
    
    // Safe search filter
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = quiz.title.toLowerCase().includes(searchLower);
      const moduleTitle = quiz.module?.title;
      const moduleTitleMatch = moduleTitle && typeof moduleTitle === 'string' && 
        moduleTitle.toLowerCase().includes(searchLower);
      const theologyTags = quiz.module?.theologyTags;
      const tagsMatch = Array.isArray(theologyTags) && theologyTags.some(topic => 
        typeof topic === 'string' && topic.toLowerCase().includes(searchLower)
      );
      
      if (!titleMatch && !moduleTitleMatch && !tagsMatch) return false;
    }
    
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

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Quizzes</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
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

        {/* Quizzes Grid - EMERGENCY SAFE MODE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="col-span-full bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm font-medium">🚨 EMERGENCY MODE: Debugging null title error - Latest deployment: a1a1eb6</p>
          </div>
          <div className="col-span-full bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-green-800 font-medium mb-2">✅ Emergency Safe Mode Active</h3>
            <p className="text-green-700 text-sm">
              All dangerous code has been temporarily disabled to prevent the null title error.
              Deployment verification in progress...
            </p>
          </div>
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes available</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedDifficulty !== 'all' || selectedTopic !== 'all' 
                ? "Try adjusting your filters to see more quizzes." 
                : "No quizzes have been created yet. Check back later or contact your administrator to add some sample quizzes."}
            </p>
            {!(searchTerm || selectedDifficulty !== 'all' || selectedTopic !== 'all') && (
              <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-blue-800">
                  💡 Tip: If you&rsquo;re an admin, you can use the bulk upload feature to add sample quizzes from the admin panel.
                </p>
              </div>
            )}
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