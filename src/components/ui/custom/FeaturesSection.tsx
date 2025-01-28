import { Lightbulb, BarChart, Smartphone } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-purple-dark">
          Designed for Young Minds
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Lightbulb size={32} className="text-green" />}
            title="Age-Appropriate Learning"
            description="Tailored activities for 2.5 to 3.5 year olds"
          />
          <FeatureCard
            icon={<BarChart size={32} className="text-purple" />}
            title="Progress Tracking"
            description="Visualize your child's phonemic growth"
          />
          <FeatureCard
            icon={<Smartphone size={32} className="text-green" />}
            title="Multi-Device Access"
            description="Learn seamlessly across all devices"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
      <div className="inline-block p-3 bg-white rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-display font-semibold mb-2 text-purple-dark">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
