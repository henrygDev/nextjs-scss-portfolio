import { useEffect, useState } from "react";

import styles from "./Portfolio.module.scss";

const HINT_VISIBLE_MS = 2000;
const HINT_FADE_MS = 500;

const PortfolioProgress = ({ currentSlide, hintVisitKey, items, onSelect }) => {
  const [hiddenHintKey, setHiddenHintKey] = useState(0);
  const [fadingHintKey, setFadingHintKey] = useState(0);

  useEffect(() => {
    if (!hintVisitKey) {
      return undefined;
    }

    const fadeTimer = window.setTimeout(() => {
      setFadingHintKey(hintVisitKey);
    }, HINT_VISIBLE_MS);
    const hideTimer = window.setTimeout(() => {
      setHiddenHintKey(hintVisitKey);
    }, HINT_VISIBLE_MS + HINT_FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [hintVisitKey]);

  const showHint = hintVisitKey > 0 && hiddenHintKey !== hintVisitKey;
  const isHintFading = fadingHintKey === hintVisitKey;

  return (
    <div className={styles.progressGroup}>
      {showHint ? (
        <div
          className={`${styles.progressHint} ${
            isHintFading ? styles.progressHintHidden : ""
          }`}
        >
          <span className={styles.progressHintIcon}>&#8596;</span>
          <span className={styles.progressHintMobile}>Swipe</span>
          <span className={styles.progressHintDesktop}>Drag or swipe</span>
        </div>
      ) : null}
      <div
        className={styles.progress}
        aria-label={`Project ${currentSlide + 1} of ${items.length}`}
      >
        {items.map((item, index) => (
        <button
          type="button"
          key={item.id}
          data-portfolio-control="true"
          className={`${styles.progressDot} ${
            index === currentSlide ? styles.activeDot : ""
          }`}
            aria-label={`Go to project ${index + 1}`}
            aria-pressed={index === currentSlide}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioProgress;
