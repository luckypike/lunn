import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useI18n } from '../../I18n'

import styles from './Item.module.css'

Item.propTypes = {
  course: PropTypes.object,
  locale: PropTypes.string
}

export default function Item ({ course, locale }) {
  const I18n = useI18n(locale)

  return (
    <a key={course.nid} href={course.url} className={styles.root}>
      <div className={styles.direction}>
        {course.title}
      </div>

      <div className={styles.title}>
        {course.spec || course.title}
      </div>

      {[5362, 5364, 5370, 5371, 5282, 5301, 5391, 5408, 5406].includes(parseInt(course.id)) &&
        <div className={styles.excellent} />
      }

      {course.desc &&
        <div className={styles.desc}>
          {course.desc}
        </div>
      }

      <div className={styles.levels}>
        {[1, 2, 3].map(i =>
          <Level key={i} i={i} time={course[`time_${i}`]} locale={locale} />
        )}
      </div>

      {course.ege.length > 0 &&
        <div className={styles.ege}>
          <p className={styles.eget}>
            Предметы ЕГЭ
          </p>
          <ul className={styles.es}>
            {course.ege.map(e =>
              <li key={e} className={styles.e}>
                {I18n.t(`courses.ege.${e}`) || e}
              </li>
            )}
          </ul>
        </div>
      }

      {course.course_exams.length > 0 &&
        <div className={styles.exams}>
          <p className={styles.eget}>
            Вступительные испытания
          </p>
          <ul className={styles.items}>
            {course.course_exams.map(e =>
              <li key={e} className={styles.item}>
                {I18n.t(`courses.exams.${e}`) || e}
              </li>
            )}
          </ul>
        </div>
      }

      <div className={styles.more}>
        Подробнее

        <svg viewBox="0 0 36 36" fill="none" stroke="black">
          <circle cx="18" cy="18" r="17" />

          <path
            d="M21 12L27 18L21 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M9 18H27"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  )
}

Level.propTypes = {
  i: PropTypes.number,
  time: PropTypes.number,
  locale: PropTypes.string
}

function Level ({ time, i, locale }) {
  const I18n = useI18n(locale)
  const active = time !== null

  return (
    <div className={classNames(styles.level, { [styles.inactive]: !active })}>
      <svg viewBox="0 0 25 24" fill="none" className={styles.check}>
        <g className={styles.nope}>
          <path
            className={styles.nope}
            d="M7.59961 12H16.3996"
            stroke="#dbddde"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z"
            stroke="#DBDDDE"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        <g className={styles.ok}>
          <path
            d="M22.9164 10.988V12.011C22.9164 18.083 18.0062 23.011 11.9453 23C5.89528 23 0.996094 18.072 0.996094 11.989C0.996094 5.917 5.90624 1 11.9672 1C13.5016 1 15.0251 1.33 16.417 1.957"
            stroke="#2F53EB"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M23.9127 2.19263L11.9562 14.1926L8.69531 10.9199"
            stroke="#2f53eb"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <div className={styles.form}>
        {I18n.t(`courses.forms.form_${i}`)}
      </div>

      {active &&
        <div className={styles.time}>
          {I18n.t('courses.times', { count: I18n.toNumber(time, { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
        </div>
      }
    </div>
  )
}
