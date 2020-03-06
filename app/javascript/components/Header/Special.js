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

  const options = { path: '/' }

  const changeClass = (type, className) => {
    if (document) {
      document.documentElement.classList.remove(`${type}_2`, `${type}_3`)
      document.documentElement.classList.add(`${type}_${className}`)
    }
  }

  const [font, setFont] = useState(cookies.get('specialSettingsFont', options) || '1')
  const [spacing, setSpacing] = useState(cookies.get('specialSettingsSpacing', options) || '1')
  const [schema, setSchema] = useState(cookies.get('specialSettingsSchema', options) || '1')

  useEffect(() => {
    if (font !== '1') {
      if (font !== cookies.get('specialSettingsFont', options)) {
        cookies.set('specialSettingsFont', font, options)
        changeClass('font', font)
      }
    } else {
      cookies.remove('specialSettingsFont', options)
      document.documentElement.classList.remove('font_2', 'font_3')
    }
  }, [font])

  useEffect(() => {
    if (spacing !== '1') {
      if (spacing !== cookies.get('specialSettingsSpacing', options)) {
        cookies.set('specialSettingsSpacing', spacing, options)
        changeClass('spacing', spacing)
      }
    } else {
      cookies.remove('specialSettingsSpacing', options)
      document.documentElement.classList.remove('spacing_2', 'spacing_3')
    }
  }, [spacing])

  useEffect(() => {
    if (schema !== '1') {
      if (schema !== cookies.get('specialSettingsSchema', options)) {
        cookies.set('specialSettingsSchema', schema, options)
        changeClass('schema', schema)
      }
    } else {
      cookies.remove('specialSettingsSchema', options)
      document.documentElement.classList.remove('schema_2', 'schema_3')
    }
  }, [schema])

  return (
    <div className={classNames(styles.root, { [styles.active]: active })}>
      <div className={styles.groups}>
        <div className={styles.group}>
          <div className={styles.label}>
            Шрифт
          </div>

          <div className={styles.items}>
            <div
              className={classNames(
                styles.item, styles.font, styles.normal, {
                  [styles.active]: font === '1'
                }
              )}
              onClick={() => setFont('1')}
            />

            <div
              className={classNames(
                styles.item, styles.font, styles.big, {
                  [styles.active]: font === '2'
                }
              )}
              onClick={() => setFont('2')}
            />

            <div
              className={classNames(
                styles.item, styles.font, styles.bigger, {
                  [styles.active]: font === '3'
                }
              )}
              onClick={() => setFont('3')}
            />
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.label}>
            Интервал
          </div>

          <div className={styles.items}>
            <div
              className={classNames(
                styles.item, styles.spacing, styles.normal, {
                  [styles.active]: spacing === '1'
                }
              )}
              onClick={() => setSpacing('1')}
            />

            <div
              className={classNames(
                styles.item, styles.spacing, styles.big, {
                  [styles.active]: spacing === '2'
                }
              )}
              onClick={() => setSpacing('2')}
            />

            <div
              className={classNames(
                styles.item, styles.spacing, styles.bigger, {
                  [styles.active]: spacing === '3'
                }
              )}
              onClick={() => setSpacing('3')}
            />

          </div>
        </div>

        <div className={classNames(styles.group, styles.inactive)}>
          <div className={styles.label}>
            Цветовая схема
          </div>

          <div className={styles.items}>
            <div
              className={classNames(
                styles.item, styles.schema, styles.white, {
                  [styles.active]: schema === '1'
                }
              )}
              onClick={() => setSchema('1')}
            />

            <div
              className={classNames(
                styles.item, styles.schema, styles.black, {
                  [styles.active]: schema === '2'
                }
              )}
              onClick={() => setSchema('2')}
            />

            <div
              className={classNames(
                styles.item, styles.schema, styles.blue, {
                  [styles.active]: schema === '3'
                }
              )}
              onClick={() => setSchema('3')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
