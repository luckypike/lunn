import React from 'react'
import classNames from 'classnames'
// import PropTypes from 'prop-types'

import styles from './How.module.css'

export default function How () {
  return (
    <div className={styles.root}>
      <h2>Поступить в НГЛУ — это просто!</h2>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.header}>
            <div className={classNames(styles.icon, styles.i1)} />

            <div className={classNames(styles.sep, styles.first)}>
              <div className={styles.line} />
            </div>
          </div>

          <div className={styles.title}>
            Выберите направление подготовки
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.header}>
            <div className={classNames(styles.icon, styles.i2)} />

            <div className={styles.sep}>
              <div className={styles.line} />
            </div>
          </div>

          <div className={styles.title}>
            Соберите необходимые документы
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.header}>
            <div className={classNames(styles.icon, styles.i3)} />

            <div className={styles.sep}>
              <div className={styles.line} />
            </div>
          </div>

          <div className={styles.title}>
            Подайте документы лично, по почте или онлайн
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.header}>
            <div className={classNames(styles.icon, styles.i4)} />

            <div className={styles.sep}>
              <div className={styles.line} />
            </div>
          </div>

          <div className={styles.title}>
            Пройдите вступительные испытания
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.header}>
            <div className={classNames(styles.icon, styles.i5)} />

            <div className={styles.sep}>
              <div className={classNames(styles.line, styles.pre)} />
            </div>
          </div>

          <div className={styles.title}>
            Подпишите заявление о согласии на зачисление
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.header}>
            <div className={classNames(styles.icon, styles.last, styles.i6)} />

            <div className={classNames(styles.sep, styles.last)}>
              <div className={classNames(styles.line, styles.last)} />
            </div>
          </div>

          <div className={styles.title}>
            Заключите договор, если вы поступаете на платное обучение
          </div>
        </div>
      </div>
    </div>
  )
}
