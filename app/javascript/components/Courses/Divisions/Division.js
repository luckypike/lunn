import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useI18n } from '../../I18n'

import styles from './Divisions.module.css'
import list from '../Index/Courses.module.css'

Division.propTypes = {
  division: PropTypes.object,
  locale: PropTypes.string
}

export default function Division ({ division, locale }) {
  const I18n = useI18n(locale)

  const [filter, setFilter] = useState()

  const handleFilter = (level) => {
    setFilter(level === filter ? '' : level)
  }

  const filterCourse = (item) => {
    if (filter) {
      return item.level === filter
    } else {
      return true
    }
  }

  const sortCourses = (a, b) => {
    if (a.level === b.level) {
      if (a.title.localeCompare(b.title) !== 0) {
        return a.title.localeCompare(b.title)
      } else {
        return (a.spec || a.title).localeCompare((b.spec || b.title))
      }
    } else {
      if (a.level === 'ba' || b.level === 'ma') return -1
      if (b.level === 'ba' || a.level === 'ma') return 1
    }
  }

  return (
    <div className={styles.division}>
      <div className={styles.intro}>
        <div className={styles.title}>
          {division.title}
        </div>

        <div className={styles.desc}>
          {division.desc}
        </div>

        {division.levels &&
          <div className={styles.filter}>
            <div className={styles.items}>
              {division.levels.map(level =>
                <div key={level} className={classNames(styles.item, { [styles.selected]: filter === level })} onClick = {() => handleFilter(level)}>{I18n.t(`courses.levels.${level}`)} {division.division_courses.sort(sortCourses).filter(course => course.level === level).length}</div>
              )}
            </div>
          </div>
        }
      </div>

      <div className={list.courses}>
        {division.division_courses.sort(sortCourses).filter(filterCourse).map(course =>
          <a key={course.nid} href={course.path} className={list.course}>
            <div className={list.direction}>
              {course.title}
            </div>

            <div className={list.title}>
              {course.spec || course.title}
            </div>

            {course.desc &&
              <div className={list.desc}>
                {course.desc}
              </div>
            }

            <div className={list.level}>
              {I18n.t(`courses.levels.${course.level}`)}
            </div>

            {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
              <div key={i} className={list.meta}>
                <div className={list.form}>
                  {I18n.t(`courses.forms.form_${i}`)}
                </div>

                <div className={list.time}>
                  {I18n.t('courses.times', { count: I18n.toNumber(course[`time_${i}`], { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
                </div>
              </div>
            )}

            {course.level !== 'ma' &&
              <div className={list.ege}>
                <p className={list.eget}>
                  Предметы ЕГЭ
                </p>
                <ul className={list.es}>
                  {course.ege.map(e =>
                    <li key={e} className={list.e}>
                      {I18n.t(`courses.filters.${e}`) || e}
                    </li>
                  )}
                </ul>
              </div>
            }
          </a>
        )}
      </div>
    </div>
  )
}
