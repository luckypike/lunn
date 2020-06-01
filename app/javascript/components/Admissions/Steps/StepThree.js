import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepThree.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepThree ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Степень родства *
          </div>

          <select name="parents_relation_degree_first" onChange={onChange} value={values.parents_relation_degree_first}>
            <option value=""></option>
            <option value="1">Отец</option>
            <option value="2">Мать</option>
            <option value="3">Опекун</option>
            <option value="4">Дедушка</option>
            <option value="5">Бабушка</option>
            <option value="6">Муж</option>
            <option value="7">Жена</option>
            <option value="8">Дядя</option>
            <option value="9">Тётя</option>
          </select>
        </div>

        <Errors errors={errors.parents_relation_degree_first} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Ф.И.О. (полностью) *
          </div>

          <input
            type="text"
            value={values.parents_name_first}
            name="parents_name_first"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.parents_name_first} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Телефон *
          </div>

          <input
            type="text"
            value={values.parents_phone_first}
            name="parents_phone_first"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.parents_phone_first} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Степень родства
          </div>

          <select name="parents_relation_degree_second" onChange={onChange} value={values.parents_relation_degree_second}>
            <option value=""></option>
            <option value="1">Отец</option>
            <option value="2">Мать</option>
            <option value="3">Опекун</option>
            <option value="4">Дедушка</option>
            <option value="5">Бабушка</option>
            <option value="6">Муж</option>
            <option value="7">Жена</option>
            <option value="8">Дядя</option>
            <option value="9">Тётя</option>
          </select>
        </div>

        <Errors errors={errors.parents_relation_degree_second} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Ф.И.О. (полностью)
          </div>

          <input
            type="text"
            value={values.parents_name_second}
            name="parents_name_second"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.parents_name_second} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Телефон
          </div>

          <input
            type="text"
            value={values.parents_phone_second}
            name="parents_phone_second"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.parents_phone_second} />
      </div>
    </>
  )
}
