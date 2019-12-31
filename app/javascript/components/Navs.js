import React from 'react'
import PropTypes from 'prop-types'

import styles from './Navs.module.css'

Navs.propTypes = {
  navs: PropTypes.array
}

export default function Navs ({ navs }) {
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
