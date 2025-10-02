'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';

const ProgressPage = () => {
  const { currentUser } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Mock data - will be replaced with actual DataConnect calls
  const progressData = {
    overall: {
      modulesCompleted: 8,
      totalModules: 15,
      averageScore: 84,
      studyStreakDays: 7,
      totalStudyTime: 480, // minutes
      lastActive: '2024-09-30'
    },
    weeklyGoal: {
      target: 3, // modules per week
      completed: 2,
      progress: 67
    },
    recentActivity: [
      {
        id: '1',
        type: 'module_completed',
        title: 'Understanding the Sabbath in Modern Context',
        date: '2024-09-30',
        score: 92,
        timeSpent: 18
      },
      {
        id: '2',
        type: 'quiz_completed',
        title: 'Modern Sabbath Keeping Quiz',
        date: '2024-09-30',
        score: 78,
        timeSpent: 12
      },
      {
        id: '3',
        type: 'module_completed',
        title: 'The Great Controversy - Week 1',
        date: '2024-09-29',
        score: 87,
        timeSpent: 15
      },
      {
        id: '4',
        type: 'quiz_completed',
        title: 'Joseph\'s Journey Quiz',
        date: '2024-09-28',
        score: 95,
        timeSpent: 8
      },
      {
        id: '5',
        type: 'module_started',
        title: 'Daniel and End-Time Events - Week 3',
        date: '2024-09-27',
        score: null,
        timeSpent: 20
      }
    ],
    moduleProgress: [
      {
        id: '1',
        title: 'The Great Controversy - Week 1',
        type: 'ssq_lesson',
        progress: 100,
        score: 87,
        completedDate: '2024-09-29',
        timeSpent: 15
      },
      {
        id: '2',
        title: 'Daniel and End-Time Events - Week 3',
        type: 'ssq_lesson',
        progress: 60,
        score: null,
        completedDate: null,
        timeSpent: 20
      },
      {
        id: '3',
        title: 'The Story of Joseph',
        type: 'bible_story',
        progress: 100,
        score: 95,
        completedDate: '2024-09-28',
        timeSpent: 12
      },
      {
        id: '4',
        title: 'Understanding the Sabbath',
        type: 'theology_post',
        progress: 100,
        score: 92,
        completedDate: '2024-09-30',
        timeSpent: 18
      }
    ],
    achievements: [
      {
        id: '1',
        title: 'First Steps',
        description: 'Complete your first study module',
        icon: '🌱',
        earned: true,
        earnedDate: '2024-09-25'
      },
      {
        id: '2',
        title: 'Quiz Master',
        description: 'Score 90% or higher on 3 quizzes',
        icon: '🎯',
        earned: true,
        earnedDate: '2024-09-28'
      },
      {
        id: '3',
        title: 'Week Warrior',
        description: 'Study for 7 consecutive days',
        icon: '🔥',
        earned: true,
        earnedDate: '2024-09-30'
      },
      {
        id: '4',
        title: 'Sabbath Scholar',
        description: 'Complete all Sabbath-themed modules',
        icon: '⛪',
        earned: false,
        earnedDate: null
      },
      {
        id: '5',
        title: 'Prophecy Expert',
        description: 'Master all prophecy-related content',
        icon: '📜',
        earned: false,
        earnedDate: null
      }
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'module_completed': return '✅';
      case 'module_started': return '📖';
      case 'quiz_completed': return '❓';
      default: return '📚';
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 My Study Progress
          </h1>
          <p className="text-gray-600 text-lg">
            Track your Bible study journey, quiz performance, and spiritual growth milestones.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">📖</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Modules</p>
                <p className="text-2xl font-bold text-gray-900">
                  {progressData.overall.modulesCompleted}/{progressData.overall.totalModules}
                </p>
                <p className="text-xs text-gray-500">
                  {Math.round((progressData.overall.modulesCompleted / progressData.overall.totalModules) * 100)}% complete
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
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(progressData.overall.averageScore)}`}>
                  {progressData.overall.averageScore}%
                </p>
                <p className="text-xs text-gray-500">Across all quizzes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <span className="text-2xl">🔥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Streak</p>
                <p className="text-2xl font-bold text-orange-600">
                  {progressData.overall.studyStreakDays}
                </p>
                <p className="text-xs text-gray-500">days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <span className="text-2xl">⏱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatMinutes(progressData.overall.totalStudyTime)}
                </p>
                <p className="text-xs text-gray-500">total</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              <div className="space-y-4">
                {progressData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center space-x-4">
                        {activity.score && (
                          <span className={`text-sm ${getScoreColor(activity.score)}`}>
                            Score: {activity.score}%
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {formatMinutes(activity.timeSpent)}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">
                          {activity.type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Module Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Module Progress</h2>
              <div className="space-y-4">
                {progressData.moduleProgress.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">{module.title}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {module.type.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">Progress</span>
                        <span className="text-xs text-gray-600">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${module.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        {module.score && (
                          <span className={getScoreColor(module.score)}>
                            Score: {module.score}%
                          </span>
                        )}
                        <span>Time: {formatMinutes(module.timeSpent)}</span>
                      </div>
                      {module.completedDate && (
                        <span>Completed: {new Date(module.completedDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Weekly Goal */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Goal</h2>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-20 h-20" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${progressData.weeklyGoal.progress}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900">
                      {progressData.weeklyGoal.progress}%
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {progressData.weeklyGoal.completed} of {progressData.weeklyGoal.target} modules completed
                </p>
                <p className="text-xs text-gray-500 mt-1">This week</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
              <div className="space-y-3">
                {progressData.achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`text-2xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-medium ${achievement.earned ? 'text-green-900' : 'text-gray-600'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-xs ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.earnedDate && (
                        <p className="text-xs text-green-600 mt-1">
                          Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Encouragement Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mt-8 text-center">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Great progress, {currentUser?.displayName?.split(' ')[0] || 'friend'}!
          </h3>
          <p className="text-gray-700 mb-4">
            You&apos;re building a strong foundation in SDA theology and Bible study. 
            Keep up the excellent work in your spiritual journey!
          </p>
          <div className="flex justify-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Continue Studying
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors">
              Share Progress
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProgressPage;