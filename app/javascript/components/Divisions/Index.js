import React from 'react'
import PropTypes from 'prop-types'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { useI18n } from '../I18n'
import { Title } from '../Pages'

import styles from './Index.module.css'
import pages from '../Pages.module.css'
import list from '../Courses/Index/Courses.module.css'

Index.propTypes = {
  node: PropTypes.object,
  location: PropTypes.object,
  divisions: PropTypes.array,
  courses: PropTypes.array,
  locale: PropTypes.string
}

export default function Index ({ node, location, divisions, locale, courses }) {
  const I18n = useI18n(locale)

  const levels = {
    ba: 'Бакалавриат',
    sp: 'Специалитет',
    ma: 'Магистратура'
  }

  return (
    <div className={pages.root}>
      {node &&
        <Title
          h1={node.title}
          loaf={[
            {
              mlid: 999,
              path: location.pathname,
              title: node.title
            }
          ]}
        />
      }

      <HelmetProvider>
        <Helmet>
          <title>Мероприятия</title>
        </Helmet>
      </HelmetProvider>

      <div className={pages.container}>
        {divisions &&
          divisions.map(division =>
            <>
              <div className={styles.division}>
                <div className={styles.image} />
                <div className={styles.intro}>
                  <div className={styles.title}>{division.title}</div>
                  <div className={styles.desc}>{division.desc}</div>
                </div>

                <div className={list.courses}>
                  {division.division_courses.map(course =>
                    <a key={course.nid} href={course.path} className={list.course}>
                      <div className={list.direction}>
                        {course.title}
                      </div>

                      <div className={list.title}>
                        {course.spec || course.title}
                      </div>

                      <div className={list.level}>
                        {levels[course.level]}
                      </div>

                      {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
                        <div key={i} className={list.meta}>
                          <div className={list.form}>
                            {I18n.t(`courses.forms.form_${i}`)}
                          </div>

                          {/* <div>
                            {course[`places_${i + 1}`] > 0 ? course[`places_${i + 1}`] : 'нет'} бюджетных мест
                          </div> */}

                          <div className={list.time}>
                            {I18n.t('courses.times', { count: I18n.toNumber(course[`time_${i}`], { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
                          </div>

                          {/* {course[`price_${i + 1}`] !== null &&
                            <div>
                              {course[`price_${i + 1}`]} руб. в года стоимость обучения
                            </div>
                          } */}
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
            </>

          )
        }
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
