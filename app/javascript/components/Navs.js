import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Navs.module.css'

Navs.propTypes = {
  navs: PropTypes.array
}

export default function Navs ({ navs }) {
  if (!navs || navs.length === 0) return null

  return (
    <div className={styles.items}>
      {navs.map((nav, i) =>
        <a
          href={nav.path}
          key={nav.mlid}
          className={classNames(styles.item, styles[`item-${nav.mlid}`])}
          style={{
            backgroundImage: nav.image ? `url(https://assets.lunn.ru/images/600x400,q65/legacy${nav.image})` : 'none'
          }}
        >
          <div className={styles.title}>
            {nav.title}
          </div>
        </a>
      )}
    </div>
  )
}
