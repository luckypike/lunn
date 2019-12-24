import React from 'react'
import PropTypes from 'prop-types'

import styles from './Courses.module.css'

Courses.propTypes = {
  courses: PropTypes.array
}

export default function Courses ({ courses }) {
  const forms = {
    1: 'Очная',
    2: 'Очно-заочная',
    3: 'Заочная'
  }

  return (
    <div className={styles.courses}>
      {courses.map(course =>
        <a key={course.nid} href={course.path} className={styles.course}>
          {course.spec &&
            <div className={styles.direction}>
              {course.title}
            </div>
          }

          <div>
            {course.spec || course.title}
          </div>

          {[...Array(3)].filter((_, i) => course[`price_${i + 1}`] && course[`time_${i + 1}`]).map((_, i) =>
            <div key={i} className={styles.meta}>
              <div>
                {forms[i + 1]}
              </div>

              <div>
                {course[`time_${i + 1}`]} года
              </div>

              <div>
                {course[`price_${i + 1}`]} ₽
              </div>
            </div>
          )}
        </a>
      )}
    </div>
  )
}
