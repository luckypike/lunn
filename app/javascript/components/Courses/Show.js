import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { deserialize } from 'jsonapi-deserializer'

import { Title } from '../Pages'
import { useI18n } from '../I18n'

import Tutors from '../Pages/Show/Tutors'
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

  return (
    <>
      <div className={pages.container}>
        <Title
          h1={course.spec || course.title}
          loaf={loaf}
          align='left'
        />
      </div>

      <div className={styles.root}>
        <div className={pages.container}>
          <div className={styles.course_intro}>
            <div className={styles.code}>
              <div className={styles.title}>
                Шифр направления подготовки
              </div>

              <div className={styles.item}>
                <div></div>
              </div>
            </div>

            <div className={styles.name}>
              <div className={styles.title}>
                Наименование направления подготовки
              </div>

              <div className={styles.item}>
                <div>
                  {course.title}
                </div>
              </div>
            </div>

            <div className={styles.profile}>
              <div className={styles.title}>
                Наименование профиля подготовки
              </div>

              <div className={styles.item}>
                <div>
                  {course.spec ? course.spec : 'нет'}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className={styles.grey_bg}>
          <div className={pages.container}>
            <div className={styles.course}>
              <div className={styles.forms}>
                <div className={styles.title}>
                  Форма обучения
                </div>

                {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
                  <div key={i} className={styles.item}>
                    {I18n.t(`courses.forms.form_${i}`)}: {I18n.t('courses.times', { count: I18n.toNumber(course[`time_${i}`], { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
                  </div>
                )}
              </div>

              <div className={styles.places}>
                <div className={styles.title}>
                  Бюджетные места
                </div>

                {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
                  <div key={i} className={styles.item}>
                    <div className={styles.form}>
                      {I18n.t(`courses.forms.form_${i}`)}:
                    </div>

                    <div>
                      {course[`places_${i}`] > 0 ? course[`places_${i}`] : 'нет' }
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.prices}>
                <div className={styles.title}>
                  Стоимость обучения в 2019-2020 уч.г.
                </div>

                {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
                  <div key={i} className={styles.item}>
                    <div className={styles.form}>
                      {I18n.t(`courses.forms.form_${i}`)}:
                    </div>

                    {course[`price_${i}`] !== null &&
                      <div>
                        {course[`price_${i}`]} ₽
                      </div>
                    }
                  </div>
                )}
              </div>

              {course.level !== 'ma' &&
                <div className={styles.exams}>
                  <div className={styles.title}>
                    Вступительные испытания минимальный балл
                  </div>

                  <div className={styles.subs}>
                    {course.ege.map(e =>
                      <li key={e} className={styles.sub}>
                        <Ege label={e} />

                        <div className={styles.grey}>
                          <Marks point={e} />
                        </div>
                      </li>
                    )}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <div className={pages.container}>
          <div className={styles.intro}>
            <div className={classNames(styles.button, { [styles.ma]: course.level === 'ma' })}>
              <a href="/abitur/2020" target="_blank" rel="noopener noreferrer">
                Приёмная комиссия
              </a>
            </div>

            <div className={styles.desc}>
              <Renderer source={course.body} />
            </div>
          </div>

          {/*course.youtube &&
            <div className={styles.youtube}>
              <iframe src={`https://www.youtube.com/embed/${course.youtube}`} frameBorder="0" allowFullScreen={true}></iframe>
            </div>
          */}

          {course.text &&
            <div className={styles.text}>
              <Renderer source={course.text} />
            </div>
          }

          {['prospects', 'features', 'disciplines', 'competencies'].filter(s => course[`course_${s}`]).map(section =>
            <div key={section} className={classNames(styles.section, styles[section])}>
              <div className={classNames(styles.image, styles[section])} />

              <div className={styles.desc}>
                <h2>
                  {I18n.t(`courses.sections.${section}`)}
                </h2>

                <Renderer source={course[`course_${section}`]} />
              </div>
            </div>
          )}

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
    </>
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

function Marks ({ point }) {
  const points = {
    foreign: '40 баллов',
    russian: '40 баллов',
    lit: '40 баллов',
    math: '39 баллов',
    history: '40 баллов',
    social: '44 балла'
  }

  return points[point] || point
}
