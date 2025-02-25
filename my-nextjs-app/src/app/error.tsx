'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="space-x-4">
          <Button onClick={reset}>Try again</Button>
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/'}
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
