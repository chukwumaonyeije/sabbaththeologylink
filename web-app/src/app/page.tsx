'use client';

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  console.log('🏠 HOME PAGE LOADED - Latest commit - ' + new Date().toISOString());
  const { currentUser } = useAuth();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-red-500 text-white p-4 mb-4 text-2xl font-bold">
            🚨 DEPLOYMENT TEST - Commit 927cc7b+ - {new Date().toISOString()} 🚨
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your SDA Bible Study Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deepen your understanding of Scripture through Sabbath School Quarterly lessons, 
            theological insights, and interactive Bible studies from a Seventh-day Adventist perspective.
          </p>
        </div>

        {currentUser ? (
          // Authenticated user content
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                📖 Study Modules
              </h3>
              <p className="text-gray-600 mb-4">
                Access Bible studies, Sabbath School Quarterly lessons, and theological content.
              </p>
              <Link
                href="/modules"
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Explore Modules →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ❓ Interactive Quizzes
              </h3>
              <p className="text-gray-600 mb-4">
                Test your knowledge with quizzes based on SDA theology and Bible studies.
              </p>
              <Link
                href="/quizzes"
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Take Quizzes →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                📊 My Progress
              </h3>
              <p className="text-gray-600 mb-4">
                Track your study progress, quiz scores, and spiritual growth milestones.
              </p>
              <Link
                href="/progress"
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                View Progress →
              </Link>
            </div>
          </div>
        ) : (
          // Unauthenticated user content
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Join Our SDA Community
              </h3>
              <p className="text-gray-600 mb-6">
                Create your free account to access personalized Bible study resources, 
                track your progress, and engage with Sabbath School content.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/auth"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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