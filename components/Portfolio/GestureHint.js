import styles from "./Portfolio.module.scss";

const GestureHint = ({ isFadingOut }) => (
  <div
    className={`${styles.gestureHint} ${
      isFadingOut ? styles.gestureHintHidden : ""
    }`}
  >
    <span className={styles.gestureIcon}>&#8596;</span>
    <span className={styles.gestureTextMobile}>Swipe projects</span>
    <span className={styles.gestureTextDesktop}>
      Drag, swipe, or trackpad sideways
    </span>
  </div>
);

export default GestureHint;
