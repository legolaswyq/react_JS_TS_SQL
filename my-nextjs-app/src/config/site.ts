export const siteConfig = {
  name: 'My Next.js App',
  description: 'A modern web application built with Next.js and TypeScript',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  links: {
    github: 'https://github.com/yourusername/my-nextjs-app',
    docs: '/docs',
  },
  metadata: {
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://my-nextjs-app.com',
      siteName: 'My Next.js App',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yourusername',
      creator: '@yourusername',
    },
  },
  features: {
    authentication: true,
    darkMode: true,
    newsletter: true,
    search: true,
  },
};

export type SiteConfig = typeof siteConfig;
