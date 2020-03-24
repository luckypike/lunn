import React from 'react'
import PropTypes from 'prop-types'

import styles from './Menu.module.css'

Menu.propTypes = {
  onToggle: PropTypes.func,
  navs: PropTypes.array
}

export default function Menu ({ onToggle, navs }) {
  return (
    <nav className={styles.root}>
      <div className={styles.close} onClick={() => onToggle()}>
        <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M17.353 16l4.928-4.95-1.408-1.415-4.928 4.95-4.927-4.95L9.61 11.05 14.537 16 9.61 20.948l1.408 1.414 4.927-4.95 4.928 4.95 1.408-1.414-4.928-4.95z" fill="#666"/>
        </svg>
      </div>

      <div className={styles.container}>
        <ul className={styles.nav}>
          {navs.filter(item => item.depth === 1 && navs.filter(i => i.depth === 2 && i.plid === item.mlid).length > 0 && item.mlid !== 5123).map(n1l =>
            <li className={styles.main} key={n1l.mlid}>
              <a href={n1l.path} className={styles.first}>
                {n1l.title}
              </a>
              <ul className={styles.l2}>
                {navs.filter(i => i.depth === 2 && i.plid === n1l.mlid).map(n2l =>
                  <li key={n2l.mlid}>
                    <a href={n2l.path}>{n2l.title}</a>
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
