import React from 'react';
import { InteractiveIconSystem, iconSystemData } from '../features/components';

export const InteractiveIconDemo: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Interactive Icon System Demo</h2>
      
      <InteractiveIconSystem iconData={iconSystemData}>
        {({ handleIconClick, selectedIcon, isAnimating }) => (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              {Object.entries(iconSystemData).map(([key, techInfo]) => (
                <button
                  key={key}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const center = {
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2
                    };
                    handleIconClick(key, center);
                  }}
                  disabled={isAnimating}
                  className={`
                    p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200
                    ${selectedIcon === key ? 'ring-2 ring-blue-500' : ''}
                    ${isAnimating ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 cursor-pointer'}
                  `}
                >
                  <img 
                    src={techInfo.image} 
                    alt={techInfo.name}
                    className="w-12 h-12 mx-auto mb-2"
                  />
                  <div className="text-xs font-medium text-gray-700 text-center">
                    {techInfo.name}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Click any technology icon to see the interactive line and info panel animation!
              </p>
              {isAnimating && (
                <p className="text-blue-600 font-medium mt-2">
                  Animation in progress... Click the close button to return the icon.
                </p>
              )}
            </div>
          </div>
        )}
      </InteractiveIconSystem>
    </div>
  );
};