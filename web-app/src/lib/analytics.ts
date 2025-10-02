// Analytics utility for SabbathTheologyLink
// This file provides a centralized way to track user events

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Configuration
const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Event types for type safety
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Initialize analytics
export const initAnalytics = () => {
  if (!IS_PRODUCTION || !GOOGLE_ANALYTICS_ID) {
    console.log('📊 Analytics: Skipping initialization (development mode or missing ID)');
    return;
  }

  // Google Analytics initialization would go here
  console.log('📊 Analytics: Initialized for production');
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!IS_PRODUCTION) {
    console.log('📊 Analytics: Page View', { url, title });
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GOOGLE_ANALYTICS_ID!, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (event: AnalyticsEvent) => {
  if (!IS_PRODUCTION) {
    console.log('📊 Analytics: Event', event);
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });
  }
};

// Predefined events for common actions
export const analytics = {
  // Quiz-related events
  quizStarted: (quizId: string, quizTitle: string) => {
    trackEvent({
      action: 'quiz_started',
      category: 'engagement',
      label: quizTitle,
      custom_parameters: { quiz_id: quizId }
    });
  },

  quizCompleted: (quizId: string, quizTitle: string, score: number) => {
    trackEvent({
      action: 'quiz_completed',
      category: 'engagement',
      label: quizTitle,
      value: score,
      custom_parameters: { quiz_id: quizId, score }
    });
  },

  // Module-related events
  moduleViewed: (moduleId: string, moduleTitle: string) => {
    trackEvent({
      action: 'module_viewed',
      category: 'content',
      label: moduleTitle,
      custom_parameters: { module_id: moduleId }
    });
  },

  moduleCompleted: (moduleId: string, moduleTitle: string, timeSpent: number) => {
    trackEvent({
      action: 'module_completed',
      category: 'content',
      label: moduleTitle,
      value: timeSpent,
      custom_parameters: { module_id: moduleId, time_spent: timeSpent }
    });
  },

  // User engagement events
  userSignup: (method: string) => {
    trackEvent({
      action: 'sign_up',
      category: 'user',
      label: method,
      custom_parameters: { method }
    });
  },

  userLogin: (method: string) => {
    trackEvent({
      action: 'login',
      category: 'user',
      label: method,
      custom_parameters: { method }
    });
  },

  searchPerformed: (searchTerm: string, resultsCount: number) => {
    trackEvent({
      action: 'search',
      category: 'engagement',
      label: searchTerm,
      value: resultsCount,
      custom_parameters: { search_term: searchTerm, results_count: resultsCount }
    });
  },

  // Error tracking
  errorEncountered: (errorMessage: string, errorLocation: string) => {
    trackEvent({
      action: 'error',
      category: 'technical',
      label: errorMessage,
      custom_parameters: { error_location: errorLocation, error_message: errorMessage }
    });
  },

  // Content interaction
  linkClicked: (linkUrl: string, linkText: string) => {
    trackEvent({
      action: 'link_click',
      category: 'engagement',
      label: linkText,
      custom_parameters: { link_url: linkUrl }
    });
  },

  // Performance tracking
  pageLoadTime: (pageName: string, loadTime: number) => {
    trackEvent({
      action: 'page_timing',
      category: 'performance',
      label: pageName,
      value: loadTime,
      custom_parameters: { page_name: pageName, load_time: loadTime }
    });
  }
};

// Hook for React components
export const useAnalytics = () => {
  return {
    trackPageView,
    trackEvent,
    ...analytics
  };
};

export default analytics;