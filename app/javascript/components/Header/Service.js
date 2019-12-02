import React from 'react'
// import PropTypes from 'prop-types'

import styles from './Service.module.css'

export default function Service () {
  return (
    <div className={styles.root}>
      <div className={styles.search}>
        Поиск
      </div>

      <div className={styles.login}>
        <a href="#" className={styles.button}>
          Войти
        </a>
      </div>
    </div>
  )
}
