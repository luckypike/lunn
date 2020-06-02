import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { I18nContext } from '../../I18n'
import Renderer from '../../Renderer'

import styles from './Disciplines.module.css'

Disciplines.propTypes = {
  course: PropTypes.object.isRequired
}

export default function Disciplines ({ course }) {
  const I18n = useContext(I18nContext)

  return (
    <div className={styles.root}>
      <div className={styles.desc}>
        <h2>
          {I18n.t('courses.sections.disciplines')}
        </h2>

        <Renderer source={course.course_disciplines} />
      </div>
    </div>
  )
}
