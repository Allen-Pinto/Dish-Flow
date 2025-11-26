import React from 'react';
import { Package } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = Package, 
  title = 'No dishes found', 
  description = 'Try adjusting your filters or search criteria',
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-16">
      <div className="bg-light-gray rounded-full p-6 mb-6">
        <Icon className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-charcoal mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{description}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;