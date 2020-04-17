import React from 'react'
import PropTypes from 'prop-types'

import pages from '../Pages.module.css'
import styles from './Index.module.css'

Index.propTypes = {
  invoices: PropTypes.array
}

export default function Index ({ invoices }) {
  return (
    <div className={pages.root}>
      <div className={pages.container}>
        {invoices &&
          invoices.map(invoice =>
            <div key={invoice.id} className={styles.invoice}>
              <div className={styles.last_name}>{invoice.last_name}</div>
              <div className={styles.first_name}>{invoice.first_name}</div>
              <div className={styles.contract}>{invoice.contract}</div>
              <div className={styles.state}>{invoice.state}</div>
            </div>
          )
        }
      </div>
    </div>
  )
}
