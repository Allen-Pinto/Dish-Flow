import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/layout/Header';
import DishGrid from './components/dishes/DishGrid';
import DishFilters from './components/dishes/DishFilters';
import DishDetails from './components/dishes/DishDetails';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorMessage from './components/ui/ErrorMessage';
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
  const [isInitialized, setIsInitialized] = useState(false);
  const { addToast } = useToast();

  // Debug mount and data changes
  useEffect(() => {
    console.log('🚀 App mounted - Environment:', import.meta.env.MODE);
    console.log('🔗 API URL:', import.meta.env.VITE_API_URL);
    console.log('📦 Dishes count:', dishes?.length);
    console.log('⚡ Loading state:', loading);
    console.log('❌ Error state:', error);
    
    if (!loading && !error) {
      setIsInitialized(true);
    }
  }, [loading, error, dishes?.length]);

  // Filter dishes based on search query (client-side for instant results)
  const filteredDishes = useMemo(() => {
    console.log('🔍 Filtering dishes:', { 
      totalDishes: dishes?.length, 
      searchQuery,
      filters 
    });

    if (!dishes || dishes.length === 0) return [];

    let filtered = [...dishes];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dish) =>
          dish.dishName?.toLowerCase().includes(query) ||
          dish.description?.toLowerCase().includes(query) ||
          dish.category?.toLowerCase().includes(query) ||
          dish.cuisine?.toLowerCase().includes(query) ||
          dish.dishId?.toLowerCase().includes(query)
      );
    }

    // Apply backend filters (these should come from useDishes hook)
    // The useDishes hook already applies filters to the dishes it returns

    console.log('✅ Filtered dishes result:', filtered.length);
    return filtered;
  }, [dishes, searchQuery, filters]);

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
    console.log('🔄 Toggling dish status:', dishId);
    try {
      const result = await toggleDishStatus(dishId);
      addToast(
        `Dish ${result.data?.isPublished ? 'published' : 'unpublished'} successfully!`,
        'success'
      );
      console.log('✅ Toggle successful:', result);
    } catch (err) {
      console.error('❌ Toggle failed:', err);
      addToast(
        err.message || 'Failed to update dish status. Please try again.',
        'error'
      );
    }
  };

  const handleFilterChange = (key, value) => {
    console.log('🎛️ Filter changed:', { key, value });
    updateFilters({ [key]: value });
  };

  const handleClearFilters = () => {
    console.log('🧹 Clearing all filters');
    clearFilters();
    setSearchQuery('');
    addToast('All filters cleared', 'info');
  };

  const handleViewDetails = (dish) => {
    console.log('👀 Viewing dish details:', dish.dishId);
    setSelectedDish(dish);
  };

  const handleCloseDetails = () => {
    console.log('❌ Closing dish details');
    setSelectedDish(null);
  };

  // Calculate enhanced stats
  const enhancedStats = useMemo(() => {
    if (!stats) {
      return { 
        total: 0, 
        published: 0, 
        unpublished: 0, 
        avgPrice: 0,
        vegetarian: 0,
        vegan: 0 
      };
    }
    
    return {
      total: stats.total || 0,
      published: stats.published || 0,
      unpublished: stats.unpublished || 0,
      vegetarian: stats.vegetarian || 0,
      vegan: stats.vegan || 0,
      avgPrice: stats.priceStats?.avgPrice || 0,
    };
  }, [stats]);

  // Show different states based on loading and data
  const renderContent = () => {
    // Initial loading
    if (loading && !isInitialized) {
      return (
        <div className="flex justify-center items-center min-h-96">
          <LoadingSpinner 
            size="xl" 
            text="Loading DishFlow..." 
          />
        </div>
      );
    }

    // Error state
    if (error && !isInitialized) {
      return (
        <ErrorMessage 
          message={error}
          onRetry={refetch}
          showRetry={true}
        />
      );
    }

    // No dishes found
    if (isInitialized && filteredDishes.length === 0 && dishes.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Dishes Found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || activeFiltersCount > 0 
                ? "Try adjusting your search or filters to find what you're looking for."
                : "It looks like no dishes have been added yet."}
            </p>
            {(searchQuery || activeFiltersCount > 0) && (
              <button
                onClick={handleClearFilters}
                className="px-6 py-2 bg-soft-mint text-charcoal rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      );
    }

    // Show dishes grid
    return (
      <DishGrid
        dishes={filteredDishes}
        onToggleStatus={handleToggleStatus}
        onViewDetails={handleViewDetails}
        error={error}
        onRetry={refetch}
      />
    );
  };

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

        {renderContent()}
      </main>

      {/* Dish Details Modal */}
      {selectedDish && (
        <DishDetails
          dish={selectedDish}
          isOpen={!!selectedDish}
          onClose={handleCloseDetails}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {/* Debug Console - Only show in development */}
      {(import.meta.env.DEV || window.location.search.includes('debug=true')) && (
        <DebugConsole 
          dishes={filteredDishes} 
          stats={stats} 
          filters={filters} 
          error={error} 
          loading={loading}
        />
      )}
    </div>
  );
}

function App() {
  // Add global error boundary
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            The application encountered an unexpected error. Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary onError={() => setHasError(true)}>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ErrorBoundary>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error('🚨 Error Boundary Caught:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 Error Boundary:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default App;