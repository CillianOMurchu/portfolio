import React, { useState, useCallback } from 'react';
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
  const [lineProgress, setLineProgress] = useState(0);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
  const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'lineGrow' | 'iconTravel' | 'absorb' | 'return'>('idle');
  const [travelProgress, setTravelProgress] = useState(0);

  const handleIconClick = useCallback((iconKey: string, position: { x: number; y: number }) => {
    if (animationPhase !== 'idle' || !iconData[iconKey]) return;

    setSelectedIcon(iconKey);
    setAnimationPhase('lineGrow');
    
    // Calculate panel position (adaptive based on click position)
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Choose side based on click position to avoid screen edges
    const shouldPlaceRight = position.x < windowWidth * 0.6;
    const panelWidth = 400;
    const panelHeight = 300;
    
    const panelX = shouldPlaceRight 
      ? Math.min(windowWidth - panelWidth - 20, position.x + 200)
      : Math.max(20, position.x - panelWidth - 50);
    
    const panelY = Math.max(20, Math.min(windowHeight - panelHeight - 20, position.y - 150));
    
    setPanelPosition({ x: panelX, y: panelY });
    setLineStart(position);
    setLineEnd({ x: panelX + panelWidth / 2, y: panelY + panelHeight / 2 });
    
    // Start line growth animation
    const startTime = Date.now();
    const duration = 600;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      setLineProgress(easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setInfoPanelVisible(true);
        setAnimationPhase('iconTravel');
        // Start icon travel
        setTimeout(() => {
          // Start icon travel animation
          const travelStartTime = Date.now();
          const travelDuration = 800;
          
          const travelAnimate = () => {
            const travelElapsed = Date.now() - travelStartTime;
            const travelProgress = Math.min(1, travelElapsed / travelDuration);
            const easedTravelProgress = travelProgress < 0.5 
              ? 2 * travelProgress * travelProgress 
              : 1 - Math.pow(-2 * travelProgress + 2, 3) / 2;
            
            setTravelProgress(easedTravelProgress);
            
            if (travelProgress < 1) {
              requestAnimationFrame(travelAnimate);
            } else {
              setAnimationPhase('absorb');
            }
          };
          
          requestAnimationFrame(travelAnimate);
        }, 100);
      }
    };
    
    requestAnimationFrame(animate);
  }, [iconData, animationPhase]);

  const handlePanelClose = useCallback(() => {
    if (animationPhase === 'absorb' || animationPhase === 'iconTravel') {
      // Start return animation
      const startTime = Date.now();
      const duration = 1000;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        
        // Reverse travel progress
        setTravelProgress(1 - progress);
        
        // Shrink line
        setLineProgress(1 - progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Reset everything
          setSelectedIcon(null);
          setInfoPanelVisible(false);
          setLineProgress(0);
          setTravelProgress(0);
          setAnimationPhase('idle');
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [animationPhase]);

  const selectedTechInfo = selectedIcon ? iconData[selectedIcon] : null;

  // Calculate icon current position during travel
  const currentIconPosition = {
    x: lineStart.x + (lineEnd.x - lineStart.x) * travelProgress,
    y: lineStart.y + (lineEnd.y - lineStart.y) * travelProgress
  };

  return (
    <>
      {children({
        handleIconClick,
        selectedIcon,
        isAnimating: animationPhase !== 'idle'
      })}
      
      {/* Animated Line */}
      <AnimatePresence>
        {lineProgress > 0 && (
          <div className="fixed inset-0 pointer-events-none z-40">
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
              {/* Glowing background line */}
              <motion.line
                x1={lineStart.x}
                y1={lineStart.y}
                x2={lineStart.x + (lineEnd.x - lineStart.x) * lineProgress}
                y2={lineStart.y + (lineEnd.y - lineStart.y) * lineProgress}
                stroke="#3B82F6"
                strokeWidth="6"
                strokeOpacity={0.3}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: lineProgress }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
              
              {/* Main line */}
              <motion.line
                x1={lineStart.x}
                y1={lineStart.y}
                x2={lineStart.x + (lineEnd.x - lineStart.x) * lineProgress}
                y2={lineStart.y + (lineEnd.y - lineStart.y) * lineProgress}
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: lineProgress }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
              
              {/* Animated dots along the line */}
              {lineProgress > 0.1 && (
                <>
                  {[0.2, 0.4, 0.6, 0.8].map((dotProgress, index) => {
                    if (dotProgress > lineProgress) return null;
                    
                    const dotX = lineStart.x + (lineEnd.x - lineStart.x) * dotProgress;
                    const dotY = lineStart.y + (lineEnd.y - lineStart.y) * dotProgress;
                    
                    return (
                      <motion.circle
                        key={index}
                        cx={dotX}
                        cy={dotY}
                        r={2}
                        fill="#3B82F6"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.7 }}
                        transition={{ 
                          delay: dotProgress * 0.3,
                          duration: 0.3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          repeatDelay: 1
                        }}
                      />
                    );
                  })}
                </>
              )}
            </svg>
          </div>
        )}
      </AnimatePresence>

      {/* Traveling Icon */}
      <AnimatePresence>
        {travelProgress > 0 && selectedTechInfo && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            style={{
              left: currentIconPosition.x - 20,
              top: currentIconPosition.y - 20,
            }}
            initial={{ scale: 1 }}
            animate={{ 
              scale: animationPhase === 'absorb' ? 0.3 : 1,
              rotate: travelProgress * 360
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <img 
                src={selectedTechInfo.image} 
                alt={selectedTechInfo.name}
                className="w-6 h-6"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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