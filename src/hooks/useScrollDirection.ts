import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down" | "none";

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("none");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        setDirection("none");
      } else if (currentY > lastScrollY.current) {
        setDirection("down");
      } else if (currentY < lastScrollY.current) {
        setDirection("up");
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
}
