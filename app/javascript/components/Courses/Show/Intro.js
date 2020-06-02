import React from 'react'
import PropTypes from 'prop-types'

import styles from './Intro.module.css'
import buttons from '../../Buttons2.module.css'

Intro.propTypes = {
  course: PropTypes.object.isRequired
}

export default function Intro ({ course }) {
  if (!course.course_summary) return null

  return (
    <div className={styles.root}>
      <div className={styles.summary}>
        {course.course_summary}
      </div>

      <div className={styles.action}>
        <a href="/abitur/2020" className={buttons.main}>
          Приёмная комиссия
        </a>
      </div>

      {course.youtube &&
        <div className={styles.youtube}>
          <iframe src={`https://www.youtube.com/embed/${course.youtube}`} frameBorder="0" allowFullScreen={true}></iframe>
        </div>
      }
    </div>
  )
}
