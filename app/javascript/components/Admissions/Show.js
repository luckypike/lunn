import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'

import { Title } from '../Pages'
import Steps from './Form/Steps'
import { useI18n } from '../I18n'

import pages from '../Pages.module.css'
import styles from './Show.module.css'
import buttons from '../Buttons2.module.css'

Show.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string
}

export default function Show ({ id, locale }) {
  const I18n = useI18n(locale)

  const [admission, setAdmission] = useState()

  useEffect(() => {
    _fetch()
  }, [id])

  const _fetch = async () => {
    const { data } = await axios.get(`/admissions/${id}.json`)

    setAdmission(data.admission)
  }

  const handleAdmissionConfirm = async () => {
    console.log('click')
    const { data } = await axios.post(
      `/admissions/${id}/confirm.json`
    ).then(res => {
      _fetch()
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  if (!admission) return null

  return (
    <div className={pages.beta}>
      <Title
        h1={admission && I18n.t('admissions.edit.title', { number: admission.number })}
      />

      {admission &&
        <div className={styles.steps}>
          <div className={pages.container}>
            <Steps admission={admission} locale={locale}/>
          </div>
        </div>
      }

      <div className={pages.container}>
        <div className={styles.root}>
          <div className={styles.form}>
            <div className={styles.stepTitle}>
              <h2>{I18n.t('admissions.steps.one')}</h2>
            </div>

            {admission.state === 'done' && admission.status === 'filling' &&
              <button className={classNames(buttons.main, buttons.big)} onClick={() => handleAdmissionConfirm()}>Отправить</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
