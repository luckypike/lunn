import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Steps.module.css'

Steps.propTypes = {
  admission: PropTypes.object
}

export default function Steps ({ admission }) {
  return (
    <div className={styles.root}>
      <div className={styles.steps}>
        <div className={classNames(styles.step, styles.complete)}>
          <div className={styles.digit}>1</div>
          <div className={styles.title}>Личные данные</div>
        </div>

        <div className={styles.sp} />

        <div className={classNames(styles.step, styles.complete)}>
          <div className={styles.digit}>2</div>
          <div className={styles.title}>Документ</div>
        </div>

        <div className={styles.sp} />

        <div className={classNames(styles.step, styles.complete)}>
          <div className={styles.digit}>3</div>
          <div className={styles.title}>Родители</div>
        </div>

        <div className={styles.sp} />

        <div className={classNames(styles.step, styles.current)}>
          <div className={styles.digit}>4</div>
          <div className={styles.title}>Адрес регистрации</div>
        </div>

        <div className={styles.sp} />

        <div className={classNames(styles.step, styles.inactive)}>
          <div className={styles.digit}>5</div>
          <div className={styles.title}>Адрес проживания</div>
        </div>

        <div className={styles.sp} />

        <div className={classNames(styles.step, styles.inactive)}>
          <div className={styles.digit}>6</div>
          <div className={styles.title}>Учебное заведение</div>
        </div>

        <div className={styles.sp} />

        <div className={classNames(styles.step, styles.inactive)}>
          <div className={styles.digit}>7</div>
          <div className={styles.title}>Образование</div>
        </div>

        <div className={styles.sp} />

        <div className={classNames(styles.step, styles.inactive)}>
          <div className={styles.digit}>8</div>
          <div className={styles.title}>Личные достижения</div>
        </div>

        <div className={styles.sp} />

        <div className={classNames(styles.step, styles.inactive)}>
          <div className={styles.digit}>9</div>
          <div className={styles.title}>Баллы</div>
        </div>

        <div className={styles.sp} />

        <div className={classNames(styles.step, styles.inactive)}>
          <div className={styles.digit}>10</div>
          <div className={styles.title}>Форма обучения</div>
        </div>
      </div>
    </div>
  )
}
