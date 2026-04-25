import { useRef } from "react";

import { useSectionSnapNavigation } from "../useSectionSnapNavigation";
import styles from './Contact.module.scss';

const Contact = () => {
  const contactRef = useRef(null);
  useSectionSnapNavigation(contactRef, { previousSectionId: "portfolio" });

  return (
    <div ref={contactRef} className={styles.contact} id="contact">
      <div className={styles.block}></div>
      <div className={styles.text}>
        <a href="mailto:henryguan.dev@gmail.com">Email<span></span></a><br/>
        <a href="https://drive.google.com/file/d/1jp1SVTm7lVamK8YShUpX0nw7sBRpgFjn">Resume</a><br/>
        <a href="https://www.linkedin.com/in/henryyguan">LinkedIn</a><br/>
        <a href="https://github.com/henrygDev">GitHub</a>
      </div>
      <div className={styles.footer}>
        Designed and developed by Henry Guan.
      </div>
    </div>
  )
}

export default Contact;
