import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'

import { Title } from '../Pages'
import { Errors, useForm } from '../Form'

import styles from './Form.module.css'
import pages from '../Pages.module.css'
import form from '../Form.module.css'
import buttons from '../Buttons.module.css'

Form.propTypes = {
  user: PropTypes.object
}

export default function Form ({ user }) {
  const {
    values,
    saved,
    setSaved,
    handleInputChange,
    errors,
    pending,
    setErrors,
    onSubmit,
    cancelToken
  } = useForm({ title: '', user_id: user.id })

  const handleSubmit = async e => {
    await axios.post(
      '/news',
      { news: values },
      { cancelToken: cancelToken.current.token }
    ).then(res => {
      setSaved(true)
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  return (
    <div className={pages.container}>
      <Title
        h1="Новая новость"
      />

      <div className={styles.root}>
        <div className={styles.form}>
          {saved &&
            <div className={styles.saved}>
              Новость сохранена
            </div>
          }

          {!saved &&
            <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
              <div className={form.el}>
                <div className={classNames(form.input, styles.title)}>
                  <input
                    type="text"
                    value={values.title}
                    name="title"
                    onChange={handleInputChange}
                    required
                  />

                  <div className={form.label}>
                    Заголовок *
                  </div>
                </div>

                <Errors errors={errors.title} />
              </div>

              <div className={form.el}>
                <div>Фото</div>

                <div className={form.input}>
                  <input
                    type="file"
                    name="images"
                  />
                </div>
              </div>

              <div className={form.submit}>
                <input
                  type="submit"
                  value={pending ? 'Создание...' : 'Создать' }
                  className={classNames(buttons.main, buttons.big, { [buttons.pending]: pending })}
                  disabled={pending}
                />
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}
