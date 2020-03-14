import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '../I18n'
import { Title } from '../Pages'

import styles from './Ugsn.module.css'
import pages from '../Pages.module.css'
import list from './Index/Courses.module.css'

Index.propTypes = {
  node: PropTypes.object,
  ugsns: PropTypes.array,
  loaf: PropTypes.array,
  locale: PropTypes.string
}

export default function Index ({ node, loaf, ugsns, locale }) {
  const I18n = useI18n(locale)

  const levels = {
    ba: 'Бакалавриат',
    sp: 'Специалитет',
    ma: 'Магистратура'
  }

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
    <div className={pages.root}>
      {node &&
        <Title
          h1={node.title}
          loaf={loaf}
        />
      }

      <div className={pages.container}>
        {ugsns && ugsns.filter(d => d.ugsn_courses.length > 0).map(ugsn =>
          <div className={styles.ugsn} key={ugsn.nid}>
            <div className={styles.intro}>
              <div className={styles.title}>
                {ugsn.title}
              </div>

              <div className={styles.desc} />
            </div>

            <div className={list.courses}>
              {ugsn.ugsn_courses.sort(sortCourses).map(course =>
                <a key={course.nid} href={course.path} className={list.course}>
                  <div className={list.direction}>
                    {course.title}
                  </div>

                  <div className={list.title}>
                    {course.spec || course.title}
                  </div>

                  {course.desc &&
                    <div className={list.desc}>
                      {course.desc}
                    </div>
                  }

                  <div className={list.level}>
                    {levels[course.level]}
                  </div>

                  {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
                    <div key={i} className={list.meta}>
                      <div className={list.form}>
                        {I18n.t(`courses.forms.form_${i}`)}
                      </div>

                      <div className={list.time}>
                        {I18n.t('courses.times', { count: I18n.toNumber(course[`time_${i}`], { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
                      </div>
                    </div>
                  )}

                  {course.level !== 'ma' &&
                    <div className={list.ege}>
                      <p className={list.eget}>
                        Предметы ЕГЭ
                      </p>
                      <ul className={list.es}>
                        {course.ege.map(e =>
                          <li key={e} className={list.e}>
                            <Ege label={e} />
                          </li>
                        )}
                      </ul>
                    </div>
                  }
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Ege ({ label }) {
  const labels = {
    foreign: 'Иностранный язык',
    russian: 'Русский язык',
    lit: 'Литература',
    math: 'Математика',
    history: 'История',
    social: 'Обществознание'
  }

  return labels[label] || label
}
