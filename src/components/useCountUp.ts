"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface CountUpOptions {
  duration?: number;
  threshold?: number;
}

export function useCountUp(
  target: number,
  options: CountUpOptions = {}
): [number, React.RefObject<HTMLDivElement | null>] {
  const { duration = 1400, threshold = 0.3 } = options;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 40);
  }, [target, duration]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animate, threshold]);

  return [count, ref];
}

export function formatStat(value: number, prefix = "", suffix = ""): string {
  return prefix + value.toLocaleString("en-US") + suffix;
}
