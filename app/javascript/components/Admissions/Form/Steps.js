import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useI18n } from '../../I18n'

import styles from './Steps.module.css'

Steps.propTypes = {
  admission: PropTypes.object,
  locale: PropTypes.string
}

export default function Steps ({ admission, locale }) {
  const I18n = useI18n(locale)

  if (!admission.states) return null

  const steps = new Map(Object.entries(admission.states))

  return (
    <div className={styles.root}>
      <div className={styles.steps}>
        {[...steps.keys()].map((key, _) =>
          <React.Fragment key={_}>
            <div className={classNames(styles.step, { [styles.complete]: _ + 1 < steps.get(admission.state), [styles.current]: (key === admission.state && admission.status !== 'processing') })}>
              <div className={styles.digit}>{_ + 1}</div>
              <div className={styles.title}>{I18n.t(`admissions.steps_short.${key}`)}</div>
            </div>

            { _ + 1 < steps.size &&
              <div className={styles.sp} />
            }
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
