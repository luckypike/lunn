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
        <svg viewBox="0 0 20 14" fill="#777">
          <rect height="2" width="20" x="0" y="0" />
          <rect height="2" width="20" x="0" y="6" />
          <rect height="2" width="20" x="0" y="12" />
        </svg>
      </div>

      <ul className={styles.navs}>
        {navs.filter(n => n.depth === 1).map(nav =>
          <li key={nav.mlid} className={styles.nav}>
            <a href={nav.path}>
              {nav.title}
            </a>
          </li>
        )}

        <li className={styles.nav} onClick={onToggle}>
          Ещё...
        </li>
      </ul>
    </div>
  )
}
