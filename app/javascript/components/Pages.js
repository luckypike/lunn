import React from 'react'
import PropTypes from 'prop-types'

import styles from './Pages.module.css'

Title.propTypes = {
  loaf: PropTypes.array,
  h1: PropTypes.string,
  h2: PropTypes.string,
  desc: PropTypes.string
}

export function Title ({ h1, h2, loaf, desc }) {
  return (
    <div className={styles.root}>
      {loaf && loaf.length > 0 &&
        <ul className={styles.loafs}>
          <a className={styles.main} href="/">
            Главная
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

      {h1 &&
        <h1 className={styles.h1}>
          {h1}
        </h1>
      }

      {h2 &&
        <h2 className={styles.h2}>
          {h2}
        </h2>
      }

      {desc &&
        <p className={styles.desc}>
          {desc}
        </p>
      }
    </div>
  )
}
