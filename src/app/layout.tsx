import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { siteConfig } from '@/config/site';
import './globals.css';
import { initializeDatabase } from '@/lib/db/init';

// Initialize database on server
try {
  initializeDatabase();
} catch (error) {
  console.error('Failed to initialize database in layout:', error);
}

async function getInitialSession() {
  try {
    const headersList = await headers();
    const sessionUser = headersList.get('x-session-user');
    if (!sessionUser) return null;
    
    try {
      return JSON.parse(sessionUser);
    } catch {
      console.error('Failed to parse session user data');
      return null;
    }
  } catch (error) {
    console.error('Error getting initial session:', error);
    return null;
  }
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
  ],
  authors: [
    {
      name: 'Your Name',
      url: 'https://your-website.com',
    },
  ],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.metadata.openGraph.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.metadata.openGraph.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.metadata.twitter.creator,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialSession = await getInitialSession();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider initialSession={initialSession}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full p-8">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
