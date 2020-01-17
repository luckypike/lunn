import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '../../I18n'

import styles from './Form.module.css'

Form.propTypes = {
  course: PropTypes.object,
  locale: PropTypes.string
}

export default function Form ({ course, locale }) {
  const I18n = useI18n(locale)

  return (
    <div className={styles.root}>
      <div className={styles.course}>
        <div className={styles.form_1}>
          <div className={styles.items}>
            <div className={styles.item}>
              Форма обучения
            </div>

            <div className={styles.item}>
              <div>Бюджетные места</div>
              <div className={styles.small}>в 2020-2021 уч.г.</div>
            </div>

            <div className={styles.item}>
              <div>Стоимость обучения</div>
              <div className={styles.small}>в 2019-2020 уч.г.</div>
            </div>
          </div>

          {[...Array(3)].map((_, i) =>
            <>
              {course[`places_${i + 1}`] !== null && course[`time_${i + 1}`] !== null &&
                <>
                  <div className={styles.items}>
                    <div>
                      {I18n.t(`courses.forms.form_${i + 1}`)}: {I18n.t('courses.times', { count: I18n.toNumber(course[`time_${i + 1}`], { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
                    </div>

                    <div>
                      {course[`places_${i + 1}`] > 0 ? course[`places_${i + 1}`] : 'нет' }
                    </div>

                    <div>
                      {course[`price_${i + 1}`] !== null &&
                        <div>
                          {course[`price_${i + 1}`]} ₽
                        </div>
                      }
                    </div>
                  </div>
                </>
              }
            </>
          )}
        </div>

        <div className={styles.form_2}>
          <div>
            <div className={styles.ball}>
              <div>Вступительные испытания</div>
              <div className={styles.small}>минимальный балл</div>
            </div>

            <div className={styles.sub}>
              Русский язык <span className={styles.grey}>60 баллов</span>
            </div>

            <div className={styles.sub}>
              Литература <span className={styles.grey}>60 баллов</span>
            </div>

            <div className={styles.sub}>
              Иностранный язык <span className={styles.grey}>60 баллов</span>
            </div>
          </div>

          <div className={styles.button}>
            Приёмная комиссия
          </div>
        </div>
      </div>
    </div>
  )
}
