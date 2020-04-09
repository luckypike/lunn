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
    const c = a.title.trim().localeCompare(b.title.trim(), 'ru', { sensitivity: 'base' })

    if (c !== 0) {
      return c
    } else {
      return (a.spec || a.title).trim().localeCompare((b.spec || b.title).trim(), 'ru', { sensitivity: 'base' })
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
