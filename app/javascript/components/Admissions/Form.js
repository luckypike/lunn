import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'

import { Title } from '../Pages'
import { useForm } from '../Form'

import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'

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

  useEffect(() => {
    const _fetch = async () => {
      const {
        data: {
          values
        }
      } = await axios.get(`/admissions/${id}/edit.json`)

      console.log(values)

      setValues(values)
    }

    _fetch()
  }, [id])

  const handleSubmit = async e => {
    await axios.patch(
      `/admissions/${id}`,
      { admission: values },
      { cancelToken: cancelToken.current.token }
    ).then(res => {
      console.log('ok')
      console.log(res.data)
      setValues(res.data.values)
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
          {values &&
            <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
              {values.state === 'one' &&
                <StepOne onChange={handleInputChange} values={values} errors={errors}/>
              }
              {values.state === 'two' &&
                <StepTwo onChange={handleInputChange} values={values} errors={errors}/>
              }
              {values.state === 'three' &&
                <StepThree onChange={handleInputChange} values={values} errors={errors}/>
              }
              {values.state === 'done' &&
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
