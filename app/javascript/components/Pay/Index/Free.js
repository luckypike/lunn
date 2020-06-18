import React from 'react'
import PropTypes from 'prop-types'
// import axios from 'axios'
import classNames from 'classnames'

import { useForm } from '../../Form'

import styles from './Free.module.css'
import form from '../../FormStatic.module.css'
import buttons from '../../Buttons.module.css'

Free.propTypes = {
  gateway: PropTypes.string,
  returnUrl: PropTypes.string
}

export default function Free ({ gateway, returnUrl }) {
  const {
    values,
    handleInputChange
  } = useForm({ contract: '', name: '', phone: '', amount: '' })

  const canSubmit = () => {
    return values.contract !== '' && values.name !== '' && values.phone !== '' && values.amount !== ''
  }

  const handleSubmit = e => {
    if (canSubmit()) {

    } else {
      e.preventDefault()
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <p>
          Для оплаты заполните необходимые поля и нажмите на кнопку «Оплатить», после этого вы будете перенаправлены на защищенную платежную страницу «Газпромбанк» (Акционерное общество), где будет необходимо ввести данные вашей пластиковой карты.
        </p>

        <p>
          В случае успешной оплаты вы получите от сайта уведомление о том, что оплата проведена.
        </p>
      </div>

      <div className={styles.form}>
        <div className={form.item}>
          <div className={form.input}>
            <label>
              <div className={form.label}>
                Фамилия, имя и отчество
              </div>

              <input
                type="text"
                value={values.name}
                name="name"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className={form.item}>
          <div className={form.input}>
            <label>
              <div className={form.label}>
                Телефон
              </div>

              <input
                type="text"
                value={values.phone}
                name="phone"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className={form.item}>
          <div className={form.input}>
            <label>
              <div className={form.label}>
                Номер договора
              </div>

              <input
                type="text"
                value={values.contract}
                name="contract"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className={form.item}>
          <div className={form.input}>
            <label>
              <div className={form.label}>
                Сумма платежа
              </div>

              <input
                type="text"
                value={values.amount}
                name="amount"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
      </div>

      <form method="post" action={gateway} onSubmit={handleSubmit}>
        <input type="hidden" name="sum" value={values.amount} />
        <input type="hidden" name="orderid" value={values.contract} />
        <input type="hidden" name="clientid" value={values.name} />
        <input type="hidden" name="client_phone" value={values.phone} />
        <input type="hidden" name="user_result_callback" value={returnUrl} />

        <input
          type="submit"
          value="Оплатить"
          className={classNames(buttons.main, buttons.big)}
          disabled={!canSubmit()}
        />
      </form>
    </div>
  )
}
