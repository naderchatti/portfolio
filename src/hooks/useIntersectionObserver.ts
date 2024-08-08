import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (
  options = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px', // Trigger 50px before the element comes into view
  }
) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};
