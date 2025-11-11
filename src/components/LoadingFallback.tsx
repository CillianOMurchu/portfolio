import React from 'react';

interface LoadingFallbackProps {
  width?: number;
  height?: number;
  message?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  width = 352, 
  height = 352, 
  message = "Loading..." 
}) => {
  return (
    <div 
      className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200"
      style={{ width, height }}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Animated loading spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-300 rounded-full animate-ping"></div>
        </div>
        
        {/* Progress dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;