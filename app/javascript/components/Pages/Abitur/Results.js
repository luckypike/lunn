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
        <a className={styles.result} href="https://docs.google.com/spreadsheets/d/1BUmiAKgPJkl-ZoRCUo-5i2NzY_YLVDsh2oBmBnQSVSY/edit#gid=0" target="_blank" rel="noopener noreferrer">
          <span>
            Расписание экзаменов (бак. / спец.)
          </span>

          <ArrowImg />
        </a>

        <a className={styles.result} href="https://docs.google.com/spreadsheets/d/1dFeNkB32OooHAvh3uMtfcrD_fCSiaCfR8070B0NuUT8/edit#gid=0" target="_blank" rel="noopener noreferrer">
          <span>
            Расписание экзаменов (магистратура)
          </span>

          <ArrowImg />
        </a>

        <a className={styles.result} href="/abitur/2020/info">
          <span>
            Результаты экзаменов
          </span>

          <ArrowImg />
        </a>

        <a className={styles.result} href="/abitur/2020/list">
          <span>
            Перечень абитуриентов
          </span>

          <ArrowImg />
        </a>
      </div>
    </div>
  )
}
