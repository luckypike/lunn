import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'

import Title from '../Title'
import { useForm } from '../Form'
import { useI18n } from '../I18n'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import StepFour from './Steps/StepFour'
import StepFive from './Steps/StepFive'
import StepSix from './Steps/StepSix'
import StepSeven from './Steps/StepSeven'
import StepEight from './Steps/StepEight'
import StepNine from './Steps/StepNine'
import StepTen from './Steps/StepTen'

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

    setAdmission(data.admission)
    setValues(data.values)
    setDictionaries(data.dictionaries)
  }

  useEffect(() => {
    _fetch()
  }, [id])

  const handleSelectChange = (name, value) => {
    setValues({ ...values, [name]: value })
  }

  const handleCheckboxChange = (name, value) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubjectsChange = (subjects) => {
    setValues({
      ...values,
      subject_ids: [...subjects.values()].map(subject => subject.id),
      subjects_attributes: [...subjects.values()].map(subject => (subject))
    })
  }

  const handleDirectionsChange = (directions) => {
    setValues({
      ...values,
      direction_ids: [...directions.values()].map(direction => direction.id),
      directions_attributes: [...directions.values()].map(direction => (direction))
    })
  }

  const handleDocumentsChanged = (documents) => {
    setValues({
      ...values,
      document_ids: [...documents.values()].map(document => document.id),
      documents_attributes: [...documents.values()].map(document => ({ id: document.id, title: document.title }))
    })
  }

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

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={admission && I18n.t('admissions.edit.title', { number: admission.number })}
      />

      <div className={styles.root}>
        <div className={styles.form}>
          {values && admission &&
            <>
              <div className={styles.step}>
                <h2>{I18n.t(`admissions.steps.${admission.state}`)}</h2>
              </div>

              <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
                {admission.state === 'one' &&
                  <StepOne onChange={handleInputChange} values={values} errors={errors}/>
                }
                {admission.state === 'two' &&
                  <StepTwo
                    onChange={handleInputChange}
                    onSelectChange={handleSelectChange}
                    onDocumentsChanged={handleDocumentsChanged}
                    values={values}
                    documents={admission.documents}
                    dictionaries={dictionaries}
                    errors={errors}
                    cancelToken={cancelToken}
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
                    onDocumentsChanged={handleDocumentsChanged}
                    values={values}
                    documents={admission.documents}
                    errors={errors}/>
                }
                {admission.state === 'eight' &&
                  <StepEight onChange={handleInputChange} values={values} errors={errors}/>
                }
                {admission.state === 'nine' &&
                  <StepNine
                    onChange={handleInputChange}
                    onSubjectsChange={handleSubjectsChange}
                    onCheckboxChange={handleCheckboxChange}
                    onSelectChange={handleSelectChange}
                    values={values}
                    dictionaries={dictionaries}
                    errors={errors}/>
                }
                {admission.state === 'ten' &&
                  <StepTen
                    onChange={handleInputChange}
                    onDirectinosChange={handleDirectionsChange}
                    onSelectChange={handleSelectChange}
                    values={values}
                    dictionaries={dictionaries}
                    errors={errors}/>
                }
                {admission.state === 'done' &&
                  <div>
                    <p>Спасибо за заполнение, ваша заявка принята и будет обработана в ближайшее время.</p>
                  </div>
                }

                {admission.state !== 'done' &&
                  <div className={classNames(form.submit, styles.submit)}>
                    <input type="submit" value={pending ? 'Отправляем...' : 'Следующий шаг'} className={classNames(buttons.main, buttons.big, { [buttons.pending]: pending })} disabled={pending} />
                  </div>
                }
              </form>
            </>
          }
        </div>
      </div>
    </div>
  )
}
