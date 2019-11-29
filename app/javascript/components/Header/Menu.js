import React from 'react'
import PropTypes from 'prop-types'

import styles from './Menu.module.css'

Menu.propTypes = {
  navs: PropTypes.array
}

export default function Menu ({ navs }) {
  return (
    <nav className={styles.root}>
      <ul>
        {navs.filter(item => item.depth === 1).map(n1l =>
          <li key={n1l.mlid}>
            <a href={n1l.path}>{n1l.title}</a>
            <ul>
              {navs.filter(item => item.depth === 2).map(n2l =>
                <li key={n2l.mlid}>
                  <a href={n2l.path}>{n2l.title}</a>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </nav>
  )
}
