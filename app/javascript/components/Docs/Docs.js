import React from 'react'
import PropTypes from 'prop-types'

import styles from './Docs.module.css'

Docs.propTypes = {
  docs: PropTypes.array
}

export default function Docs ({ docs }) {
  if (docs.length === 0) return null

  return (
    <div>
      <ul className={styles.docs}>
        {docs.map(doc =>
          <li key={doc.fid}>
            <a href={doc.path} target="_blank" rel="noopener noreferrer" className={styles.doc} itemProp={doc.wrapper}>
              <svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0H4A3.995 3.995 0 00.02 4L0 36a3.994 3.994 0 003.98 4H28a4.011 4.011 0 004-4V12L20 0zM4 36V4h14v10h10v22H4z" fill="#2F53EB"/>
              </svg>

              <div className={styles.title}>
                {doc.title}
              </div>
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
