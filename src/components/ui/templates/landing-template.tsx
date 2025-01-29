import { Header } from '../molecules/header';
import { DotPattern } from '../atoms/dot-pattern';
import { Button } from '../atoms/button';
import React from 'react';
import Link from 'next/link';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface LandingTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  heroButton: {
    label: string;
    href: string;
  };
  features: Feature[];
  characters: {
    names: string[];
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  progress: {
    title: string;
    description: string;
    icon: React.ReactNode;
    stats: { name: string; value: string }[];
  };
  community: {
    title: string;
    description: string;
    icon: React.ReactNode;
    metrics: { label: string; value: string }[];
  };
}

export function LandingTemplate({
  title,
  subtitle,
  description,
  heroButton,
  features,
  characters,
  progress,
  community,
}: LandingTemplateProps) {
  return (
    <div className="min-h-screen font-sans bg-gray-100 overflow-x-hidden">
      <DotPattern className="fixed inset-0 bg-gray-100 text-green-400 " />

      <div className="relative z-10 flex flex-col">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100/80 backdrop-blur-sm">
          <Header />
        </div>

        <main className="flex-grow container mx-auto px-8 pb-20">
          <div className="mt-48">
            <section>
              <div className="w-full flex flex-col md:flex-row shadow-xl rounded-3xl relative overflow-hidden bg-gradient-to-br from-green-400 to-green-500">
                <div className="flex-1 p-12 md:p-16 flex flex-col items-start relative">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-left drop-shadow-md">{title}</h1>
                  <p className="text-xl text-white mb-8 text-left leading-relaxed">{subtitle}</p>
                  <p className="text-lg text-white text-left font-medium mb-8">{description}</p>
                  <Link
                    href={heroButton.href}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-white text-green-500 hover:bg-green-50 hover:text-green-600 shadow-lg transition-colors duration-200 h-11 px-8">
                    {heroButton.label}
                  </Link>
                </div>
                <div className="flex-1 bg-white p-12 md:p-16 rounded-3xl rounded-t-none md:rounded-l-none md:rounded-r-3xl">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">Designed for Young Minds</h2>
                  <div className="space-y-8 mb-8">
                    {features.map((feature, index) => (
                      <FeatureItem
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Content Sections */}
            <div className="space-y-20 py-20">
              {/* Characters Section */}
              <section>
                <div className="bg-white rounded-3xl shadow-lg p-12 transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                      <div className="inline-block bg-red-100 p-3 rounded-2xl mb-6">{characters.icon}</div>
                      <h2 className="text-4xl font-bold text-gray-800 mb-6">{characters.title}</h2>
                      <p className="text-xl text-gray-600 mb-8">{characters.description}</p>
                      <div className="flex gap-4">
                        {characters.names.map(name => (
                          <div key={name} className="bg-green-100 px-4 py-2 rounded-full text-green-700 font-medium">
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 relative h-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                        <div className="h-full flex items-center justify-center text-gray-400">
                          Character Illustrations
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Progress Section */}
              <section>
                <div className="bg-white rounded-3xl shadow-lg p-12 transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                      <div className="inline-block bg-blue-100 p-3 rounded-2xl mb-6">{progress.icon}</div>
                      <h2 className="text-4xl font-bold text-gray-800 mb-6">{progress.title}</h2>
                      <p className="text-xl text-gray-600 mb-8">{progress.description}</p>
                      <div className="grid grid-cols-3 gap-4">
                        {progress.stats.map(stat => (
                          <div key={stat.name} className="bg-blue-50 p-4 rounded-xl">
                            <div className="font-medium text-blue-700 text-sm">{stat.name}</div>
                            <div className="text-2xl font-bold text-blue-800 mt-1">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 relative h-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl">
                        <div className="h-full flex items-center justify-center text-gray-400">
                          Progress Illustration
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Community Section */}
              <section>
                <div className="bg-white rounded-3xl shadow-lg p-12 transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                      <div className="inline-block bg-yellow-100 p-3 rounded-2xl mb-6">{community.icon}</div>
                      <h2 className="text-4xl font-bold text-gray-800 mb-6">{community.title}</h2>
                      <p className="text-xl text-gray-600 mb-8">{community.description}</p>
                      <div className="flex items-center gap-8">
                        {community.metrics.map(metric => (
                          <div key={metric.label} className="text-center">
                            <div className="text-3xl font-bold text-yellow-600">{metric.value}</div>
                            <div className="text-gray-600">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 relative h-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl">
                        <div className="h-full flex items-center justify-center text-gray-400">
                          Community Illustration
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start group hover:transform hover:translate-x-2 transition-transform duration-200">
      <div className="bg-green-300 p-3 rounded-xl mr-4 flex-shrink-0 group-hover:bg-green-500 transition-colors duration-200">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
