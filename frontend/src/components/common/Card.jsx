import React from 'react';

const Card = ({ children, className = '', hover = true, padding = 'md' }) => {
  const baseStyles = 'bg-white rounded-xl shadow-sm transition-shadow duration-200';
  const hoverStyles = hover ? 'hover:shadow-md' : '';
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div className={`${baseStyles} ${hoverStyles} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;