import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Service.module.css'

Service.propTypes = {
  onSearchToggle: PropTypes.func,
  index: PropTypes.bool,
  menuActive: PropTypes.bool
}

export default function Service ({ onSearchToggle, index, menuActive }) {
  return (
    <div className={styles.root}>
      <div className={classNames(styles.locales, { [styles.white]: index, [styles.black]: menuActive })}>
        EN
      </div>

      <div className={classNames(styles.search, { [styles.white]: index, [styles.black]: menuActive })} onClick={onSearchToggle}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.607 18.856h-.922l-.327-.315a7.595 7.595 0 10-.817.817l.315.327v.922l5.835 5.816 1.733-1.733-5.817-5.834zm-7 0a5.25 5.25 0 114.853-3.24 5.243 5.243 0 01-4.853 3.24z" />
        </svg>
      </div>
    </div>
  )
}
