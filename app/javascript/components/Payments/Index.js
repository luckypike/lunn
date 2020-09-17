import React from 'react'
import PropTypes from 'prop-types'
import useSWR from 'swr'
import axios from 'axios'

import Title from '../Title'
import { useI18n } from '../I18n'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  locale: PropTypes.string
}

export default function Index ({ locale }) {
  const I18n = useI18n(locale)

  const { data } = useSWR('/payments.json', url => axios.get(url).then(res => res.data), { revalidateOnFocus: false })

  const amountToRub = value => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value)
  }

  return (
    <div className={pages.beta}>
      <Title
        h1={I18n.t('payments.index.title')}
      />

      <div className={pages.container}>
        {data &&
          <div className={styles.payments}>
            {data.payments.map(payment =>
              <div key={payment.id} className={styles.payment}>
                <div className={styles.number}>
                  {payment.id}. <strong>{payment.number}</strong> ({payment.created_at}) — {payment.name}
                </div>

                <div className={styles.amount}>
                  Сумма платежа и комиссия: {amountToRub(payment.amount)} ({amountToRub(payment.commission)})
                </div>

                <div className={styles.card}>
                  Карта: {payment.card_number} ({I18n.t(`payments.systems.${payment.system}`)})
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  )
}
