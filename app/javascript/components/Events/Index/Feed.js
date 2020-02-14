import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import styles from './Feed.module.css'

Feed.propTypes = {
  feed: PropTypes.array
}

export default function Feed ({ feed }) {
  return (
    <div className={styles.root}>
      {feed &&
        <div className={styles.events}>
          {feed.map((event, i) =>
            <a href={event.path} key={i} className={styles.event}>
              <div className={styles.title}>
                {event.title}
              </div>

              <div className={styles.date}>
                {dayjs(event.date).locale('ru').format('D MMMM YYYY')}
              </div>
            </a>
          )}
        </div>
      }
    </div>
  )
}
