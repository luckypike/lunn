import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import styles from './Feed.module.css'

Feed.propTypes = {
  events: PropTypes.array
}

export default function Feed ({ events }) {
  return (
    <div className={styles.root}>
      {events &&
        <div className={styles.events}>
          {events.map((event, i) =>
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
