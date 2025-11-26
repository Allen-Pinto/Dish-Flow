import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { 
  Clock, 
  Users, 
  Flame, 
  DollarSign, 
  Tag,
  AlertTriangle,
  List,
  Eye,
  EyeOff
} from 'lucide-react';
import { formatPrice, formatTime } from '../../utils/helpers';
import { SPICE_LEVELS } from '../../utils/constants';

const DishDetails = ({ dish, isOpen, onClose, onToggleStatus }) => {
  if (!dish) return null;

  const spiceInfo = SPICE_LEVELS[dish.spiceLevel] || SPICE_LEVELS.mild;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={dish.dishName} size="lg">
      <div className="space-y-6">
        {/* Image */}
        <div className="relative h-80 rounded-xl overflow-hidden">
          <img
            src={dish.imageUrl}
            alt={dish.dishName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
            }}
          />
          <div className="absolute top-4 right-4">
            <Badge variant={dish.isPublished ? 'success' : 'default'} size="lg">
              {dish.isPublished ? '✓ Published' : '○ Draft'}
            </Badge>
          </div>
          </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-charcoal mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{dish.description}</p>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-light-gray rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-soft-mint" />
              <span className="text-sm text-gray-500">Price</span>
            </div>
            <p className="text-xl font-bold text-charcoal">{formatPrice(dish.price)}</p>
          </div>

          <div className="bg-light-gray rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-500">Prep Time</span>
            </div>
            <p className="text-xl font-bold text-charcoal">{formatTime(dish.preparationTime)}</p>
          </div>

          <div className="bg-light-gray rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-500">Servings</span>
            </div>
            <p className="text-xl font-bold text-charcoal">{dish.servings}</p>
          </div>

          <div className="bg-light-gray rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className={`w-5 h-5 ${spiceInfo.color}`} />
              <span className="text-sm text-gray-500">Spice</span>
            </div>
            <p className="text-xl font-bold text-charcoal">{spiceInfo.label}</p>
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-charcoal">Categories & Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" size="md">
              {dish.category}
            </Badge>
            <Badge variant="info" size="md">
              {dish.cuisine}
            </Badge>
            {dish.isVegetarian && (
              <Badge variant="success" size="md">
                🌱 Vegetarian
              </Badge>
            )}
            {dish.isVegan && (
              <Badge variant="success" size="md">
                🌿 Vegan
              </Badge>
            )}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <List className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-charcoal">Ingredients</h3>
          </div>
          <div className="bg-light-gray rounded-lg p-4">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {dish.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-soft-mint rounded-full"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Allergens */}
        {dish.allergens && dish.allergens.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-charcoal">Allergen Information</h3>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex flex-wrap gap-2">
                {dish.allergens.map((allergen, index) => (
                  <Badge key={index} variant="danger" size="md">
                    {allergen}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-red-600 mt-3">
                ⚠️ This dish contains or may contain traces of the allergens listed above.
              </p>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="border-t-2 border-gray-100 pt-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Dish ID:</span> {dish.dishId}
          </p>
          {dish.createdAt && (
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium">Added:</span>{' '}
              {new Date(dish.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="flex gap-3">
          <Button
            variant={dish.isPublished ? 'secondary' : 'primary'}
            size="lg"
            onClick={() => {
              onToggleStatus(dish.dishId);
              onClose();
            }}
            icon={dish.isPublished ? EyeOff : Eye}
            className="flex-1"
          >
            {dish.isPublished ? 'Unpublish Dish' : 'Publish Dish'}
          </Button>
          <Button variant="outline" size="lg" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DishDetails;