import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Cookies from 'universal-cookie'

import styles from './Special.module.css'

Special.propTypes = {
  active: PropTypes.bool
}

export default function Special ({ active }) {
  const cookies = new Cookies()

  const changeBodyClass = className => {
    if (document) {
      document.documentElement.classList.remove('font_2', 'font_3')
      document.documentElement.classList.add(`font_${className}`)
    }
  }

  const [font, setFont] = useState(cookies.get('specialSettingsFont') || '1')
  const [spacing, setSpacing] = useState()

  useEffect(() => {
    if (font !== '1') {
      if (font !== cookies.get('specialSettingsFont')) {
        cookies.set('specialSettingsFont', font)
        changeBodyClass(font)
      }
    } else {
      cookies.remove('specialSettingsFont')
      document.documentElement.classList.remove('font_2', 'font_3')
    }
  }, [font])

  return (
    <div className={classNames(styles.root, { [styles.active]: active })}>
      <div className={styles.fonts}>
        <div className={classNames(styles.font, { [styles.active]: font === '1' })} onClick={() => setFont('1')}>
          A
        </div>
        <div className={classNames(styles.font, { [styles.active]: font === '2' })} onClick={() => setFont('2')}>
          AA
        </div>
        <div className={classNames(styles.font, { [styles.active]: font === '3' })} onClick={() => setFont('3')}>
          AAA
        </div>
      </div>

      <div className={styles.spacing}>
        <div>
          K
        </div>
        <div>
          KK
        </div>
        <div>
          KKK
        </div>
      </div>
    </div>
  )
}
