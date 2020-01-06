import React from 'react'

import styles from './Filters.module.css'

export default function Filters () {
  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        Кафедра
      </div>

      <div className={styles.filter}>
        Должность
      </div>

      <div className={styles.filter}>
        Дисциплины
      </div>
    </div>
  )
}
