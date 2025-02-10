import React from 'react';
import { BarChart, Heart, Users, Lightbulb, Smartphone } from 'lucide-react';
import { Header } from '../components/ui/molecules/header';
import { DotPattern } from '../components/ui/atoms/dot-pattern';
import Link from 'next/link';
import { FeatureItem } from '../components/ui/atoms/feature-item';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <DotPattern className="fixed inset-0 bg-gray-100 text-green-400" />

      <div className="relative z-10 flex flex-col overflow-x-hidden">
        {/* Fixed Header */}

        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100/80 backdrop-blur-sm">
          <Header />
        </div>

        <main className="flex-grow container mx-auto px-8 pb-20">
          <div className="mt-48">
            <section>
              <div className="w-full flex flex-col md:flex-row shadow-xl rounded-3xl relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600">
                <div className="flex-1 p-12 md:p-16 flex flex-col items-start relative">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-left drop-shadow-md">Torpa</h1>
                  <p className="text-xl text-white mb-8 text-left leading-relaxed">
                    Embark on a fun-filled journey of early literacy with our interactive phonemic awareness app.
                  </p>
                  <p className="text-lg text-white text-left font-medium mb-8">
                    Designed for young minds, built for curious learners.
                  </p>
                  <Link
                    href="/game" // TODO: add auth check
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-white text-green-500 hover:bg-green-50 hover:text-green-600 shadow-lg transition-colors duration-200 h-11 px-8">
                    Get Started
                  </Link>
                </div>
                <div className="flex-1 bg-white p-12 md:p-16 rounded-3xl rounded-t-none md:rounded-l-none md:rounded-r-3xl">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">Designed for Young Minds</h2>
                  <div className="space-y-8 mb-8">
                    <FeatureItem
                      icon={<Lightbulb size={24} />}
                      title="Age-Appropriate Learning"
                      description="Tailored activities for 2.5 to 3.5 year olds"
                    />
                    <FeatureItem
                      icon={<BarChart size={24} />}
                      title="Progress Tracking"
                      description="Visualize your child's phonemic growth"
                    />
                    <FeatureItem
                      icon={<Smartphone size={24} />}
                      title="Multi-Device Access"
                      description="Learn seamlessly across all devices"
                    />
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
                      <div className="inline-block bg-red-100 p-3 rounded-2xl mb-6">
                        <Heart className="text-red-500 w-8 h-8" />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Lovable Characters</h2>
                      <p className="text-xl text-gray-600 mb-8">
                        Join Francine the Frog, Lulu the Ladybug and embark on an exciting journey through the world of
                        sounds and letters.
                      </p>
                      <div className="flex gap-4">
                        {['Francine', 'Lulu'].map(name => (
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
                      <div className="inline-block bg-blue-100 p-3 rounded-2xl mb-6">
                        <BarChart className="text-blue-500 w-8 h-8" />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-800 mb-6">Track Your Child&apos;s Journey</h2>
                      <p className="text-xl text-gray-600 mb-8">
                        Watch your child&apos;s progress in real-time with our intuitive tracking system. Celebrate
                        every milestone along the way!
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { name: 'Phonemic Awareness', value: '98%' },
                          { name: 'Letter Recognition', value: '98%' },
                          { name: 'Sound Blending', value: '98%' },
                        ].map(stat => (
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
                      <div className="inline-block bg-yellow-100 p-3 rounded-2xl mb-6">
                        <Users className="text-yellow-500 w-8 h-8" />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-800 mb-6">Join Our Growing Community</h2>
                      <p className="text-xl text-gray-600 mb-8">
                        Connect with other parents, share experiences, and get expert tips from our community of
                        educators and learning specialists.
                      </p>
                      <div className="flex items-center gap-8">
                        {[
                          { label: 'Active Users', value: '10k+' },
                          { label: 'Average Rating', value: '4.9' },
                          { label: 'Expert Teachers', value: '50+' },
                        ].map(metric => (
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
