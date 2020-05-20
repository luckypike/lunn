import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepThree.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepThree ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Степень родства *
          </div>

          <input
            type="text"
            value={values.parents_relation_degree}
            name="parents_relation_degree"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.parents_relation_degree} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Ф.И.О. родителей (полностью) *
          </div>

          <input
            type="text"
            value={values.parents_name}
            name="parents_name"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.parents_name} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Телефон родителей *
          </div>

          <input
            type="text"
            value={values.parents_phone}
            name="parents_phone"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.parents_phone} />
      </div>
    </>
  )
}
