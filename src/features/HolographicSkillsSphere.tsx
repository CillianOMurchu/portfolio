import React, { useMemo } from 'react';
import { HolographicSphere } from './HolographicSphere';
import { allIcons } from './3dBall.const';
import type { SphereItem } from './types/holographicSphere';

export const HolographicSkillsSphere: React.FC = React.memo(() => {
  // Create sphere items directly from the manual icon list
  const skillsItems: SphereItem[] = useMemo(() => {
    return allIcons.map(icon => {
      // Format display name
      const displayName = icon.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        id: icon.name,
        name: displayName,
        description: `${displayName} technology`,
        image: `/src/assets/programming-icons/${icon.name}.svg`,
        details: [`${displayName} development`],
        category: 'technology'
      };
    });
  }, []);

  // Memoize sphere options to prevent object recreation
  const sphereOptions = useMemo(() => ({
    width: 150,
    height: 150,
    radius: 65,
    iconSize: 24,
    initialVelocityX: 0.01,
    initialVelocityY: 0.015,
    enableHover: true,
    enableClick: false,
    allowDragRotation: false
  }), []);

  return (
    <HolographicSphere
      items={skillsItems}
      sphereOptions={sphereOptions}
      className=""
      showDescriptions={false}
      enableLineAnimations={false}
    />
  );
});

HolographicSkillsSphere.displayName = 'HolographicSkillsSphere';