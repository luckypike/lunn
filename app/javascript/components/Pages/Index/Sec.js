import React from 'react'
import PropTypes from 'prop-types'

import styles from './Sec.module.css'

Sec.propTypes = {
  navs: PropTypes.array
}

export default function Sec ({ navs }) {
  return (
    <div className={styles.root}>
      <div className={styles.items}>
        {navs.filter(n => n.depth === 1).map(item =>
          <a
            href={item.path}
            key={item.mlid}
            className={styles.item}
            style={{
              backgroundImage: item.image ? `url(https://assets.lunn.ru/images/600x400,q65/legacy${item.image})` : null
            }}
          >
            <div className={styles.title}>
              {item.title}

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 20">
                <path
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M.7.7l9.4 9.3-9.4 9.3"
                />
              </svg>
            </div>
          </a>
        )}
      </div>
    </div>
  )
}
