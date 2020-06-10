import React from 'react'
// import PropTypes from 'prop-types'

import styles from './Admission.module.css'

export default function Admission () {
  return (
    <a className={styles.a} href="/abitur/2020">
      <div className={styles.container}>
        <div className={styles.root}>
          <div className={styles.title}>
            <h2>
              Приемная кампания 2020 года
            </h2>
          </div>

          <div className={styles.action}>
            <span className={styles.button}>
              Узнать больше о поступлении
            </span>
          </div>
        </div>
      </div>
    </a>

  )
}
