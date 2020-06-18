import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { navigate } from '@reach/router'
import classNames from 'classnames'
import { Helmet } from 'react-helmet'

import Title from '../Title'
import Steps from './Form/Steps'
import { useForm } from '../Form'
import { I18nContext, useI18n } from '../I18n'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import StepFour from './Steps/StepFour'
import StepFive from './Steps/StepFive'
import StepSix from './Steps/StepSix'
import StepSeven from './Steps/StepSeven'
import StepEight from './Steps/StepEight'
import StepNine from './Steps/StepNine'

import styles from './Form.module.css'
import pages from '../Pages.module.css'
import form from '../Form.module.css'
import buttons from '../Buttons.module.css'

Form.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string
}

export default function Form ({ id, locale }) {
  const I18n = useI18n(locale)

  const {
    values,
    setValues,
    handleInputChange,
    errors,
    pending,
    setErrors,
    onSubmit,
    cancelToken
  } = useForm()

  const [admission, setAdmission] = useState()
  const [dictionaries, setDictionaries] = useState()

  const _fetch = async () => {
    const { data } = await axios.get(`/admissions/${id}/edit.json`)

    setValues({
      ...data.values,
      identity_birth_date: data.values.identity_birth_date ? new Date(data.values.identity_birth_date) : null,
      document_issue_date: data.values.document_issue_date ? new Date(data.values.document_issue_date) : null,
      school_document_date: data.values.school_document_date ? new Date(data.values.school_document_date) : null
    })
    setAdmission(data.admission)
    setDictionaries(data.dictionaries)
  }

  useEffect(() => {
    _fetch()
  }, [id])

  useEffect(() => {
    if (admission && admission.state === 'done') {
      navigate(`/admissions/${id}`)
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [admission])

  const handleSubmit = async e => {
    await axios.patch(
      `/admissions/${id}.json`,
      { admission: values },
      { cancelToken: cancelToken.current.token }
    ).then(res => {
      _fetch()
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  const handlePrevClick = async e => {
    e.preventDefault()

    await axios.post(
      `/admissions/${id}/jump.json`,
      { admission: { state: admission.step_prev } },
      { cancelToken: cancelToken.current.token }
    ).then(res => {
      _fetch()
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  return (
    <I18nContext.Provider value={I18n}>
      <div className={pages.beta}>
        <Title
          beta
          h1={admission && I18n.t('admissions.edit.title', { number: admission.number })}
        />

        {admission &&
          <>
            <Helmet>
              <title>{I18n.t('admissions.edit.title', { number: admission.number })}</title>
            </Helmet>

            <div className={styles.steps}>
              <div className={pages.container}>
                <Steps admission={admission} locale={locale} _fetch={_fetch} />
              </div>
            </div>
          </>
        }

        <div className={styles.root}>
          <div className={styles.form}>
            {values && admission &&
              <>
                <div className={styles.step}>
                  <p>
                    Шаг {admission.state_key} из 10
                  </p>

                  <h3>{I18n.t(`admissions.steps.${admission.state}`)}</h3>
                </div>

                <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
                  {admission.state === 'one' &&
                    <StepOne onChange={handleInputChange} values={values} errors={errors} setValues={setValues} />
                  }

                  {admission.state === 'two' &&
                    <StepTwo
                      onChange={handleInputChange}
                      values={values}
                      setValues={setValues}
                      documents={admission.documents}
                      dictionaries={dictionaries}
                      errors={errors}
                    />
                  }

                  {admission.state === 'three' &&
                    <StepThree onChange={handleInputChange} values={values} errors={errors}/>
                  }

                  {admission.state === 'four' &&
                    <StepFour onChange={handleInputChange} values={values} errors={errors}/>
                  }

                  {admission.state === 'five' &&
                    <StepFive onChange={handleInputChange} values={values} errors={errors}/>
                  }

                  {admission.state === 'six' &&
                    <StepSix onChange={handleInputChange} values={values} errors={errors}/>
                  }

                  {admission.state === 'seven' &&
                    <StepSeven
                      onChange={handleInputChange}
                      values={values}
                      setValues={setValues}
                      documents={admission.documents}
                      errors={errors}/>
                  }

                  {admission.state === 'eight' &&
                    <StepEight
                      onChange={handleInputChange}
                      values={values}
                      setValues={setValues}
                      documents={admission.documents}
                      dictionaries={dictionaries}
                      errors={errors}/>
                  }

                  {admission.state === 'nine' &&
                    <StepNine
                      onChange={handleInputChange}
                      values={values}
                      setValues={setValues}
                      documents={admission.documents}
                      dictionaries={dictionaries}
                      errors={errors}
                    />
                  }

                  {Object.keys(errors).length > 0 &&
                    <div className={styles.errors}>
                      Исправьте ошибки в форме чтобы продолжить заполнение!
                    </div>
                  }

                  {admission.state !== 'done' &&
                    <div className={styles.actions}>
                      {admission.state !== 'one' &&
                        <div className={styles.prev}>
                          <span onClick={handlePrevClick}>
                            Назад
                          </span>
                        </div>
                      }

                      <div className={classNames(form.submit, styles.submit)}>
                        <input type="submit" value={pending ? 'Отправляем...' : 'Следующий шаг'} className={classNames(buttons.main_big, { [buttons.pending]: pending })} disabled={pending} />
                      </div>
                    </div>
                  }
                </form>
              </>
            }
          </div>
        </div>
      </div>
    </I18nContext.Provider>
  )
}
