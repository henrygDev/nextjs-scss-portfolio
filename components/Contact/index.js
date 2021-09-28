import React from 'react'

import styles from './Contact.module.scss';

const Contact = () => {
  return (
    <div className={styles.contact} id="contact">
      <div className={styles.text}>
        <a href="mailto:henryyguan@gmail.com">Email<span></span></a><br/>
        <a target="_blank" href="https://drive.google.com/file/d/1duC13Mz2B01_FieAFAimhMHd7RjnuAEK/view?usp=sharing">Resume</a><br/>
        <a target="_blank" href="https://www.linkedin.com/in/henry-guan-a1a772142/">LinkedIn</a><br/>
        <a target="_blank" href="https://github.com/henrygeez">GitHub</a>
      </div>
    </div>
  )
}

export default Contact;