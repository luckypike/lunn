import React from 'react'
import PropTypes from 'prop-types'

import styles from './Exp.module.css'

Exp.propTypes = {
  e: PropTypes.string,
  items: PropTypes.array
}

export default function Exp ({ e, items }) {
  return (
    <div className={styles.root}>
      <h3>
        {e}
      </h3>

      <div>
        <ul className={styles.ul}>
          {items.map((item, i) =>
            <li key={i}>
              {item}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
