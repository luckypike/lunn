import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../Form.module.css'

StepThree.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepThree ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.relation_degree || ''}
            name="nationality"
            onChange={onChange}
          />
          <div className={form.label}>
            Степень родства *
          </div>
        </div>

        <Errors errors={errors.relation_degree} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.parents || ''}
            name="series"
            onChange={onChange}
          />
          <div className={form.label}>
            Ф.И.О. родителей (полностью) *
          </div>
        </div>

        <Errors errors={errors.parents} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.parents_phone || ''}
            name="number"
            onChange={onChange}
          />
          <div className={form.label}>
            Телефон родителей *
          </div>
        </div>

        <Errors errors={errors.parents_phone} />
      </div>
    </>
  )
}
