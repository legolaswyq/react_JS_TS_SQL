export const SITE_NAME = 'My Next.js App';
export const SITE_DESCRIPTION = 'A modern web application built with Next.js';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/myapp',
  github: 'https://github.com/myapp',
  linkedin: 'https://linkedin.com/company/myapp',
};

export const API_ENDPOINTS = {
  auth: '/api/auth',
  users: '/api/users',
  posts: '/api/posts',
};

export const PAGE_SIZE = 10;

export const DATE_FORMATS = {
  full: 'MMMM dd, yyyy',
  short: 'MM/dd/yyyy',
  iso: 'yyyy-MM-dd',
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
