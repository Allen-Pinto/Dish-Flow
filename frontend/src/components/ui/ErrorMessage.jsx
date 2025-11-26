import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../common/Button';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600 mb-6">{message}</p>
        {onRetry && (
          <Button
            variant="danger"
            onClick={onRetry}
            icon={RefreshCw}
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;