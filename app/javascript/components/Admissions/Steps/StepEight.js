import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../Form.module.css'

StepEight.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepEight ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.el}>
        <div className={form.input}>
          <select name="school_merit" onChange={onChange} value={values.school_merit}>
            <option value=""></option>
            <option value="1">Аттестат с отличием</option>
            <option value="2">Диплом с отличием</option>
            <option value="3">Золотая медаль</option>
            <option value="4">Серебряная медаль</option>
          </select>

          <div className={form.label}>
            Награда
          </div>
        </div>

        <Errors errors={errors.school_merit} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <select name="school_language" onChange={onChange} value={values.school_language}>
            <option value=""></option>
            <option value="1">Английский</option>
            <option value="2">Немецкий</option>
            <option value="3">Французский</option>
            <option value="4">Испанский</option>
            <option value="5">Итальянский</option>
            <option value="6">Китайский</option>
            <option value="7">Японский</option>
            <option value="8">Другой</option>
          </select>

          <div className={form.label}>
            Изучаемый ранее иностранный язык
          </div>
        </div>

        <Errors errors={errors.school_language} />
      </div>

    </>
  )
}
