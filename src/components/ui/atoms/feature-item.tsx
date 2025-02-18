import React from 'react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function FeatureItem({
  icon,
  title,
  description,
  titleClassName = 'text-xl font-semibold text-gray-800',
  descriptionClassName = 'text-lg text-gray-600',
}: FeatureItemProps) {
  return (
    <div className="flex items-start gap-4 group hover:transform hover:translate-x-2 transition-transform duration-200">
      <div className="bg-green-400 p-3 rounded-xl flex-shrink-0 group-hover:bg-green-500 transition-colors duration-200">
        {icon}
      </div>
      <div>
        <h3 className={titleClassName}>{title}</h3>
        <p className={descriptionClassName}>{description}</p>
      </div>
    </div>
  );
}
