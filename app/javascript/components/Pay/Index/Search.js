import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'

import Pay from '../Pay'

import { useForm } from '../../Form'

import styles from './Search.module.css'
import form from '../../FormStatic.module.css'
import buttons from '../../Buttons.module.css'

export default function Search () {
  const {
    values,
    // setValues,
    // saved,
    // setSaved,
    handleInputChange,
    // errors,
    pending,
    // setErrors,
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
      <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
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
                Фамилия
              </div>

              <input
                type="text"
                value={values.last_name}
                name="last_name"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className={form.submit}>
          {/* <input type="submit" value={pending ? 'Ищем...' : 'Найти'} className={buttons.main} /> */}
          <input
            type="submit"
            value={pending ? 'Ищем...' : 'Найти'}
            className={classNames(buttons.main, buttons.big, { [buttons.pending]: pending })}
            disabled={pending || (values.last_name === '' || values.contract === '')}
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
              <div className={styles.title}>
                Неоплаченные счета
              </div>
              {invoices.map(invoice =>
                <div className={styles.invoice} key={invoice.id}>
                  {/* href={`/invoices/${invoice.uuid}`} */}
                  <div className={styles.number}>
                    {invoice.number}
                  </div>

                  {invoice.desc &&
                    <div className={styles.desc}>
                      {invoice.desc}
                    </div>
                  }

                  <Pay invoice={invoice} />
                </div>
              )}
            </div>
          }
        </div>
      }
    </div>
  )
}
