import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
import { I18nContext, useI18n } from '../I18n'

import Tutors from '../Pages/Show/Tutors'
import Intro from './Show/Intro'
import Prospects from './Show/Prospects'
import Features from './Show/Features'
import Disciplines from './Show/Disciplines'
import Competencies from './Show/Competencies'
import Short from './Show/Short'
import Details from './Show/Details'
import Renderer from '../Renderer'

import pages from '../Pages.module.css'
import styles from './Show.module.css'

Show.propTypes = {
  node: PropTypes.object,
  loaf: PropTypes.array,
  course: PropTypes.object,
  locale: PropTypes.string
}

export default function Show ({ node, loaf, course: data, locale }) {
  const I18n = useI18n(locale)
  const course = deserialize(data)

  const hasDetails = () => ['prospects', 'features', 'disciplines', 'competencies'].filter(s => course[`course_${s}`]).length > 0

  // console.log(course)

  return (
    <I18nContext.Provider value={I18n}>
      <div className={pages.beta}>
        <Title
          beta
          h1={course.spec || course.title}
          loaf={loaf}
          className={styles[`color-${course.division.nid}`]}
        />

        <div className={styles.root}>
          <div className={classNames(styles.short, styles[`color-${course.division.nid}`])}>
            <div className={pages.container}>
              <Short course={course} />
            </div>
          </div>

          <div className={styles.details}>
            <div className={pages.container}>
              <Details course={course} />
            </div>
          </div>

          <div className={pages.container}>
            <div className={styles.intro}>
              <Intro course={course} />
            </div>

            {course.text && !hasDetails() &&
              <div className={styles.text}>
                <Renderer source={course.text} />
              </div>
            }

            {hasDetails() &&
              <>
                <div className={styles.prospects}>
                  <Prospects
                    course={course}
                  />
                </div>

                <div className={styles.features}>
                  <Features
                    course={course}
                  />
                </div>

                <div className={styles.disciplines}>
                  <Disciplines
                    course={course}
                  />
                </div>

                <div className={styles.competencies}>
                  <Competencies
                    course={course}
                  />
                </div>

              </>
            }

            {course.tutors && course.tutors.length > 0 &&
              <div className={styles.teachers}>
                <h2>
                  Преподаватели программы
                </h2>

                <Tutors tutors={course.tutors} />
              </div>
            }
          </div>
        </div>
      </div>
    </I18nContext.Provider>
  )
}
