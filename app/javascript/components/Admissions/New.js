import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { navigate } from '@reach/router'

import Title from '../Title'
import { useI18n } from '../I18n'

import styles from './New.module.css'
import pages from '../Pages.module.css'

New.propTypes = {
  user: PropTypes.object,
  locale: PropTypes.string
}

export default function New ({ locale }) {
  const I18n = useI18n(locale)

  const handleCreate = async () => {
    const { data } = await axios.post('/admissions.json', { admission: { q: '' } })

    navigate(`/admissions/${data.id}/edit`)
  }

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={I18n.t('admissions.new.title')}
      />

      <div className={pages.container}>
        <div className={styles.root}>
          <button onClick={handleCreate}>
            Начать заполнение
          </button>
        </div>
      </div>
    </div>
  )
}
