import React from 'react'
import PropTypes from 'prop-types'
import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
import { useI18n } from '../I18n'

import pages from '../Pages.module.css'
import styles from './Show.module.css'

Show.propTypes = {
  invoice: PropTypes.object,
  locale: PropTypes.string
}

export default function Show ({ locale, invoice: data }) {
  const invoice = deserialize(data)
  const I18n = useI18n(locale)

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={I18n.t('pay.index.title')}
        desc={invoice.contract}
      />

      <div className={pages.container}>
        <div className={styles.root}>
          <h2>
            Счет № {invoice.number}
          </h2>

          <p>
            {invoice.first_name} {invoice.middle_name} {invoice.last_name[0]}.
          </p>
        </div>
      </div>
    </div>
  )
}
