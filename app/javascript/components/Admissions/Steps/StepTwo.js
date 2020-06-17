import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DatePicker from 'react-datepicker'

import Documents from '../../Documents/Documents'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepTwo.propTypes = {
  values: PropTypes.object,
  setValues: PropTypes.func,
  documents: PropTypes.array,
  dictionaries: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepTwo ({ values, documents, dictionaries, errors, onChange, setValues }) {
  if (!dictionaries) return null

  return (
    <>
      <div className={form.item}>
        <div className={form.select}>
          <div className={form.label}>
            Гражданство *
          </div>

          <Select
            classNamePrefix="react-select"
            value={dictionaries.citizenships.find(c => c.id === values.document_nationality)}
            getOptionValue={option => option.id}
            noOptionsMessage={() => 'Ничего не найдено'}
            options={dictionaries.citizenships}
            placeholder="Выберите гражданство.."
            onChange={value => setValues({ ...values, document_nationality: value.id })}
          />
        </div>

        <Errors errors={errors.document_nationality} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Документ, удостоверяющий личность *
          </div>

          <select name="document_type" onChange={onChange} value={values.document_type}>
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
        </div>

        <Errors errors={errors.document_type} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Серия *
          </div>

          <input
            type="text"
            value={values.document_series}
            name="document_series"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.document_series} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Номер *
          </div>

          <input
            type="text"
            value={values.document_number}
            name="document_number"
            onChange={onChange}
          />

        </div>

        <Errors errors={errors.document_number} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Кем выдан *
          </div>

          <textarea
            value={values.document_issued_by}
            name="document_issued_by"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.document_issued_by} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Дата выдачи *
          </div>

          <DatePicker
            placeholderText="01.01.2000"
            onChange={value => {
              setValues({ ...values, document_issue_date: value })
            }}
            dateFormat="dd.MM.yyyy"
            selected={values.document_issue_date}
          />
        </div>

        <Errors errors={errors.document_issue_date} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Скан/фото паспорта *
          </div>

          <div className={form.hint}>
            Для иностранных граждан: также скан/фото перевода паспорта на русский язык
          </div>

          <Errors errors={errors.documents} />

          <Documents
            files={documents}
            section="document"
            values={values}
            setValues={setValues}
          />
        </div>
      </div>
    </>
  )
}
