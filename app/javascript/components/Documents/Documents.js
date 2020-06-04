import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import uuidv4 from 'uuid/v4'

import { useForm } from '../Form'

import styles from './Documents.module.css'
import form from '../Form.module.css'

Documents.propTypes = {
  files: PropTypes.array,
  section: PropTypes.string,
  onDocumentsChanged: PropTypes.func
}

export default function Documents (props) {
  const { onDocumentsChanged } = props
  const [files, setFiles] = useState(new Map())

  useEffect(() => {
    if (props.files) {
      const newFiles = new Map(files)

      props.files.forEach(file => {
        if (!files.has(file.uuid)) {
          newFiles.set(file.uuid, file)
        }
      })

      setFiles(newFiles)
    }
  }, [props.files])

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
      `/admission_documents/${attachment.id}`
    ).then(() => {
      setFiles(newFiles)
    }).catch(_error => {
      // setErrors(error.response.data)
    })

    setFiles(newFiles)
  }

  useEffect(() => {
    if (files.size > 0) {
      onDocumentsChanged && onDocumentsChanged(files)
    }
  }, [files])

  return (
    <>
      <div {...getRootProps()} className={classNames(styles.dropzone, { [styles.active]: isDragActive })}>
        <input {...getInputProps()} />
        <div className={styles.label}>
          Прикрепите файлы перетащив их в эту область или нажмите для выбора.
          <br />
          Название файла может содержать не более 50 символов.
        </div>
      </div>

      {files.size > 0 &&
        <div className={styles.files}>
          {[...files.keys()].map(uuid =>
            (files.get(uuid).section === props.section || files.get(uuid).section === undefined) &&
              <File
                section={props.section}
                key={uuid}
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
  const { cancelToken } = useForm()

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

  useEffect(() => {
    const _attach = async () => {
      const formData = new FormData()
      formData.append('document[section]', section)
      formData.append('document[uuid]', uuid)
      formData.append('document[file]', file)
      formData.append('document[title]', file.name)
      formData.append('document[size]', file.size)

      await axios.post(
        '/admission_documents',
        formData,
        { cancelToken: cancelToken.current.token },
        {
          onUploadProgress: progressEvent => {
            const p = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            setUpload(p)
          }
        }
      ).then(({ data }) => {
        setUpload(100)
        handleFileAttached(data)
      }).catch(_error => {
        // setErrors(error.response.data)
      })
    }

    if (!isAttached()) {
      _attach()
    }
  }, [])

  return (
    <div className={styles.file}>
      {isAttached() &&
        <div className={styles.row}>
          <div className={classNames(form.input, styles.title)}>
            <input
              type="text"
              value={title}
              onChange={handleTitleChanged}
            />
          </div>

          <div className={styles.delete} onClick={() => onFileDeleted(file)}>
            удалить
          </div>
        </div>
      }

      {!isAttached() &&
        <div className={styles.row}>
          <div className={styles.title}>
            {title}
          </div>

          <div className={styles.upload}>
            <div className={styles.bar} style={{ width: `${upload}%` }} />
            {upload >= 100 ? '99% обработка..' : upload + '%'}
          </div>
        </div>
      }
    </div>
  )
}
