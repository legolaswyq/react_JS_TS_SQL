import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to check the session
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (data.user) {
          setAuthState({
            user: data.user,
            loading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            loading: false,
            error: null,
          });
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to authenticate';
        setAuthState({
          user: null,
          loading: false,
          error: errorMessage,
        });
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call to sign in
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
      // In a real app, this would be an API call to sign out
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

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signIn,
    signOut,
  };
}
