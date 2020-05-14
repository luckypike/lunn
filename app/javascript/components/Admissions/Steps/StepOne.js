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
            value={values.last_name || ''}
            name="last_name"
            onChange={onChange}
            required
          />
          <div className={form.label}>
            Фамилия *
          </div>
        </div>

        <Errors errors={errors.second_name} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.first_name || ''}
            name="first_name"
            onChange={onChange}
            required
          />
          <div className={form.label}>
            Имя *
          </div>
        </div>

        <Errors errors={errors.first_name} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.middle_name || ''}
            name="middle_name"
            onChange={onChange}
            required
          />
          <div className={form.label}>
            Отчество *
          </div>
        </div>

        <Errors errors={errors.middle_name} />
      </div>
    </>
  )
}
