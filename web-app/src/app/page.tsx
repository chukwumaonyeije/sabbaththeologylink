'use client';

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useAnalytics } from '@/lib/analytics';

export default function Home() {
  const { currentUser } = useAuth();
  const analytics = useAnalytics();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              ✨ Seventh-day Adventist Bible Study Platform
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Deepen Your Bible Study Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore Scripture through interactive quizzes, Sabbath School Quarterly lessons, 
            and theological studies designed to strengthen your faith and deepen your understanding of God's Word.
          </p>
        </div>

        {currentUser ? (
          // Authenticated user content
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">📖</span>
                Study Modules
              </h3>
              <p className="text-gray-600 mb-4">
                Access Bible studies, Sabbath School Quarterly lessons, and theological content.
              </p>
              <Link
                href="/modules"
                className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center transition-colors duration-200 group-hover:translate-x-1"
                onClick={() => analytics.linkClicked('/modules', 'Explore Modules')}
              >
                Explore Modules 
                <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">❓</span>
                Interactive Quizzes
              </h3>
              <p className="text-gray-600 mb-4">
                Test your knowledge with quizzes based on SDA theology and Bible studies.
              </p>
              <Link
                href="/quizzes"
                className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center transition-colors duration-200 group-hover:translate-x-1"
                onClick={() => analytics.linkClicked('/quizzes', 'Take Quizzes')}
              >
                Take Quizzes
                <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">📄</span>
                My Progress
              </h3>
              <p className="text-gray-600 mb-4">
                Track your study progress, quiz scores, and spiritual growth milestones.
              </p>
              <Link
                href="/progress"
                className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center transition-colors duration-200 group-hover:translate-x-1"
              >
                View Progress
                <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          // Unauthenticated user content
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Join Our SDA Community
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                Create your free account to access personalized Bible study resources, 
                track your progress, and engage with Sabbath School content.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/auth"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center group"
                  onClick={() => analytics.linkClicked('/auth', 'Get Started')}
                >
                  Get Started
                  <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">📚 Study Features</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Weekly Sabbath School lessons</li>
                  <li>• Interactive quizzes and assessments</li>
                  <li>• Progress tracking</li>
                  <li>• Memory verse practice</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">⛪ SDA Perspective</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Theological commentary</li>
                  <li>• Bible version preferences</li>
                  <li>• Doctrinal insights</li>
                  <li>• Community-focused learning</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}