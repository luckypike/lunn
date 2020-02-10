import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import styles from './Events.module.css'
import buttons from '../../Buttons.module.css'

Events.propTypes = {
  events: PropTypes.array
}

export default function Events ({ events }) {
  var today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className={styles.root}>
      <div className={styles.label}>
        <h2>Анонсы событий</h2>
      </div>

      <div className={styles.events}>
        {events.map(event =>
          <a href={event.path} key={event.nid} className={classNames(styles.event, { [styles.pass]: dayjs(event.date) < today })}>
            <div className={styles.date}>
              {dayjs(event.date).locale('ru').format('D MMMM')}
            </div>

            <div className={styles.title}>
              {event.title}
            </div>

            {dayjs(event.date) < today &&
              <div className={styles.passed}>
                Событие состоялось
              </div>
            }
          </a>
        )}
      </div>

      <a href="/events" className={classNames(buttons.sec, styles.more)}>
        Все анонсы
      </a>
    </div>
  )
}
