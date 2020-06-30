import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Sec.module.css'

import ArrowImg from '!svg-react-loader?!../../../images/arrow-right.svg'

Sec.propTypes = {
  navs: PropTypes.array
}

export default function Sec () {
  return (
    <div className={styles.root}>
      <div className={styles.items}>
        <a href="/page/shkolniku" className={classNames(styles.item, styles.hss)}>
          <div className={styles.title}>
            Школьнику
          </div>

          <div className={styles.more}>
            <span>Подробнее</span>

            <ArrowImg />
          </div>
        </a>

        <a href="/abitur/2020" className={classNames(styles.item, styles.abitur)}>
          <div className={styles.title}>
            Абитуриенту
          </div>

          <div className={styles.more}>
            <span>Подробнее</span>

            <ArrowImg />
          </div>
        </a>

        <a href="/page/studentu" className={classNames(styles.item, styles.student)}>
          <div className={styles.title}>
            Студенту
          </div>

          <div className={styles.more}>
            <span>Подробнее</span>

            <ArrowImg />
          </div>
        </a>

        <a href="/page/vypuskniku" className={classNames(styles.item, styles.graduate)}>
          <div className={styles.title}>
            Выпускнику
          </div>

          <div className={styles.more}>
            <span>Подробнее</span>

            <ArrowImg />
          </div>
        </a>
      </div>
    </div>
  )
}
