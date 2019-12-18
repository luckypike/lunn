import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import styles from './Poster.module.css'

Poster.propTypes = {
  events: PropTypes.array
}

export default function Poster ({ events }) {
  return (
    <div className={styles.poster}>
      <div className={styles.label}>
        <h2>Афиша</h2>
      </div>

      <div className={styles.events}>
        {events.map(event =>
          <div key={event.nid} className={styles.event}>
            <div className={styles.date}>
              {dayjs.unix(event.created).locale('ru').format('DD MMMM YYYY')}
            </div>

            <div className={styles.title}>
              <a href={event.path}>
                {event.title}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
