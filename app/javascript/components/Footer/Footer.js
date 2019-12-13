import React from 'react'
import PropTypes from 'prop-types'

import styles from './Footer.module.css'

Footer.propTypes = {
  navs: PropTypes.array
}

export default function Footer ({ navs }) {
  return (
    <div>
      <ul className={styles.nav}>
        {navs.filter(item => item.depth === 1).map(n1l =>
          <li className={styles.main} key={n1l.mlid}>
            <a href={n1l.path} className={styles.first}>
              {n1l.title}
            </a>
            <ul>
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
  )
}
