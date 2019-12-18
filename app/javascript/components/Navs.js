import React from 'react'
import PropTypes from 'prop-types'

import styles from './Navs.module.css'

Navs.propTypes = {
  navs: PropTypes.array
}

export default function Navs ({ navs }) {
  const chunk = navs.length < 3 ? 1 : Math.floor(navs.length / 3)

  const groups = navs
    .reduce((acc, _, i) =>
      (i % chunk)
        ? acc
        : [...acc, navs.slice(i, i + chunk)]
    , [])
  return (
    <div className={styles.groups}>
      {[...Array(3)].map((_, i) =>
        <div key={i} className={styles.group}>
          {groups[i] && groups[i].map(nav =>
            <a href={nav.path} key={nav.mlid} className={styles.nav}>
              {nav.title}
            </a>
          )}

          {i === 0 && groups[3] && groups[3].map(nav =>
            <a href={nav.path} key={nav.mlid} className={styles.nav}>
              {nav.title}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
