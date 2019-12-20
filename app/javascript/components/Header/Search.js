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
        <svg className={styles.icon} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.607 18.856h-.922l-.327-.315a7.595 7.595 0 10-.817.817l.315.327v.922l5.835 5.816 1.733-1.733-5.817-5.834zm-7 0a5.25 5.25 0 114.853-3.24 5.243 5.243 0 01-4.853 3.24z" />
        </svg>

        <input
          className={styles.input}
          type="text"
          placeholder="Что нужно найти?"
        />
      </div>

      <div className={styles.close} onClick={onSearchToggle}>
        <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M17.353 16l4.928-4.95-1.408-1.415-4.928 4.95-4.927-4.95L9.61 11.05 14.537 16 9.61 20.948l1.408 1.414 4.927-4.95 4.928 4.95 1.408-1.414-4.928-4.95z" fill="#666"/>
        </svg>
      </div>
    </>
  )
}
