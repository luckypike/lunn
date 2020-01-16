import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useI18n } from '../../I18n'

import Renderer from '../../Draft'

import styles from './Course.module.css'

Course.propTypes = {
  course: PropTypes.object,
  locale: PropTypes.string
}

export default function Course ({ course, locale }) {
  const [active, setActive] = useState(1)
  const I18n = useI18n(locale)

  const openTab = e => setActive(+e.target.dataset.index)

  const levels = {
    ba: 'Бакалавриат',
    sp: 'Специалитет',
    ma: 'Магистратура'
  }

  return (
    <div className={styles.root}>
      <div className={styles.level}>
        {levels[course.level]}
      </div>

      <div className={styles.course}>
        <div className={styles.tabs}>
          {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
            <div key={i} data-index={i} onClick={openTab} className={classNames(styles.tab, { [styles.active]: i === active })}>
              {I18n.t(`courses.forms.form_${i}`)}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div className={classNames(styles.item, styles.form)}>
            <div className={styles.title}>
              Форма обучения
            </div>

            <div>
              {I18n.t(`courses.forms.form_${active}`)}
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>
              Срок обучения
            </div>

            <div>
              {I18n.t('courses.times', { count: I18n.toNumber(course[`time_${active}`], { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>
              <div>
                Бюджетные места
              </div>

              <div className={styles.small}>
                в 2020-2021 уч.г.
              </div>
            </div>

            <div>
              {course[`places_${active}`] > 0 ? course[`places_${active}`] : 'нет' }
            </div>
          </div>

          {course[`price_${active}`] !== null &&
            <div className={styles.item}>
              <div className={styles.title}>
                <div>
                  Стоимость обучения
                </div>

                <div className={styles.small}>
                  в 2019-2020 уч.г.
                </div>
              </div>

              <div>
                {course[`price_${active}`]} ₽
              </div>
            </div>
          }

          <div className={styles.item}>
            <div className={styles.title}>
              <div>Вступительные испытания</div>
              <div className={styles.small}>Минимальный балл</div>
            </div>

            <div className={styles.subs}>
              <div className={styles.sub}>
                <div>Русский язык</div>
                <div className={styles.small}>60 баллов</div>
              </div>

              <div className={styles.sub}>
                <div>Иностранный язык</div>
                <div className={styles.small}>60 баллов</div>
              </div>

              <div className={styles.sub}>
                <div>Литература</div>
                <div className={styles.small}>60 баллов</div>
              </div>
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
  )
}
