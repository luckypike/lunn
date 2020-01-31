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
            <div key={i} className={styles.event}>
              <div className={styles.date}>
                {dayjs(event.date).locale('ru').format('D MMMM')}
              </div>

              <div className={styles.title}>
                {event.title}
              </div>
            </div>
          )}
        </div>
      }
    </div>
  )
}
