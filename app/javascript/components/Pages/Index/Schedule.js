import React, { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import classNames from 'classnames'

import styles from './Schedule.module.css'
import pages from '../../Pages.module.css'

export default function Schedule () {
  const [height, setHeight] = useState(0)

  const active = () => height !== 0

  return (
    <div className={classNames(pages.container, styles.root)}>
      <div className={classNames(styles.toggle, { [styles.active]: active() })} onClick={() => setHeight(height === 0 ? 'auto' : 0)}>
        <div className={styles.header}>
          Расписание
          {/* <span className={styles.hint}>
            занятий и ликвидации задолженностей
          </span> */}
        </div>

        <div className={styles.button}>
          {active() ? 'Смотреть' : 'Свернуть'}
        </div>
      </div>

      <AnimateHeight height={height}>
        <div className={styles.items}>
          <a
            href="/schedule/reex"
            className={classNames(styles.item, styles.reex)}
          >
            <div className={styles.title}>
              Летняя экзаменационная сессия и ГИА
            </div>
          </a>

          <a
            href="http://rasp.lunn.ru/raspisanie/faya/"
            className={styles.item}
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.title}>
                Факультет английского языка
              <Arrow />
            </div>
          </a>

          <a
            href="http://rasp.lunn.ru/raspisanie/frgya/"
            className={styles.item}
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.title}>
              Факультет романо-германских языков
              <Arrow />
            </div>
          </a>

          <a
            href="http://rasp.lunn.ru/raspisanie/oozo/"
            className={styles.item}
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.title}>
              Отделение очно-заочного обучения
              <Arrow />
            </div>
          </a>

          <a
            href="http://rasp.lunn.ru/raspisanie/fmoeu/"
            className={styles.item}
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.title}>
              Факультет международных отношений, экономики и управления
              <Arrow />
            </div>
          </a>

          <a
            href="http://rasp.lunn.ru/raspisanie/pf/"
            className={styles.item}
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.title}>
              Переводческий факультет
              <Arrow />
            </div>
          </a>

          <a
            href="http://rasp.lunn.ru/raspisanie/ozo/"
            className={styles.item}
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.title}>
              Отделение заочного обучения
              <Arrow />
            </div>
          </a>
        </div>
      </AnimateHeight>
    </div>
  )
}

function Arrow () {
  return (
    <svg className={styles.external} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 29">
      <path stroke="#2E4DE6" strokeLinecap="round" strokeLinejoin="round" d="M7 22l10-11m-7-3l12-1-1 12"/>
    </svg>
  )
}
