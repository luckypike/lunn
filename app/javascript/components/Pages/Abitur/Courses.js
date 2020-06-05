import React from 'react'
import classNames from 'classnames'

import styles from './Courses.module.css'

import Arrow from '!svg-react-loader?!../../../images/arrow.svg'

export default function Courses () {
  return (
    <div className={styles.root}>
      <h2>Направления подготовки и специальности</h2>

      <div className={styles.courses}>
        <a href="/programs/ba" className={classNames(styles.course, styles.ba)}>
          <div className={styles.title}>
            Бакалавриат
          </div>

          <div className={styles.count}>
            37 программ по 12 направлениям
          </div>

          <div className={styles.more}>
            Подробнее

            <Arrow />
          </div>
        </a>

        <a href="/programs/sp" className={classNames(styles.course, styles.sp)}>
          <div className={styles.title}>
            Специалитет
          </div>

          <div className={styles.count}>
            3 программы по 1 направлению
          </div>

          <div className={styles.more}>
            Подробнее

            <Arrow />
          </div>
        </a>

        <a href="/programs/ma" className={classNames(styles.course, styles.ma)}>
          <div className={styles.title}>
            Магистратура
          </div>

          <div className={styles.count}>
            33 программы по 10 направлениям
          </div>

          <div className={styles.more}>
            Подробнее

            <Arrow />
          </div>
        </a>

        <a href="/programs/as" className={classNames(styles.course, styles.as)}>
          <div className={styles.title}>
            Аспирантура
          </div>

          <div className={styles.count}>
            17 программ по 7 направлениям
          </div>

          <div className={styles.more}>
            Подробнее

            <Arrow />
          </div>
        </a>
      </div>
    </div>
  )
}
