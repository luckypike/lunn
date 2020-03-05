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

  const changeFontClass = className => {
    if (document) {
      document.documentElement.classList.remove('font_2', 'font_3')
      document.documentElement.classList.add(`font_${className}`)
    }
  }

  const changeSpacingClass = className => {
    if (document) {
      document.documentElement.classList.remove('spacing_2', 'spacing_3')
      document.documentElement.classList.add(`spacing_${className}`)
    }
  }

  const [font, setFont] = useState(cookies.get('specialSettingsFont') || '1')
  const [spacing, setSpacing] = useState(cookies.get('specialSettingsSpacing') || '1')

  useEffect(() => {
    if (font !== '1') {
      if (font !== cookies.get('specialSettingsFont')) {
        cookies.set('specialSettingsFont', font)
        changeFontClass(font)
      }
    } else {
      cookies.remove('specialSettingsFont')
      document.documentElement.classList.remove('font_2', 'font_3')
    }
  }, [font])

  useEffect(() => {
    if (spacing !== '1') {
      if (spacing !== cookies.get('specialSettingsSpacing')) {
        cookies.set('specialSettingsSpacing', spacing)
        changeSpacingClass(spacing)
      }
    } else {
      cookies.remove('specialSettingsSpacing')
      document.documentElement.classList.remove('spacing_2', 'spacing_3')
    }
  }, [spacing])

  return (
    <div className={classNames(styles.root, { [styles.active]: active })}>
      <div className={styles.group}>
        <div className={styles.label}>
          Шрифт
        </div>

        <div className={styles.items}>
          <div className={classNames(styles.item, styles.fontRegular, { [styles.active]: font === '1' })} onClick={() => setFont('1')} />

          <div className={classNames(styles.item, styles.fontBig, { [styles.active]: font === '2' })} onClick={() => setFont('2')} />

          <div className={classNames(styles.item, styles.fontBigger, { [styles.active]: font === '3' })} onClick={() => setFont('3')} />
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>
          Интервал
        </div>

        <div className={styles.items}>
          <div className={classNames(styles.item, styles.kerningRegular, { [styles.active]: spacing === '1' })} onClick={() => setSpacing('1')} />

          <div className={classNames(styles.item, styles.kerningBig, { [styles.active]: spacing === '2' })} onClick={() => setSpacing('2')} />

          <div className={classNames(styles.item, styles.kerningBig, { [styles.active]: spacing === '3' })} onClick={() => setSpacing('3')} />
        </div>
      </div>
    </div>
  )
}
