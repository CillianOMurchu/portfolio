import { useEffect, useState } from "react";

/**
 * useNeonFlicker
 * Flickers a neon sign effect on mount, then remains visible.
 * @param {number} delayMs - Delay before flicker starts (ms)
 * @returns {boolean} show - Whether the neon sign should be visible
 */
export function useNeonFlicker(delayMs: number = 2000): boolean {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let flickerTimeouts: NodeJS.Timeout[] = [];
    const flickerOn = () => {
      setShow(true);
      flickerTimeouts.push(setTimeout(() => setShow(false), 80));
      flickerTimeouts.push(setTimeout(() => setShow(true), 160));
      flickerTimeouts.push(setTimeout(() => setShow(false), 240));
      flickerTimeouts.push(setTimeout(() => setShow(true), 320));
      flickerTimeouts.push(setTimeout(() => setShowTitle(false), 400));
      flickerTimeouts.push(setTimeout(() => setShow(true), 600));
      // After last flicker, keep on
      flickerTimeouts.push(setTimeout(() => setShow(true), 1200));
    };
    const delayTimeout = setTimeout(flickerOn, delayMs);
    return () => {
      flickerTimeouts.forEach(clearTimeout);
      clearTimeout(delayTimeout);
    };
  }, [delayMs]);
  return show;
}
