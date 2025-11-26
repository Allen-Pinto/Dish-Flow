import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  Clock, 
  Users, 
  Flame,
  Info,
  Image as ImageIcon
} from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatPrice, formatTime, getImageFallback } from '../../utils/helpers';
import { SPICE_LEVELS } from '../../utils/constants';

const DishCard = ({ dish, onToggleStatus, onViewDetails }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  // Set image URL when dish changes
  useEffect(() => {
    if (dish?.imageUrl) {
      setCurrentImageUrl(dish.imageUrl);
      setImageLoading(true);
      setImageError(false);
    }
  }, [dish?.imageUrl]);

  const handleToggle = async () => {
    try {
      await onToggleStatus(dish.dishId);
    } catch (error) {
      console.error('Toggle failed:', error);
    }
  };

  const handleImageLoad = () => {
    console.log(`✅ Image loaded successfully: ${currentImageUrl}`);
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    console.log(`❌ Image failed to load: ${currentImageUrl}`);
    
    // If we haven't already tried the fallback, switch to it
    if (!imageError && currentImageUrl !== getImageFallback(dish.dishName)) {
      console.log('🔄 Switching to fallback image');
      setCurrentImageUrl(getImageFallback(dish.dishName));
      setImageLoading(true);
      setImageError(false);
    } else {
      // If fallback also failed, show error state
      setImageError(true);
      setImageLoading(false);
    }
  };

  const spiceInfo = SPICE_LEVELS[dish.spiceLevel] || SPICE_LEVELS.mild;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100 overflow-hidden group">
        {/* Loading Spinner - Only show when actively loading */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
              <span className="text-xs text-gray-500">Loading image...</span>
            </div>
          </div>
        )}

        {/* Error State - Only show when image has errored */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <ImageIcon className="w-8 h-8" />
              <span className="text-xs">Image not available</span>
            </div>
          </div>
        )}

        {/* Main Image - Always render but control visibility */}
        {currentImageUrl && (
          <img
            src={currentImageUrl}
            alt={dish.dishName}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
        )}
        
        {/* Overlay with Quick Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white text-sm line-clamp-2">
              {dish.description || 'No description available'}
            </p>
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
          <div className="flex gap-2 flex-wrap">
            {dish.isVegetarian && (
              <Badge variant="success" size="sm">
                🌱 Vegetarian
              </Badge>
            )}
            {dish.isVegan && (
              <Badge variant="success" size="sm">
                🌿 Vegan
              </Badge>
            )}
          </div>

          <Badge 
            variant={dish.isPublished ? 'success' : 'secondary'} 
            size="sm"
            className="backdrop-blur-sm bg-white/90"
          >
            {dish.isPublished ? 'Published' : 'Draft'}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title and Price */}
        <div className="mb-3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 flex-1">
              {dish.dishName}
            </h3>
            <span className="text-xl font-bold text-green-600 ml-2 whitespace-nowrap">
              {formatPrice(dish.price)}
            </span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {dish.category && (
              <Badge variant="default" size="sm">
                {dish.category}
              </Badge>
            )}
            {dish.cuisine && (
              <Badge variant="info" size="sm">
                {dish.cuisine}
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1" title="Preparation Time">
            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{formatTime(dish.preparationTime)}</span>
          </div>
          <div className="flex items-center gap-1" title="Servings">
            <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">
              {dish.servings} {dish.servings === 1 ? 'serving' : 'servings'}
            </span>
          </div>
          <div className="flex items-center gap-1" title="Spice Level">
            <Flame className={`w-4 h-4 ${spiceInfo.color} flex-shrink-0`} />
            <span className="text-xs truncate">{spiceInfo.label}</span>
          </div>
        </div>

        {/* Allergens */}
        {dish.allergens && dish.allergens.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1 font-medium">Allergens:</p>
            <div className="flex flex-wrap gap-1">
              {dish.allergens.slice(0, 3).map((allergen, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-full border border-red-200"
                >
                  {allergen}
                </span>
              ))}
              {dish.allergens.length > 3 && (
                <span className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
                  +{dish.allergens.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Ingredients Preview */}
        {dish.ingredients && dish.ingredients.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1 font-medium">Key Ingredients:</p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {dish.ingredients.slice(0, 3).join(', ')}
              {dish.ingredients.length > 3 && '...'}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2 pt-2">
          <Button
            variant={dish.isPublished ? 'secondary' : 'primary'}
            size="md"
            onClick={handleToggle}
            icon={dish.isPublished ? EyeOff : Eye}
            className="flex-1 min-w-0"
          >
            {dish.isPublished ? 'Unpublish' : 'Publish'}
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => onViewDetails(dish)}
            icon={Info}
            className="flex-shrink-0 px-3"
            title="View Details"
          >
            <span className="sr-only">View Details</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DishCard);