import React from 'react'
import PropTypes from 'prop-types'
import { deserialize } from 'jsonapi-deserializer'
import classNames from 'classnames'
import axios from 'axios'

import { useForm, Errors } from '../Form'
import Title from '../Title'

import pages from '../Pages.module.css'
import buttons from '../Buttons.module.css'
import form from '../FormStatic.module.css'

Form.propTypes = {
  tutor: PropTypes.object
}

export default function Form ({ tutor: tutorData }) {
  const tutor = deserialize(tutorData)

  const {
    values, handleInputChange,
    errors, setErrors,
    onSubmit, pending
  } = useForm({
    first_name: tutor.first_name || ''
  })

  const handleSubmit = e => {
    if (tutor.id) {
      // handleUpdate()
    } else {
      handleCreate()
    }
  }

  const handleCreate = async () => {
    await axios.post(
      '/tutors.json',
      { tutor: values }
    ).then(res => {
      console.log(res)
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1="Анкета преподавателя"
      />

      <div className={pages.container}>
        <div>
          <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Имя
                  </div>

                  <input
                    value={values.first_name}
                    type="text"
                    name="first_name"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.first_name} />
            </div>

            <div className={form.submit}>
              <input
                type="submit"
                value={pending ? 'Сохраняем...' : 'Сохранить'}
                className={classNames(buttons.main_big, { [buttons.pending]: pending })}
                disabled={pending}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
