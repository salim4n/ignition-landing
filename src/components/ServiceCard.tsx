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
      className="group bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
      onClick={onClick}
    >
      <div className="h-16 w-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}