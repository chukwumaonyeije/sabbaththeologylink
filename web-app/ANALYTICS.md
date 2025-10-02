# Analytics Setup Guide

## Overview

SabbathTheologyLink includes a comprehensive analytics system to track user engagement, content performance, and application health. The system is designed to work with Google Analytics 4 (GA4) but can be extended to support other analytics providers.

## Quick Setup

### 1. Google Analytics 4 Setup

1. Create a GA4 property at [Google Analytics](https://analytics.google.com/)
2. Get your measurement ID (looks like `G-XXXXXXXXXX`)
3. Add it to your environment variables

### 2. Environment Variables

Add the following to your `.env.local` file:

```bash
# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 3. Google Analytics Script (Optional)

To enable full GA4 functionality, add the Google Analytics script to your HTML head:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## What We Track

### Automatic Tracking

- **Page Views**: Every route change is automatically tracked
- **User Sessions**: Standard GA4 session tracking
- **Basic Demographics**: Standard GA4 user data (if enabled)

### Custom Events

#### Quiz Interactions
- `quiz_started`: When a user begins a quiz
- `quiz_completed`: When a user finishes a quiz (includes score)

#### Content Engagement
- `module_viewed`: When a user opens a study module
- `module_completed`: When a user finishes a module (includes time spent)
- `search`: When a user performs a search (includes term and results)

#### User Actions
- `sign_up`: User registration events
- `login`: User authentication events
- `link_click`: Important navigation actions

#### Technical Monitoring
- `error`: JavaScript errors and application issues
- `page_timing`: Page load performance metrics

## Usage in Components

### Using the Analytics Hook

```tsx
import { useAnalytics } from '@/lib/analytics';

function MyComponent() {
  const analytics = useAnalytics();

  const handleQuizStart = (quizId: string, title: string) => {
    analytics.quizStarted(quizId, title);
    // ... rest of your logic
  };

  return (
    <button onClick={() => handleQuizStart('quiz-1', 'Bible Quiz')}>
      Start Quiz
    </button>
  );
}
```

### Custom Event Tracking

```tsx
import { trackEvent } from '@/lib/analytics';

// Track a custom event
trackEvent({
  action: 'custom_action',
  category: 'engagement',
  label: 'Custom Label',
  value: 100,
  custom_parameters: {
    custom_field: 'custom_value'
  }
});
```

## Privacy and GDPR Compliance

### Data Collection

The analytics system is designed with privacy in mind:

- **No Personal Data**: We don't track personally identifiable information
- **Anonymized IPs**: IP addresses are anonymized in GA4
- **Development Mode**: No tracking occurs in development environment
- **Opt-out Ready**: Easy to implement user opt-out functionality

### GDPR Compliance

To make the system GDPR compliant:

1. Add a cookie consent banner
2. Only initialize analytics after user consent
3. Provide clear privacy policy
4. Allow users to opt-out

Example consent implementation:

```tsx
// In your consent component
import { initAnalytics } from '@/lib/analytics';

const handleAcceptCookies = () => {
  // Set consent flag
  localStorage.setItem('analytics-consent', 'true');
  // Initialize analytics
  initAnalytics();
};
```

## Development vs Production

### Development Mode
- All events are logged to console instead of sent to GA4
- No actual data collection occurs
- Full event details visible for debugging

### Production Mode
- Events are sent to configured analytics providers
- Console logging is minimal
- Error reporting is active

## Adding New Events

### 1. Define the Event

Add your event to the `analytics` object in `/src/lib/analytics.ts`:

```typescript
export const analytics = {
  // ... existing events
  
  myCustomEvent: (param1: string, param2: number) => {
    trackEvent({
      action: 'my_custom_action',
      category: 'engagement',
      label: param1,
      value: param2,
      custom_parameters: { param1, param2 }
    });
  }
};
```

### 2. Use the Event

```tsx
import { useAnalytics } from '@/lib/analytics';

const analytics = useAnalytics();
analytics.myCustomEvent('test', 123);
```

## Monitoring and Reports

### Key Metrics to Watch

1. **User Engagement**
   - Quiz completion rates
   - Module completion rates
   - Time spent on content

2. **Content Performance**
   - Most popular quizzes and modules
   - Search queries
   - User navigation paths

3. **Technical Health**
   - Error rates and types
   - Page load times
   - User session quality

### Custom Dashboard

Consider creating a custom GA4 dashboard with:
- Quiz engagement metrics
- Content performance reports
- User journey analysis
- Error tracking summary

## Troubleshooting

### Events Not Showing in GA4

1. Check environment variables are set correctly
2. Verify GA4 measurement ID format
3. Ensure production build (events don't send in development)
4. Check browser network tab for gtag requests
5. Verify GA4 real-time reports (can take 24-48hrs for standard reports)

### Console Errors

If you see analytics-related console errors:
1. Check if gtag is loaded properly
2. Verify environment variables
3. Ensure component is client-side (`'use client'` directive)

## Future Enhancements

Planned analytics improvements:
- Heatmap tracking for user interface optimization
- A/B testing framework integration
- Advanced user segmentation
- Custom conversion tracking
- Performance monitoring dashboard

## Support

For analytics setup issues:
1. Check this documentation
2. Review browser console for errors
3. Verify GA4 configuration
4. Check environment variables