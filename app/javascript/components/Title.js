import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { I18nContext } from './I18n'

import styles from './Title.module.css'
import pages from './Pages.module.css'

Title.propTypes = {
  loaf: PropTypes.array,
  h1: PropTypes.string,
  h2: PropTypes.string,
  desc: PropTypes.string,
  date: PropTypes.number,
  image: PropTypes.string,
  className: PropTypes.string,
  beta: PropTypes.bool
}

export default function Title ({ h1, h2, loaf, desc, date, beta, image, className }) {
  const I18n = useContext(I18nContext)

  return (
    <div className={classNames(styles.root, styles.beta, { [styles.withi]: image }, className)}>
      {image &&
        <div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
      }

      <div className={classNames(pages.container, pages.beta)}>
        {loaf && loaf.length > 0 &&
          <ul className={styles.loafs}>
            <li className={styles.wrapper}>
              <div className={styles.loaf}>
                {I18n &&
                  <a href={`${I18n.localePath() || '/'}`}>
                    {I18n.t('loaf.home')}
                  </a>
                }

                {!I18n &&
                  <a href="/">
                    Главная
                  </a>
                }
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
            {dayjs.unix(date).locale(I18n ? I18n.locale : 'ru').format('DD MMMM YYYY')}
          </p>
        }
      </div>
    </div>
  )
}
