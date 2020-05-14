import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../Form.module.css'

StepTwo.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepTwo ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.nationality || ''}
            name="nationality"
            onChange={onChange}
          />
          <div className={form.label}>
            Гражданство *
          </div>
        </div>

        <Errors errors={errors.nationality} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.series || ''}
            name="series"
            onChange={onChange}
          />
          <div className={form.label}>
            Серия *
          </div>
        </div>

        <Errors errors={errors.series} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.number || ''}
            name="number"
            onChange={onChange}
          />
          <div className={form.label}>
            Номер *
          </div>
        </div>

        <Errors errors={errors.number} />
      </div>
    </>
  )
}
