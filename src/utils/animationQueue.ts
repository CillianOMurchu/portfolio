/**
 * Animation Queue Utility
 * Manages sequential animation execution with proper timing
 */

export interface AnimationStep {
  id: string;
  action: () => void;
  delay?: number;
  duration?: number;
}

export class AnimationQueue {
  private queue: AnimationStep[] = [];
  private isRunning = false;
  private timeouts: NodeJS.Timeout[] = [];

  /**
   * Add an animation step to the queue
   */
  add(step: AnimationStep): AnimationQueue {
    this.queue.push(step);
    return this;
  }

  /**
   * Start executing the animation queue
   */
  start(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isRunning || this.queue.length === 0) {
        resolve();
        return;
      }

      this.isRunning = true;
      let currentDelay = 0;

      this.queue.forEach((step, index) => {
        const timeout = setTimeout(() => {
          step.action();

          // Resolve when the last step completes
          if (index === this.queue.length - 1) {
            // Wait for the step's duration if specified
            const finalDelay = step.duration || 0;
            setTimeout(() => {
              this.isRunning = false;
              this.clearTimeouts();
              resolve();
            }, finalDelay);
          }
        }, currentDelay);

        this.timeouts.push(timeout);
        currentDelay += step.delay || 0;
      });
    });
  }

  /**
   * Stop the animation queue and clear all pending timeouts
   */
  stop(): void {
    this.isRunning = false;
    this.clearTimeouts();
  }

  /**
   * Clear all timeouts
   */
  private clearTimeouts(): void {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
  }

  /**
   * Check if the queue is currently running
   */
  isActive(): boolean {
    return this.isRunning;
  }

  /**
   * Get the number of steps in the queue
   */
  size(): number {
    return this.queue.length;
  }
}

/**
 * Create a new animation queue
 */
export function createAnimationQueue(): AnimationQueue {
  return new AnimationQueue();
}

/**
 * Helper function to create animation steps
 */
export function createAnimationStep(
  id: string,
  action: () => void,
  delay = 0,
  duration = 0
): AnimationStep {
  return { id, action, delay, duration };
}