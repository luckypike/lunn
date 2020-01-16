import React from 'react'
import PropTypes from 'prop-types'

import { Title } from '../Pages'
import Course from './Index/Course'
import Form from './Index/Form'

import pages from '../Pages.module.css'

Show.propTypes = {
  node: PropTypes.object,
  loaf: PropTypes.array,
  course: PropTypes.object,
  locale: PropTypes.string
}

export default function Show ({ node, loaf, course, locale }) {
  return (
    <div className={pages.container}>
      <Title
        h1={course.spec}
        h2={node.title}
        loaf={[
          ...loaf,
          {
            mlid: 999,
            path: node.path,
            title: node.title
          }
        ]}
      />

      <Form
        course={course}
        locale={locale}
      />

      <Course
        course={course}
        locale={locale}
      />
    </div>
  )
}
