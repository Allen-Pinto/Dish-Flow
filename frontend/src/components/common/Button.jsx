import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-soft-mint hover:bg-[#9CD4B3] text-charcoal disabled:bg-gray-300 disabled:text-gray-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-charcoal disabled:bg-gray-100 disabled:text-gray-400',
    danger: 'bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300',
    success: 'bg-green-500 hover:bg-green-600 text-white disabled:bg-green-300',
    outline: 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white disabled:border-gray-300 disabled:text-gray-400',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} disabled:cursor-not-allowed disabled:opacity-50`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;