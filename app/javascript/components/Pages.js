import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import styles from './Pages.module.css'

Title.propTypes = {
  loaf: PropTypes.array,
  h1: PropTypes.string,
  h2: PropTypes.string,
  desc: PropTypes.string,
  date: PropTypes.number
}

export function Title ({ h1, h2, loaf, desc, date }) {
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

      {date &&
        <p className={styles.date}>
          {dayjs.unix(date).locale('ru').format('DD MMMM YYYY')}
        </p>
      }
    </div>
  )
}
