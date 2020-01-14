import React from 'react'
import PropTypes from 'prop-types'

import Renderer from '../../Draft'

import styles from './Course.module.css'

Course.propTypes = {
  course: PropTypes.object
}

export default function Course ({ course }) {
  const forms = {
    1: 'Очная',
    2: 'Очно-заочная',
    3: 'Заочная'
  }

  const skills = {
    1: 'Бакалавр'
  }

  return (
    <div className={styles.root}>
      {[...Array(3)].filter((_, i) => course[`time_${i + 1}`] !== null && course[`places_${i + 1}`] !== null).map((_, i) =>
        <div key={i} className={styles.course}>
          <div className={styles.item}>
            <div className={styles.info}>
              {Math.round(course[`time_${i + 1}`])} года
            </div>

            <p>Срок обучения</p>
          </div>

          <div className={styles.item}>
            <div className={styles.info}>
              {forms[i + 1]}
            </div>

            <p>Форма обучения</p>
          </div>

          <div className={styles.item}>
            <div className={styles.info}>
              {skills[1]}
            </div>

            <p>Присваиваемая квалификация</p>
          </div>

          <div className={styles.item}>
            <div className={styles.info}>
              {course[`places_${i + 1}`] > 0 ? course[`places_${i + 1}`] : 0 }
            </div>

            <p>Количество бюджетных мест в 2020-2021 уч.г.</p>
          </div>

          <div className={styles.item}>
            {course[`price_${i + 1}`] !== null &&
              <div className={styles.info}>
                {course[`price_${i + 1}`]} ₽
              </div>
            }

            <p>Стоимость обучения в 2019-2020 уч.году</p>
          </div>
        </div>
      )}

      {course.youtube &&
        <div className={styles.youtube}>
          <iframe src={`https://www.youtube.com/embed/${course.youtube}`} frameBorder="0" allowFullScreen={true}></iframe>
        </div>
      }

      <div className={styles.text}>
        {course.text &&
          <Renderer source={course.text} />
        }
      </div>
    </div>
  )
}
