import { useState } from "react";

import styles from "./Portfolio.module.scss";

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    {
      id: "1",
      icon: "",
      iconUrl: "",
      title: "Public Accounts of Canada 2019 Web Conversion",
      desc: "Led the Public Accounts of Canada 2019 Web Conversion Process among all interns, mentoring 6 interns over a 4-month period. <strong>PERL</strong> scripts were used to validate over 5000 pages of data split among 10 team members.",
      img: "/PA2019.png",
      url: "https://www.tpsgc-pwgsc.gc.ca/recgen/cpc-pac/2019/index-eng.html",
    },
    {
      id: "2",
      icon: "/GitHub-Mark-Light-32px.png",
      iconUrl: "https://github.com/henrygeez/merng-social-app",
      title: "MERNG Social Media App",
      desc: "A social media app built on the MERNG stack <strong>(MongoDB, Express, React, Node.JS, GraphQL)</strong> with the completed features of the database, server, login, registration, authentication <strong>(JWT)</strong>, post creation, post deletion, likes, and comments. Front-end is currently in progress.",
      img: "/merng.png",
      url: "",
    },
    {
      id: "3",
      icon: "/GitHub-Mark-Light-32px.png",
      iconUrl: "https://github.com/henrygeez/react-rmdb",
      title: "React Movie Database",
      desc: "Movie database based on <strong>React</strong>. Movie data was fetched through <strong>REST APIs</strong> from the The Movie Database and returned as <strong>JSON</strong> outputs.",
      img: "/react-rmdb.png",
      url: "",
    },
    {
      id: "4",
      icon: "/GitHub-Mark-Light-32px.png",
      iconUrl: "https://github.com/henrygeez/js-todo-list",
      title: "JavaScript To-do List",
      desc: "A simple to-do list made with vanilla <strong>JavaScript</strong>. Has the features to check off items, remove items, save local list items, and clear all list items.",
      img: "/todo.png",
      url: "",
    },
  ];

  const handleClick = (dir) => {
    dir === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : data.length - 1)
      : setCurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0);
  };
  return (
    <div className={styles.portfolio} id="portfolio">
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {data.map((d) => (
          <div className={styles.container} key={d.id}>
            <div className={styles.item}>
              <div className={styles.left}>
                <div className={styles.leftContainer}>
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
                </div>
              </div>
              <div className={styles.right}>
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
        ))}
      </div>
      <img
        src="/arrow.png"
        className={styles.leftArrow}
        alt=""
        onClick={() => handleClick("left")}
      />
      <img
        src="/arrow.png"
        className={styles.rightArrow}
        alt=""
        onClick={() => handleClick()}
      />
    </div>
  );
};

export default Portfolio;
