export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateAveragePrice = (dishes) => {
  if (!dishes || dishes.length === 0) return 0;
  const sum = dishes.reduce((acc, dish) => acc + dish.price, 0);
  return sum / dishes.length;
};

export const groupByCategory = (dishes) => {
  return dishes.reduce((acc, dish) => {
    const category = dish.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(dish);
    return acc;
  }, {});
};