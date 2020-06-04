import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { I18nContext } from '../../I18n'

import styles from './Details.module.css'

Details.propTypes = {
  course: PropTypes.object.isRequired
}

export default function Details ({ course }) {
  const I18n = useContext(I18nContext)

  return (
    <div className={styles.root}>
      <div className={styles.forms}>
        <div className={styles.title}>
          Форма обучения
        </div>

        {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
          <div key={i} className={styles.item}>
            {I18n.t(`courses.forms.form_${i}`)}: {I18n.t('courses.times', { count: I18n.toNumber(course[`time_${i}`], { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
          </div>
        )}
      </div>

      <div className={styles.places}>
        <div className={styles.title}>
          Бюджетные места
        </div>

        {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
          <div key={i} className={styles.item}>
            <div className={styles.form}>
              {I18n.t(`courses.forms.form_${i}`)}:
            </div>

            <div>
              {course[`places_${i}`] > 0 ? course[`places_${i}`] : 'нет' }
            </div>
          </div>
        )}
      </div>

      <div className={styles.prices}>
        <div className={styles.title}>
          Стоимость обучения в 2019-2020 уч.г.
        </div>

        {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
          <div key={i} className={styles.item}>
            <div className={styles.form}>
              {I18n.t(`courses.forms.form_${i}`)}:
            </div>

            {course[`price_${i}`] !== null &&
              <div>
                {course[`price_${i}`]} ₽
              </div>
            }
          </div>
        )}
      </div>

      {course.level !== 'ma' &&
        <div className={styles.exams}>
          <div className={styles.title}>
            Вступительные испытания минимальный балл
          </div>

          <div className={styles.subs}>
            {course.ege.map(e =>
              <li key={e} className={styles.sub}>
                <Ege label={e} />

                <div className={styles.grey}>
                  <Marks point={e} />
                </div>
              </li>
            )}
          </div>
        </div>
      }
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

function Marks ({ point }) {
  const points = {
    foreign: '40 баллов',
    russian: '40 баллов',
    lit: '40 баллов',
    math: '39 баллов',
    history: '40 баллов',
    social: '44 балла'
  }

  return points[point] || point
}
