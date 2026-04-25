import { useEffect, useState } from "react";

export const useSectionInView = (sectionRef, threshold = 0.65) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.intersectionRatio >= threshold);
      },
      { threshold }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [sectionRef, threshold]);

  return isInView;
};
