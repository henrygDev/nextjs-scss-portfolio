import { useEffect, useRef, useState } from "react";

import PortfolioControls from "./PortfolioControls";
import PortfolioProgress from "./PortfolioProgress";
import PortfolioSlide from "./PortfolioSlide";
import styles from "./Portfolio.module.scss";
import { portfolioItems } from "./data";
import { usePortfolioNavigation } from "./usePortfolioNavigation";
import { useSectionSnapNavigation } from "../useSectionSnapNavigation";

const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [hintVisitKey, setHintVisitKey] = useState(0);
  useSectionSnapNavigation(portfolioRef, {
    previousSectionId: "intro",
    nextSectionId: "contact",
  });
  const {
    currentSlide,
    setCurrentSlide,
    showPrevSlide,
    showNextSlide,
    dragOffset,
    isDragging,
    isSwipeInteracting,
    swipeHandlers,
  } = usePortfolioNavigation(portfolioItems.length);

  useEffect(() => {
    const section = portfolioRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.65) {
          setHintVisitKey((currentKey) => currentKey + 1);
        }
      },
      { threshold: 0.65 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={portfolioRef}
      className={`${styles.portfolio} ${
        isSwipeInteracting ? styles.swipeInteracting : ""
      }`}
      id="portfolio"
      tabIndex={0}
      {...swipeHandlers}
    >
      <div
        className={styles.slider}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}vw + ${dragOffset}px))`,
          transition: isDragging ? "none" : undefined,
        }}
      >
        {portfolioItems.map((item) => (
          <PortfolioSlide item={item} key={item.id} />
        ))}
      </div>
      <PortfolioControls onPrev={showPrevSlide} onNext={showNextSlide} />
      <PortfolioProgress
        currentSlide={currentSlide}
        hintVisitKey={hintVisitKey}
        items={portfolioItems}
        onSelect={setCurrentSlide}
      />
    </div>
  );
};

export default Portfolio;
