import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepOne.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepOne ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Фамилия *
            </div>

            <input
              value={values.identity_last_name}
              name="identity_last_name"
              onChange={onChange}
            />
          </label>
        </div>

        <Errors errors={errors.identity_last_name} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Имя *
            </div>

            <input
              value={values.identity_first_name}
              name="identity_first_name"
              onChange={onChange}
            />
          </label>
        </div>

        <Errors errors={errors.identity_first_name} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Отчество *
            </div>

            <input
              value={values.identity_middle_name}
              name="identity_middle_name"
              onChange={onChange}
            />
          </label>
        </div>

        <Errors errors={errors.identity_middle_name} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Пол *
            </div>

            <select name="identity_sex" onChange={onChange} value={values.identity_sex}>
              <option value=""></option>
              <option value="1">Мужской</option>
              <option value="2">Женский</option>
            </select>
          </label>
        </div>

        <Errors errors={errors.identity_sex} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Дата рождения *
            </div>

            <input
              type="date"
              value={values.identity_birth_date}
              name="identity_birth_date"
              onChange={onChange}
            />
          </label>
        </div>

        <Errors errors={errors.identity_sex} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Место рождения *
            </div>

            <input
              value={values.identity_birth_place}
              name="identity_birth_place"
              onChange={onChange}
            />
          </label>
        </div>

        <Errors errors={errors.identity_birth_place} />
      </div>
    </>
  )
}
