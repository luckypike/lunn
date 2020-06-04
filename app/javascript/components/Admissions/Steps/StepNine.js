import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Select from 'react-select'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'
import buttons from '../../Buttons.module.css'

StepNine.propTypes = {
  values: PropTypes.object,
  dictionaries: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  setValues: PropTypes.func
}

export default function StepNine ({ values, dictionaries, errors, onChange, setValues }) {
  if (!dictionaries) return null

  const [subjects, setSubjects] = useState(new Map())

  useEffect(() => {
    if (subjects.size > 0) {
      setValues({
        ...values,
        subject_ids: [...subjects.values()].map(subject => subject.id),
        subjects_attributes: [...subjects.values()].map(subject => (subject))
      })
    }
  }, [subjects])

  const handleSubjectAdd = (e) => {
    const newSubjects = new Map(subjects)
    newSubjects.set(`n-${subjects.size}`, { admission_subject_id: '', ege: '', grade: '' })

    setSubjects(newSubjects)

    e.preventDefault()
  }

  const handleSubjectDelete = (key) => {
    const newSubjects = new Map(subjects)
    newSubjects.delete(key)

    setSubjects(newSubjects)
  }

  const handleSubjectChange = (subject, subjectKey) => {
    const newSubjects = new Map(subjects)
    newSubjects.set(subjectKey, subject)

    setSubjects(newSubjects)
  }

  const handleAchievementsChange = (item) => {
    if (values.score_achievements.includes(item)) {
      setValues({ ...values, score_achievements: [...values.score_achievements.filter(id => id !== item)] })
    } else {
      setValues({ ...values, score_achievements: [...values.score_achievements, item] })
    }
  }

  useEffect(() => {
    if (values.subjects_attributes.length > 0) {
      const newSubjects = new Map(subjects)
      values.subjects_attributes.forEach(item => {
        if (item.id) {
          newSubjects.set(item.id, item)
        }
      })

      setSubjects(newSubjects)
    }
    // } else if (subjects.size !== 1) {
    //   const newSubjects = new Map(subjects)
    //   newSubjects.set(`n-${subjects.size}`, { admission_subject_id: '', ege: '', grade: '' })
    //
    //   setSubjects(newSubjects)
    // }
  }, [dictionaries])

  return (
    <>
      {subjects.size > 0 &&
        <>
          {[...subjects.keys()].map(key =>
            <Subject
              key={key}
              subjectKey={key}
              subject={subjects.get(key)}
              dictionaries={dictionaries}
              errors={errors}
              onSubjectChange={handleSubjectChange}
              onSubjectDelete={handleSubjectDelete}
            />
          )}
        </>
      }

      <div className={form.item}>
        <button className={classNames(buttons.main, buttons.big)} onClick={handleSubjectAdd}>
          Добавить предмет
        </button>
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
        <div className={form.checkbox}>
          <div className={form.label}>
            Индивидуальные достижения
          </div>

          {dictionaries.achievements &&
            <div className={form.input}>
              {dictionaries.achievements.map(achievement =>
                <div key={achievement.id} className={form.checkbox}>
                  <label>
                    <input
                      type="checkbox"
                      name={achievement.id}
                      disabled={values.score_achievements.length > 5 && !values.score_achievements.includes(achievement.id)}
                      checked={values.score_achievements.includes(achievement.id)}
                      onChange={() => handleAchievementsChange(parseInt(achievement.id))} />
                    {achievement.label}
                  </label>
                </div>
              )}
            </div>
          }
        </div>

        {errors.audiences &&
          <Errors errors={errors.audiences}/>
        }
      </div>
    </>
  )
}

Subject.propTypes = {
  subject: PropTypes.object,
  subjectKey: PropTypes.string,
  dictionaries: PropTypes.object,
  errors: PropTypes.object,
  onSubjectChange: PropTypes.func,
  onSubjectDelete: PropTypes.func
}

function Subject ({ subject, subjectKey, dictionaries, errors, onSubjectChange, onSubjectDelete }) {
  const [item, setItem] = useState(subject)

  useEffect(() => {
    onSubjectChange && onSubjectChange(item, subjectKey)
  }, [item])

  const handleInputChange = ({ target: { name, value } }) => {
    setItem({ ...item, [name]: value })
  }

  const handleSelectChange = (name, value) => {
    setItem({ ...item, [name]: value })
  }

  return (
    <>
      <div className={form.item}>
        <button className={classNames(buttons.main, form.delete)} onClick={() => onSubjectDelete(subjectKey)}>
          Удалить
        </button>

        <div className={form.select}>
          <div className={form.label}>
            Предмет *
          </div>

          <Select
            classNamePrefix="react-select"
            value={dictionaries.subjects.find(s => s.id === item.admission_subject_id)}
            getOptionValue={option => option.id}
            noOptionsMessage={() => 'Ничего не найдено'}
            options={dictionaries.subjects}
            placeholder="Выберите предмет.."
            onChange={value => handleSelectChange('admission_subject_id', value.id)}
          />
        </div>

        <Errors errors={errors['subjects.subject']} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Балл ЕГЭ
          </div>

          <input
            type="text"
            value={item.ege}
            name="ege"
            onChange={handleInputChange}
          />
        </div>

        <Errors errors={errors['subjects.ege']} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Оценка из аттестата
          </div>

          <input
            type="text"
            value={item.grade}
            name="grade"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <br />
    </>
  )
}
