import React from 'react'
import PropTypes from 'prop-types'

import styles from './Menu.module.css'

Menu.propTypes = {
  navs: PropTypes.array
}

export default function Menu ({ navs }) {
  return (
    <nav className={styles.root}>
      <div className={styles.container}>
        <ul className={styles.nav}>
          {navs.filter(item => item.depth === 1).map(n1l =>
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
