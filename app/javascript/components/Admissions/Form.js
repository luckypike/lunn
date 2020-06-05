import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { navigate } from '@reach/router'
import classNames from 'classnames'

import Title from '../Title'
import Steps from './Form/Steps'
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

    setValues(data.values)
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

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={admission && I18n.t('admissions.edit.title', { number: admission.number })}
      />

      {admission &&
        <div className={styles.steps}>
          <div className={pages.container}>
            <Steps admission={admission} locale={locale}/>
          </div>
        </div>
      }

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
                  <StepEight onChange={handleInputChange} values={values} errors={errors}/>
                }
                {admission.state === 'nine' &&
                  <StepNine
                    onChange={handleInputChange}
                    values={values}
                    setValues={setValues}
                    dictionaries={dictionaries}
                    errors={errors}/>
                }
                {admission.state === 'ten' &&
                  <StepTen
                    onChange={handleInputChange}
                    values={values}
                    setValues={setValues}
                    dictionaries={dictionaries}
                    errors={errors}
                  />
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
