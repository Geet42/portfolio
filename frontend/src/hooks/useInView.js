import { useRef, useState, useEffect } from "react";

/**
 * Custom hook that detects when an element enters the viewport.
 * Uses IntersectionObserver for performant scroll-triggered animations.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility ratio to trigger (0–1). Default 0.15
 * @param {string} options.rootMargin - Margin around root. Default "0px 0px -60px 0px"
 * @param {boolean} options.triggerOnce - Only trigger once. Default true
 * @returns {[React.RefObject, boolean]} [ref, isInView]
 */
export default function useInView({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
}
