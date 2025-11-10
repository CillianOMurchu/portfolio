import React from "react";

interface HeroTitleProps {
  className?: string;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ className = "" }) => {
  return (
    <div className="text-center px-4 sm:px-6">
      <h1 className="font-incognito font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug text-gray-900 mb-6">
        <span className="block">Full-Stack Engineer</span>
        <span className="block text-blue-500">
          Pixel-Perfect Frontends & Seamless UX
        </span>
        <span className="block">iGaming | PMS | Fintech</span>
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4 shadow-md animate-pulse" />
    </div>
  );
};

export default HeroTitle;
