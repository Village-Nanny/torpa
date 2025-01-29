import React from 'react';
import { BarChart, Heart, Users, Lightbulb, Smartphone } from 'lucide-react';

import { LandingTemplate } from '../components/ui/templates/landing-template';

export default function LandingPage() {
  return (
    <LandingTemplate
      title="Torpa"
      subtitle="Embark on a fun-filled journey of early literacy with our interactive phonemic awareness app."
      description="Designed for young minds, built for curious learners."
      heroButton={{
        label: 'Get Started',
        href: '/signup', // or whatever route you want
      }}
      features={[
        {
          icon: <Lightbulb size={24} />,
          title: 'Age-Appropriate Learning',
          description: 'Tailored activities for 2.5 to 3.5 year olds',
        },
        {
          icon: <BarChart size={24} />,
          title: 'Progress Tracking',
          description: "Visualize your child's phonemic growth",
        },
        {
          icon: <Smartphone size={24} />,
          title: 'Multi-Device Access',
          description: 'Learn seamlessly across all devices',
        },
      ]}
      characters={{
        icon: <Heart className="text-red-500 w-8 h-8" />,
        title: 'Meet Our Lovable Characters',
        description:
          'Join Francine the Frog, Lulu the Ladybug and embark on an exciting journey through the world of sounds and letters.',
        names: ['Francine', 'Lulu'],
      }}
      progress={{
        icon: <BarChart className="text-blue-500 w-8 h-8" />,
        title: "Track Your Child's Journey",
        description:
          "Watch your child's progress in real-time with our intuitive tracking system. Celebrate every milestone along the way!",
        stats: [
          { name: 'Phonemic Awareness', value: '98%' },
          { name: 'Letter Recognition', value: '98%' },
          { name: 'Sound Blending', value: '98%' },
        ],
      }}
      community={{
        icon: <Users className="text-yellow-500 w-8 h-8" />,
        title: 'Join Our Growing Community',
        description:
          'Connect with other parents, share experiences, and get expert tips from our community of educators and learning specialists.',
        metrics: [
          { label: 'Active Users', value: '10k+' },
          { label: 'Average Rating', value: '4.9' },
          { label: 'Expert Teachers', value: '50+' },
        ],
      }}
    />
  );
}
