import { useEffect, useRef, useState } from "react";

import { useSectionSnapNavigation } from "../useSectionSnapNavigation";
import styles from "./Intro.module.scss";

const Intro = () => {
  const introRef = useRef(null);
  const [showSwipeCue, setShowSwipeCue] = useState(true);
  useSectionSnapNavigation(introRef, { nextSectionId: "portfolio" });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSwipeCue(false);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={introRef} className={styles.intro} id="intro">
      <div className={styles.text}>
        <p className={styles.name}>Henry Guan</p>
        <p className={styles.role}>Software Engineer</p>
        <div className={styles.summary}>
          Experienced cloud engineer with a focus on distributed systems, technical ownership, and proven leadership across cross-team initiatives.
        </div>
      </div>
      <div
        className={`${styles.swipeCue} ${
          !showSwipeCue ? styles.swipeCueHidden : ""
        }`}
        aria-hidden="true"
      >
        <span className={styles.swipeLabel}>Swipe</span>
        <span className={styles.swipeTracks}>
          <span className={styles.swipeArrow}></span>
        </span>
      </div>
    </div>
  );
};

export default Intro;

