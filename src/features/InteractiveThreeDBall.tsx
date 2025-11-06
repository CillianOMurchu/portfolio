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

// Memoized ThreeDBall to prevent unnecessary re-renders when animation state changes
const MemoizedThreeDBall = React.memo<{
  options: InteractiveThreeDBallProps['options'];
  words?: string[];
  onIconClick: (iconKey: string, position: { x: number; y: number }) => void;
}>(({ options, words, onIconClick }) => (
  <ThreeDBall
    options={options}
    words={words}
    onIconClick={onIconClick}
    isInteractionDisabled={false} // Keep this static to prevent re-renders
  />
), (prevProps, nextProps) => {
  // Custom comparison function - only re-render if options, words, or onIconClick reference changes
  return (
    prevProps.options === nextProps.options &&
    prevProps.words === nextProps.words &&
    prevProps.onIconClick === nextProps.onIconClick
  );
});

MemoizedThreeDBall.displayName = 'MemoizedThreeDBall';

export const InteractiveThreeDBall: React.FC<InteractiveThreeDBallProps> = ({
  options = {},
  words
}) => {
  return (
    <InteractiveIconSystem iconData={iconSystemData}>
      {({ handleIconClick }) => (
        <div className="relative">
          <MemoizedThreeDBall
            options={options}
            words={words}
            onIconClick={handleIconClick}
          />
        </div>
      )}
    </InteractiveIconSystem>
  );
};