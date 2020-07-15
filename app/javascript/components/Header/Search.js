import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import styles from './Search.module.css'
import Close from '!svg-react-loader?!./Images/Close.svg'

Search.propTypes = {
  onSearchToggle: PropTypes.func,
  searchActive: PropTypes.bool
}

export default function Search ({ onSearchToggle, searchActive }) {
  const inputRef = useRef()

  useEffect(() => {
    if (searchActive) {
      inputRef.current.focus()
    } else {
      inputRef.current.blur()
    }
  }, [searchActive])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          <form action="/search" className={styles.form}>
            <svg className={styles.icon} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.607 18.856h-.922l-.327-.315a7.595 7.595 0 10-.817.817l.315.327v.922l5.835 5.816 1.733-1.733-5.817-5.834zm-7 0a5.25 5.25 0 114.853-3.24 5.243 5.243 0 01-4.853 3.24z" />
            </svg>

            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              // autoFocus="true"
              name="q"
              autoComplete="off"
              placeholder="Что нужно найти?"
            />

            <div className={styles.close} onClick={onSearchToggle}>
              <Close />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
