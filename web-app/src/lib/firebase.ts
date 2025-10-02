// Firebase configuration for SabbathTheologyLink
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getDataConnect, type DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

// Firebase config - these values should be set as environment variables
// For preview mode, use dummy values if environment variables are missing
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "demo-measurement-id",
};

// Debug logging for environment variables (remove in production)
if (typeof window !== 'undefined') {
  console.log('Firebase config debug:', {
    hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com'
  });
}

// Initialize Firebase (will use demo config if env vars not set)
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let dataConnect: DataConnect | null = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  dataConnect = getDataConnect(app, connectorConfig);
} catch (error) {
  console.warn('Firebase initialization failed (this is normal in preview mode):', error);
  // Create mock objects for preview mode
  auth = null;
  dataConnect = null;
}

export { auth, dataConnect };
export default app;
