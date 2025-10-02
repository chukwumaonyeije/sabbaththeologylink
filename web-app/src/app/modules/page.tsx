'use client';

import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { listModules, searchModules } from '@dataconnect/generated';
import { dataConnect } from '@/lib/firebase';
import { ModuleCardSkeleton } from '@/components/common/SkeletonLoader';

const ModulesPage = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedQuarter, setSelectedQuarter] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [modules, setModules] = useState<Array<{
    id: string;
    title: string;
    type: string;
    quarter?: string | null;
    week?: number | null;
    day?: string | null;
    memoryText?: string | null;
    summary?: string | null;
    theologyTags: string[];
    difficulty?: string | null;
    estimatedReadTime?: number | null;
    author?: string | null;
    createdAt: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch modules from Data Connect
  useEffect(() => {
    const fetchModules = async () => {
      if (!dataConnect) {
        // Fallback to mock data in preview mode
        setModules([
          {
            id: '1',
            title: 'The Great Controversy - Week 1: The Origin of Evil',
            type: 'ssq_lesson',
            quarter: '2024-Q4',
            week: 1,
            day: 'Monday',
            memoryText: 'And we know that all things work together for good to them that love God... (Romans 8:28)',
            summary: 'Understanding the cosmic conflict between good and evil from a biblical perspective.',
            theologyTags: ['Great Controversy', 'Sin', 'Origin of Evil'],
            difficulty: 'intermediate',
            estimatedReadTime: 15,
            author: 'Ellen G. White Institute',
            createdAt: '2024-01-15'
          },
          {
            id: '2',
            title: 'Daniel and End-Time Events - Week 3: The Sanctuary Message',
            type: 'ssq_lesson',
            quarter: '2024-Q4',
            week: 3,
            day: 'Wednesday',
            memoryText: 'For we have not an high priest which cannot be touched... (Hebrews 4:15)',
            summary: 'Exploring the heavenly sanctuary and its significance for modern believers.',
            theologyTags: ['Sanctuary', 'Priesthood', 'Prophecy'],
            difficulty: 'advanced',
            estimatedReadTime: 20,
            author: 'SDA Theological Seminary',
            createdAt: '2024-01-20'
          },
          {
            id: '3',
            title: 'The Story of Joseph: Faith Through Trials',
            type: 'bible_story',
            quarter: null,
            week: null,
            day: null,
            memoryText: 'But as for you, ye thought evil against me; but God meant it... (Genesis 50:20)',
            summary: 'Learning from Joseph\'s unwavering faith during difficult circumstances.',
            theologyTags: ['Faith', 'Providence', 'Character Development'],
            difficulty: 'beginner',
            estimatedReadTime: 12,
            author: 'Bible Study Institute',
            createdAt: '2024-01-10'
          }
        ]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const result = await listModules(dataConnect);
        
        if (result.data.modules) {
          setModules(result.data.modules);
        } else {
          // If no modules in database yet, show sample data
          setModules([
            {
              id: 'sample-1',
              title: 'Welcome to SabbathTheologyLink',
              type: 'theology_post',
              quarter: null,
              week: null,
              day: null,
              memoryText: 'Study to shew thyself approved unto God... (2 Timothy 2:15)',
              summary: 'Your journey of theological discovery begins here. Explore SDA theology through interactive study modules.',
              theologyTags: ['Welcome', 'Study', 'Growth'],
              difficulty: 'beginner',
              estimatedReadTime: 5,
              author: 'SabbathTheologyLink Team',
              createdAt: '2024-01-01'
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching modules:', err);
        setError('Failed to load study modules. Please try again.');
        // Show sample data as fallback
        setModules([
          {
            id: 'fallback-1',
            title: 'Connection Issue - Sample Module',
            type: 'theology_post',
            quarter: null,
            week: null,
            day: null,
            memoryText: 'Be still, and know that I am God... (Psalm 46:10)',
            summary: 'This is sample content while we resolve connection issues.',
            theologyTags: ['Sample', 'Testing'],
            difficulty: 'beginner',
            estimatedReadTime: 1,
            author: 'System',
            createdAt: '2024-01-01'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);
  
  // Debounced search functionality
  useEffect(() => {
    const searchModulesWithDelay = async () => {
      if (!searchTerm.trim()) {
        // If search is cleared, reload all modules
        const fetchModules = async () => {
          if (!dataConnect) return;
          try {
            setIsSearching(true);
            const result = await listModules(dataConnect);
            if (result.data.modules) {
              setModules(result.data.modules);
            }
          } catch (err) {
            console.error('Error fetching modules:', err);
          } finally {
            setIsSearching(false);
          }
        };
        fetchModules();
        return;
      }
      
      if (!dataConnect) return;
      
      setIsSearching(true);
      try {
        const result = await searchModules(dataConnect, {
          searchTerm: searchTerm,
          type: selectedType !== 'all' ? selectedType : null,
          tags: null
        });
        
        if (result.data.modules) {
          setModules(result.data.modules);
        }
      } catch (err) {
        console.error('Error searching modules:', err);
        setError('Search failed. Please try again.');
      } finally {
        setIsSearching(false);
      }
    };
    
    const debounceTimer = setTimeout(searchModulesWithDelay, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedType]);

  const filteredModules = modules.filter(module => {
    if (selectedType !== 'all' && module.type !== selectedType) return false;
    if (selectedQuarter !== 'all' && selectedQuarter !== 'current' && module.quarter !== selectedQuarter) return false;
    return true;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ssq_lesson': return '📖 SSQ Lesson';
      case 'bible_story': return '📜 Bible Story';
      case 'theology_post': return '✍️ Theology';
      default: return type;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📖 Study Modules
          </h1>
          <p className="text-gray-600 text-lg">
            Explore Bible studies, Sabbath School Quarterly lessons, and theological insights 
            from a Seventh-day Adventist perspective.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
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
              className="block w-full pl-10 pr-3 py-3 text-sm sm:text-base border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search study modules, topics, or content..."
            />
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              {isSearching ? 'Searching...' : `Search results for \u201c${searchTerm}\u201d`}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Modules</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="ssq_lesson">Sabbath School Lessons</option>
                <option value="bible_story">Bible Stories</option>
                <option value="theology_post">Theological Posts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quarter
              </label>
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="current">Current Quarter</option>
                <option value="all">All Quarters</option>
                <option value="2024-Q4">2024 Q4</option>
                <option value="2024-Q3">2024 Q3</option>
                <option value="2024-Q2">2024 Q2</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="text-red-400">⚠️</div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading modules</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <ModuleCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Modules Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredModules.map((module) => (
            <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Module Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getTypeLabel(module.type)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(module.difficulty || 'intermediate')}`}>
                    {module.difficulty || 'intermediate'}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {module.title}
                </h3>

                {module.quarter && (
                  <p className="text-sm text-gray-500 mb-2">
                    {module.quarter} • Week {module.week} • {module.day}
                  </p>
                )}

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {module.summary}
                </p>

                {/* Memory Text */}
                {module.memoryText && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                    <p className="text-sm italic text-blue-800">
                      &quot;{module.memoryText}&quot;
                    </p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {module.theologyTags.map((tag: string) => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author */}
                {module.author && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">By {module.author}</span>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    🕒 {module.estimatedReadTime} min
                  </span>
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors">
                    Start Study
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredModules.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more study modules.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ModulesPage;