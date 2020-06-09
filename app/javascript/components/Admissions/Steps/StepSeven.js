import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

import Documents from '../../Documents/Documents'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepSeven.propTypes = {
  values: PropTypes.object,
  documents: PropTypes.array,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  setValues: PropTypes.func
}

export default function StepSeven ({ values, documents, errors, onChange, setValues }) {
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
            Документ об образовании *
          </div>

          <Errors errors={errors.documents} />

          <Documents
            files={documents}
            section='school'
            values={values}
            setValues={setValues}
          />
        </div>
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Дата выдачи *
            </div>

            <DatePicker
              placeholderText="01.01.2000"
              onChange={value => {
                setValues({ ...values, school_document_date: value })
              }}
              dateFormat="dd.MM.yyyy"
              selected={values.school_document_date}
            />
          </label>
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
