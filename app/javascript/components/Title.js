import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import styles from './Title.module.css'
import pages from './Pages.module.css'

Title.propTypes = {
  loaf: PropTypes.array,
  h1: PropTypes.string,
  h2: PropTypes.string,
  desc: PropTypes.string,
  date: PropTypes.number,
  image: PropTypes.string,
  beta: PropTypes.bool
}

export default function Title ({ h1, h2, loaf, desc, date, beta, image }) {
  return (
    <div className={classNames(styles.root, styles.beta, { [styles.withi]: image })}>
      {image &&
        <div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
      }

      <div className={classNames(pages.container, pages.beta)}>
        {loaf && loaf.length > 0 &&
          <ul className={styles.loafs}>
            <li className={styles.wrapper}>
              <div className={styles.loaf}>
                <a href="/">
                  Главная
                </a>
              </div>
            </li>

            {loaf.map(l =>
              <li key={l.mlid} className={styles.wrapper}>
                <div className={styles.loaf}>
                  <a href={l.path}>
                    {l.title}
                  </a>
                </div>
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
    </div>
  )
}
