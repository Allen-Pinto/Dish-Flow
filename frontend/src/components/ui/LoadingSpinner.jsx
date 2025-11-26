import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'lg', message = 'Loading dishes...' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className={`${sizes[size]} text-soft-mint animate-spin mx-auto mb-4`} />
        <p className="text-gray-500 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;