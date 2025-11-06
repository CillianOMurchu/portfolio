import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TechInfo } from '../types/interactiveIcon';

export interface InteractiveIconData {
  [key: string]: TechInfo;
}

interface InteractiveIconSystemProps {
  iconData: InteractiveIconData;
  children: (props: {
    handleIconClick: (iconKey: string, position: { x: number; y: number }) => void;
    selectedIcon: string | null;
    isAnimating: boolean;
  }) => React.ReactNode;
}

export const InteractiveIconSystem: React.FC<InteractiveIconSystemProps> = ({
  iconData,
  children
}) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [infoPanelVisible, setInfoPanelVisible] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'absorb'>('idle');

  // Use ref to avoid recreating handleIconClick when animation state changes
  const animationPhaseRef = useRef(animationPhase);
  animationPhaseRef.current = animationPhase;

  const handleIconClick = useCallback((iconKey: string, position: { x: number; y: number }) => {
    // Use refs to access current state without triggering dependency changes
    if (animationPhaseRef.current !== 'idle' || !iconData[iconKey]) return;

    setSelectedIcon(iconKey);
    setAnimationPhase('absorb'); // Skip line and travel animations
    
    // Get the actual position relative to the viewport
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Convert canvas-relative position to viewport position
    const canvasElement = document.querySelector('canvas');
    let actualStartX = position.x;
    let actualStartY = position.y;
    
    if (canvasElement) {
      const canvasRect = canvasElement.getBoundingClientRect();
      actualStartX = canvasRect.left + position.x;
      actualStartY = canvasRect.top + position.y;
    }
    
    // Choose optimal panel position - prefer right side with good spacing
    const panelWidth = 400;
    const panelHeight = 300;
    
    // Calculate best position for panel (prefer right side, avoid edges)
    let panelX;
    
    // Try right side first
    if (actualStartX + 250 + panelWidth < windowWidth - 20) {
      panelX = actualStartX + 250;
    } else {
      // Place on left side
      panelX = Math.max(20, actualStartX - 250 - panelWidth);
    }
    
    // Center vertically relative to the icon, but keep within bounds
    const panelY = Math.max(20, Math.min(windowHeight - panelHeight - 20, actualStartY - panelHeight / 2));
    
    setPanelPosition({ x: panelX, y: panelY });
    
    // Show info panel immediately
    setInfoPanelVisible(true);
  }, [iconData]); // Only depend on iconData, not animation state

  const handlePanelClose = useCallback(() => {
    // Instantly close and reset everything
    setSelectedIcon(null);
    setInfoPanelVisible(false);
    setAnimationPhase('idle');
  }, []);

  const selectedTechInfo = selectedIcon ? iconData[selectedIcon] : null;

  return (
    <>
      {children({
        handleIconClick,
        selectedIcon,
        isAnimating: animationPhase !== 'idle'
      })}

      {/* Info Panel */}
      <AnimatePresence>
        {infoPanelVisible && selectedTechInfo && (
          <motion.div
            className="fixed z-50 pointer-events-auto"
            style={{
              left: panelPosition.x,
              top: panelPosition.y,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              x: -20,
              rotateY: -30
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: 0,
              rotateY: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.6,
              x: 20,
              rotateY: 30
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-md">
              {/* Header */}
              <div className={`bg-gradient-to-r ${getCategoryColor(selectedTechInfo.category)} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.img
                      src={selectedTechInfo.image}
                      alt={selectedTechInfo.name}
                      className="w-12 h-12 bg-white rounded-lg p-2"
                      initial={{ rotate: -10, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">{selectedTechInfo.name}</h3>
                      <p className="text-white/80 text-sm capitalize">{selectedTechInfo.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={handlePanelClose}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed">{selectedTechInfo.description}</p>
                
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Experience: {selectedTechInfo.experience}
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {selectedTechInfo.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        className="text-sm text-gray-600 flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.2 }}
                      >
                        <span className="text-blue-500 mr-2">•</span>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Projects */}
                {selectedTechInfo.projects && selectedTechInfo.projects.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Notable Projects</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTechInfo.projects.map((project, index) => (
                        <motion.span
                          key={project}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
                        >
                          {project}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const getCategoryColor = (category: string) => {
  const colors = {
    frontend: 'from-blue-500 to-purple-600',
    backend: 'from-green-500 to-teal-600',
    database: 'from-yellow-500 to-orange-600',
    tools: 'from-gray-500 to-slate-600',
    cloud: 'from-sky-500 to-blue-600',
    mobile: 'from-pink-500 to-rose-600'
  };
  return colors[category as keyof typeof colors] || 'from-gray-500 to-slate-600';
};