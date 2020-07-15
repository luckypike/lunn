import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Nav.module.css'

Nav.propTypes = {
  navs: PropTypes.array,
  white: PropTypes.bool
}

export default function Nav ({ navs, white }) {
  return (
    <div className={classNames(styles.root, { [styles.white]: white })}>
      <ul className={styles.navs}>
        {navs.map(nav =>
          <li key={nav.mlid} className={styles.nav}>
            <a href={nav.path} className={classNames({ [styles.covid]: nav.mlid === 5907, [styles.abitur]: nav.mlid === 5617 })}>
              {nav.title}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
