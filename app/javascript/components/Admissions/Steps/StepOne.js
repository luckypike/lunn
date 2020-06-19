import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'
import styles from './StepOne.module.css'

StepOne.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  setValues: PropTypes.func,
  onChange: PropTypes.func
}

export default function StepOne ({ values, errors, setValues, onChange }) {
  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Фамилия *
            </div>

            <input
              value={values.identity_last_name}
              type="text"
              name="identity_last_name"
              onChange={onChange}
            />
          </label>
        </div>

        <Errors errors={errors.identity_last_name} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Имя *
            </div>

            <input
              value={values.identity_first_name}
              type="text"
              name="identity_first_name"
              onChange={onChange}
            />
          </label>
        </div>

        <Errors errors={errors.identity_first_name} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Отчество *
            </div>

            <input
              value={values.identity_middle_name}
              type="text"
              name="identity_middle_name"
              onChange={onChange}
            />
          </label>
        </div>

        <div className={form.hint}>
          Если отчества нет, поставьте почерк (-)
        </div>

        <Errors errors={errors.identity_middle_name} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Пол *
            </div>

            <select name="identity_sex" onChange={onChange} value={values.identity_sex}>
              <option value=""></option>
              <option value="1">Мужской</option>
              <option value="2">Женский</option>
            </select>
          </label>
        </div>

        <Errors errors={errors.identity_sex} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Дата рождения *
            </div>

            {/* <input
              type="date"
              value={values.identity_birth_date}
              name="identity_birth_date"
              onChange={onChange}
            /> */}

            <DatePicker
              placeholderText="01.01.2000"
              onChange={value => {
                setValues({ ...values, identity_birth_date: value })
              }}
              dateFormat="dd.MM.yyyy"
              selected={values.identity_birth_date}
            />
          </label>
        </div>

        <Errors errors={errors.identity_birth_date} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label>
            <div className={form.label}>
              Место рождения *
            </div>

            <input
              placeholder="Укажите место рождения по паспорту..."
              type="text"
              value={values.identity_birth_place}
              name="identity_birth_place"
              onChange={onChange}
            />
          </label>
        </div>

        <Errors errors={errors.identity_birth_place} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Мобильный телефон *
          </div>

          <input
            placeholder="+7 920 999-99-99"
            type="tel"
            value={values.residence_mobile}
            name="residence_mobile"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_mobile} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Домашний телефон
          </div>

          <input
            placeholder="+7 831 299-99-99"
            type="tel"
            value={values.residence_phone}
            name="residence_phone"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_phone} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_schools"
                checked={values.agreements_schools}
                onChange={onChange}
              />

              Я подал(а) заявление не более чем в пять вузов, в НГЛУ – не более чем на 3 направления подготовки (специальности)
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_schools} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_rules"
                checked={values.agreements_rules}
                onChange={onChange}
              />

              С Правилами приема, лицензией на осуществление образовательной деятельности в сфере профессионального образования, свидетельством о государственной аккредитации по выбранному направлению подготовки, Уставом университета, основными образовательными программами, с информацией об особых правах и преимуществах при приеме, с Положением о порядке учета индивидуальных достижений ознакомлен(а)
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_rules} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_dates"
                checked={values.agreements_dates}
                onChange={onChange}
              />

              С датами завершения приема заявлений о согласии на зачисление, указанными в Правилах приема в НГЛУ, ознакомлен(а)
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_dates} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_credibility"
                checked={values.agreements_credibility}
                onChange={onChange}
              />

              Предупрежден(а) об ответственности за достоверность сведений, указанных в заявлении о приеме, и за подлинность представленных документов
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_credibility} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_original"
                checked={values.agreements_original}
                onChange={onChange}
              />

              Обязуюсь в течение 2020/21 учебного года представить в НГЛУ оригинал аттестата (для поступающих на платное обучение – заверенную копию аттестата)
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_original} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_privacy"
                checked={values.agreements_privacy}
                onChange={onChange}
              />

              Подтверждаю <a className={styles.a} target="_blank" href="/terms/privacy">согласие на обработку персональных данных</a>
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_privacy} />
      </div>

      <div className={styles.sp} />

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_ma"
                checked={values.agreements_ma}
                onChange={onChange}
              />

              <div>
                <span className={styles.for}>Для поступающих на обучение на бакалавриат/специалитет на места в рамках КЦП (бюджетные места)</span>: диплома бакалавра, диплома специалиста, диплома магистра не имею
              </div>
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_ma} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_sp"
                checked={values.agreements_sp}
                onChange={onChange}
              />

              <div>
                <span className={styles.for}>
                  Для поступающих на обучение в магистратуру на места в рамках КЦП (бюджетные места)
                </span>
                : диплома специалиста (за исключением квалификации «дипломированный специалист»), диплома магистра не имею
              </div>
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_sp} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_exams"
                checked={values.agreements_exams}
                onChange={onChange}
              />

              <div>
                <span className={styles.for}>
                  Для сдающих вступительные испытания в НГЛУ
                </span>
                : с Регламентом проведения вступительных испытаний с использованием дистанционных технологий, а также с правилами подачи апелляции ознакомлен(а)
              </div>
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_exams} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_target"
                checked={values.agreements_target}
                onChange={onChange}
              />

              <div>
                <span className={styles.for}>
                  Для поступающих на целевое обучение
                </span>
                : обязуюсь в течение 2020/21 учебного года представить в НГЛУ договор (заверенную копию) о целевом обучении
              </div>
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_target} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <label className={form.checkbox2}>
            <div className={form.label}>
              <input
                type="checkbox"
                name="agreements_medical"
                checked={values.agreements_medical}
                onChange={onChange}
              />

              <div>
                <span className={styles.for}>
                  Для поступающих на направление подготовки «Педагогическое образование
                </span>
                : обязуюсь в течение 2020/21 учебного года пройти медицинский осмотр и представить в НГЛУ медицинскую справку об отсутствии противопоказаний для обучения по данному направлению подготовки
              </div>
            </div>
          </label>
        </div>

        <Errors errors={errors.agreements_medical} />
      </div>
    </>
  )
}
