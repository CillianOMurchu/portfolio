import React from "react";

// --- Reusable Theming & Configuration Guide ---
// These are the custom/unique colors and opacity utility classes used in this card.
// You can use this section to update your global Tailwind config if needed.
const ThemeConfig = {
  colors: {
    'primary-blue': 'text-blue-400',
    'secondary-blue': 'hover:border-blue-500/70',
    'bg-main': 'bg-gray-800/[.4]',
    'bg-hover': 'hover:bg-gray-700/[.6]',
    'tag-bg': 'bg-gray-700/[.5]',
  },
  typography: {
    'title-color': 'text-gray-100',
    'title-hover': 'group-hover:text-blue-400',
    'description-color': 'text-gray-300',
    'tag-color': 'text-blue-300',
  },
  transitions: 'transition-all duration-300 ease-in-out',
  hoverEffect: 'group-hover:scale-105',
};
// ---------------------------------------------

export interface InfoCardProps {
  tag?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  detailsLink?: string;
}

/**
 * InfoCard Component: Renders a themed card based on the provided HTML structure.
 */
export const InfoCard: React.FC<InfoCardProps> = ({
  tag = "Facilitators",
  title = "CDP Facilitator",
  description = "Best-in-class x402 facilitator. Fee-free USDC settlement on Base Mainnet. KYT/OFAC checks on every transaction.",
  imageUrl = "https://placehold.co/80x80/2f3640/94a3b8?text=LOGO",
  detailsLink = "#",
}) => {
  return (
    <div
      className={`
        flex flex-col w-full max-w-lg
        ${ThemeConfig.colors['bg-main']} ${ThemeConfig.colors['bg-hover']} 
        rounded-lg shadow-xl overflow-hidden 
        ${ThemeConfig.transitions} group 
        border border-gray-700 ${ThemeConfig.colors['secondary-blue']} 
        h-full backdrop-blur-sm font-mono cursor-pointer
      `}
    >
      {/* Tag/Label Section */}
      <div className="flex justify-start pt-4 pb-4 pl-6">
        <span className={`inline-block ${ThemeConfig.colors['tag-bg']} ${ThemeConfig.typography['tag-color']} text-xs font-mono px-2 py-1 rounded-full`}>
          {tag}
        </span>
      </div>
      {/* Content Section */}
      <div className="px-6 pb-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          {/* Logo/Image */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
            <img 
              alt={`${title} logo`} 
              src={imageUrl} 
              className={`${ThemeConfig.transitions} ${ThemeConfig.hoverEffect} ${ThemeConfig.colors['tag-bg']} p-1 rounded-lg`} 
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
          {/* Title */}
          <div className="ml-4 flex-1">
            <h3 className={`text-xl font-bold ${ThemeConfig.typography['title-color']} ${ThemeConfig.typography['title-hover']} mb-1 font-mono`}>
              {title}
            </h3>
          </div>
        </div>
        {/* Description */}
        <p className={`text-sm ${ThemeConfig.typography['description-color']} leading-relaxed flex-grow font-mono`}>
          {description}
        </p>
        {/* View Details Link */}
        <div className="mt-4">
          <a href={detailsLink} className={`${ThemeConfig.colors['primary-blue']} group-hover:text-blue-300 font-mono text-sm ${ThemeConfig.transitions}`}>
            View details →
          </a>
        </div>
      </div>
    </div>
  );
};
