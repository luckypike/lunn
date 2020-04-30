import React from 'react'
import PropTypes from 'prop-types'

import styles from './Pay.module.css'

Pay.propTypes = {
  invoice: PropTypes.object
}

export default function Pay ({ invoice }) {
  return (
    <div>
      <form method="post" action="https://lu.server.paykeeper.ru/create/">
        <input type="hidden" name="sum" value={invoice.amount} />
        <input type="hidden" name="orderid" value={invoice.number} />
        <input type="hidden" name="clientid" value={invoice.name} />
        <input type="hidden" name="service_name" value={invoice.desc} />
        <input type="hidden" name="user_result_callback" value={`https://lunn.ru/invoices/${invoice.uuid}`} />

        <button className={styles.pay}>Оплатить</button>
      </form>
    </div>
  )
}
