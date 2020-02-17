import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'

import { Title } from '../Pages'
import { Errors, useForm } from '../Form'

import styles from './Index.module.css'
import pages from '../Pages.module.css'
import form from '../Form.module.css'
import buttons from '../Buttons.module.css'

Index.propTypes = {
  departments: PropTypes.array,
  destinations: PropTypes.array
}

export default function Index ({ departments, destinations }) {
  const {
    values,
    setValues,
    saved,
    setSaved,
    handleInputChange,
    errors,
    pending,
    setErrors,
    onSubmit,
    cancelToken
  } = useForm({ name: '', email: '', message: '', department_id: '', destination_id: '' })

  const handleSubmit = async e => {
    await axios.post(
      '/send-mail',
      { feedback: values },
      { cancelToken: cancelToken.current.token }
    ).then(res => {
      setSaved(true)
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  useEffect(() => {
    const data = values

    if (data.department_id) {
      data.destination_id = ''
    }

    const des = destinations.filter(i => parseInt(i.department_id) === parseInt(values.department_id))

    if (des.length === 1) {
      data.destination_id = `${des[0].id}`
    }

    setValues(data)
  }, [values.department_id])

  return (
    <div className={pages.container}>
      <Title
        h1="Письмо руководству"
      />

      <div className={styles.root}>
        <div>
          department_id: {values.department_id}
          <br />
          destination_id: {values.destination_id}
        </div>

        <div className={styles.form}>
          {saved &&
            <div className={styles.saved}>
              Ваше обращение отправлено и будут обработано в ближайшее время. Мы свяжемся с вами по указанной электронной почте.
            </div>
          }

          {!saved &&
            <form className={classNames(form.root, styles.els)} onSubmit={onSubmit(handleSubmit)}>
              <div className={classNames(form.el, styles.department)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 4">
                  <path fill="#C4C4C4" d="M0 0h10L5 4 0 0z"/>
                </svg>

                <div className={form.input}>
                  <select name="department_id" onChange={handleInputChange}>
                    <option value="">Направить письмо в</option>
                    {departments.map(department =>
                      <option value={department.id} key={department.id}>
                        {department.title}
                      </option>
                    )}
                  </select>
                </div>
              </div>

              <div className={classNames(form.el, styles.destination, { [styles.disabled]: values.department_id === '' })}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 4">
                  <path fill="#C4C4C4" d="M0 0h10L5 4 0 0z"/>
                </svg>

                <div className={form.input}>
                  <select disabled={values.department_id === ''} name="destination_id" onChange={handleInputChange}>
                    {destinations.filter(i => parseInt(i.department_id) === parseInt(values.department_id)).length !== 1 &&
                      <option value="">Выберите адресата</option>
                    }

                    {destinations.filter(i => parseInt(i.department_id) === parseInt(values.department_id)).map(destination =>
                      <option value={destination.id} key={destination.id}>
                        {destination.title}
                      </option>
                    )}
                  </select>
                </div>

                <Errors errors={errors.destination} />
              </div>

              <div className={classNames(form.el, styles.name)}>
                <div className={form.input}>
                  <input
                    type="text"
                    value={values.name}
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Имя*"
                  />
                </div>

                <Errors errors={errors.name} />
              </div>

              <div className={form.el}>
                <div className={form.input}>
                  <input
                    type="text"
                    value={values.email}
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Почта*"
                  />
                </div>

                <Errors errors={errors.email} />
              </div>

              <div className={classNames(form.el, styles.message)}>
                <div className={form.input}>
                  <textarea
                    value={values.message}
                    name="message"
                    onChange={handleInputChange}
                    placeholder="Сообщение*"
                  />
                </div>

                <Errors errors={errors.message} />
              </div>

              <div className={classNames(form.submit, styles.submit)}>
                <input type="submit" value={pending ? 'Отправляем...' : 'Отправить'} className={classNames(buttons.main, buttons.big, { [buttons.pending]: pending })} disabled={pending || (values.name === '' || values.email === '' || values.message === '' || values.destination_id === '')} />
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}
