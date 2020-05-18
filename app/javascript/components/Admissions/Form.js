import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'

import { Title } from '../Pages'
import { useForm } from '../Form'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import StepFour from './Steps/StepFour'
import StepFive from './Steps/StepFive'
import StepSix from './Steps/StepSix'
import StepSeven from './Steps/StepSeven'
import StepEight from './Steps/StepEight'

import styles from './Admissions.module.css'
import pages from '../Pages.module.css'
import form from '../Form.module.css'
import buttons from '../Buttons.module.css'

Form.propTypes = {
  id: PropTypes.string
}

export default function Form ({ id }) {
  const {
    values,
    setValues,
    handleInputChange,
    errors,
    pending,
    setErrors,
    onSubmit,
    cancelToken
  } = useForm({
  })

  const [admission, setAdmission] = useState()

  const _fetch = async () => {
    const { data } = await axios.get(`/admissions/${id}/edit.json`)

    setAdmission(data.admission)
    setValues(data.values)
  }

  useEffect(() => {
    _fetch()
  }, [id])

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
    <div className={pages.container}>
      <Title
        h1="Электронная заявка"
      />

      <div className={styles.root}>
        <div className={styles.form}>
          {values && admission &&
            <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
              {admission.state === 'one' &&
                <StepOne onChange={handleInputChange} values={values} errors={errors}/>
              }
              {admission.state === 'two' &&
                <StepTwo onChange={handleInputChange} values={values} errors={errors}/>
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
                <StepSeven onChange={handleInputChange} values={values} errors={errors}/>
              }
              {admission.state === 'eight' &&
                <StepEight onChange={handleInputChange} values={values} errors={errors}/>
              }
              {admission.state === 'done' &&
                <div>Done</div>
              }

              <div className={classNames(form.submit, styles.submit)}>
                <input type="submit" value={pending ? 'Отправляем...' : 'Следующий шаг'} className={classNames(buttons.main, buttons.big, { [buttons.pending]: pending })} disabled={pending} />
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}
