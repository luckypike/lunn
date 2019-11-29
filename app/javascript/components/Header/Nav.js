import React from 'react'
import PropTypes from 'prop-types'

import styles from './Nav.module.css'

Nav.propTypes = {
  navs: PropTypes.array,
  onToggle: PropTypes.func
}

export default function Nav ({ navs, onToggle }) {
  return (
    <div className={styles.root}>
      <div className={styles.toggle} onClick={onToggle}>
        TOGGLE
      </div>

      <ul className={styles.navs}>
        {navs.map(nav =>
          <li key={nav.mlid} className={styles.nav}>
            <a href={nav.path}>
              {nav.title}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
