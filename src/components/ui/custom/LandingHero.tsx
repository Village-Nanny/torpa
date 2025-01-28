import Image from 'next/image';
import { ArrowRight, Lightbulb, BarChart, Smartphone, Sparkles } from 'lucide-react';
import { Button } from '../button';

export default function LandingHero() {
  return (
    <section className="py-30 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="w-full flex flex-col md:flex-row shadow-xl rounded-3xl relative z-10 overflow-hidden bg-gradient-to-br from-green-400 to-green-500">
          {/* Left Section - Green Card */}
          <div className="flex-1 p-12 md:p-16 flex flex-col items-start relative">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-green-300 animate-bounce">
              <Sparkles size={24} />
            </div>
            <div className="absolute bottom-4 left-4 text-green-300 animate-pulse">
              <Sparkles size={20} />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-left drop-shadow-md">PhonemiKids</h1>
            <p className="text-xl text-white mb-8 text-left leading-relaxed">
              Embark on a fun-filled journey of early literacy with our interactive phonemic awareness app.
            </p>
            <p className="text-lg text-white text-left font-medium">
              Designed for young minds, built for curious learners.
            </p>
          </div>

          {/* Right Section - White */}
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
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start group hover:transform hover:translate-x-2 transition-transform duration-200">
      <div className="bg-green-100 p-3 rounded-xl mr-4 flex-shrink-0 group-hover:bg-green-200 transition-colors duration-200">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
