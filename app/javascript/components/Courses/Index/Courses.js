import React from 'react'
import PropTypes from 'prop-types'

import styles from './Courses.module.css'

Courses.propTypes = {
  courses: PropTypes.array
}

export default function Courses ({ courses }) {
  // const forms = {
  //   1: 'Очная',
  //   2: 'Очно-заочная',
  //   3: 'Заочная'
  // }

  return (
    <div className={styles.courses}>
      {courses.map(course =>
        <a key={course.nid} href={course.path} className={styles.course}>
          <div className={styles.direction}>
            {course.title}
          </div>

          <div className={styles.title}>
            {course.spec || course.title}
          </div>

          {/* {[...Array(3)].filter((_, i) => course[`time_${i + 1}`] !== null && course[`places_${i + 1}`] !== null).map((_, i) =>
            <div key={i} className={styles.meta}>
              <div>
                {forms[i + 1]}
              </div>

              <div>
                {course[`places_${i + 1}`] > 0 ? course[`places_${i + 1}`] : 'нет'} бюджетных мест
              </div>

              <div>
                {course[`time_${i + 1}`]} года срок обучения
              </div>

              {course[`price_${i + 1}`] !== null &&
                <div>
                  {course[`price_${i + 1}`]} руб. в года стоимость обучения
                </div>
              }
            </div>
          )} */}

          <div className={styles.ege}>
            <p>
              Предметы ЕГЭ
            </p>

            <ul className={styles.es}>
              {course.ege.map(e =>
                <li key={e} className={styles.e}>
                  <Ege label={e} />
                </li>
              )}
            </ul>
          </div>
        </a>
      )}
    </div>
  )
}

function Ege ({ label }) {
  const labels = {
    foreign: 'Иностранный язык',
    russian: 'Русский язык',
    lit: 'Литература',
    math: 'Математика',
    history: 'История',
    social: 'Обществознание'
  }

  return labels[label] || label
}
