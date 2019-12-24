import React from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'

import { Title } from '../Pages'
import Courses from './Index/Courses'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Show.propTypes = {
  node: PropTypes.object,
  courses: PropTypes.array,
  loaf: PropTypes.array,
  docs: PropTypes.array
}

export default function Show ({ node, courses, docs, loaf }) {
  return (
    <div className={pages.container}>
      <Title
        h1={node.title}
        loaf={loaf}
      />

      {courses.length > 0 &&
        <div className={styles.courses}>
          <Courses
            courses={courses}
          />
        </div>
      }
    </div>
  )
}
