import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'

import { Errors, useForm } from '../../Form'

import styles from './Search.module.css'
import form from '../../FormStatic.module.css'
import buttons from '../../Buttons.module.css'

export default function Search () {
  const {
    values,
    // setValues,
    saved,
    setSaved,
    handleInputChange,
    errors,
    pending,
    setErrors,
    onSubmit,
    cancelToken
  } = useForm({ contract: '', last_name: '' })

  const [invoices, setInvoices] = useState()

  const handleSubmit = async e => {
    const { data } = await axios.get(
      '/invoices/search.json',
      { params: values },
      { cancelToken: cancelToken.current.token }
    )

    setInvoices(data.invoices)
  }

  useEffect(() => {
    return () => {
      cancelToken.current.cancel()
    }
  }, [])

  return (
    <div className={styles.root}>
      <h2>
        Поиск счетов
      </h2>

      <p>
        Укажите ваш номер договора и фамилию чтобы найти ваши счета
      </p>

      {/* <p>
        {JSON.stringify(values)}
      </p> */}

      <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
        <div className={form.item}>
          <div className={form.input}>
            <label>
              <div className={form.label}>
                Номер договора
              </div>

              <input
                value={values.contract}
                name="contract"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        {/* <div className={form.item}>
          <div className={form.input}>
            <label>
              <div className={form.label}>
                Фамилия
              </div>

              <input
                value={values.last_name}
                name="last_name"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div> */}

        <div className={form.submit}>
          {/* <input type="submit" value={pending ? 'Ищем...' : 'Найти'} className={buttons.main} /> */}
          <input
            type="submit"
            value={pending ? 'Ищем...' : 'Найти'}
            className={classNames(buttons.main, buttons.big, { [buttons.pending]: pending })}
            disabled={pending || (/* values.last_name === '' || */ values.contract === '')}
          />
        </div>
      </form>

      {invoices &&
        <div>
          {invoices.length === 0 &&
            <div className={styles.no}>
              Ничего не найдено, возможно счет еще не готов для оплаты или вы допустили ошибку в номере договора или фамилии
            </div>
          }

          {invoices.length > 0 &&
            <div className={styles.invoices}>
              {invoices.map(invoice =>
                <a className={styles.invoice} key={invoice.id} href={`/invoices/${invoice.uuid}`}>
                  <div>
                    {invoice.number}
                  </div>
                </a>
              )}
            </div>
          }
        </div>
      }
    </div>
  )
}
