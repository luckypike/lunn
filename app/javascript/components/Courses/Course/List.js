import React from 'react'
import PropTypes from 'prop-types'

import Item from './Item'

import styles from './List.module.css'

List.propTypes = {
  courses: PropTypes.array,
  locale: PropTypes.string
}

export default function List ({ courses, locale }) {
  return (
    <div className={styles.root}>
      {courses.map(course =>
        <Item key={course.nid} course={course} locale={locale} />
      )}
    </div>
  )
}
