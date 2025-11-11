import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";

interface MusicalNote {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  velocity: number;
  depth: number; // For layered depth effect
  opacity: number; // Individual opacity for depth
  drift: number; // Horizontal drift for wind effect
  isSlowMotion: boolean;
}

interface MusicalNotesRainProps {
  noteCount?: number;
  color?: string;
  className?: string;
}

const musicalSymbols = [
  "♪", "♫", "♬", "♭", "♯", "𝄞", "𝄢", "♩", "♮", 
  "𝄽", "𝄾", "𝄿", "𝅀", "𝅁", "𝅂", "♪♪", "♫♬", "♩♪"
];

function onNoteClick(note: MusicalNote) {
  console.log("Musical note clicked!", note);
}

// Optimized component with performance improvements
export const MusicalNotesRain: React.FC<MusicalNotesRainProps> = ({
  noteCount = 2500,
  color = "text-rose-400",
  className = "",
}) => {
  const [notes, setNotes] = useState<MusicalNote[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef(0);
  const viewportRef = useRef({ width: 0, height: 0 });

  // Memoize note generation function
  const generateNotes = useCallback(() => {
    const newNotes: MusicalNote[] = [];
    for (let i = 0; i < noteCount; i++) {
      // Create depth layers for rain effect
      const depth = Math.random(); // 0-1, where 0 is far, 1 is near
      const sizeMultiplier = 0.6 + (depth * 0.8); // Far notes smaller, near notes larger
      const speedMultiplier = 0.5 + (depth * 1.5); // Far notes slower, near notes faster
      
      newNotes.push({
        id: i,
        symbol: musicalSymbols[Math.floor(Math.random() * musicalSymbols.length)],
        x: Math.random() * 100,
        y: -100 - Math.random() * 500,
        size: (Math.random() * 16 + 8) * sizeMultiplier, // Size varies with depth
        rotation: Math.random() * 360,
        velocity: (1 + Math.random() * 3) * speedMultiplier, // Faster and more varied speeds
        depth: depth,
        opacity: 0.3 + (depth * 0.6), // Far notes more transparent
        drift: (Math.random() - 0.5) * 0.5, // Horizontal wind drift
        isSlowMotion: false,
      });
    }
    return newNotes;
  }, [noteCount]);

  // Optimized mouse proximity check with viewport caching
  const isMouseNearNote = useCallback((note: MusicalNote): boolean => {
    const noteScreenX = (note.x / 100) * viewportRef.current.width;
    const distance = Math.sqrt(
      Math.pow(mousePositionRef.current.x - noteScreenX, 2) + 
      Math.pow(mousePositionRef.current.y - note.y, 2)
    );
    return distance < 100;
  }, []);

  // Optimized update function with reduced allocations and viewport culling
  const updateNotes = useCallback((currentTime: number) => {
    const frameInterval = 1000 / 60; // 60 FPS
    
    if (currentTime - lastUpdateTimeRef.current >= frameInterval) {
      setNotes(prevNotes => {
        // Use for loop instead of map for better performance
        const updatedNotes = new Array(prevNotes.length);
        let hasChanges = false;
        
        for (let i = 0; i < prevNotes.length; i++) {
          const note = prevNotes[i];
          
          // Viewport culling: skip processing for notes way off screen
          if (note.y > viewportRef.current.height + 200 || note.y < -600) {
            // Reset far off-screen notes
            if (note.y > viewportRef.current.height + 200) {
              const depth = Math.random();
              const sizeMultiplier = 0.6 + (depth * 0.8);
              const speedMultiplier = 0.5 + (depth * 1.5);
              
              updatedNotes[i] = {
                ...note,
                x: Math.random() * 100,
                y: -100 - Math.random() * 300,
                depth: depth,
                opacity: 0.3 + (depth * 0.6),
                velocity: (1 + Math.random() * 3) * speedMultiplier,
                size: (Math.random() * 16 + 8) * sizeMultiplier,
                drift: (Math.random() - 0.5) * 0.5,
                rotation: Math.random() * 360,
                isSlowMotion: false,
              };
              hasChanges = true;
            } else {
              updatedNotes[i] = note; // Keep far above screen notes as-is
            }
            continue;
          }
          
          const nearMouse = isMouseNearNote(note);
          
          // Only update position if not near mouse
          let newY = note.y;
          let newX = note.x;
          
          if (!nearMouse) {
            newY = note.y + note.velocity;
            // Add horizontal drift for wind effect
            newX = note.x + note.drift;
            
            // Keep notes within screen bounds with wrapping
            if (newX < -5) newX = 105;
            if (newX > 105) newX = -5;
          }
          
          // Vary rotation speed based on depth and motion
          const rotationSpeed = note.depth * (nearMouse ? 0.3 : 1.5);
          const newRotation = note.rotation + rotationSpeed;
          
          if (newY !== note.y || newX !== note.x || nearMouse !== note.isSlowMotion || newRotation !== note.rotation) {
            hasChanges = true;
          }
          
          updatedNotes[i] = {
            ...note,
            x: newX,
            y: newY,
            isSlowMotion: nearMouse,
            rotation: newRotation,
          };
        }
        
        // Only trigger re-render if something actually changed
        return hasChanges ? updatedNotes : prevNotes;
      });
      
      lastUpdateTimeRef.current = currentTime;
    }

    animationFrameRef.current = requestAnimationFrame(updateNotes);
  }, [isMouseNearNote]);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Update viewport dimensions
  const updateViewport = useCallback(() => {
    viewportRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  // Initialize notes
  useEffect(() => {
    setNotes(generateNotes());
  }, [generateNotes]);

  // Setup mouse tracking with throttling
  useEffect(() => {
    let throttleTimer: number | null = null;
    
    const throttledMouseMove = (e: MouseEvent) => {
      if (throttleTimer === null) {
        throttleTimer = window.setTimeout(() => {
          handleMouseMove(e);
          throttleTimer = null;
        }, 16); // ~60 FPS for mouse tracking (reduced from 120 for performance)
      }
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    window.addEventListener('resize', updateViewport, { passive: true });
    
    // Initialize viewport
    updateViewport();
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('resize', updateViewport);
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, [handleMouseMove, updateViewport]);

  // Animation loop
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateNotes);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateNotes]);

  // Memoize style calculations
  const containerStyle = useMemo(() => ({
    position: 'fixed' as const,
    inset: 0,
    pointerEvents: 'none' as const,
    overflow: 'hidden' as const,
  }), []);

  return (
    <div className={`${className}`} style={containerStyle}>
      {notes.filter(note => {
        // Virtual rendering: only render notes that are visible on screen
        return note.y >= -100 && note.y <= viewportRef.current.height + 100;
      }).map((note) => {
        // Calculate final opacity based on base opacity, depth, and slow motion
        const finalOpacity = note.isSlowMotion 
          ? Math.min(note.opacity * 1.5, 1) 
          : note.opacity;
        
        // Apply depth-based blur for distance effect (reduced for performance)
        const blur = note.depth < 0.2 && !note.isSlowMotion ? `blur(1px)` : 'none';
        
        // Scale effect for slow motion and depth
        const scale = note.isSlowMotion ? 1.15 : (0.8 + note.depth * 0.4);
        
        const noteStyle = {
          position: 'absolute' as const,
          left: `${note.x}%`,
          top: `${note.y}px`,
          fontSize: `${note.size}px`,
          opacity: finalOpacity,
          transform: `rotate(${note.rotation}deg) scale(${scale})`,
          userSelect: 'none' as const,
          transition: note.isSlowMotion 
            ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
            : 'none', // Removed transform transition for better performance with many notes
          filter: note.isSlowMotion 
            ? `drop-shadow(0 0 8px currentColor) ${blur}` 
            : blur,
          willChange: 'transform, opacity',
          zIndex: Math.floor(note.depth * 10), // Layer notes by depth
        };

        return (
          <div
            key={note.id}
            className={color}
            style={noteStyle}
            onClick={() => onNoteClick(note)}
          >
            {note.symbol}
          </div>
        );
      })}
    </div>
  );
};

export default MusicalNotesRain;
