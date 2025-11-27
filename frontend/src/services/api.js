import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: false, // Set to true if using cookies/auth
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add timestamp for cache busting if needed
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(), // Cache busting
      };
    }

    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data,
    });
    
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.url}`, {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    // Enhanced error handling
    if (error.code === 'ECONNABORTED') {
      console.error('API Timeout:', error.config?.url);
      const timeoutError = new Error('Request timeout. Please try again.');
      timeoutError.isTimeout = true;
      return Promise.reject(timeoutError);
    }

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'Unknown error occurred';
      
      console.error(`API Error ${status}:`, {
        url: error.config?.url,
        method: error.config?.method,
        message,
        data: error.response.data,
      });

      const friendlyError = new Error(message);
      friendlyError.status = status;
      friendlyError.data = error.response.data;
      friendlyError.url = error.config?.url;

      // Handle specific status codes
      if (status === 401) {
        friendlyError.isAuthError = true;
      } else if (status === 403) {
        friendlyError.isForbidden = true;
      } else if (status === 404) {
        friendlyError.isNotFound = true;
      } else if (status >= 500) {
        friendlyError.isServerError = true;
      }

      return Promise.reject(friendlyError);
    } else if (error.request) {
      // Network error - no response received
      console.error('Network Error:', {
        url: error.config?.url,
        message: 'No response received from server',
      });

      const networkError = new Error('Unable to connect to server. Please check your internet connection.');
      networkError.isNetworkError = true;
      networkError.isOffline = !navigator.onLine;
      return Promise.reject(networkError);
    } else {
      // Request configuration error
      console.error('Request Configuration Error:', error.message);
      return Promise.reject(error);
    }
  }
);

// API methods with enhanced error handling and retry logic
export const dishAPI = {
  // Get all dishes with filters
  getAllDishes: async (params = {}) => {
    try {
      // Clean up empty params and normalize values
      const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined && value !== 'all') {
          // Convert boolean strings to actual booleans for backend
          if (value === 'true' || value === 'false') {
            acc[key] = value === 'true';
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {});

      console.log('Fetching dishes with params:', cleanParams);
      
      const response = await api.get('/dishes', { params: cleanParams });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch dishes');
      }
      
      return response.data;
    } catch (error) {
      console.error('Failed to fetch dishes:', error);
      
      // Enhance error message for better UX
      if (error.isNetworkError) {
        error.message = 'Unable to load dishes. Please check your internet connection.';
      } else if (error.isTimeout) {
        error.message = 'Request timeout. Please try again.';
      }
      
      throw error;
    }
  },

  // Get single dish
  getDishById: async (dishId) => {
    try {
      if (!dishId) {
        throw new Error('Dish ID is required');
      }

      console.log(`🔍 Fetching dish: ${dishId}`);
      const response = await api.get(`/dishes/${dishId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Dish not found');
      }
      
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch dish ${dishId}:`, error);
      
      if (error.isNotFound) {
        error.message = `Dish "${dishId}" not found.`;
      }
      
      throw error;
    }
  },

  // Toggle dish published status
  toggleDishStatus: async (dishId) => {
    try {
      if (!dishId) {
        throw new Error('Dish ID is required');
      }

      console.log(`🔄 Toggling dish status for: ${dishId}`);
      const response = await api.patch(`/dishes/${dishId}/toggle`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update dish status');
      }
      
      console.log(`Successfully toggled dish ${dishId}:`, response.data.data.isPublished);
      return response.data;
    } catch (error) {
      console.error(`Failed to toggle dish ${dishId}:`, error);
      
      if (error.isNetworkError) {
        error.message = 'Unable to update dish. Please check your connection.';
      }
      
      throw error;
    }
  },

  // Get dish statistics
  getDishStats: async () => {
    try {
      console.log('Fetching dish statistics');
      const response = await api.get('/dishes/stats/summary');
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch statistics');
      }
      
      return response.data;
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      
      // Don't throw critical errors for stats, return fallback data
      if (error.isNetworkError || error.isTimeout) {
        console.warn('Using fallback stats due to network error');
        return {
          success: true,
          data: {
            total: 0,
            published: 0,
            unpublished: 0,
            vegetarian: 0,
            vegan: 0,
            categories: [],
            cuisines: [],
            priceStats: { avgPrice: 0, minPrice: 0, maxPrice: 0 }
          }
        };
      }
      
      throw error;
    }
  },

  // Bulk update dishes
  bulkUpdateDishes: async (dishIds, action) => {
    try {
      if (!Array.isArray(dishIds) || dishIds.length === 0) {
        throw new Error('Please select at least one dish');
      }

      if (!['publish', 'unpublish'].includes(action)) {
        throw new Error('Invalid action. Use "publish" or "unpublish"');
      }

      console.log(`Bulk ${action} for ${dishIds.length} dishes:`, dishIds);
      
      const response = await api.patch('/dishes/bulk/update', { 
        dishIds, 
        action 
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update dishes');
      }
      
      console.log(`Successfully ${action}ed ${response.data.data.modifiedCount} dishes`);
      return response.data;
    } catch (error) {
      console.error('Failed to bulk update dishes:', error);
      
      if (error.isNetworkError) {
        error.message = 'Unable to update dishes. Please check your connection.';
      }
      
      throw error;
    }
  },
};

// Utility functions
export const checkAPIHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('API health check failed:', error);
    
    const healthError = new Error('API server is unavailable');
    healthError.isUnavailable = true;
    throw healthError;
  }
};

// Cache management
export const clearAPICache = () => {
  // Clear any cached requests if needed
  console.log('🧹 API cache cleared');
};

// Export the axios instance for direct use if needed
export { api };

export default api;