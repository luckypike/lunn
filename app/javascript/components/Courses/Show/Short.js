import React from 'react'
import PropTypes from 'prop-types'

import styles from './Short.module.css'

Short.propTypes = {
  course: PropTypes.object.isRequired
}

export default function Short ({ course }) {
  return (
    <div className={styles.root}>
      <div className={styles.code}>
        <div className={styles.title}>
          Шифр направления подготовки
        </div>

        <div className={styles.item}>
          {course.course_code}
        </div>
      </div>

      <div className={styles.name}>
        <div className={styles.title}>
          Наименование направления подготовки
        </div>

        <div className={styles.item}>
          {course.title}
        </div>
      </div>

      <div className={styles.profile}>
        <div className={styles.title}>
          Наименование профиля подготовки
        </div>

        <div className={styles.item}>
          {course.spec ? course.spec : 'нет'}
        </div>
      </div>
    </div>
  )
}
