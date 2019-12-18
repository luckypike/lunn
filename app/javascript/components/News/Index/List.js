import React from 'react'
import PropTypes from 'prop-types'

import Item from './Item'

import styles from './List.module.css'

List.propTypes = {
  news: PropTypes.array
}

export default function List ({ news }) {
  return (
    <div className={styles.root}>
      {news &&
        <div className={styles.news}>
          {news.map((item, i) =>
            <Item key={i} item={item} />
          )}
        </div>
      }
    </div>
  )
}
