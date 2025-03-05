'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<User | undefined>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
}

interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

interface SessionProviderProps {
  children: ReactNode;
  initialSession?: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function SessionProvider({ children, initialSession }: SessionProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: initialSession || null,
    loading: !initialSession, // Don't show loading if we have initial session
    error: null,
  });

  useEffect(() => {
    if (initialSession !== undefined) {
      setAuthState(prev => ({
        ...prev,
        user: initialSession,
        loading: false,
      }));
    }
  }, [initialSession]);

  // Separate effect for session refresh
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      if (!isMounted) return;

      try {
        const response = await fetch('/api/auth/session');
        if (!isMounted) return;

        if (!response.ok) {
          throw new Error('Failed to fetch session');
        }

        const data = await response.json();
        if (!isMounted) return;

        setAuthState(prev => ({
          ...prev,
          user: data.user,
          loading: false,
        }));
      } catch (error) {
        if (!isMounted) return;
        console.error('Auth check error:', error);
      }
    };

    // Check immediately and then every 30 seconds
    checkAuth();
    const interval = setInterval(checkAuth, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      // Immediately update state with user data
      if (data.user) {
        setAuthState({
          user: data.user,
          loading: false,
          error: null,
        });
        return data.user; // Return user data for the signin page to use
      }
    } catch (error) {
      let errorMessage = 'Failed to sign in';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw new Error(errorMessage);
    }
  };

  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
      }));
    }
  };

  const signUp = async (data: SignUpData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const responseData = await response.json();

    if (!response.ok) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: responseData.error || 'Failed to sign up'
      }));
      throw new Error(responseData.error || 'Failed to sign up');
    }

    if (responseData.user) {
      setAuthState({
        user: responseData.user,
        loading: false,
        error: null,
      });
      return responseData.user;
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        ...authState,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a SessionProvider');
  }
  return context;
}
