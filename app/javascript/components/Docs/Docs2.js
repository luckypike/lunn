import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import mime from 'mime-types'
import classNames from 'classnames'
import AnimateHeight from 'react-animate-height'

import { I18nContext } from '../I18n'

import styles from './Docs2.module.css'

Docs.propTypes = {
  docs: PropTypes.array,
  title: PropTypes.string
}

export default function Docs ({ docs, title }) {
  const I18n = useContext(I18nContext)

  const [height, setHeight] = useState(0)

  const active = () => height !== 0

  if (docs.length === 0) return null

  return (
    <div className={styles.root}>
      <div className={classNames(styles.handle, { [styles.active]: active() })} onClick={() => setHeight(height === 0 ? 'auto' : 0)}>
        <h3>
          {title || 'Документы'}
        </h3>
      </div>

      <AnimateHeight height={height} duration={400}>
        <ul className={styles.docs}>
          {docs.map(doc =>
            <li key={`${doc.fid}-${doc.delta}`}>
              <a href={doc.path} className={styles.doc} itemProp={doc.wrapper}>
                <div className={styles.title}>
                  {doc.title ? doc.title : doc.filename}
                </div>

                <div className={styles.meta}>
                  ({mime.extension(doc.mime)}, {I18n.toHumanSize(doc.size, { precision: 1, format: '%n %u', strip_insignificant_zeros: true })})
                </div>
              </a>
            </li>
          )}
        </ul>
      </AnimateHeight>
    </div>
  )
}
