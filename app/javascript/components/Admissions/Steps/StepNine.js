import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepNine.propTypes = {
  values: PropTypes.object,
  dictionaries: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func
}

export default function StepNine ({ values, dictionaries, errors, onChange, onSelectChange }) {
  if (!dictionaries) return null

  return (
    <>
      <div className={form.item}>
        <div className={form.select}>
          <div className={form.label}>
            Предмет *
          </div>

          <Select
            classNamePrefix="react-select"
            value={dictionaries.subjects.find(s => s.id === values.score_subject)}
            getOptionValue={option => option.id}
            noOptionsMessage={() => 'Ничего не найдено'}
            options={dictionaries.subjects}
            placeholder="Выберите предмет.."
            onChange={value => onSelectChange('score_subject', value.id)}
          />
        </div>

        <Errors errors={errors.score_subject} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Балл ЕГЭ *
          </div>

          <input
            type="text"
            value={values.score_ege}
            name="score_ege"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.score_ege} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Оценка из аттестата
          </div>

          <input
            type="text"
            value={values.score_grade}
            name="score_grade"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.score_grade} />
      </div>

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
