import React from 'react'

import styles from './Youtube.module.css'

export default function Youtube () {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        Видеоновости
      </div>

      <div className={styles.video}>
        <div className={styles.youtube}>
          <iframe src='https://www.youtube.com/embed/gr9xa9pdpDk' frameBorder="0" allowFullScreen={true} />
        </div>

        <div className={styles.title}>
          Ректор НГЛУ Жанна Никонова поздравляет коллег с Днем российской науки
        </div>

        <div className={styles.date}>
          7 февраля 2020
        </div>
      </div>

      <div className={styles.video}>
        <div className={styles.youtube}>
          <iframe src='https://www.youtube.com/embed/CDYozEbzF0s' frameBorder="0" allowFullScreen={true} />
        </div>

        <div className={styles.title}>
          Ученые НГЛУ поздравляют коллег с Днем российской науки
        </div>

        <div className={styles.date}>
          7 февраля 2020
        </div>
      </div>
    </div>
  )
}
