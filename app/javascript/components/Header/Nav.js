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
      <ul className={styles.navs}>
        {navs.filter(n => n.depth === 1).map(nav =>
          <li key={nav.mlid} className={styles.nav} onMouseEnter={menuOpen} onMouseLeave={menuOpen}>
            <a href={nav.path} className={classNames({ [styles.covid]: nav.mlid === 5907, [styles.abitur]: nav.mlid === 5617 })}>
              {nav.title}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
