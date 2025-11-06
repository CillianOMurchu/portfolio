import React from 'react';
import { InteractiveIconSystem, iconSystemData } from './components';
import { ThreeDBall } from './3dBall';

interface InteractiveThreeDBallProps {
  options?: {
    width?: number;
    height?: number;
    radius?: number;
    padding?: number;
    iconSize?: number;
    tilt?: number;
    initialVelocityX?: number;
    initialVelocityY?: number;
    initialRotationX?: number;
    initialRotationZ?: number;
  };
  words?: string[];
}

export const InteractiveThreeDBall: React.FC<InteractiveThreeDBallProps> = ({
  options = {},
  words
}) => {
  return (
    <InteractiveIconSystem iconData={iconSystemData}>
      {({ handleIconClick, selectedIcon, isAnimating }) => (
        <div className="relative">
          <ThreeDBall
            options={options}
            words={words}
            onIconClick={handleIconClick}
            isInteractionDisabled={isAnimating}
            selectedIcon={selectedIcon}
          />
        </div>
      )}
    </InteractiveIconSystem>
  );
};