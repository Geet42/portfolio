import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook that detects when an element enters the viewport.
 * Uses a callback ref pattern so it works with conditionally rendered elements.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility ratio to trigger (0–1). Default 0.15
 * @param {string} options.rootMargin - Margin around root. Default "0px 0px -60px 0px"
 * @param {boolean} options.triggerOnce - Only trigger once. Default true
 * @returns {[function, boolean]} [callbackRef, isInView]
 */
export default function useInView({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
} = {}) {
  const [node, setNode] = useState(null);
  const [isInView, setIsInView] = useState(false);

  // Callback ref — fires whenever the DOM element is created or destroyed
  const ref = useCallback((el) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(node);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
}
