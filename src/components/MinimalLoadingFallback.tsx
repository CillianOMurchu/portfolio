import React from 'react';

export const MinimalLoadingFallback: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
  </div>
);

export default MinimalLoadingFallback;