import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { navigate } from '@reach/router'
import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
import { useI18n } from '../I18n'

import styles from './New.module.css'
import pages from '../Pages.module.css'

New.propTypes = {
  user: PropTypes.object,
  locale: PropTypes.string
}

export default function New ({ locale, user: userJSON }) {
  const I18n = useI18n(locale)
  const user = deserialize(userJSON)

  console.log(user)

  const handleCreate = async () => {
    await axios.post('/admissions.json', { admission: { q: '' } })
      .then(({ data }) => {
        navigate(`/admissions/${data.id}/edit`)
      }).catch(_error => {
      })
  }

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={I18n.t('admissions.new.title')}
      />

      <div className={pages.container}>
        <div className={styles.root}>
          {user.confirmed &&
            <button onClick={handleCreate}>
              Начать заполнение
            </button>
          }

          {!user.confirmed &&
            <p>
              Подтвердите вашу почту чтобы подать документы на поступление
            </p>
          }
        </div>
      </div>
    </div>
  )
}
