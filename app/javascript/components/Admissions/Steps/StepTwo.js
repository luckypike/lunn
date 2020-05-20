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
            value={values.document_nationality || ''}
            name="document_nationality"
            onChange={onChange}
          />
          <div className={form.label}>
            Гражданство *
          </div>
        </div>

        <Errors errors={errors.document_nationality} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <select name="document_type" onChange={onChange} value={values.document_type || ''}>
            <option value=""></option>
            <option value="1">Паспорт гражданина Российской Федерации</option>
            <option value="2">Загранпаспорт гражданина РФ</option>
            <option value="3">Удостоверение личности военнослужащего</option>
            <option value="4">Временное удостоверение личности гражданина Российской Федерации</option>
            <option value="5">Свидетельство о рождении</option>
            <option value="6">Удостоверение личности</option>
            <option value="7">Иностранный паспорт</option>
            <option value="8">Вид на жительство</option>
          </select>

          <div className={form.label}>
            Документ, удостоверяющий личность *
          </div>
        </div>

        <Errors errors={errors.document_type} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.document_series || ''}
            name="document_series"
            onChange={onChange}
          />
          <div className={form.label}>
            Серия *
          </div>
        </div>

        <Errors errors={errors.document_series} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.document_number || ''}
            name="document_number"
            onChange={onChange}
          />
          <div className={form.label}>
            Номер *
          </div>
        </div>

        <Errors errors={errors.document_number} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <textarea
            value={values.document_issued_by || ''}
            name="document_issued_by"
            onChange={onChange}
          />

          <div className={form.label}>
            Кем выдан *
          </div>
        </div>

        <Errors errors={errors.document_issued_by} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="date"
            value={values.document_issue_date || ''}
            name="document_issue_date"
            onChange={onChange}
          />

          <div className={form.label}>
            Дата выдачи
          </div>
        </div>

        <Errors errors={errors.document_issue_date} />
      </div>
    </>
  )
}
