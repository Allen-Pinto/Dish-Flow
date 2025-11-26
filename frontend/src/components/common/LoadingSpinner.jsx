import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'lg', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-3">
      <Loader2 className={`${sizes[size]} text-gray-400 animate-spin`} />
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
};

export default LoadingSpinner;