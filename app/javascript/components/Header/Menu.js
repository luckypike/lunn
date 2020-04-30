import React from 'react'
import PropTypes from 'prop-types'

import styles from './Menu.module.css'
import Close from '!svg-react-loader?!./Images/Close.svg'

Menu.propTypes = {
  onToggle: PropTypes.func,
  navs: PropTypes.array
}

export default function Menu ({ onToggle, navs }) {
  return (
    <nav className={styles.root}>
      <div className={styles.container}>
        <div className={styles.close} onClick={() => onToggle()}>
          <Close />
        </div>

        <ul className={styles.nav}>
          {navs.filter(item => item.depth === 1 && navs.filter(i => i.depth === 2 && i.plid === item.mlid).length > 0 && item.mlid !== 5123 && item.mlid !== 4708).map(n1l =>
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
