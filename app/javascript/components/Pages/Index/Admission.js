import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { I18nContext } from '../../I18n'

import styles from './Admission.module.css'

Admission.propTypes = {
  start: PropTypes.number
}

export default function Admission ({ start }) {
  const I18n = useContext(I18nContext)

  return (
    <a className={styles.a} href="/abitur/2020">
      <div className={styles.container}>
        <div className={styles.root}>
          <div className={styles.title}>
            <h2>
              Приемная кампания 2020 года
            </h2>

            {start > 0 &&
              <p>
                До начала осталось {I18n.t('index.admission.start', { count: start })}
              </p>
            }
          </div>

          <div className={styles.action}>
            <span className={styles.button}>
              Узнайте больше о поступлении
            </span>

            <div className={styles.better_call_saul}>
              или позвоните по +7 (831) 416-61-41
            </div>
          </div>
        </div>
      </div>
    </a>

  )
}
