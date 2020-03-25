import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Nav.module.css'

Nav.propTypes = {
  navs: PropTypes.array,
  onToggle: PropTypes.func,
  index: PropTypes.bool,
  menuActive: PropTypes.bool,
  menuOpen: PropTypes.func
}

export default function Nav ({ navs, onToggle, index, menuActive, menuOpen }) {
  return (
    <div className={classNames(styles.root, { [styles.white]: index, [styles.black]: menuActive })}>
      <div className={styles.toggle} onClick={onToggle}>
        <svg viewBox="0 0 20 14">
          <rect height="2" width="20" x="0" y="0" />
          <rect height="2" width="20" x="0" y="6" />
          <rect height="2" width="20" x="0" y="12" />
        </svg>
      </div>

      <ul className={styles.navs}>
        {navs.filter(n => n.depth === 1).map(nav =>
          <li key={nav.mlid} className={styles.nav} onMouseEnter={menuOpen} onMouseLeave={menuOpen}>
            <a href={nav.path} className={classNames({ [styles.covid]: nav.mlid === 5123 })}>
              {nav.title}
            </a>
          </li>
        )}
        <li className={styles.more} onClick={() => onToggle()}>
          Еще...
        </li>
      </ul>
    </div>
  )
}
