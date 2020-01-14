import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Service.module.css'

Service.propTypes = {
  onSearchToggle: PropTypes.func,
  index: PropTypes.bool,
  menuActive: PropTypes.bool,
  locale: PropTypes.string
}

export default function Service ({ onSearchToggle, index, menuActive, locale }) {
  return (
    <div className={classNames(styles.root, { [styles.white]: index, [styles.black]: menuActive })}>
      <div className={styles.locales}>
        {locale === 'ru' &&
          <a href="/en">EN</a>
        }

        {locale !== 'ru' &&
          <a href="/">RU</a>
        }
      </div>

      <div className={styles.search} onClick={onSearchToggle}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.607 18.856h-.922l-.327-.315a7.595 7.595 0 10-.817.817l.315.327v.922l5.835 5.816 1.733-1.733-5.817-5.834zm-7 0a5.25 5.25 0 114.853-3.24 5.243 5.243 0 01-4.853 3.24z" />
        </svg>
      </div>
    </div>
  )
}
