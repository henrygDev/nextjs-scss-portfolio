import { useRef, useState } from "react";

import styles from "./Portfolio.module.scss";

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const pointerState = useRef({
    active: false,
    id: null,
    startX: 0,
    startY: 0,
    hasNavigated: false,
  });
  const wheelState = useRef({
    delta: 0,
    timeoutId: null,
    locked: false,
  });
  const data = [
    {
      id: "1",
      tags: ["Leadership", "&", "Accessibility"],
      icon: "",
      iconUrl: "",
      title: "Public Accounts of Canada 2019 Web Conversion",
      desc: "Led the Public Accounts of Canada 2019 Web Conversion Process among all interns, mentoring 6 interns over a 4-month period. Ensured over 5000 public-facing pages met <strong>accessibility</strong>, bilingual, and web standards best practices at scale.",
      img: "/PA2019.png",
      url: "https://epe.lac-bac.gc.ca/100/201/301/comptes_publics_can/html/2019/recgen/cpc-pac/2019/index-eng.html",
      cta: "View Project",
    },
    {
      id: "2",
      tags: ["State Management"],
      icon: "",
      iconUrl: "",
      title: "JavaScript Blackjack",
      desc: "A Blackjack app built around maintaining complex <strong>game states</strong>, advanced player actions including split and double, betting logic, and side bet mechanics.",
      img: "/blackjack.png",
      url: "https://henry-blackjack.netlify.app/",
      cta: "Play Game",
    },
    {
      id: "3",
      tags: ["Backend App"],
      icon: "/GitHub-Mark-Light-32px.png",
      iconUrl: "https://github.com/henrygDev/merng-social-app",
      title: "Social Media App",
      desc: "A social media app built on the MERNG stack <strong>(MongoDB, Express, React, Node.JS, GraphQL)</strong> with the completed features of the database, server, login, registration, authentication <strong>(JWT)</strong>, post creation, post deletion, likes, and comments. Backend only.",
      img: "/merng.png",
      url: "",
      cta: "",
    },
    {
      id: "4",
      tags: ["React", "API"],
      icon: "/GitHub-Mark-Light-32px.png",
      iconUrl: "https://github.com/henrygDev/react-rmdb",
      title: "React Movie Database",
      desc: "Movie database based on <strong>React</strong>. Movie data was fetched through <strong>REST APIs</strong> from the The Movie Database and returned as <strong>JSON</strong> outputs.",
      img: "/react-rmdb.png",
      url: "",
      cta: "",
    },
  ];

  const showPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide > 0 ? prevSlide - 1 : data.length - 1
    );
  };

  const showNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide < data.length - 1 ? prevSlide + 1 : 0
    );
  };

  const handleClick = (dir) => {
    if (dir === "left") {
      showPrevSlide();
      return;
    }

    showNextSlide();
  };

  const resetPointerState = () => {
    pointerState.current = {
      active: false,
      id: null,
      startX: 0,
      startY: 0,
      hasNavigated: false,
    };
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerState.current = {
      active: true,
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      hasNavigated: false,
    };
  };

  const handlePointerMove = (event) => {
    if (
      !pointerState.current.active ||
      pointerState.current.id !== event.pointerId ||
      pointerState.current.hasNavigated
    ) {
      return;
    }

    const deltaX = event.clientX - pointerState.current.startX;
    const deltaY = event.clientY - pointerState.current.startY;

    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    pointerState.current.hasNavigated = true;

    if (deltaX > 0) {
      showPrevSlide();
      return;
    }

    showNextSlide();
  };

  const handlePointerUp = () => {
    resetPointerState();
  };

  const handleWheel = (event) => {
    const isHorizontalIntent =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
      (event.shiftKey && Math.abs(event.deltaY) > 0);

    if (!isHorizontalIntent || wheelState.current.locked) {
      return;
    }

    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    wheelState.current.delta += delta;

    if (wheelState.current.timeoutId) {
      clearTimeout(wheelState.current.timeoutId);
    }

    wheelState.current.timeoutId = setTimeout(() => {
      wheelState.current.delta = 0;
      wheelState.current.timeoutId = null;
    }, 180);

    if (Math.abs(wheelState.current.delta) < 70) {
      return;
    }

    event.preventDefault();
    wheelState.current.locked = true;
    wheelState.current.delta = 0;

    if (delta < 0) {
      showPrevSlide();
    } else {
      showNextSlide();
    }

    setTimeout(() => {
      wheelState.current.locked = false;
    }, 450);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevSlide();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextSlide();
    }
  };

  return (
    <div
      className={styles.portfolio}
      id="portfolio"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={styles.gestureHint}>
        <span className={styles.gestureIcon}>↔</span>
        <span className={styles.gestureTextMobile}>Swipe projects</span>
        <span className={styles.gestureTextDesktop}>
          Drag, swipe, or trackpad sideways
        </span>
      </div>
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {data.map((d) => (
          <div className={styles.container} key={d.id}>
            <div className={styles.item}>
              <div className={styles.left}>
                <div className={styles.leftContainer}>
                  <div className={styles.tags}>
                    {d.tags.map((tag) => (
                      <span className={styles.category} key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h2 className={styles.title}>{d.title}</h2>
                  <div className={styles.imgContainer}>
                    <a href={d.iconUrl}>
                      <img className={styles.icon} src={d.icon} alt="" />
                    </a>
                  </div>
                  <p
                    className={styles.desc}
                    dangerouslySetInnerHTML={{ __html: d.desc }}
                  ></p>
                  <div className={styles.actions}>
                    {d.url ? <a href={d.url}>{d.cta}</a> : null}
                    {d.iconUrl ? <a href={d.iconUrl}>GitHub</a> : null}
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.demoFrame}>
                  {d.url ? (
                    <a href={d.url}>
                      <img className={styles.demo} src={d.img} alt="" />
                    </a>
                  ) : (
                    <img className={styles.demo} src={d.img} alt="" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.leftArrow}
        aria-label="Show previous project"
        onClick={() => handleClick("left")}
      >
        <img src="/arrow.png" alt="" />
      </button>
      <button
        type="button"
        className={styles.rightArrow}
        aria-label="Show next project"
        onClick={() => handleClick()}
      >
        <img src="/arrow.png" alt="" />
      </button>
      <div className={styles.progress} aria-label={`Project ${currentSlide + 1} of ${data.length}`}>
        {data.map((d, index) => (
          <button
            type="button"
            key={d.id}
            className={`${styles.progressDot} ${index === currentSlide ? styles.activeDot : ""}`}
            aria-label={`Go to project ${index + 1}`}
            aria-pressed={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
