import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
// import classNames from 'classnames'

import { Title } from '../Pages'
import Courses from './Index/Courses'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Show.propTypes = {
  node: PropTypes.object,
  courses: PropTypes.array,
  loaf: PropTypes.array,
  docs: PropTypes.array,
  locale: PropTypes.string
}

export default function Show ({ node, courses, docs, loaf, locale }) {
  return (
    <div className={pages.container}>
      <Title
        h1={node.title}
        loaf={loaf}
      />

      {courses.length > 0 &&
        <div className={styles.courses}>
          <Router>
            <Courses
              path="/programs"
              courses={courses}
              locale={locale}
            />
          </Router>
        </div>
      }
    </div>
  )
}
