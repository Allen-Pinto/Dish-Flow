import { SPICE_LEVELS } from './constants';

export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
};

export const formatTime = (minutes) => {
  if (typeof minutes !== 'number') {
    minutes = parseInt(minutes) || 0;
  }
  
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  
  return `${hours}h ${mins}m`;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatSpiceLevel = (spiceLevel) => {
  return SPICE_LEVELS[spiceLevel]?.label || 'Mild';
};

export const getSpiceColor = (spiceLevel) => {
  return SPICE_LEVELS[spiceLevel]?.color || 'text-gray-500';
};

export const isValidImageUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  } catch {
    return false;
  }
};

export const getImageFallback = (dishName) => {
  const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7', 'DDA0DD', '98D8C8'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `https://via.placeholder.com/400x300/${color}/FFFFFF?text=${encodeURIComponent(dishName || 'Dish Image')}`;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const normalizeFilters = (filters) => {
  const normalized = { ...filters };
  
  // Remove empty values
  Object.keys(normalized).forEach(key => {
    if (normalized[key] === '' || normalized[key] === null || normalized[key] === undefined) {
      delete normalized[key];
    }
  });
  
  return normalized;
};

export const calculateActiveFilters = (filters) => {
  const activeFilters = { ...filters };
  delete activeFilters.search;
  delete activeFilters.sortBy;
  
  return Object.values(activeFilters).filter(value => 
    value !== '' && value !== null && value !== undefined
  ).length;
};