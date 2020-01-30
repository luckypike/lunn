import React from 'react'
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
      // setSaved(true)
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  return (
    <div className={pages.container}>
      <Title
        h1="Письмо руководству"
      />

      <div className={styles.root}>
        <div className={styles.form}>
          <form className={classNames(form.root, styles.els)} onSubmit={onSubmit(handleSubmit)}>
            <div className={classNames(form.el, styles.department)}>
              <div className={form.input}>
                <select name="department_id" onChange={handleInputChange}>
                  <option value="">Направить письмо в...</option>
                  {departments.map(department =>
                    <option value={department.id} key={department.id}>
                      {department.title}
                    </option>
                  )}
                </select>
              </div>

              {/* <Errors errors={errors.department} /> */}
            </div>

            <div className={classNames(form.el, styles.destination)}>
              <div className={form.input}>
                <select name="destination_id" onChange={handleInputChange}>
                  {destinations.filter(i => parseInt(i.department_id) === parseInt(values.department_id)).length !== 1 &&
                    <option value="">Выберите адресата...</option>
                  }

                  {destinations.filter(i => parseInt(i.department_id) === parseInt(values.department_id)).map(destination =>
                    <option value={destination.id} key={destination.id}>
                      {destination.title}
                    </option>
                  )}
                </select>
              </div>

              {/* <Errors errors={errors.department} /> */}
            </div>

            <div className={classNames(form.el, styles.name)}>
              <div className={form.input}>
                <input
                  type="text"
                  value={values.name}
                  name="name"
                  onChange={handleInputChange}
                  placeholder="* Ваше имя..."
                />
              </div>

              <Errors errors={errors.name} />
            </div>

            <div className={classNames(form.el, styles.email)}>
              <div className={form.input}>
                <input
                  type="text"
                  value={values.email}
                  name="email"
                  onChange={handleInputChange}
                  placeholder="* Ваша почта..."
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
                  placeholder="* Сообщение..."
                />
              </div>

              <Errors errors={errors.message} />
            </div>

            <div className={classNames(form.submit, styles.submit)}>
              <input type="submit" value={pending ? 'Отправляем...' : 'Отправить'} className={classNames(buttons.main, buttons.big, { [buttons.pending]: pending })} disabledd={pending || (values.name === '' || values.email === '' || values.message === '')} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}