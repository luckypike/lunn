import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { Link } from '@reach/router'

import styles from './Item.module.css'

Item.propTypes = {
  item: PropTypes.object
}

export default function Item ({ item }) {
  return (
    <Link item={item} to={item.path} className={styles.news_item}>
      <div className={styles.image}>
        <img src={item.images[0].path} />
      </div>

      <div className={styles.info}>
        <div className={styles.date}>
          {dayjs.unix(item.date).locale('ru').format('DD MMMM YYYY')}
        </div>

        <div className={styles.title}>
          {item.title}
        </div>

        <div className={styles.desc}>
          {item.desc}
        </div>
      </div>
    </Link>
  )
}
