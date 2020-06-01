import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepTen.propTypes = {
  values: PropTypes.object,
  dictionaries: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  onSubjectsChange: PropTypes.func
}

export default function StepTen ({ values, dictionaries, errors, onChange, onSelectChange, onSubjectsChange }) {
  if (!dictionaries) return null

  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Год сдачи ЕГЭ *
          </div>

          <input
            type="text"
            value={values.score_year}
            name="score_year"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.score_year} />
      </div>

      <div className={form.item}>
        <div className={form.select}>
          <div className={form.label}>
            Индивидуальные достижения
          </div>

          <Select
            classNamePrefix="react-select"
            value={dictionaries.achievements.find(a => a.id === values.score_achievements)}
            getOptionValue={option => option.id}
            noOptionsMessage={() => 'Ничего не найдено'}
            options={dictionaries.achievements}
            placeholder="Выберите достижение.."
            onChange={value => onSelectChange('score_achievements', value.id)}
          />
        </div>

        <Errors errors={errors.score_achievements} />
      </div>
    </>
  )
}
