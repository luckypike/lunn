import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../Form.module.css'

StepTen.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepTen ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.el}>
        <div className={form.input}>
          <select name="course_form" onChange={onChange} value={values.course_form}>
            <option value=""></option>
            <option value="1">Очная</option>
            <option value="2">Очно-заочная</option>
            <option value="3">Заочная</option>
          </select>

          <div className={form.label}>
            Форма обучения *
          </div>
        </div>

        <Errors errors={errors.course_form} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <select name="course_basis" onChange={onChange} value={values.course_basis}>
            <option value=""></option>
            <option value="1">Бюджет</option>
            <option value="2">Фин. договор</option>
          </select>

          <div className={form.label}>
            Финансовая основа *
          </div>
        </div>

        <Errors errors={errors.course_basis} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.course_program || ''}
            name="course_program"
            onChange={onChange}
          />
          <div className={form.label}>
            Направление/профиль *
          </div>
        </div>

        <Errors errors={errors.course_program} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.course_contract || ''}
            name="course_contract"
            onChange={onChange}
          />
          <div className={form.label}>
            Целевой договор *
          </div>
        </div>

        <Errors errors={errors.course_contract} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <select name="course_status" onChange={onChange} value={values.course_status}>
            <option value=""></option>
            <option value="1">Сирота</option>
            <option value="2">Инвалид</option>
            <option value="3">Ветеран боевых действий</option>
          </select>

          <div className={form.label}>
            Социальное положение  *
          </div>
        </div>

        <Errors errors={errors.course_status} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <select name="course_olympiad" onChange={onChange} value={values.course_olympiad}>
            <option value=""></option>
            <option value="1">Победитель Всероссийской олимпиады</option>
            <option value="2">Призер Всероссийской олимпиады</option>
            <option value="3">Победитель олимпиады школьников</option>
            <option value="4">Призер олимпиады школьников</option>
          </select>

          <div className={form.label}>
            Олимпиады
          </div>
        </div>

        <Errors errors={errors.course_olympiad} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="date"
            value={values.course_date || ''}
            name="course_date"
            onChange={onChange}
          />

          <div className={form.label}>
            Дата подачи заявления *
          </div>
        </div>

        <Errors errors={errors.course_date} />
      </div>
    </>
  )
}
