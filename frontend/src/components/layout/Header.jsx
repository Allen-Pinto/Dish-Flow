import React from 'react';
import { ChefHat, TrendingUp, Clock, DollarSign } from 'lucide-react';
import Badge from '../common/Badge';

const Header = ({ stats }) => {
  const { total = 0, published = 0, unpublished = 0, avgPrice = 0 } = stats || {};

  const statCards = [
    {
      label: 'Total Dishes',
      value: total,
      icon: ChefHat,
      color: 'text-charcoal',
      bgColor: 'bg-soft-mint',
    },
    {
      label: 'Published',
      value: published,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Unpublished',
      value: unpublished,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Avg Price',
      value: `$${avgPrice.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Title Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-soft-mint p-3 rounded-xl">
              <ChefHat className="w-8 h-8 text-charcoal" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-charcoal">
                Dish Management
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage, organize, and publish your restaurant menu
              </p>
            </div>
          </div>

          {/* Live Indicator */}
          <Badge variant="success" size="lg">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse mr-2"></span>
            Live
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-soft-mint transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-charcoal">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;