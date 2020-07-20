import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { deserialize } from 'jsonapi-deserializer'
import classNames from 'classnames'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { DirectUpload } from '@rails/activestorage'

import { useForm, Errors } from '../Form'
import Title from '../Title'

import styles from './Form.module.css'
import pages from '../Pages.module.css'
import buttons from '../Buttons.module.css'
import form from '../FormStatic.module.css'

Form.propTypes = {
  tutor: PropTypes.object,
  aws: PropTypes.object
}

export default function Form ({ tutor: tutorData, aws }) {
  const tutor = deserialize(tutorData)

  const {
    values, setValues, handleInputChange,
    errors, setErrors,
    onSubmit, pending
  } = useForm({
    first_name: tutor.first_name || '',
    middle_name: tutor.middle_name || '',
    last_name: tutor.last_name || '',
    position: tutor.position || ''
  })

  const [photo, setPhoto] = useState(tutor.photo)

  const handleSubmit = e => {
    if (tutor.id) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  const handleCreate = async () => {
    await axios.post(
      '/tutors.json',
      { tutor: values }
    ).then(res => {
      console.log(res)
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  const handleUpdate = async () => {
    await axios.patch(
      `/tutors/${tutor.id}.json`,
      { tutor: values }
    ).then(res => {
      console.log(res)
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  const handlePhotoUpload = useCallback(async acceptedFiles => {
    const url = '/rails/active_storage/direct_uploads.json'
    const upload = new DirectUpload(acceptedFiles[0], url)

    upload.create((error, blob) => {
      if (error) {
        console.log(error)
      } else {
        console.log(blob)
        // console.log(values)
        setValues({ ...values, photo: blob.signed_id })

        const encodedPath = Buffer.from(`s3://${aws.bucket}/${blob.key}`).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

        // console.log(encodedPath)
        setPhoto({ ...photo, encoded_path: encodedPath, key: blob.key })
      }
    })
  }, [values, photo])

  const {
    getRootProps, getInputProps, isDragActive
  } = useDropzone({ onDrop: handlePhotoUpload, multiple: false })

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1="Анкета преподавателя"
      />

      <div className={pages.container}>
        <div>
          <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
            <div className={classNames(styles.dropzone, { [styles.drag]: isDragActive })} {...getRootProps()}>
              <input {...getInputProps()} />

              {photo &&
                <img src={`https://assets.lunn.ru/s3/rs:fill:500:200/g:sm/q:75/${photo.encoded_path}.jpg`} width="400" />
              }

              {!photo &&
                <p>
                  Загрузите вашу фотографию
                </p>
              }
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Имя
                  </div>

                  <input
                    value={values.first_name}
                    type="text"
                    name="first_name"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.first_name} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Фамилия
                  </div>

                  <input
                    value={values.last_name}
                    type="text"
                    name="last_name"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.last_name} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Отчество
                  </div>

                  <input
                    value={values.middle_name}
                    type="text"
                    name="middle_name"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.middle_name} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Должность
                  </div>

                  <input
                    value={values.position}
                    type="text"
                    name="position"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.position} />
            </div>

            <div className={form.submit}>
              <input
                type="submit"
                value={pending ? 'Сохраняем...' : 'Сохранить'}
                className={classNames(buttons.main_big, { [buttons.pending]: pending })}
                disabled={pending}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
