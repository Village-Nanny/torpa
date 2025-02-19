'use client';

import { Play, Target, LineChart, Smartphone } from 'lucide-react';
import { Header } from '../components/ui/molecules/header';
import { DotPattern } from '../components/ui/atoms/dot-pattern';
import { FeatureItem } from '../components/ui/atoms/feature-item';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay, duration: 0.8 } },
});

const features = [
  {
    icon: <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
    title: 'Age-Appropriate Learning and Assessment',
    description: 'Tailored activities for 2.5 through 4.5 year olds',
  },
  {
    icon: <LineChart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
    title: 'Progress Tracking',
    description: "Visualize your child's phonemic growth",
  },
  {
    icon: <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
    title: 'Multi-Device Access',
    description: 'Learn seamlessly across all devices',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans relative bg-transparent md:bg-[#fff9f0]">
      <DotPattern
        animate
        className="fixed inset-0 w-full h-full z-0 text-gray-900/30 hidden lg:block"
        style={{ backgroundImage: 'linear-gradient(to right, #16a34a 50%, #fff9f0 50%)' }}
      />

      <DotPattern
        animate
        className="fixed inset-0 w-full h-full z-0 text-gray-900/90 lg:hidden"
        style={{
          backgroundColor: '#16a34a',
          backgroundImage: 'none',
        }}
      />

      <div className="relative z-10">
        {/* Responsive Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-transparent h-20">
          <Header />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-16 md:pt-20 lg:pt-0">
          {/* Hero Section */}
          <motion.div
            className="flex items-center justify-center lg:bg-transparent px-4 pt-12 pb-4 lg:py-0"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible">
            <div className="max-w-xl w-full space-y-6 text-center">
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white lg:font-extrabold"
                variants={fadeUp(0.2)}>
                TORPA
              </motion.h1>
              <motion.div className="space-y-4" variants={fadeUp(0.4)}>
                <p className="text-xl sm:text-2xl text-white lg:font-bold">Test of Receptive Phonemic Awareness</p>
                <p className="text-lg sm:text-xl text-white font-semibold lg:font-bold">
                  Start Your Child's Pre-Literacy Journey!
                </p>
              </motion.div>
              <motion.div variants={fadeUp(0.6)}>
                <Link
                  href="/game"
                  className="inline-flex items-center gap-2 text-lg font-medium lg:font-bold bg-white text-green-600 hover:bg-green-50 rounded-lg px-8 py-4 shadow-lg transition-transform duration-200 hover:scale-105">
                  <Play className="w-6 h-6" />
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="flex items-center justify-center lg:bg-transparent px-4 pt-4 pb-12 lg:py-0"
            variants={fadeInRight}
            initial="hidden"
            animate="visible">
            <div id="features" className="max-w-xl w-full space-y-8">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold lg:font-extrabold text-white lg:text-gray-800 text-center"
                variants={fadeUp(0.2)}>
                Designed for Young Minds
              </motion.h2>
              <div className="bg-white lg:bg-transparent rounded-xl p-6 lg:p-0 shadow-md lg:shadow-none">
                <div className="grid gap-6">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp(0.3 + idx * 0.1)}
                      className="lg:bg-white/30 lg:backdrop-blur-sm lg:rounded-xl lg:p-6 lg:shadow-md lg:hover:shadow-lg lg:transition-shadow">
                      <FeatureItem
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        titleClassName="text-xl font-bold lg:font-extrabold text-gray-800 mb-1"
                        descriptionClassName="text-lg font-medium text-gray-600 lg:font-bold"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
