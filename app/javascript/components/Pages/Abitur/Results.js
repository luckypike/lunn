import React from 'react'

import styles from './Results.module.css'

import ArrowImg from '!svg-react-loader?!../../../images/arrow-right.svg'

export default function Results () {
  return (
    <div className={styles.root}>
      {/* <h3>
        Актуальная информация
      </h3> */}

      <div className={styles.results}>
        <a className={styles.result} href="/abitur/2021/basp-schedule">
          <span>
            Расписание экзаменов (бак. / спец.)
          </span>

          <ArrowImg />
        </a>

        <a className={styles.result} href="/abitur/2021/ma-schedule">
          <span>
            Расписание экзаменов (магистратура)
          </span>

          <ArrowImg />
        </a>

        <a className={styles.result} href="/abitur/2021/results">
          <span>
            Результаты экзаменов
          </span>

          <ArrowImg />
        </a>

        <a className={styles.result} href="/abitur/2021/news">
          <span>
            Новости и объявления
          </span>

          <ArrowImg />
        </a>

        <a className={styles.result} href="https://abit.lunn.ru/">
          <span>
            Перечень абитуриентов
          </span>

          <ArrowImg />
        </a>

        <a className={styles.result} href="/abitur/2021/enrollments">
          <span>
            Приказы о зачислении
          </span>

          <ArrowImg />
        </a>
      </div>
    </div>
  )
}
