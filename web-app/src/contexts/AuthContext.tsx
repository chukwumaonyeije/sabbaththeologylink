'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth';
import { auth, dataConnect } from '@/lib/firebase';
import { upsertUser, updateUserSettings } from '@dataconnect/generated';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (email: string, password: string) => {
    if (!auth) {
      throw new Error('Authentication not available in preview mode');
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, name: string) => {
    if (!auth || !dataConnect) {
      throw new Error('Authentication not available in preview mode');
    }
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's display name
    await updateProfile(result.user, { displayName: name });
    
    try {
      // Create user record in DataConnect
      await upsertUser(dataConnect, {
        name,
        email,
        bibleVersion: 'NKJV' // Default Bible version for SDA users
      });
      
      // Initialize user settings
      await updateUserSettings(dataConnect, {
        preferredBibleVersion: 'NKJV',
        theme: 'light',
        fontSize: 'medium',
        dailyReminderEnabled: true,
        emailNotifications: true
      });
      
      console.log('User created in database:', { name, email });
    } catch (error) {
      console.error('Error creating user in database:', error);
      // Note: We don't throw here to avoid breaking the signup flow
      // The user is still created in Firebase Auth
    }
  };

  const logout = () => {
    if (!auth) {
      throw new Error('Authentication not available in preview mode');
    }
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    if (!auth) {
      throw new Error('Authentication not available in preview mode');
    }
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (name: string) => {
    if (!auth || !currentUser || !dataConnect) {
      throw new Error('Authentication not available in preview mode or no user logged in');
    }
    
    await updateProfile(currentUser, { displayName: name });
    
    try {
      // Update user record in DataConnect
      await upsertUser(dataConnect, {
        name,
        email: currentUser.email!,
        bibleVersion: 'NKJV'
      });
      
      console.log('User profile updated in database:', { name, email: currentUser.email });
    } catch (error) {
      console.error('Error updating user profile in database:', error);
    }
  };

  useEffect(() => {
    // Handle preview mode when auth is not available
    if (!auth) {
      console.log('Running in preview mode - authentication disabled');
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && dataConnect) {
        // User is signed in
        console.log('User authenticated:', { name: user.displayName, email: user.email });
        
        try {
          // Ensure user exists in DataConnect (in case they signed up elsewhere)
          if (user.displayName && user.email) {
            await upsertUser(dataConnect, {
              name: user.displayName,
              email: user.email,
              bibleVersion: 'NKJV'
            });
          }
        } catch (error) {
          console.error('Error syncing user with database:', error);
        }
      }
      
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}