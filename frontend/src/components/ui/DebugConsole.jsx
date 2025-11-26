import React, { useState } from 'react';
import { Bug, X } from 'lucide-react';

const DebugConsole = ({ dishes, stats, filters, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors z-50"
        title="Debug Console"
      >
        <Bug className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 left-6 bg-white rounded-xl shadow-2xl p-6 max-w-md max-h-96 overflow-auto z-50 border-2 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-purple-500">Debug Console</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700">API Status:</p>
              <p className="text-green-600">
                {import.meta.env.VITE_API_URL || 'http://localhost:5000'}
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Dishes Loaded:</p>
              <p className={dishes.length > 0 ? 'text-green-600' : 'text-red-600'}>
                {dishes.length} dishes
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Stats:</p>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(stats, null, 2)}
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Active Filters:</p>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(filters, null, 2)}
              </pre>
            </div>

            {error && (
              <div>
                <p className="font-semibold text-red-700">Error:</p>
                <p className="text-red-600 bg-red-50 p-2 rounded">{error}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DebugConsole;