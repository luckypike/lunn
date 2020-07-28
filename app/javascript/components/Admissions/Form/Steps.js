import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import axios from 'axios'

import { useI18n } from '../../I18n'

import styles from './Steps.module.css'

Steps.propTypes = {
  admission: PropTypes.object,
  _fetch: PropTypes.func,
  locale: PropTypes.string
}

export default function Steps ({ admission, locale, _fetch }) {
  const I18n = useI18n(locale)

  if (!admission.states) return null

  const steps = new Map(Object.entries(admission.states))

  const handleClick = async (e, step, active) => {
    e.preventDefault()

    if (active && admission.status !== 'processing') {
      await axios.post(
        `/admissions/${admission.id}/jump.json`,
        { admission: { state: step } }
      ).then(res => {
        _fetch()
      }).catch(_error => {
        // setErrors(error.response.data)
      })
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.steps}>
        {[...steps.keys()].map((key, _) =>
          <React.Fragment key={_}>
            <div
              className={classNames(styles.step, { [styles.processing]: admission.status === 'processing', [styles.complete]: _ + 1 < steps.get(admission.state), [styles.current]: (key === admission.state && admission.status !== 'processing') })}
              onClick={e => handleClick(e, key, _ + 1 < steps.get(admission.state))}
            >
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
