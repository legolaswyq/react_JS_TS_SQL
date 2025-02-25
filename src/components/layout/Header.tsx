'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            My App
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
          <Button variant="primary">Sign In</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
