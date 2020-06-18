import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Select from 'react-select'

import { Errors } from '../../Form'
import { I18nContext } from '../../I18n'
import Documents from '../../Documents/Documents'

import styles from './StepNine.module.css'
import form from '../../FormStatic.module.css'
import buttons from '../../Buttons.module.css'

StepNine.propTypes = {
  values: PropTypes.object,
  setValues: PropTypes.func,
  dictionaries: PropTypes.object,
  documents: PropTypes.array,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func
}

export default function StepNine ({ values, setValues, dictionaries, documents, errors, onChange, onSelectChange }) {
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

    if (values.directions_attributes.length > 0) {
      values.directions_attributes.forEach((direction, i) => {
        newDirections.set(i, direction)
      })
    }

    const j = newDirections.size
    if (j < 1) {
      newDirections.set(0, {
        course_id: '', form: '', basis: ''
      })
    }

    setDirections(newDirections)
  }, [])

  const handleDirectionAdd = (e) => {
    const newDirections = new Map(directions)
    newDirections.set(directions.size, { course_id: '', form: '', basis: '' })

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
          Напоминаем вам, что в одном вузе абитуриент может выбрать максимум 3 направления подготовки. Обратите внимание: на одном направлении может быть несколько форм обучения, профилей, а на некоторых направлениях прием в нашем университете ведется раздельно в разные группы в зависимости от первого иностранного языка (это разделение отражено в нашем плане приема). Это значит, что вы можете выбрать в рамках одного направления разные профили и языки, очную, заочную и очно-заочную формы обучения (при их наличии), бюджетную или платную основу обучения, но все это будет считаться одним выбором (подсказка: одно направление обозначено в плане приема одним шифром, например: 41.03.05), то есть вы можете выбрать еще 2 направления подготовки. Внимание: «44.03.01 Педагогическое образование (иностранный язык)» и «44.03.05 Педагогическое образование с двумя профилями» - это два разных направления! Как и направление «45.03.02 Лингвистика (профиль Перевод и переводоведение)» и специальность «45.05.01 Перевод и переводоведение».
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

        {directions.size < 70 &&
          <div className={styles.new}>
            <span onClick={handleDirectionAdd}>
              Добавить ещё одно направление
            </span>
          </div>
        }
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Основание для поступления на места в рамках особой квоты
            </div>

            <select name="course_status" onChange={onChange} value={values.course_status}>
              <option value=""></option>
              <option value="1">Сирота</option>
              <option value="2">Инвалид</option>
              <option value="3">Ветеран боевых действий</option>
            </select>
          </label>
        </div>

        <Errors errors={errors.course_status} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="course_contract"
                checked={values.course_contract}
                onChange={onChange}
              />

              Целевой договор
            </div>
          </label>
        </div>

        <Errors errors={errors.course_contract} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="course_military"
                checked={values.course_military}
                onChange={onChange}
              />

              Военнообязанный
            </div>
          </label>
        </div>

        <Errors errors={errors.course_military} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="course_study"
                checked={values.course_study}
                onChange={onChange}
              />

              Пройдено обучение на курсах НГЛУ
            </div>
          </label>
        </div>

        <Errors errors={errors.course_study} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Сканы/фото подтверждающих документов
          </div>

          <div className={form.hint}>
            <p>
              Для целевого договора копия договора о целевом обучении.
            </p>

            <p>
              Для льгот и особого права: справка об инвалидности, копия удостоверения ветерана боевых действий, копия свидетельства о рождении абитуриента, копия свидетельства о смерти отца, копия свидетельства о смерти матери, копия решения суда о лишении родительских прав одного или обоих родителей, справка из ЗАГСА о том, что отец записан со слов матери, копия решения о назначении опекуна.
            </p>

            <p>
              Если вы уже готовы заключить договор о платном обучении, загрузите скан-копии или фотографии страниц паспорта с личными данными и пропиской одного из родителей (кто будет заказчиком в договоре). Для иностранных граждан, а также для абитуриентов, поступающих на направление «Педагогическое образование»: медицинские справки.
            </p>
          </div>

          <Errors errors={errors.documents} />

          <Documents
            files={documents}
            section="spec"
            values={values}
            setValues={setValues}
          />
        </div>
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
  const I18n = useContext(I18nContext)

  // const [level, setLevel] = useState()
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
          {directionKey > 0 &&
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
              value={dictionaries.directions.find(d => d.id === item.course_id)}
              getOptionValue={option => option.id}
              getOptionLabel={option => `${I18n.t(`courses.levels.${option.level}`)}. ${option.title} (${option.course_code}).${option.spec ? ` ${option.spec}.` : ''}`}
              noOptionsMessage={() => 'Ничего не найдено'}
              options={dictionaries.directions}
              placeholder="Выберите направление.."
              onChange={value => handleSelectChange('course_id', value.id)}
            />
          </label>
        </div>

        <Errors errors={errors[`directions[${directionKey}].course`]} />
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
