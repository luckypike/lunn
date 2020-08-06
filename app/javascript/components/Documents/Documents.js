import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import uuidv4 from 'uuid/v4'

import { useForm } from '../Form'

import styles from './Documents.module.css'
import form from '../Form.module.css'

import Loader from '!svg-react-loader?!../../images/oval.svg'

Documents.propTypes = {
  files: PropTypes.array,
  setUploading: PropTypes.func,
  section: PropTypes.string,
  values: PropTypes.object,
  setValues: PropTypes.func
}

export default function Documents ({ values, setUploading, setValues, section }) {
  // const { setValues } = props
  const [files, setFiles] = useState(new Map())

  useEffect(() => {
    if (values) {
      const newFiles = new Map(files)

      values.documents_attributes.forEach(file => {
        if (!files.has(file.uuid)) {
          newFiles.set(file.uuid, file)
        }
      })

      setFiles(newFiles)
    }
  }, [])

  const onDrop = acceptedFiles => {
    const newFiles = new Map(files)

    acceptedFiles.forEach(file => {
      newFiles.set(uuidv4(), file)
    })

    setFiles(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleFileChanged = attachment => {
    const newFiles = new Map(files)
    newFiles.set(attachment.uuid, attachment)

    setFiles(newFiles)
  }

  const handleFileDeleted = async (attachment) => {
    const newFiles = new Map(files)

    newFiles.delete(attachment.uuid)

    await axios.delete(
      `/admission_documents/${attachment.id}.json`
    ).then(() => {
      setFiles(newFiles)
    }).catch(_error => {
      // setErrors(error.response.data)
    })

    setFiles(newFiles)
  }

  useEffect(() => {
    if (files.size > 0) {
      setUploading(true)
      if (Array.from(files.keys()).every(f => files.get(f).id)) {
        setUploading(false)
      }
      setValues({
        ...values,
        document_ids: [...files.values()].map(document => document.id),
        documents_attributes: [...files.values()].map(document => ({ id: document.id, title: document.title }))
      })
    }
  }, [files])

  return (
    <>
      <div {...getRootProps()} className={classNames(styles.dropzone, { [styles.active]: isDragActive })}>
        <input {...getInputProps()} />
        <div className={styles.label}>
          Прикрепите файлы перетащив их в эту область или нажмите кнопку «Загрузить файлы»
        </div>

        <div className={styles.buttons}>
          <span className={styles.button}>
            Загрузить файлы
          </span>
        </div>

        <div className={styles.ext}>
          Только изображения: JPG или PNG
        </div>
      </div>

      {files.size > 0 &&
        <div className={styles.files}>
          {[...files.keys()].filter(uuid => files.get(uuid).section === section || files.get(uuid).section === undefined).map(uuid =>
            <File
              key={uuid}
              section={section}
              onFileChanged={handleFileChanged}
              onFileDeleted={handleFileDeleted}
              initFile={files.get(uuid)}
              uuid={uuid}
            />
          )}
        </div>
      }
    </>
  )
}

File.propTypes = {
  uuid: PropTypes.string,
  section: PropTypes.string,
  initFile: PropTypes.object,
  onFileChanged: PropTypes.func,
  onFileDeleted: PropTypes.func,
  onSectionChanged: PropTypes.func
}

function File ({ uuid, initFile, onFileChanged, onFileDeleted, section, onSectionChanged }) {
  const { cancelToken, errors, setErrors } = useForm()

  const [upload, setUpload] = useState(0)
  const [title, setTitle] = useState(initFile.name || initFile.title)
  const [file, setFile] = useState(initFile)

  const handleFileAttached = attached => {
    setFile(attached)
  }

  useEffect(() => {
    if (file.id) {
      onFileChanged(file)
    }
  }, [file])

  const handleTitleChanged = ({ target: { value } }) => {
    setTitle(value)
    onFileChanged({ ...file, title: value })
  }

  const isAttached = () => !!file.id

  // console.log(file)

  useEffect(() => {
    const _attach = async () => {
      const formData = new FormData()
      formData.append('document[section]', section)
      formData.append('document[uuid]', uuid)
      formData.append('document[file]', file)
      formData.append('document[title]', file.name)
      formData.append('document[size]', file.size)

      await axios.post(
        '/admission_documents.json',
        formData,
        {
          cancelToken: cancelToken.current.token,
          onUploadProgress: progressEvent => {
            const p = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            setUpload(p)
          }
        }
      ).then(({ data }) => {
        setUpload(100)
        handleFileAttached(data)
      }).catch(error => {
        setErrors(error.response.data)
      })
    }

    if (!isAttached()) {
      _attach()
    }

    return () => {
      cancelToken.current.cancel()
    }
  }, [])

  return (
    <div className={styles.file}>
      {isAttached() &&
        <div className={styles.row}>
          <div className={styles.thumb}>
            <img src={file.file.thumb.url} />
          </div>

          <div className={styles.delete}>
            <span onClick={() => onFileDeleted(file)}>
              удалить
            </span>
          </div>
        </div>
      }

      {!isAttached() &&
        <div className={styles.row}>
          {errors.file &&
            <div className={styles.error}>
              {errors.file[0]}
            </div>
          }

          {!errors.file &&
            <>
              <div className={styles.thumb}>
                <Loader className={styles.loader} />
              </div>

              <div className={styles.title}>
                {title}
              </div>

              <div className={styles.upload}>
                <div className={styles.bar} style={{ width: `${upload}%` }} />
                {upload >= 100 ? '99% обработка..' : upload + '%'}
              </div>
            </>
          }
        </div>
      }
    </div>
  )
}
