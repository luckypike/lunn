import React from 'react'
import PropTypes from 'prop-types'

import styles from './Service.module.css'

Service.propTypes = {
  onSearchToggle: PropTypes.func
}

export default function Service ({ onSearchToggle }) {
  return (
    <div className={styles.root}>
      <div className={styles.locales}>
        EN
      </div>

      <div className={styles.search} onClick={onSearchToggle}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M21.14 19.727l5.567 5.566-1.414 1.414-5.681-5.68a8.75 8.75 0 111.529-1.3zM14.75 7A6.758 6.758 0 008 13.75a6.758 6.758 0 006.75 6.75 6.758 6.758 0 006.75-6.75A6.758 6.758 0 0014.75 7z"/>
        </svg>
      </div>
    </div>
  )
}
