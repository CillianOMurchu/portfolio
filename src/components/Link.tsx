import React from "react";
interface LinkProps {
  icon: string;
  glowColor: string;
  shadowColor: string;
  textColor?: string;
}

export const Link: React.FC<LinkProps> = ({
  icon,
  textColor = "text-white",
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className={`${textColor} text-2xl font-bold`}>{icon}</span>
    </div>
  );
};

export default Link;
