import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepSix.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepSix ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Тип учебного заведения *
            </div>

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
          </label>
        </div>

        <Errors errors={errors.school_type} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Название учебного заведения *
          </div>

          <input
            type="text"
            value={values.school_name}
            name="school_name"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.school_name} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Год окончания *
          </div>

          <input
            type="text"
            value={values.school_graduation}
            name="school_graduation"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.school_graduation} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Адрес учебного заведения *
          </div>

          <textarea
            value={values.school_address}
            name="school_address"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.school_address} />
      </div>
    </>
  )
}
