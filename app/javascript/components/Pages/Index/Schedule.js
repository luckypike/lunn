import React from 'react'

import styles from './Schedule.module.css'
import pages from '../../Pages.module.css'

export default function Schedule () {
  return (
    <div className={pages.container}>
      <div className={styles.heading}>
        Расписание
      </div>

      <div className={styles.wrapper}>
        <div className={styles.items}>
          <div className={styles.item}>
            <a href="http://rasp.lunn.ru/raspisanie/faya/">
              <div className={styles.title}>
                Факультет английского языка
                <Arrow />
              </div>
            </a>
          </div>

          <div className={styles.item}>
            <a href="http://rasp.lunn.ru/raspisanie/frgya/">
              <div className={styles.title}>
                Факультет романо-германских языков
                <Arrow />
              </div>
            </a>
          </div>

          <div className={styles.item}>
            <a href="http://rasp.lunn.ru/raspisanie/oozo/">
              <div className={styles.title}>
                Отделение очно-заочного обучения
                <Arrow />
              </div>
            </a>
          </div>

          {/* <div className={styles.item}>
            <a href="#">
              <div className={styles.title}>
                Курсы
              </div>
              <Arrow />
            </a>
          </div> */}
        </div>

        <div className={styles.items}>
          <div className={styles.item}>
            <a href="http://rasp.lunn.ru/raspisanie/fmoeu/">
              <div className={styles.title}>
                Факультет международных отношений, экономики и управления
                <Arrow />
              </div>
            </a>
          </div>

          <div className={styles.item}>
            <a href="http://rasp.lunn.ru/raspisanie/pf/">
              <div className={styles.title}>
                Переводческий факультет
                <Arrow />
              </div>
            </a>
          </div>

          <div className={styles.item}>
            <a href="http://rasp.lunn.ru/raspisanie/ozo/">
              <div className={styles.title}>
                Отделение заочного обучения
                <Arrow />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Arrow () {
  return (
    <svg className={styles.external} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 29">
      <path stroke="#2E4DE6" strokeLinecap="round" strokeLinejoinn="round" d="M7 22l10-11m-7-3l12-1-1 12"/>
    </svg>
  )
}
