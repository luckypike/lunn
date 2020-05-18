import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../Form.module.css'

StepSix.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepSix ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.el}>
        <div className={form.input}>
          <select name="school_type" onChange={onChange} value={values.school_type}>
            <option value=""></option>
            <option value="1">Школа</option>
            <option value="2">Лицей</option>
            <option value="3">Техникум</option>
            <option value="4">Колледж</option>
            <option value="5">Гимназия</option>
            <option value="6">Училище</option>
            <option value="7">ВУЗ</option>
            <option value="8">Лицей-интернат</option>
          </select>

          <div className={form.label}>
            Туп учебного заведения *
          </div>
        </div>

        <Errors errors={errors.school_type} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.school_name || ''}
            name="school_name"
            onChange={onChange}
          />
          <div className={form.label}>
            Название учебного заведения *
          </div>
        </div>

        <Errors errors={errors.school_name} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.school_graduation || ''}
            name="school_graduation"
            onChange={onChange}
          />
          <div className={form.label}>
            Год окончания *
          </div>
        </div>

        <Errors errors={errors.school_graduation} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <textarea
            value={values.school_address || ''}
            name="school_address"
            onChange={onChange}
          />
          <div className={form.label}>
            Адрес учебного заведения
          </div>
        </div>

        <Errors errors={errors.school_address} />
      </div>
    </>
  )
}
