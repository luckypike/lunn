import React from 'react'
import PropTypes from 'prop-types'

import styles from './Search.module.css'

Search.propTypes = {
  onSearchToggle: PropTypes.func
}

export default function Search ({ onSearchToggle }) {
  return (
    <>
      <div className={styles.root}>
        SEARCH
      </div>

      <div className={styles.close} onClick={onSearchToggle}>
        <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M17.353 16l4.928-4.95-1.408-1.415-4.928 4.95-4.927-4.95L9.61 11.05 14.537 16 9.61 20.948l1.408 1.414 4.927-4.95 4.928 4.95 1.408-1.414-4.928-4.95z" fill="#666"/>
        </svg>
      </div>
    </>
  )
}
