'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { useAuth } from '@/components/providers/SessionProvider';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/hippo_daisy.png" alt="HippoStation" className="h-20 w-20" />
              <span className="text-xl font-bold text-gray-900">HippoStation</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="#" className="text-gray-600 p-3 bg-white rounded-lg transition-shadow duration-100 hover:bg-gray-300">About</Link>
            <Link href="#" className="text-gray-600 p-3 bg-white rounded-lg transition-shadow duration-100 hover:bg-gray-300">Contact</Link>
            {user ? (
              <>
                <span className="text-gray-600 mr-4">{user.email}</span>
                <Button variant="secondary" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/signin">
                <Button variant="primary">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
        
        <nav>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 text-gray-600 p-3 bg-white rounded-lg transition-shadow duration-100 hover:bg-gray-300">Home</Link>
              <Link href="/agents" className="text-gray-600 text-gray-600 p-3 bg-white rounded-lg transition-shadow duration-100 hover:bg-gray-300">Agents</Link>
              <Link href="/workflows" className="text-gray-600 text-gray-600 p-3 bg-white rounded-lg transition-shadow duration-100 hover:bg-gray-300">Workflows</Link>
              <Link href="/chatbot" className="text-gray-600 p-3 bg-white rounded-lg transition-shadow duration-100 hover:bg-gray-300">Chatbot</Link>
            </div>
          </div>
        </nav>
      </nav>
    </header>
  );
};

export default Header;
