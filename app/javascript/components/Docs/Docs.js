import React from 'react'
import PropTypes from 'prop-types'
import mime from 'mime-types'

import { useI18n } from '../I18n'

import styles from './Docs.module.css'

Docs.propTypes = {
  docs: PropTypes.array,
  locale: PropTypes.string
}

export default function Docs ({ docs, locale }) {
  const I18n = useI18n(locale)

  if (docs.length === 0) return null

  return (
    <div>
      <ul className={styles.docs}>
        {docs.map(doc =>
          <li key={doc.fid}>
            <a href={doc.path} className={styles.doc} itemProp={doc.wrapper}>
              <div className={styles.data}>
                <div className={styles.title}>
                  {doc.title ? doc.title : doc.filename}
                </div>

                <div className={styles.meta}>
                  ({mime.extension(doc.mime)}, {I18n.toHumanSize(doc.size, { precision: 1, format: '%n %u', strip_insignificant_zeros: true })})
                </div>

              </div>
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
