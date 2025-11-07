import React from 'react';
import { HolographicProjector } from './components/HolographicProjector';
import { DiagonalDescriptions } from './components/DiagonalDescriptions';
import { techInfoData } from './data/techInfo';
import { ThreeDBall } from './3dBall';

interface HolographicSkillsSphereProps {
  buttonText?: string;
}

// Memoized ThreeDBall optimized for holographic projection
const MemoizedHolographicThreeDBall = React.memo<{
  onIconHover: (iconKey: string | null, position: { x: number; y: number } | null) => void;
}>(({ onIconHover }) => (
  <ThreeDBall
    options={{
      width: 150,
      height: 150,
      radius: 65, // Smaller radius for 150px sphere
      iconSize: 24, // Smaller icons for compact sphere
      initialVelocityX: 0.01,
      initialVelocityY: 0.015,
    }}
    onIconHover={onIconHover}
    isInteractionDisabled={false}
  />
), (prevProps, nextProps) => {
  return prevProps.onIconHover === nextProps.onIconHover;
});

MemoizedHolographicThreeDBall.displayName = 'MemoizedHolographicThreeDBall';

export const HolographicSkillsSphere: React.FC<HolographicSkillsSphereProps> = ({
  buttonText = "View Skills"
}) => {
  return (
    <div className="flex items-center justify-center">
      <HolographicProjector 
        buttonText={buttonText}
        projectionSize={{ width: 150, height: 150 }}
      >
        <DiagonalDescriptions iconData={techInfoData}>
          {({ handleIconHover }) => (
            <MemoizedHolographicThreeDBall onIconHover={handleIconHover} />
          )}
        </DiagonalDescriptions>
      </HolographicProjector>
    </div>
  );
};