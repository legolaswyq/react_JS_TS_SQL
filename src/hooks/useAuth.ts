import { useState, useEffect } from 'react';

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

interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

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

        setAuthState({
          user: data.user,
          loading: false,
          error: null,
        });
      } catch (error: unknown) {
        if (!isMounted) return;
        
        console.error('Auth check error:', error);
        setAuthState({
          user: null,
          loading: false,
          error: null, // Don't show error to user on initial load
        });
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.user) {
        setAuthState({
          user: data.user,
          loading: false,
          error: null,
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
      }));
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
      }));
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to sign up');
      }

      if (responseData.user) {
        setAuthState({
          user: responseData.user,
          loading: false,
          error: null,
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign up';
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
      }));
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signIn,
    signUp,
    signOut,
  };
}
