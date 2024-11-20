import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  onClick: () => void;
}

export default function ServiceCard({ title, description, Icon, onClick }: ServiceCardProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}