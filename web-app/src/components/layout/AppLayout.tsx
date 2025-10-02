'use client';

import React from 'react';
import Navigation from './Navigation';
import UserHeader from '@/components/auth/UserHeader';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { currentUser, loading } = useAuth();
  const pathname = usePathname();

  // Don't show layout on auth pages
  if (pathname === '/auth') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SabbathTheologyLink...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header with User Info */}
      {currentUser && (
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold text-gray-900">
                  SabbathTheologyLink
                </h1>
                <span className="text-sm text-gray-500 hidden sm:block">
                  Your SDA Bible Study Companion
                </span>
              </div>
              <UserHeader />
            </div>
          </div>
        </header>
      )}

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SabbathTheologyLink</h3>
              <p className="text-gray-300 text-sm">
                Your comprehensive SDA Bible study companion, featuring Sabbath School 
                Quarterly lessons, theological insights, and interactive learning modules.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-3">Study Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>📖 Sabbath School Lessons</li>
                <li>✍️ Theological Commentary</li>
                <li>❓ Interactive Quizzes</li>
                <li>📊 Progress Tracking</li>
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-3">SDA Focus</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>⛪ SDA Theological Perspective</li>
                <li>📚 Bible Version Preferences</li>
                <li>🤝 Community Learning</li>
                <li>🕊️ Faith-Centered Approach</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 SabbathTheologyLink. Connecting SDA believers through theological study.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;