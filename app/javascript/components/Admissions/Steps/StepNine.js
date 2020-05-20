import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepNine.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepNine ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Предмет *
          </div>

          <input
            type="text"
            value={values.score_subject}
            name="score_subject"
            onChange={onChange}
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
            Оценка из аттестата *
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
            type="date"
            value={values.score_year}
            name="score_year"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.score_year} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Индивидуальные достижения
          </div>

          <textarea
            value={values.score_achievements}
            name="score_achievements"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.score_achievements} />
      </div>
    </>
  )
}
