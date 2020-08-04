import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { deserialize } from 'jsonapi-deserializer'
import classNames from 'classnames'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { DirectUpload } from '@rails/activestorage'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'

import { useI18n } from '../I18n'

import { useForm, Errors } from '../Form'
import Title from '../Title'

import styles from './Form.module.css'
import pages from '../Pages.module.css'
import buttons from '../Buttons.module.css'
import form from '../FormStatic.module.css'

Form.propTypes = {
  tutor: PropTypes.object,
  aws: PropTypes.object,
  locale: PropTypes.string,
  courses: PropTypes.object
}

export default function Form ({ tutor: tutorData, aws, locale, courses: coursesData }) {
  const I18n = useI18n(locale)
  const tutor = deserialize(tutorData)
  const courses = deserialize(coursesData)

  const pps = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const {
    values, setValues, handleInputChange,
    errors, setErrors,
    onSubmit, pending
  } = useForm({
    first_name: tutor.first_name || '',
    middle_name: tutor.middle_name || '',
    last_name: tutor.last_name || '',
    position: tutor.position || '',
    courses: tutor.courses || [],
    edu: tutor.edu || '',
    quali: tutor.quali || '',
    adegree: tutor.adegree || '',
    atitle: tutor.atitle || '',
    school: tutor.school || '',
    edu_direction: tutor.edu_direction || '',
    exp: tutor.exp || '',
    edu_exp: tutor.edu_exp || '',
    conference: tutor.conference ? EditorState.createWithContent(convertFromRaw(tutor.conference)) : EditorState.createEmpty(),
    publication: tutor.publication ? EditorState.createWithContent(convertFromRaw(tutor.publication)) : EditorState.createEmpty(),
    discipline: tutor.discipline ? EditorState.createWithContent(convertFromRaw(tutor.discipline)) : EditorState.createEmpty(),
    training: tutor.training ? EditorState.createWithContent(convertFromRaw(tutor.training)) : EditorState.createEmpty(),
    achievements: tutor.achievements ? EditorState.createWithContent(convertFromRaw(tutor.achievements)) : EditorState.createEmpty(),
    pps: tutor.pps || [],
    phone: tutor.phone || '',
    email: tutor.email || '',
    consultation: tutor.consultation || ''
  })

  const [photo, setPhoto] = useState(tutor.photo)

  const handleSubmit = e => {
    const params = {
      ...values,
      conference: values.conference.getCurrentContent().hasText() ? convertToRaw(values.conference.getCurrentContent()) : null,
      publication: values.publication.getCurrentContent().hasText() ? convertToRaw(values.publication.getCurrentContent()) : null,
      discipline: values.discipline.getCurrentContent().hasText() ? convertToRaw(values.discipline.getCurrentContent()) : null,
      training: values.training.getCurrentContent().hasText() ? convertToRaw(values.training.getCurrentContent()) : null,
      achievements: values.achievements.getCurrentContent().hasText() ? convertToRaw(values.achievements.getCurrentContent()) : null
    }

    if (tutor.id) {
      handleUpdate(params)
    } else {
      handleCreate(params)
    }
  }

  const handleCreate = async (params) => {
    await axios.post(
      '/tutors.json',
      { tutor: params }
    ).then(res => {
      console.log(res)
    }).catch(error => {
      setErrors(error.response.data)
    })
  }

  const handleUpdate = async (params) => {
    await axios.patch(
      `/tutors/${tutor.id}.json`,
      { tutor: params }
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

  function setBlockStyle (block) {
    switch (block.getType()) {
      case 'unstyled': return `${styles.list_block}`
      default: return null
    }
  }

  const handleCoursesChange = (item) => {
    const newCourses = values.courses
    if (values.courses.includes(item)) {
      newCourses.splice(newCourses.indexOf(item), 1)
    } else {
      newCourses.push(item)
    }

    setValues({ ...values, courses: newCourses })
  }

  const handlePpsChange = (item) => {
    const newPps = values.pps
    if (values.pps.includes(item)) {
      newPps.splice(newPps.indexOf(item), 1)
    } else {
      newPps.push(item)
    }

    setValues({ ...values, pps: newPps })
  }

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1="Анкета преподавателя"
      />

      <div className={pages.container}>
        <div className={styles.form}>
          <form className={form.root} onSubmit={onSubmit(handleSubmit)}>
            <div className={classNames(styles.dropzone, { [styles.drag]: isDragActive })} {...getRootProps()}>
              <input {...getInputProps()} />

              {photo &&
                <img src={`https://assets.lunn.ru/s3/rs:fill:500:200/g:sm/q:75/${photo.encoded_path}.jpg`} width="400" />
              }

              {!photo &&
                <p>
                  Прикрепите файл перетащив его в эту область или кликните по ней.
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

            <div className={form.item}>
              <div className={form.checkbox}>
                <div className={form.label}>
                  Направления подготовки
                </div>

                {courses &&
                  <div className={form.input}>
                    {courses.map(course =>
                      <div key={course.id} className={form.checkbox}>
                        <label>
                          <input
                            type="checkbox"
                            name={course.id}
                            checked={values.courses.includes(parseInt(course.id))}
                            onChange={() => handleCoursesChange(parseInt(course.id))} />
                          {course.title} - {course.spec}
                        </label>
                      </div>
                    )}
                  </div>
                }
              </div>
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Уровень образования
                  </div>

                  <input
                    value={values.edu}
                    type="text"
                    name="edu"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.edu} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Квалификация
                  </div>

                  <input
                    value={values.quali}
                    type="text"
                    name="quali"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.quali} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Ученая степень
                  </div>

                  <input
                    value={values.adegree}
                    type="text"
                    name="adegree"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.adegree} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Ученое звание
                  </div>

                  <input
                    value={values.atitle}
                    type="text"
                    name="atitle"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.atitle} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Образование (вуз)
                  </div>

                  <input
                    value={values.school}
                    type="text"
                    name="school"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.school} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Образование (направление)
                  </div>

                  <input
                    value={values.edu_direction}
                    type="text"
                    name="edu_direction"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.edu_direction} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Общий стаж работы
                  </div>

                  <input
                    value={values.exp}
                    type="text"
                    name="exp"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.exp} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Научно-педагогический стаж
                  </div>

                  <input
                    value={values.edu_exp}
                    type="text"
                    name="edu_exp"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.edu_exp} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Публикации
                  </div>

                  <div className={form.draft}>
                    <Editor
                      blockStyleFn={setBlockStyle}
                      editorState={values.publication}
                      onChange={(editorState) => setValues({ ...values, publication: editorState })} />
                  </div>
                </label>
              </div>

              <Errors errors={errors.publication} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Участие в конферециях
                  </div>

                  <div className={form.draft}>
                    <Editor
                      blockStyleFn={setBlockStyle}
                      editorState={values.conference}
                      onChange={(editorState) => setValues({ ...values, conference: editorState })} />
                  </div>
                </label>
              </div>

              <Errors errors={errors.conference} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Преподаваемые дисциплины
                  </div>

                  <div className={form.draft}>
                    <Editor
                      blockStyleFn={setBlockStyle}
                      editorState={values.discipline}
                      onChange={(editorState) => setValues({ ...values, discipline: editorState })} />
                  </div>
                </label>
              </div>

              <Errors errors={errors.discipline} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Повышение квалификации
                  </div>

                  <div className={form.draft}>
                    <Editor
                      blockStyleFn={setBlockStyle}
                      editorState={values.training}
                      onChange={(editorState) => setValues({ ...values, training: editorState })} />
                  </div>
                </label>
              </div>

              <Errors errors={errors.training} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Особые достижения
                  </div>

                  <div className={form.draft}>
                    <Editor
                      blockStyleFn={setBlockStyle}
                      editorState={values.achievements}
                      onChange={(editorState) => setValues({ ...values, achievements: editorState })} />
                  </div>
                </label>
              </div>

              <Errors errors={errors.achievements} />
            </div>

            <div className={form.item}>
              <div className={form.checkbox}>
                <div className={form.label}>
                  Тип ППС
                </div>

                <div className={form.input}>
                  { pps.map(p =>
                    <div key={p} className={form.checkbox}>
                      <label>
                        <input
                          type="checkbox"
                          name={p}
                          checked={values.pps.includes(p)}
                          onChange={() => handlePpsChange(p)} />
                        {I18n.t(`tutor.pps.${p}`)}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Телефон
                  </div>

                  <input
                    value={values.phone}
                    type="text"
                    name="phone"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.phone} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Почта
                  </div>

                  <input
                    value={values.email}
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <Errors errors={errors.email} />
            </div>

            <div className={form.item}>
              <div className={form.input}>
                <label>
                  <div className={form.label}>
                    Время консультаций
                  </div>

                  <div className={form.input}>
                    <textarea name="consultation" value={values.consultation} rows="4" onChange={handleInputChange} />
                  </div>
                </label>
              </div>

              <Errors errors={errors.consultation} />
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
