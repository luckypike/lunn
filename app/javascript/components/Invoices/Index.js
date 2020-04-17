import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import pages from '../Pages.module.css'
import styles from './Index.module.css'

Index.propTypes = {
  invoices: PropTypes.array,
}

export default function Index ({ invoices }) {
  const _handleCreate = async () => {
    const res = await axios.post('/invoices',
      { invoice: {
        first_name: 'first_name',
        last_name: 'last_name',
        contract: '000-111'
      }, security: true }
    )
  }

  const _handlePay = async (id) => {
    const res = await axios.post(`/invoices/${id}/pay`)
  }

  return (
    <div className={pages.root}>
      <div className={pages.container}>
        {invoices &&
          invoices.map(invoice =>
            <div className={styles.invoice}>
              <div className={styles.last_name}>{invoice.last_name}</div>
              <div className={styles.first_name}>{invoice.first_name}</div>
              <div className={styles.contract}>{invoice.contract}</div>
              <div className={styles.state}>{invoice.state}</div>
              { invoice.state === 'active' &&
                <div className={styles.tt} onClick={() => _handlePay(invoice.id)}>Оплатить</div>
              }
            </div>
          )
        }
        <div onClick={() => _handleCreate()}>
          Add
        </div>
      </div>
    </div>
  )
}
