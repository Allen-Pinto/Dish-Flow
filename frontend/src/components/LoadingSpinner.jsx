import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-soft-mint animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading dishes...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;