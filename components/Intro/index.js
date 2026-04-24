import styles from "./Intro.module.scss";

const Intro = () => (
  <div className={styles.intro} id="intro">
      <div className={styles.text}>
        <p className={styles.name}>Henry Guan</p>
        <p className={styles.role}>Software Engineer</p>
        <div className={styles.summary}>
          Experienced cloud engineer with a focus on distributed systems, technical ownership, and proven leadership across cross-team initiatives.
        </div>
      </div>
  </div>
)

export default Intro

