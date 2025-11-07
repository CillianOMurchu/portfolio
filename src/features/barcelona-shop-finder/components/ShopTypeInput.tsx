import React from 'react';

interface ShopTypeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const ShopTypeInput: React.FC<ShopTypeInputProps> = ({
  value,
  onChange,
  placeholder = "e.g., coffee shop, restaurant, pharmacy...",
  className = ""
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label 
        htmlFor="shop-type-input"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Shop Type *
      </label>
      <input
        id="shop-type-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                 placeholder-gray-500 dark:placeholder-gray-400
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 transition-colors duration-200"
        required
      />
    </div>
  );
};