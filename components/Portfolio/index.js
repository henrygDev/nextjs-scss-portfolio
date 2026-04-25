import { useRef } from "react";

import GestureHint from "./GestureHint";
import PortfolioControls from "./PortfolioControls";
import PortfolioProgress from "./PortfolioProgress";
import PortfolioSlide from "./PortfolioSlide";
import styles from "./Portfolio.module.scss";
import { portfolioItems } from "./data";
import { usePortfolioNavigation } from "./usePortfolioNavigation";
import { useSectionInView } from "./useSectionInView";
import { useTimedVisibility } from "./useTimedVisibility";

const GESTURE_HINT_DURATION_MS = 2000;
const GESTURE_HINT_FADE_MS = 500;

const Portfolio = () => {
  const portfolioRef = useRef(null);
  const isPortfolioInView = useSectionInView(portfolioRef);
  const { isVisible: showGestureHint, isFadingOut } = useTimedVisibility(
    GESTURE_HINT_DURATION_MS,
    GESTURE_HINT_FADE_MS,
    isPortfolioInView
  );
  const {
    currentSlide,
    setCurrentSlide,
    showPrevSlide,
    showNextSlide,
    swipeHandlers,
  } = usePortfolioNavigation(portfolioItems.length);

  return (
    <div
      ref={portfolioRef}
      className={styles.portfolio}
      id="portfolio"
      tabIndex={0}
      {...swipeHandlers}
    >
      {showGestureHint ? <GestureHint isFadingOut={isFadingOut} /> : null}
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {portfolioItems.map((item) => (
          <PortfolioSlide item={item} key={item.id} />
        ))}
      </div>
      <PortfolioControls onPrev={showPrevSlide} onNext={showNextSlide} />
      <PortfolioProgress
        currentSlide={currentSlide}
        items={portfolioItems}
        onSelect={setCurrentSlide}
      />
    </div>
  );
};

export default Portfolio;
