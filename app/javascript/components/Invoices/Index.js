import React from 'react'
import PropTypes from 'prop-types'
import { deserialize } from 'jsonapi-deserializer'

import pages from '../Pages.module.css'
import styles from './Index.module.css'

Index.propTypes = {
  invoices: PropTypes.object
}

export default function Index ({ invoices: data }) {
  const invoices = deserialize(data)

  return (
    <div className={pages.root}>
      <div className={pages.container}>
        {invoices &&
          invoices.map(invoice =>
            <div key={invoice.id} className={styles.invoice}>
              <div className={styles.last_name}>{invoice.uuid}</div>
              <div className={styles.last_name}>{invoice.last_name}</div>
              <div className={styles.first_name}>{invoice.first_name}</div>
              <div className={styles.contract}>{invoice.amount} ₽</div>
              <div className={styles.contract}>{invoice.number}</div>
              <div className={styles.contract}>{invoice.contract}</div>
              <div className={styles.state}>{invoice.state}</div>
            </div>
          )
        }
      </div>
    </div>
  )
}
