import React from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { DISH_CATEGORIES, CUISINE_TYPES, SORT_OPTIONS } from '../../utils/constants';
import Button from '../common/Button';
import Badge from '../common/Badge';

const DishFilters = ({
  filters,
  onFilterChange,
  onSearchChange,
  onClearFilters,
  searchQuery,
  activeFiltersCount,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search dishes by name or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-soft-mint focus:outline-none transition-colors"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-gray-500" />
        
        <button
          onClick={() => onFilterChange('isPublished', filters.isPublished === 'true' ? '' : 'true')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filters.isPublished === 'true'
              ? 'bg-soft-mint text-charcoal'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Published
        </button>

        <button
          onClick={() => onFilterChange('isPublished', filters.isPublished === 'false' ? '' : 'false')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filters.isPublished === 'false'
              ? 'bg-soft-mint text-charcoal'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Unpublished
        </button>

        <button
          onClick={() => onFilterChange('isVegetarian', filters.isVegetarian === 'true' ? '' : 'true')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filters.isVegetarian === 'true'
              ? 'bg-soft-mint text-charcoal'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🌱 Vegetarian
        </button>

        <button
          onClick={() => onFilterChange('isVegan', filters.isVegan === 'true' ? '' : 'true')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filters.isVegan === 'true'
              ? 'bg-soft-mint text-charcoal'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🌿 Vegan
        </button>

        <Button
          variant="secondary"
          size="sm"
          icon={SlidersHorizontal}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Advanced
        </Button>

        {activeFiltersCount > 0 && (
          <>
            <Badge variant="info">{activeFiltersCount} active</Badge>
            <button
              onClick={onClearFilters}
              className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          </>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t-2 border-gray-100 pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-mint focus:outline-none"
            >
              {DISH_CATEGORIES.map((cat) => (
                <option key={cat} value={cat === 'All' ? '' : cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Cuisine Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine
            </label>
            <select
              value={filters.cuisine || ''}
              onChange={(e) => onFilterChange('cuisine', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-mint focus:outline-none"
            >
              {CUISINE_TYPES.map((cuisine) => (
                <option key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy || 'newest'}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-mint focus:outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="$0.00"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-mint focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="$100.00"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-mint focus:outline-none"
            />
          </div>

          {/* Spice Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spice Level
            </label>
            <select
              value={filters.spiceLevel || ''}
              onChange={(e) => onFilterChange('spiceLevel', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-mint focus:outline-none"
            >
              <option value="">All Levels</option>
              <option value="none">No Spice</option>
              <option value="mild">Mild</option>
              <option value="medium">Medium</option>
              <option value="hot">Hot</option>
              <option value="extra-hot">Extra Hot</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DishFilters;