import React from 'react';
import Header from '../components/ui/custom/Header';
import Image from 'next/image';
import { ArrowRight, BarChart, Heart, Star, Users, Lightbulb, Smartphone, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DotPattern } from '../components/ui/atoms/dot-pattern';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans bg-gray-100 overflow-x-hidden">
      <DotPattern className="fixed inset-0 bg-gray-100 text-green-400" />

      <div className="relative z-10 flex flex-col">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100/80 backdrop-blur-sm">
          <Header />
        </div>

        <main className="flex-grow container mx-auto px-8 pb-20 ">
          <div className="mt-48">
            {/* Hero Section */}
            <section>
              <div className="w-full flex flex-col md:flex-row shadow-xl rounded-3xl relative overflow-hidden bg-gradient-to-br from-green-400 to-green-500">
                {/* Left Content */}
                <div className="flex-1 p-12 md:p-16 flex flex-col items-start relative">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-left drop-shadow-md">Torpa</h1>
                  <p className="text-xl text-white mb-8 text-left leading-relaxed">
                    Embark on a fun-filled journey of early literacy with our interactive phonemic awareness app.
                  </p>
                  <p className="text-lg text-white text-left font-medium">
                    Designed for young minds, built for curious learners.
                  </p>
                </div>
                {/* Right Content */}
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
                  <Button
                    size="lg"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transform transition-all duration-200 hover:scale-102 hover:shadow-lg">
                    Start Learning <ArrowRight className="ml-2 animate-bounce-x" size={16} />
                  </Button>
                </div>
              </div>
            </section>

            {/* Content Sections - adjusted spacing */}
            <div className="space-y-20 py-20">
              {/* Lovable Characters Section */}
              <section>
                <div className="bg-white rounded-3xl shadow-lg p-12 transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                      <div className="inline-block bg-red-100 p-3 rounded-2xl mb-6">
                        <Heart className="text-red-500 w-8 h-8" />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Lovable Characters</h2>
                      <p className="text-xl text-gray-600 mb-8">
                        Join Francine the Frog , Lulu the Ladybug and embark on an exciting journey through the world of
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

              {/* Progress Tracking Section */}
              <section>
                <div className="bg-white rounded-3xl shadow-lg p-12 transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="flex-1">
                      <div className="inline-block bg-blue-100 p-3 rounded-2xl mb-6">
                        <BarChart className="text-blue-500 w-8 h-8" />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-800 mb-6">Track Your Child's Journey</h2>
                      <p className="text-xl text-gray-600 mb-8">
                        Watch your child's progress in real-time with our intuitive tracking system. Celebrate every
                        milestone along the way!
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {['Phonemic Awareness', 'Letter Recognition', 'Sound Blending'].map(skill => (
                          <div key={skill} className="bg-blue-50 p-4 rounded-xl">
                            <div className="font-medium text-blue-700 text-sm">{skill}</div>
                            <div className="text-2xl font-bold text-blue-800 mt-1">98%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 relative h-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl">
                        {/* Replace with actual progress visualization */}
                        <div className="h-full flex items-center justify-center text-gray-400">
                          Progress Visualization
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
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-600">10k+</div>
                          <div className="text-gray-600">Active Users</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-600">4.9</div>
                          <div className="text-gray-600">Average Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-600">50+</div>
                          <div className="text-gray-600">Expert Teachers</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 relative h-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                        {/* Replace with actual community illustration */}
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
