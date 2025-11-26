import React from 'react';
import DishCard from './DishCard';
import EmptyState from '../ui/EmptyState';
import ErrorMessage from '../ui/ErrorMessage';
import { Search } from 'lucide-react';

const DishGrid = ({ dishes, onToggleStatus, onViewDetails, error, onRetry }) => {
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (dishes.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No dishes found"
        description="Try adjusting your filters or search criteria to find what you're looking for"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-charcoal">{dishes.length}</span> {dishes.length === 1 ? 'dish' : 'dishes'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <DishCard
            key={dish.dishId}
            dish={dish}
            onToggleStatus={onToggleStatus}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default DishGrid;