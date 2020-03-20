import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Courses from '../Course/List'

import styles from './Division.module.css'
import pages from '../../Pages.module.css'

Division.propTypes = {
  division: PropTypes.object,
  locale: PropTypes.string,
  level: PropTypes.string
}

export default function Division ({ level, division, locale }) {
  const courses = division.division_courses.filter(c => c.level === level)

  if (courses.length < 1) return null

  return (
    <div className={classNames(styles.division, styles[`color-${division.nid}`])}>
      <div className={pages.container}>
        <div className={styles.title}>
          {division.title}
        </div>

        <div className={styles.courses}>
          <Courses courses={courses} locale={locale} />
        </div>
      </div>
    </div>
  )
}
