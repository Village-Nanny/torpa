import React from 'react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start group hover:transform hover:translate-x-2 transition-transform duration-200">
      <div className="bg-green-400 p-3 rounded-xl mr-4 flex-shrink-0 group-hover:bg-green-500 transition-colors duration-200">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
