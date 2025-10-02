'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show navigation on auth pages
  if (pathname === '/auth') {
    return null;
  }

  const navItems = [
    {
      name: 'Modules',
      href: '/modules',
      icon: '📖',
      description: 'Bible Studies & SSQ Lessons'
    },
    {
      name: 'Quizzes',
      href: '/quizzes',
      icon: '❓',
      description: 'Test Your Knowledge'
    },
    {
      name: 'My Progress',
      href: '/progress',
      icon: '📊',
      description: 'Track Your Journey'
    },
    {
      name: 'Admin',
      href: '/admin',
      icon: '⚙️',
      description: 'Content Management',
      adminOnly: true
    }
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  if (!currentUser) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 py-2">
              <span className="text-lg sm:text-2xl font-bold text-blue-600">
                SabbathTheologyLink
              </span>
              <span className="text-sm text-gray-500 hidden sm:block">
                SDA Bible Study
              </span>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems
              .filter(item => !item.adminOnly || currentUser?.email?.includes('admin')) // Simple admin check for demo
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="mr-2 text-base">{item.icon}</span>
                  <div className="flex flex-col items-start">
                    <span>{item.name}</span>
                    <span className="text-xs text-gray-500 group-hover:text-gray-600">
                      {item.description}
                    </span>
                  </div>
                </Link>
              ))
            }
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close' : 'Open'} main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t border-gray-200">
            {navItems
              .filter(item => !item.adminOnly || currentUser?.email?.includes('admin'))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors
                    ${isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <div>
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;