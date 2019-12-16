import React from 'react'
import PropTypes from 'prop-types'

import styles from './Pages.module.css'

Title.propTypes = {
  loaf: PropTypes.array,
  title: PropTypes.string
}

export function Title ({ title, loaf }) {
  return (
    <div className={styles.root}>
      {loaf && loaf.length > 0 &&
        <ul className={styles.loafs}>
          <a className={styles.main} href="/">
            Главная -
          </a>

          {loaf.map(l =>
            <li key={l.mlid} className={styles.loaf}>
              <a href={l.path}>
                {l.title}
              </a>
            </li>
          )}
        </ul>
      }

      <h1 className={styles.title}>
        {title}
      </h1>
    </div>
  )
}
