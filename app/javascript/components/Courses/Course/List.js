import React from 'react'
import PropTypes from 'prop-types'

import Item from './Item'

import styles from './List.module.css'

List.propTypes = {
  courses: PropTypes.array,
  locale: PropTypes.string
}

export default function List ({ courses, locale }) {
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
    <div className={styles.root}>
      {courses.sort(sortCourses).map(course =>
        <Item key={course.nid} course={course} locale={locale} />
      )}
    </div>
  )
}
