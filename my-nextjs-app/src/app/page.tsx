'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { siteConfig } from '@/config/site';

export default function Home() {
  const features = [
    {
      title: 'Next.js 13',
      description: 'Built with the latest Next.js features including App Router and Server Components.',
      icon: '/next.svg',
    },
    {
      title: 'TypeScript',
      description: 'Type-safe code with TypeScript for better development experience.',
      icon: '/file.svg',
    },
    {
      title: 'Tailwind CSS',
      description: 'Beautiful, responsive designs with utility-first CSS framework.',
      icon: '/window.svg',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to {siteConfig.name}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              {siteConfig.description}
            </p>
            <div className="space-x-4">
              <Button
                onClick={() => window.location.href = '/docs'}
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.open(siteConfig.links.github, '_blank')}
              >
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-gray-500 md:text-xl max-w-[600px]">
              Join us and start building amazing applications with our modern tech stack.
            </p>
            <Button
              onClick={() => window.location.href = '/docs'}
            >
              Start Building
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
