'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, trackPageView } from '@/lib/analytics';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics on app load
    initAnalytics();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      trackPageView(window.location.href, document.title);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}