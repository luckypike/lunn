import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepTen.propTypes = {
  values: PropTypes.object,
  setValues: PropTypes.func,
  dictionaries: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepTen ({ values, dictionaries, errors, onChange, setValues }) {
  return (
    <>
      <p>
        Заявления принимаются от лиц, поступающих на очную форму обучения и не имеющих прописки в г. Нижний Новгород, Бор, Кстово, Дзержинск
      </p>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Подать заявление на место в общежитии НГЛУ им. Н.А. Добролюбова на период обучения с 01.09.2020 на 2020-2021 учебный год *
            </div>

            <select name="features_campus" onChange={onChange} value={values.features_campus}>
              <option value=""></option>
              <option value="1">Согласен</option>
              <option value="2">Не согласен (отказ в подаче заявления)</option>
            </select>
          </label>
        </div>

        <div className={form.hint}>
          Факт подачи электронного заявления не гарантирует предоставление места в общежитии, а является основанием для рассмотрения заявления и принятия/не принятия положительного решения.
        </div>

        <Errors errors={errors.features_campus} />
      </div>
    </>
  )
}
