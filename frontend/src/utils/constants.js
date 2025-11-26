// Dish Categories
export const DISH_CATEGORIES = [
  'All',
  'Appetizer',
  'Main Course', 
  'Dessert',
  'Side Dish',
  'Salad',
  'Soup',
  'Beverage',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Italian',
  'American', 
  'Asian',
  'Mexican',
  'Indian',
  'Seafood',
  'Burgers',
  'BBQ',
  'British',
  'Middle Eastern'
];

// Cuisine Types
export const CUISINE_TYPES = [
  'All',
  'Italian',
  'American',
  'Chinese', 
  'Thai',
  'Indian',
  'Mexican',
  'Greek',
  'French',
  'British',
  'Middle Eastern',
  'Hawaiian',
  'Mediterranean',
  'Japanese',
  'Other'
];

// Spice Levels with enhanced data
export const SPICE_LEVELS = {
  'none': { 
    label: 'No Spice', 
    color: 'text-gray-500', 
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    icon: '○' 
  },
  'mild': { 
    label: 'Mild', 
    color: 'text-green-600', 
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: '●' 
  },
  'medium': { 
    label: 'Medium', 
    color: 'text-yellow-600', 
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    icon: '●●' 
  },
  'hot': { 
    label: 'Hot', 
    color: 'text-orange-600', 
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: '●●●' 
  },
  'extra-hot': { 
    label: 'Extra Hot', 
    color: 'text-red-600', 
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: '●●●●' 
  },
};

// Filter Options
export const FILTER_OPTIONS = {
  ALL: 'all',
  PUBLISHED: 'true',
  UNPUBLISHED: 'false',
  VEGETARIAN: 'true',
  VEGAN: 'true',
};

// Sort Options - Updated to match backend
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
];

// Status options for dishes
export const DISH_STATUS = {
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
};

// Default values for new dishes
export const DEFAULT_DISH_VALUES = {
  dishName: '',
  description: '',
  price: 0,
  category: '',
  cuisine: '',
  preparationTime: 30,
  servings: 1,
  spiceLevel: 'mild',
  isVegetarian: false,
  isVegan: false,
  isPublished: false,
  allergens: [],
  ingredients: [],
  imageUrl: '',
};

// Price ranges for filters
export const PRICE_RANGES = [
  { label: 'Under $10', min: 0, max: 10 },
  { label: '$10 - $20', min: 10, max: 20 },
  { label: '$20 - $30', min: 20, max: 30 },
  { label: 'Over $30', min: 30, max: 1000 },
];

// Preparation time ranges
export const PREP_TIME_RANGES = [
  { label: 'Quick (Under 15min)', min: 0, max: 15 },
  { label: 'Moderate (15-30min)', min: 15, max: 30 },
  { label: 'Lengthy (30-60min)', min: 30, max: 60 },
  { label: 'Extended (Over 60min)', min: 60, max: 480 },
];

// Common allergens
export const COMMON_ALLERGENS = [
  'Gluten',
  'Dairy',
  'Nuts',
  'Peanuts',
  'Soy',
  'Eggs',
  'Fish',
  'Shellfish',
  'Sesame',
  'Mustard',
  'Lupin',
  'Molluscs',
  'Celery',
  'Sulfites',
];

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 15000,
  RETRY_ATTEMPTS: 3,
  BASE_URL: import.meta.env.VITE_API_URL || 'https://dish-flow.onrender.com/api',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  DISH_FILTERS: 'dish-filters',
  DISH_SEARCH: 'dish-search',
  USER_PREFERENCES: 'user-preferences',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to server. Please check your connection.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  NOT_FOUND: 'Dish not found.',
  TOGGLE_FAILED: 'Failed to update dish status. Please try again.',
  FETCH_FAILED: 'Failed to load dishes. Please try again.',
  INVALID_DATA: 'Invalid dish data provided.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  DISH_PUBLISHED: 'Dish published successfully!',
  DISH_UNPUBLISHED: 'Dish unpublished successfully!',
  DISH_UPDATED: 'Dish updated successfully!',
  DISH_CREATED: 'Dish created successfully!',
  DISH_DELETED: 'Dish deleted successfully!',
};

// Validation Rules
export const VALIDATION_RULES = {
  DISH_NAME: {
    required: 'Dish name is required',
    minLength: { value: 2, message: 'Dish name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Dish name must be less than 100 characters' },
  },
  PRICE: {
    required: 'Price is required',
    min: { value: 0, message: 'Price must be positive' },
    max: { value: 1000, message: 'Price must be less than $1000' },
  },
  PREPARATION_TIME: {
    required: 'Preparation time is required',
    min: { value: 1, message: 'Preparation time must be at least 1 minute' },
    max: { value: 480, message: 'Preparation time must be less than 8 hours' },
  },
  SERVINGS: {
    required: 'Servings is required',
    min: { value: 1, message: 'Must serve at least 1 person' },
    max: { value: 100, message: 'Cannot serve more than 100 people' },
  },
  DESCRIPTION: {
    maxLength: { value: 500, message: 'Description must be less than 500 characters' },
  },
};

// Export default for easier imports
export default {
  DISH_CATEGORIES,
  CUISINE_TYPES,
  SPICE_LEVELS,
  FILTER_OPTIONS,
  SORT_OPTIONS,
  DISH_STATUS,
  DEFAULT_DISH_VALUES,
  PRICE_RANGES,
  PREP_TIME_RANGES,
  COMMON_ALLERGENS,
  API_CONFIG,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
};