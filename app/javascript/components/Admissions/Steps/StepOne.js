import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../Form.module.css'

StepOne.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepOne ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.identity_last_name || ''}
            name="identity_last_name"
            onChange={onChange}
          />
          <div className={form.label}>
            Фамилия *
          </div>
        </div>

        <Errors errors={errors.identity_last_name} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.identity_first_name || ''}
            name="identity_first_name"
            onChange={onChange}
          />
          <div className={form.label}>
            Имя *
          </div>
        </div>

        <Errors errors={errors.identity_first_name} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.identity_middle_name || ''}
            name="identity_middle_name"
            onChange={onChange}
          />
          <div className={form.label}>
            Отчество *
          </div>
        </div>

        <Errors errors={errors.identity_middle_name} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <select name="identity_sex" onChange={onChange} value={values.identity_sex}>
            <option value=""></option>
            <option value="1">Мужской</option>
            <option value="2">Женский</option>
          </select>

          <div className={form.label}>
            Пол *
          </div>
        </div>

        <Errors errors={errors.identity_sex} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="date"
            value={values.identity_birth_date || ''}
            name="identity_birth_date"
            onChange={onChange}
          />

          <div className={form.label}>
            Дата рождения *
          </div>
        </div>

        <Errors errors={errors.identity_sex} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <textarea
            value={values.identity_birth_place || ''}
            name="identity_birth_place"
            onChange={onChange}
          />

          <div className={form.label}>
            Место рождения *
          </div>
        </div>

        <Errors errors={errors.identity_first_name} />
      </div>
    </>
  )
}
