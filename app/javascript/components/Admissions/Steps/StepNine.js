import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Errors } from '../../Form'

import styles from './StepNine.module.css'
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
    if (subjects.size > 0 && !values.score_skip) {
      setValues({
        ...values,
        subject_ids: [...subjects.values()].map(subject => subject.id),
        subjects_attributes: [...subjects.values()].map(subject => (subject))
      })
    }
  }, [subjects])

  const handleSubjectAdd = e => {
    e.preventDefault()

    const newSubjects = new Map(subjects)

    newSubjects.set(subjects.size + 1, {
      subject: '', ege: '', grade: ''
    })

    setSubjects(newSubjects)
  }

  const handleSubjectDelete = (key) => {
    const newSubjects = new Map(subjects)
    newSubjects.delete(key)

    setSubjects(newSubjects)
  }

  const handleSubjectChange = (i, subject) => {
    const newSubjects = new Map(subjects)
    newSubjects.set(i, subject)

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
    const newSubjects = new Map(subjects)

    if (values.subjects_attributes.length > 0) {
      values.subjects_attributes.forEach((subject, i) => {
        newSubjects.set(i, subject)
      })
    }

    const j = newSubjects.size
    if (j < 3) {
      Array.from(Array(3 - j)).forEach((_, i) => {
        newSubjects.set(j + i, {
          subject: '', ege: '', grade: ''
        })
      })
    }

    setSubjects(newSubjects)
  }, [])

  useEffect(() => {
    if (values.score_skip) {
      setValues({
        ...values,
        subject_ids: [],
        subjects_attributes: []
      })
    }
  }, [values.score_skip])

  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                checked={values.score_skip}
                name="score_skip"
                onChange={onChange}
              />

              Не заполнять данные по ЕГЭ, если вы не знаете своих результатов или не сдаёте их, а также если поступаете в магистратуру или аспирантуру
            </div>
          </label>
        </div>
      </div>

      {values.score_skip !== true &&
        <>
          <div className={styles.subjects}>
            <h4>
              Экзамены и баллы
            </h4>

            <p>
              Необходимо указать минимум 3 предмета и их баллы ЕГЭ, максимум можно указать до 6 предметов
            </p>

            {[...subjects.keys()].map(i =>
              <div key={i} className={styles.subject}>
                <Subject
                  key={i}
                  i={i}
                  subject={subjects.get(i)}
                  dictionaries={dictionaries}
                  errors={errors}
                  onSubjectChange={handleSubjectChange}
                  onSubjectDelete={handleSubjectDelete}
                />
              </div>
            )}

            {subjects.size < 6 &&
              <div className={styles.new} onClick={handleSubjectAdd}>
                Добавить предмет
              </div>
            }
          </div>
        </>
      }

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
  onSubjectChange: PropTypes.func,
  onSubjectDelete: PropTypes.func,
  dictionaries: PropTypes.object,
  errors: PropTypes.object,
  i: PropTypes.number
}

function Subject ({ subject, onSubjectChange, onSubjectDelete, dictionaries, errors, i }) {
  const [values, setValues] = useState({ ...subject })

  useEffect(() => {
    onSubjectChange && onSubjectChange(i, values)
  }, [values])

  const handleInputChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value })
  }

  return (
    <>
      <div className={form.item}>

        <div className={form.input}>
          { i > 2 &&
            <button className={classNames(buttons.main, form.delete)} onClick={() => onSubjectDelete(i)}>
              Удалить
            </button>
          }

          <label>
            <div className={form.label}>
              Название предмета *
            </div>

            <select name="subject" onChange={handleInputChange} value={values.subject}>
              <option value=""></option>
              <option value="1">Математика</option>
              <option value="2">Русский язык</option>
              <option value="3">Иностранный язык (английский)</option>
              <option value="4">Иностранный язык (немецкий)</option>
              <option value="5">Иностранный язык (французский)</option>
              <option value="6">Иностранный язык (итальянский)</option>
              <option value="7">Иностранный язык (испанский)</option>
              <option value="8">Иностранный язык (китайский)</option>
              <option value="9">Иностранный язык (японский)</option>
              <option value="10">История</option>
              <option value="11">Обществознание</option>
              <option value="12">Литература</option>
            </select>
          </label>
        </div>

        <Errors errors={errors[`subjects[${i}].subject`]} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Год сдачи *
            </div>

            <select name="year" onChange={handleInputChange} value={values.year}>
              <option value=""></option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
          </label>
        </div>

        {/* <div className={form.hint}>2016 — 2020</div> */}

        <Errors errors={errors[`subjects[${i}].year`]} />
      </div>

      <div className={styles.row}>
        <div className={form.item}>
          <div className={form.input}>
            <label>
              <div className={form.label}>
                Балл ЕГЭ *
              </div>

              <input
                type="text"
                value={values.ege}
                name="ege"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={form.hint}>1 — 100</div>

          <Errors errors={errors[`subjects[${i}].ege`]} />
        </div>

        <div className={form.item}>
          <div className={form.input}>
            <label>
              <div className={form.label}>
                Оценка из аттестата *
              </div>

              <input
                type="text"
                value={values.grade}
                name="grade"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={form.hint}>3 — 5</div>

          <Errors errors={errors[`subjects[${i}].grade`]} />
        </div>
      </div>
    </>
  )
}
