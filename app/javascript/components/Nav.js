import React from 'react'
import PropTypes from 'prop-types'

import styles from './Nav.module.css'

Nav.propTypes = {
  navs: PropTypes.array
}

export default function Nav ({ navs }) {
  if (!navs || navs.length === 0) return null

  return (
    <div className={styles.items}>
      {navs.map((nav, i) =>
        <a href={nav.path} key={nav.mlid} className={styles.item}>
          <div className={styles.title}>
            {nav.title}
          </div>
        </a>
      )}
    </div>
  )
}
