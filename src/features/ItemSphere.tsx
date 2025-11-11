import React from 'react';
import { ThreeDBall } from './3d-ball';

// Programming icon names that match the assets/programming-icons folder
const programmingIcons = [
  "angular", "css3", "cypress", "docker", "express", "figma", "firebase",
  "github", "gitlab", "html5", "javascript", "jest", "jira", "mongodb",
  "next-js", "nginx", "node-js", "postman", "prisma", "puppeteer",
  "python", "react", "rxjs", "sass", "storybook", "tailwindcss",
  "typescript", "vercel"
];

interface ItemSphereProps {
  width?: number;
  height?: number;
  radius?: number;
  iconSize?: number;
}

export const ItemSphere: React.FC<ItemSphereProps> = ({
  width = 150,
  height = 150,
  radius = 65,
  iconSize = 24
}) => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <ThreeDBall
        words={programmingIcons}
        options={{
          width,
          height,
          radius,
          iconSize,
          initialVelocityX: 0.01,
          initialVelocityY: 0.015,
        }}
        allowDragRotation={true}
        isInteractionDisabled={false}
      />
    </div>
  );
};

export default ItemSphere;