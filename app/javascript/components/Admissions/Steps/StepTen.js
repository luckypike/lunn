import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Select from 'react-select'

import { Errors } from '../../Form'

import styles from './StepTen.module.css'
import form from '../../FormStatic.module.css'
import buttons from '../../Buttons.module.css'

StepTen.propTypes = {
  values: PropTypes.object,
  setValues: PropTypes.func,
  dictionaries: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func
}

export default function StepTen ({ values, setValues, dictionaries, errors, onChange, onSelectChange }) {
  if (!dictionaries) return null

  const [directions, setDirections] = useState(new Map())

  useEffect(() => {
    if (directions.size > 0) {
      setValues({
        ...values,
        direction_ids: [...directions.values()].map(direction => direction.id),
        directions_attributes: [...directions.values()].map(direction => (direction))
      })
    }
  }, [directions])

  useEffect(() => {
    const newDirections = new Map(directions)

    if (values.subjects_attributes.length > 0) {
      values.directions_attributes.forEach((direction, i) => {
        newDirections.set(i, direction)
      })
    }

    const j = newDirections.size
    if (j < 1) {
      newDirections.set(0, {
        admission_direction_id: '', form: '', basis: ''
      })
    }

    setDirections(newDirections)
  }, [])

  const handleDirectionAdd = (e) => {
    const newDirections = new Map(directions)
    newDirections.set(directions.size + 1, { admission_direction_id: '', form: '', basis: '' })

    setDirections(newDirections)

    e.preventDefault()
  }

  const handleDirectionDelete = (key) => {
    const newDirections = new Map(directions)
    newDirections.delete(key)

    setDirections(newDirections)
  }

  const handleDirectionChange = (direction, directionKey) => {
    const newDirections = new Map(directions)
    newDirections.set(directionKey, direction)

    setDirections(newDirections)
  }

  return (
    <>
      <div className={styles.directions}>
        <h4>
          Направления
        </h4>

        <p>
          Можно указать до 3-ех направлений для поступления.
        </p>

        {directions.size > 0 &&
          <>
            {[...directions.keys()].map(key =>
              <div key={key} className={styles.direction}>
                <Direction
                  key={key}
                  directionKey={key}
                  direction={directions.get(key)}
                  dictionaries={dictionaries}
                  errors={errors}
                  onDirectionChange={handleDirectionChange}
                  onDirectionDelete={handleDirectionDelete}
                />
              </div>
            )}
          </>
        }

        {directions.size < 3 &&
          <div className={styles.new} onClick={handleDirectionAdd}>
            Добавить направление
          </div>
        }
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Целевой договор
          </div>

          <select name="course_contract" onChange={onChange} value={values.course_contract}>
            <option value="1">Нет</option>
            <option value="2">Да</option>
          </select>
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

Direction.propTypes = {
  direction: PropTypes.object,
  directionKey: PropTypes.number,
  dictionaries: PropTypes.object,
  errors: PropTypes.object,
  onDirectionChange: PropTypes.func,
  onDirectionDelete: PropTypes.func
}

function Direction ({ direction, directionKey, dictionaries, errors, onDirectionChange, onDirectionDelete }) {
  const [item, setItem] = useState(direction)

  useEffect(() => {
    onDirectionChange && onDirectionChange(item, directionKey)
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
        <div className={form.select}>
          { directionKey > 1 &&
            <button className={classNames(buttons.main, form.delete)} onClick={() => onDirectionDelete(directionKey)}>
              Удалить
            </button>
          }

          <label>
            <div className={form.label}>
              Направление/профиль *
            </div>

            <Select
              classNamePrefix="react-select"
              value={dictionaries.directions.find(d => d.id === item.admission_direction_id)}
              getOptionValue={option => option.id}
              noOptionsMessage={() => 'Ничего не найдено'}
              options={dictionaries.directions}
              placeholder="Выберите достижение.."
              onChange={value => handleSelectChange('admission_direction_id', value.id)}
            />
          </label>
        </div>

        <Errors errors={errors[`directions[${directionKey}].admission_direction`]} />
      </div>

      <div className={styles.row}>
        <div className={form.item}>

          <div className={form.input}>
            <div className={form.label}>
              Форма обучения *
            </div>

            <select name="form" onChange={handleInputChange} value={item.form}>
              <option value=""></option>
              <option value="1">Очная</option>
              <option value="2">Очно-заочная</option>
              <option value="3">Заочная</option>
            </select>
          </div>

          <Errors errors={errors[`directions[${directionKey}].form`]} />
        </div>

        <div className={form.item}>
          <div className={form.input}>
            <div className={form.label}>
              Финансовая основа *
            </div>

            <select name="basis" onChange={handleInputChange} value={item.basis}>
              <option value=""></option>
              <option value="1">Бюджет</option>
              <option value="2">Фин. договор</option>
            </select>
          </div>

          <Errors errors={errors[`directions[${directionKey}].basis`]} />
        </div>
      </div>

      <br />
    </>
  )
}
