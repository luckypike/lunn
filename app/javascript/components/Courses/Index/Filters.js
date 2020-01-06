import React from 'react'

import styles from './Filters.module.css'

export default function Filters () {
  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        Уровень подготовки
      </div>

      <div className={styles.filter}>
        Форма обучения
      </div>

      <div className={styles.filter}>
        Предметы ЕГЭ
      </div>
    </div>
  )
}
