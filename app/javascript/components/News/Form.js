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
import form from '../FormStatic.module.css'
import buttons from '../Buttons.module.css'

Form.propTypes = {
  news: PropTypes.object,
  aws: PropTypes.object,
  id: PropTypes.number
}

export default function Form ({ news: newsData, aws, id }) {
  const news = deserialize(newsData)
  const [images, setImages] = useState(news.images)
  console.log(images)

  const {
    values, saved, setSaved,
    handleInputChange, errors,
    pending, setErrors,
    onSubmit, setValues
  } = useForm({
    title: news.title || '',
    user_id: id
  })

  const handleCreate = async e => {
    await axios.post(
      '/news.json',
      { news: values }
    ).then(res => {
      setSaved(true)
      // console.log(res)
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  const handleUpdate = async () => {
    await axios.patch(
      `/news/${news.id}.json`,
      { news: values }
    ).then(res => {
      // console.log(res)
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  const handleSubmit = async e => {
    if (news.id) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  const handlePhotoUpload = useCallback(async acceptedFiles => {
    const url = '/rails/active_storage/direct_uploads.json'

    const upload = new DirectUpload(acceptedFiles, url)

    upload.create((error, blob) => {
      if (error) {
        console.log(error)
      } else {
        console.log(blob)
        setValues({ ...values, images: blob.signed_id })

        const encodedPath = Buffer.from(`s3://${aws.bucket}/${blob.key}`).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

        console.log(encodedPath)
        setImages({ ...images, encoded_path: encodedPath, key: blob.key })
      }
    })
  }, [values, images])

  const {
    getRootProps, getInputProps, isDragActive
  } = useDropzone({ onDrop: handlePhotoUpload, multiple: true })

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1="Анкета новостей"
      />

      <div className={pages.container}>
        <div className={styles.form}>
          {saved &&
            <div className={styles.saved}>
              Новость сохранена
            </div>
          }

          {!saved &&
            <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
              <div className={classNames(styles.dropzone, { [styles.drag]: isDragActive })} {...getRootProps()}>
                <input {...getInputProps()} />

                {images &&
                  <img src={`https://assets.lunn.ru/s3/rs:fill:500:200/g:sm/q:75/${images.encoded_path}.jpg`} width="400" />
                }

                {!images &&
                  <p>
                    Загрузите фото
                  </p>
                }
              </div>

              <div className={form.el}>
                <div className={classNames(form.input, styles.title)}>
                  <label>
                    <div className={form.label}>
                      Заголовок
                    </div>

                    <input
                      type="text"
                      value={values.title}
                      name="title"
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <Errors errors={errors.title} />
              </div>

              <div className={form.submit}>
                <input
                  type="submit"
                  value={pending ? 'Создание...' : 'Создать' }
                  className={classNames(buttons.main_big, { [buttons.pending]: pending })}
                  disabled={pending}
                />
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}
