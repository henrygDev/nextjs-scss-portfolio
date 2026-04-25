import styles from "./Portfolio.module.scss";

const PortfolioProgress = ({ currentSlide, items, onSelect }) => (
  <div
    className={styles.progress}
    aria-label={`Project ${currentSlide + 1} of ${items.length}`}
  >
    {items.map((item, index) => (
      <button
        type="button"
        key={item.id}
        className={`${styles.progressDot} ${
          index === currentSlide ? styles.activeDot : ""
        }`}
        aria-label={`Go to project ${index + 1}`}
        aria-pressed={index === currentSlide}
        onClick={() => onSelect(index)}
      />
    ))}
  </div>
);

export default PortfolioProgress;
