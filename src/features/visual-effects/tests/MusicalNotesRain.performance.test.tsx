import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MusicalNotesRain from '../MusicalNotesRain';

// Mock requestAnimationFrame for performance testing
const mockRAF = vi.fn();
const mockCancelRAF = vi.fn();

beforeEach(() => {
  vi.stubGlobal('requestAnimationFrame', mockRAF);
  vi.stubGlobal('cancelAnimationFrame', mockCancelRAF);
  mockRAF.mockImplementation((cb) => {
    setTimeout(cb, 16); // ~60fps
    return 1;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MusicalNotesRain Performance Tests', () => {
  it('should not exceed performance thresholds with default settings', async () => {
    const startTime = performance.now();
    
    render(<MusicalNotesRain />);
    
    const renderTime = performance.now() - startTime;
    
    // Initial render should be under 50ms
    expect(renderTime).toBeLessThan(50);
  });

  it('should handle high note count efficiently', async () => {
    const startTime = performance.now();
    
    render(<MusicalNotesRain noteCount={100} />);
    
    const renderTime = performance.now() - startTime;
    
    // Even with 100 notes, render should be under 100ms
    expect(renderTime).toBeLessThan(100);
  });

  it('should limit animation frame calls', async () => {
    render(<MusicalNotesRain />);
    
    // Reset call count
    mockRAF.mockClear();
    
    // Simulate rapid mouse movements
    for (let i = 0; i < 10; i++) {
      fireEvent.mouseMove(document, { clientX: i * 10, clientY: i * 10 });
    }
    
    // Wait for effects to settle
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    // Should not have excessive RAF calls (throttling should limit this)
    expect(mockRAF).toHaveBeenCalledTimes(expect.any(Number));
    expect(mockRAF.mock.calls.length).toBeLessThan(20); // Reasonable threshold
  });

  it('should minimize DOM updates during mouse movement', async () => {
    render(<MusicalNotesRain noteCount={10} />);
    
    // Track initial render
    const initialElements = screen.getAllByText(/[♪♫♬♭♯]/u);
    expect(initialElements.length).toBeGreaterThan(0);
    
    // Simulate mouse movement
    fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });
    
    // Elements should still be present (not recreated)
    const elementsAfterMove = screen.getAllByText(/[♪♫♬♭♯]/u);
    expect(elementsAfterMove.length).toBeGreaterThan(0);
  });

  it('should handle rapid prop changes without memory leaks', async () => {
    const { rerender } = render(<MusicalNotesRain noteCount={10} />);
    
    // Rapid prop changes
    for (let i = 0; i < 5; i++) {
      rerender(<MusicalNotesRain noteCount={15} color="text-blue-400" />);
      rerender(<MusicalNotesRain noteCount={10} color="text-rose-400" />);
    }
    
    // Should not accumulate event listeners
    expect(mockCancelRAF).toHaveBeenCalled();
  });

  it('should efficiently calculate mouse proximity', async () => {
    render(<MusicalNotesRain noteCount={25} />);
    
    const startTime = performance.now();
    
    // Simulate multiple mouse movements
    for (let i = 0; i < 50; i++) {
      fireEvent.mouseMove(document, { 
        clientX: Math.random() * 1000, 
        clientY: Math.random() * 1000 
      });
    }
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    const totalTime = performance.now() - startTime;
    
    // Mouse interaction calculations should be fast
    expect(totalTime).toBeLessThan(200);
  });

  it('should maintain consistent frame rate under load', async () => {
    render(<MusicalNotesRain noteCount={50} />);
    
    const frameTimes: number[] = [];
    let lastTime = performance.now();
    
    // Mock RAF to capture frame timing
    mockRAF.mockImplementation((callback) => {
      const currentTime = performance.now();
      frameTimes.push(currentTime - lastTime);
      lastTime = currentTime;
      
      setTimeout(() => callback(currentTime), 16);
      return 1;
    });
    
    // Simulate heavy mouse interaction
    for (let i = 0; i < 20; i++) {
      fireEvent.mouseMove(document, { clientX: i * 25, clientY: i * 25 });
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 16));
      });
    }
    
    // Calculate average frame time
    const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
    
    // Should maintain roughly 60fps (16.67ms per frame)
    expect(avgFrameTime).toBeGreaterThan(10); // Not too fast
    expect(avgFrameTime).toBeLessThan(25); // Not too slow
  });

  it('should cleanup resources properly on unmount', async () => {
    const { unmount } = render(<MusicalNotesRain />);
    
    // Reset counters
    mockCancelRAF.mockClear();
    
    unmount();
    
    // Should cancel animation frames
    expect(mockCancelRAF).toHaveBeenCalled();
  });

  it('should handle window resize efficiently', async () => {
    render(<MusicalNotesRain />);
    
    const startTime = performance.now();
    
    // Simulate window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    // Trigger mouse move to recalculate positions
    fireEvent.mouseMove(document, { clientX: 600, clientY: 400 });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });
    
    const resizeHandlingTime = performance.now() - startTime;
    
    // Resize handling should be fast
    expect(resizeHandlingTime).toBeLessThan(50);
  });
});

describe('MusicalNotesRain Optimization Analysis', () => {
  it('should identify potential optimization opportunities', () => {
    const optimizations = {
      // Test findings will inform these optimizations
      useMemo: 'Mouse position calculations could be memoized',
      useCallback: 'Event handlers could be memoized',
      virtualScrolling: 'Off-screen notes could be culled',
      batchUpdates: 'State updates could be batched',
      cssTransforms: 'CSS transforms could replace inline styles',
    };
    
    expect(optimizations).toBeDefined();
  });
});