import React from 'react'

import styles from './Youtube.module.css'

export default function Youtube () {
  return (
    <div className={styles.root}>
      <div className={styles.video}>
        <div className={styles.youtube}>
          <iframe src='https://www.youtube.com/embed/DIY2Uz4GvY8' frameBorder="0" allowFullScreen={true} />
        </div>

        <div className={styles.title}>
          Бесплатные курсы иностранного языка в НГЛУ, направление «Экономика»
        </div>

        <div className={styles.date}>
          19 декабря 2019
        </div>
      </div>

      <div className={styles.video}>
        <div className={styles.youtube}>
          <iframe src='https://www.youtube.com/embed/_HBlLzCvHTk' frameBorder="0" allowFullScreen={true} />
        </div>

        <div className={styles.title}>
          Интервью Ж.В. Никоновой каналу «Россия 1»
        </div>

        <div className={styles.date}>
          25 июля 2019
        </div>
      </div>
    </div>
  )
}
