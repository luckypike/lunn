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
            value={values.identity_last_name}
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
            value={values.identity_first_name}
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
            value={values.identity_middle_name}
            name="identity_middle_name"
            onChange={onChange}
          />
          <div className={form.label}>
            Отчество *
          </div>
        </div>

        <Errors errors={errors.identity_middle_name} />
      </div>
    </>
  )
}
