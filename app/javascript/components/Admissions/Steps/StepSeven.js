import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepSeven.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepSeven ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Образование *
          </div>

          <select name="school_education" onChange={onChange} value={values.school_education}>
            <option value=""></option>
            <option value="1">Среднеe общее</option>
            <option value="2">Среднее (полное) общее</option>
            <option value="3">Начальное профессиональное</option>
            <option value="4">Среднее профессиональное</option>
            <option value="5">Среднее специальное</option>
            <option value="6">Высшее</option>
          </select>
        </div>

        <Errors errors={errors.school_education} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Вид документа об образовании *
          </div>

          <select name="school_document_type" onChange={onChange} value={values.school_document_type}>
            <option value=""></option>
            <option value="1">Аттестат о среднем общем образовании</option>
            <option value="2">Аттестат о среднем (полном) общем образовании</option>
            <option value="3">Диплом о начальном профессиональном образовании</option>
            <option value="4">Диплом о среднем профессиональном образовании</option>
            <option value="5">Диплом о высшем профессиональном образовании</option>
          </select>
        </div>

        <Errors errors={errors.school_document_type} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Номер документа об образовании *
          </div>

          <input
            type="text"
            value={values.school_document_number}
            name="school_document_number"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.school_document_number} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Регистрационный номер документа
          </div>

          <input
            type="text"
            value={values.school_document_id}
            name="school_document_id"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.school_document_id} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Дата выдачи *
          </div>

          <input
            type="date"
            value={values.school_document_date}
            name="school_document_date"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.school_document_date} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Вид диплома
          </div>

          <select name="school_diploma_type" onChange={onChange} value={values.school_diploma_type}>
            <option value=""></option>
            <option value="1">Диплом бакалавра</option>
            <option value="2">Диплом специалиста</option>
            <option value="3">Диплом магистра</option>
          </select>
        </div>

        <Errors errors={errors.school_diploma_type} />
      </div>
    </>
  )
}
