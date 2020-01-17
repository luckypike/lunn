import React from 'react'
import PropTypes from 'prop-types'

import { Title } from '../Pages'
import { useI18n } from '../I18n'

import Renderer from '../Draft'

import pages from '../Pages.module.css'
import styles from './Show.module.css'

Show.propTypes = {
  node: PropTypes.object,
  loaf: PropTypes.array,
  course: PropTypes.object,
  locale: PropTypes.string
}

export default function Show ({ node, loaf, course, locale }) {
  const I18n = useI18n(locale)

  return (
    <div className={pages.container}>
      <Title
        h1={course.spec || course.title}
        loaf={[
          ...loaf,
          {
            mlid: 999,
            path: node.path,
            title: node.title
          }
        ]}
      />

      <div className={styles.level}>
        {I18n.t(`courses.levels.${course.level}`)}
      </div>

      {/* <Form
        course={course}
        locale={locale}
      /> */}

      <div className={styles.root}>
        <div className={styles.course}>
          <div className={styles.forms}>
            <div className={styles.title}>
              Форма обучения
            </div>

            {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
              <div key={i}>
                {I18n.t(`courses.forms.form_${i}`)}: {I18n.t('courses.times', { count: I18n.toNumber(course[`time_${i}`], { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
              </div>
            )}
          </div>

          <div className={styles.places}>
            <div className={styles.title}>
              Бюджетные места в 2020-2021 уч.г.
            </div>

            {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
              <div key={i}>
                {I18n.t(`courses.forms.form_${i}`)}: {course[`places_${i}`] > 0 ? course[`places_${i}`] : 'нет' }
              </div>
            )}
          </div>

          <div className={styles.prices}>
            <div className={styles.title}>
              Стоимость обучения в 2019-2020 уч.г.
            </div>

            {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
              <div key={i}>
                {I18n.t(`courses.forms.form_${i}`)}: {course[`price_${i}`]} ₽
              </div>
            )}
          </div>

          <div className={styles.exams}>
            <div className={styles.title}>
              <div>Вступительные испытания</div>
              <div className={styles.ball}>минимальный балл</div>
            </div>

            <div className={styles.subs}>
              <div className={styles.sub}>
                <div className={styles.subject}>Русский язык</div>
                <div className={styles.grey}>60 баллов</div>
              </div>

              <div className={styles.sub}>
                <div className={styles.subject}>Литература</div>
                <div className={styles.grey}>60 баллов</div>
              </div>

              <div className={styles.sub}>
                <div className={styles.subject}>Иностранный язык</div>
                <div className={styles.grey}>60 баллов</div>
              </div>
            </div>
          </div>

          <div className={styles.button}>
            Приёмная комиссия
          </div>
        </div>

        {course.youtube &&
          <div className={styles.youtube}>
            <iframe src={`https://www.youtube.com/embed/${course.youtube}`} frameBorder="0" allowFullScreen={true}></iframe>
          </div>
        }

        {course.text &&
          <div className={styles.text}>
            <Renderer source={course.text} />
          </div>
        }
      </div>
    </div>
  )
}
