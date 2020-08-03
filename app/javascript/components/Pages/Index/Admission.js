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
              Приёмная кампания 2020 года
            </h2>

            {start > 0 &&
              <p>
                {I18n.t('pages.index.admission.start', { count: start })}
              </p>
            }
          </div>

          <div className={styles.action}>
            <span className={styles.button}>
              Узнайте больше о поступлении
            </span>
          </div>
        </div>
      </div>
    </a>

  )
}
