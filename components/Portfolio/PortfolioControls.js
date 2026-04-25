import styles from "./Portfolio.module.scss";

const PortfolioControls = ({ onPrev, onNext }) => (
  <>
    <button
      type="button"
      className={styles.leftArrow}
      aria-label="Show previous project"
      onClick={onPrev}
    >
      <img src="/arrow.png" alt="" />
    </button>
    <button
      type="button"
      className={styles.rightArrow}
      aria-label="Show next project"
      onClick={onNext}
    >
      <img src="/arrow.png" alt="" />
    </button>
  </>
);

export default PortfolioControls;
