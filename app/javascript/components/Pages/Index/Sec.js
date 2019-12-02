import React from 'react'
import PropTypes from 'prop-types'

import styles from './Sec.module.css'

Sec.propTypes = {
  navs: PropTypes.array
}

export default function Sec ({ navs }) {
  return (
    <div className={styles.root}>
      {navs.filter(n => n.depth === 1).map(n1l =>
        <div key={n1l.mlid}>
          <a href={n1l.path}>
            {n1l.title}
          </a>

          <div>
            {navs.filter(n => n.depth === 2 && n.plid === n1l.mlid).map(n2l =>
              <div key={n2l.mlid}>
                <a href={n2l.path}>
                  {n2l.title}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
