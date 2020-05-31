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
  onSelectChange: PropTypes.func
}

export default function StepTen ({ values, dictionaries, errors, onChange, onSelectChange }) {
  if (!dictionaries) return null

  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Форма обучения *
          </div>

          <select name="course_form" onChange={onChange} value={values.course_form}>
            <option value=""></option>
            <option value="1">Очная</option>
            <option value="2">Очно-заочная</option>
            <option value="3">Заочная</option>
          </select>
        </div>

        <Errors errors={errors.course_form} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Финансовая основа *
          </div>

          <select name="course_basis" onChange={onChange} value={values.course_basis}>
            <option value=""></option>
            <option value="1">Бюджет</option>
            <option value="2">Фин. договор</option>
          </select>
        </div>

        <Errors errors={errors.course_basis} />
      </div>

      <div className={form.item}>
        <div className={form.select}>
          <div className={form.label}>
            Направление/профиль *
          </div>

          <Select
            classNamePrefix="react-select"
            value={dictionaries.directions.find(d => d.id === values.course_program)}
            getOptionValue={option => option.id}
            noOptionsMessage={() => 'Ничего не найдено'}
            options={dictionaries.directions}
            placeholder="Выберите достижение.."
            onChange={value => onSelectChange('course_program', value.id)}
          />
        </div>

        <Errors errors={errors.score_achievements} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Целевой договор
          </div>

          <input
            type="text"
            value={values.course_contract}
            name="course_contract"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.course_contract} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Социальное положение
          </div>

          <select name="course_status" onChange={onChange} value={values.course_status}>
            <option value=""></option>
            <option value="1">Сирота</option>
            <option value="2">Инвалид</option>
            <option value="3">Ветеран боевых действий</option>
          </select>
        </div>

        <Errors errors={errors.course_status} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Олимпиады
          </div>

          <select name="course_olympiad" onChange={onChange} value={values.course_olympiad}>
            <option value=""></option>
            <option value="1">Победитель Всероссийской олимпиады</option>
            <option value="2">Призер Всероссийской олимпиады</option>
            <option value="3">Победитель олимпиады школьников</option>
            <option value="4">Призер олимпиады школьников</option>
          </select>
        </div>

        <Errors errors={errors.course_olympiad} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Военнообязанный
          </div>

          <select name="course_military" onChange={onChange} value={values.course_military}>
            <option value="1">Нет</option>
            <option value="2">Да</option>
          </select>
        </div>

        <Errors errors={errors.course_military} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Пройдено обучение на курсах НГЛУ
          </div>

          <select name="course_study" onChange={onChange} value={values.course_study}>
            <option value="1">Нет</option>
            <option value="2">Да</option>
          </select>
        </div>

        <Errors errors={errors.course_study} />
      </div>
    </>
  )
}
