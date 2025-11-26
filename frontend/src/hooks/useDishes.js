import { useState, useEffect, useCallback } from 'react';
import { dishAPI } from '../services/api';
import { normalizeFilters, calculateActiveFilters } from '../utils/helpers';

export const useDishes = (initialFilters = {}) => {
  const [dishes, setDishes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Fetch dishes with current filters
  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const cleanFilters = normalizeFilters(filters);
      const response = await dishAPI.getAllDishes(cleanFilters);
      
      if (response.success) {
        setDishes(response.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch dishes');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to fetch dishes. Please try again.';
      setError(errorMessage);
      console.error('Error fetching dishes:', err);
      setDishes([]); // Reset dishes on error
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const response = await dishAPI.getDishStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Don't set error for stats failure, as it's not critical
    }
  }, []);

  // Toggle dish status
  const toggleDishStatus = useCallback(async (dishId) => {
    try {
      setError(null);
      
      // Optimistic update
      setDishes(prevDishes =>
        prevDishes.map(dish =>
          dish.dishId === dishId
            ? { ...dish, isPublished: !dish.isPublished }
            : dish
        )
      );

      const response = await dishAPI.toggleDishStatus(dishId);
      
      if (response.success) {
        // Update the dish with the actual response data
        setDishes(prevDishes =>
          prevDishes.map(dish =>
            dish.dishId === dishId
              ? { ...dish, ...response.data }
              : dish
          )
        );
        
        // Refresh stats to get updated counts
        await fetchStats();
        
        return response;
      } else {
        throw new Error(response.message || 'Failed to toggle dish status');
      }
    } catch (err) {
      // Revert optimistic update on error
      await fetchDishes();
      
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to update dish status. Please try again.';
      setError(errorMessage);
      console.error('Error toggling dish status:', err);
      throw err;
    }
  }, [fetchDishes, fetchStats]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      
      // Remove filter if value is empty/null/undefined
      Object.keys(updated).forEach(key => {
        if (updated[key] === '' || updated[key] === null || updated[key] === undefined) {
          delete updated[key];
        }
      });
      
      return updated;
    });
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Clear specific filter
  const clearFilter = useCallback((filterKey) => {
    setFilters(prev => {
      const updated = { ...prev };
      delete updated[filterKey];
      return updated;
    });
  }, []);

  // Set search query
  const setSearchQuery = useCallback((search) => {
    updateFilters({ search });
  }, [updateFilters]);

  // Set sort option
  const setSortBy = useCallback((sortBy) => {
    updateFilters({ sortBy });
  }, [updateFilters]);

  // Refresh data
  const refetch = useCallback(() => {
    fetchDishes();
    fetchStats();
  }, [fetchDishes, fetchStats]);

  // Update active filters count when filters change
  useEffect(() => {
    setActiveFiltersCount(calculateActiveFilters(filters));
  }, [filters]);

  // Initial data fetch
  useEffect(() => {
    fetchDishes();
    fetchStats();
  }, [fetchDishes, fetchStats]);

  // Real-time updates setup (if using sockets)
  useEffect(() => {
    // If you have socket service enabled, uncomment this section
    /*
    const socket = socketService.connect();

    const handleDishUpdate = () => {
      console.log('📡 Real-time update received - refreshing data');
      refetch();
    };

    socketService.on('dishUpdated', handleDishUpdate);
    socketService.on('dishAdded', handleDishUpdate);
    socketService.on('dishDeleted', handleDishUpdate);

    return () => {
      socketService.off('dishUpdated', handleDishUpdate);
      socketService.off('dishAdded', handleDishUpdate);
      socketService.off('dishDeleted', handleDishUpdate);
    };
    */
  }, [refetch]);

  return {
    // State
    dishes,
    stats,
    loading,
    error,
    filters,
    activeFiltersCount,
    
    // Actions
    refetch,
    toggleDishStatus,
    updateFilters,
    clearFilters,
    clearFilter,
    setSearchQuery,
    setSortBy,
    
    // Utility functions
    hasFilters: activeFiltersCount > 0,
    isEmpty: !loading && dishes.length === 0,
  };
};

// Custom hook for dish operations without filters
export const useDishOperations = () => {
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState(null);

  const toggleDishStatus = useCallback(async (dishId) => {
    try {
      setOperationLoading(true);
      setOperationError(null);
      
      const response = await dishAPI.toggleDishStatus(dishId);
      
      if (response.success) {
        return response;
      } else {
        throw new Error(response.message || 'Failed to toggle dish status');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to update dish status';
      setOperationError(errorMessage);
      console.error('Error in dish operation:', err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  }, []);

  const bulkUpdateDishes = useCallback(async (dishIds, action) => {
    try {
      setOperationLoading(true);
      setOperationError(null);
      
      const response = await dishAPI.bulkUpdateDishes(dishIds, action);
      
      if (response.success) {
        return response;
      } else {
        throw new Error(response.message || 'Failed to bulk update dishes');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to update dishes';
      setOperationError(errorMessage);
      console.error('Error in bulk operation:', err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setOperationError(null);
  }, []);

  return {
    operationLoading,
    operationError,
    toggleDishStatus,
    bulkUpdateDishes,
    clearError,
  };
};

export default useDishes;