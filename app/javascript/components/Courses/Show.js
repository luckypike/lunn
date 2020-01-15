import React from 'react'
import PropTypes from 'prop-types'

import { Title } from '../Pages'
import Course from './Index/Course'

import pages from '../Pages.module.css'

Show.propTypes = {
  node: PropTypes.object,
  loaf: PropTypes.array,
  course: PropTypes.object
}

export default function Show ({ node, loaf, course }) {
  return (
    <div className={pages.container}>
      <Title
        h1={node.title}
        h2={course.spec}
        loaf={[
          ...loaf,
          {
            mlid: 999,
            path: node.path,
            title: node.title
          }
        ]}
      />

      <Course course={course} />
    </div>
  )
}
