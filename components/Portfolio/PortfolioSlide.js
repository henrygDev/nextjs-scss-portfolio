import styles from "./Portfolio.module.scss";

const PortfolioSlide = ({ item }) => (
  <div className={styles.container}>
    <div className={styles.item}>
      <div className={styles.left} data-swipe-disabled="desktop">
        <div className={styles.leftContainer}>
          <div className={styles.tags}>
            {item.tags.map((tag) => (
              <span className={styles.category} key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.imgContainer}>
            <a href={item.iconUrl}>
              <img className={styles.icon} src={item.icon} alt="" />
            </a>
          </div>
          <p
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: item.desc }}
          ></p>
          <div className={styles.actions}>
            {item.url ? <a href={item.url}>{item.cta}</a> : null}
            {item.iconUrl ? <a href={item.iconUrl}>GitHub</a> : null}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.demoFrame}>
          {item.url ? (
            <a href={item.url}>
              <img className={styles.demo} src={item.img} alt="" />
            </a>
          ) : (
            <img className={styles.demo} src={item.img} alt="" />
          )}
        </div>
      </div>
    </div>
  </div>
);

export default PortfolioSlide;
