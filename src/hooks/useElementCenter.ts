import { useRef, useCallback } from "react";

/**
 * Custom hook to get the center position of a DOM element (e.g. the 'O' in the name).
 * Returns a callback ref and a function to get the current center position.
 */
export function useElementCenter<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const getCenter = useCallback(() => {
    if (!ref.current) return null;
    const rect = ref.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }, [ref]);
  return [ref, getCenter] as const;
}
