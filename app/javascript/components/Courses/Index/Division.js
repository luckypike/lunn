import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Courses from '../Course/List'

import styles from './Division.module.css'
import pages from '../../Pages.module.css'

Division.propTypes = {
  division: PropTypes.object,
  locale: PropTypes.string,
  level: PropTypes.string,
  filters: PropTypes.object
}

export default function Division ({ level, division, locale, filters }) {
  const [courses, setCourses] = useState(division.courses.filter(c => c.level === level))

  useEffect(() => {
    if (level === 'ba' || level === 'sp') {
      let newData = division.courses.filter(c => c.level === level)

      if (filters.get('ege') && filters.get('ege').length > 0) {
        const ege = filters.get('ege')
        newData = newData.filter(course => ege.every(v => course.ege.indexOf(v) !== -1))
      }

      if (filters.get('time') && filters.get('time').length > 0) {
        const time = filters.get('time')
        newData = newData.filter(course => time.some(time => course[`time_${time}`] != null))
      }

      setCourses(newData)
    }
  }, [filters])

  if (courses.length < 1) return null

  return (
    <div className={classNames(styles.division, styles[`color-${division.nid}`])}>
      <div className={pages.container}>
        <div className={styles.title}>
          {division.title}
        </div>

        {division.id === '6518' &&
          <div className={styles.as}>
            <p>
              Бюджетные места на 2020-2021 учебный год (по направлениям):
            </p>

            <ul className={styles.ul}>
              <li>
                Языкознание и литературоведение — 1 место (очная форма)
              </li>

              <li>
                Образование и педагогические науки — 1 место (очная форма)
              </li>

              <li>
                Философия, этика и религиоведение — 1 место (очная форма)
              </li>
            </ul>
          </div>
        }

        <div className={styles.courses}>
          <Courses courses={courses} locale={locale} />
        </div>
      </div>
    </div>
  )
}
