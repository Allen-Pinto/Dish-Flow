import React, { useState, useMemo } from 'react';
import Header from './components/layout/Header';
import DishGrid from './components/dishes/DishGrid';
import DishFilters from './components/dishes/DishFilters';
import DishDetails from './components/dishes/DishDetails';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useDishes } from './hooks/useDishes';
import { ToastProvider, useToast } from './context/ToastContext';
import DebugConsole from './components/ui/DebugConsole';

function AppContent() {
  const { 
    dishes, 
    stats, 
    loading, 
    error, 
    filters,
    toggleDishStatus, 
    updateFilters, 
    clearFilters, 
    refetch 
  } = useDishes();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const { addToast } = useToast();

  // Filter dishes based on search query (client-side for instant results)
  const filteredDishes = useMemo(() => {
    if (!searchQuery.trim()) return dishes;

    const query = searchQuery.toLowerCase();
    return dishes.filter(
      (dish) =>
        dish.dishName.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.category.toLowerCase().includes(query) ||
        dish.cuisine.toLowerCase().includes(query) ||
        dish.dishId.toLowerCase().includes(query)
    );
  }, [dishes, searchQuery]);

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '' && filters[key] !== null) {
        count++;
      }
    });
    return count;
  }, [filters]);

  const handleToggleStatus = async (dishId) => {
    try {
      const result = await toggleDishStatus(dishId);
      addToast(
        `Dish ${result.isPublished ? 'published' : 'unpublished'} successfully!`,
        'success'
      );
    } catch (err) {
      addToast('Failed to update dish status', 'error');
    }
  };

  const handleFilterChange = (key, value) => {
    updateFilters({ [key]: value });
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchQuery('');
  };

  const handleViewDetails = (dish) => {
    setSelectedDish(dish);
  };

  const handleCloseDetails = () => {
    setSelectedDish(null);
  };

  // Calculate enhanced stats
  const enhancedStats = useMemo(() => {
    if (!stats) return { total: 0, published: 0, unpublished: 0, avgPrice: 0 };
    
    return {
      total: stats.total || 0,
      published: stats.published || 0,
      unpublished: stats.unpublished || 0,
      avgPrice: stats.priceStats?.avgPrice || 0,
    };
  }, [stats]);

  return (
    <div className="min-h-screen bg-light-gray">
      <Header stats={enhancedStats} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DishFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchChange={setSearchQuery}
          onClearFilters={handleClearFilters}
          searchQuery={searchQuery}
          activeFiltersCount={activeFiltersCount}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <DishGrid
            dishes={filteredDishes}
            onToggleStatus={handleToggleStatus}
            onViewDetails={handleViewDetails}
            error={error}
            onRetry={refetch}
          />
        )}
      </main>

      {/* Dish Details Modal */}
      <DishDetails
        dish={selectedDish}
        isOpen={!!selectedDish}
        onClose={handleCloseDetails}
        onToggleStatus={handleToggleStatus}
      />

      <DebugConsole 
      dishes={filteredDishes} 
      stats={stats} 
      filters={filters} 
      error={error} 
    />

    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;