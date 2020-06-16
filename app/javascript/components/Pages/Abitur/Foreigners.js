import React from 'react'

import styles from './Foreigners.module.css'

export default function Foreigners () {
  return (
    <a className={styles.root} href="/page/admission">
      <h2>
        Иностранным абитуриентам
      </h2>

      <div className={styles.image} />
    </a>
  )
}
