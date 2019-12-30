import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Calendar from './Calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import styles from './Events.module.css'

Events.propTypes = {
  events: PropTypes.array
}

export default function Events ({ events }) {
  const [active, setActive] = useState(0)

  const openTab = e => setActive(+e.target.dataset.index)

  const buttons = {
    tab: [
      { title: 'События' },
      { title: 'Календарь' }
    ]
  }

  return (
    <div className={styles.poster}>
      <div className={styles.label}>
        <h2>События</h2>
      </div>

      <div className={styles.buttons}>
        {buttons.tab.map((button, i) =>
          <div key={i} className={classNames(styles.tab, { [styles.active]: i === active })} onClick={openTab} data-index={i}>
            {button.title}
          </div>
        )}
      </div>

      {active === 1 &&
        <>
          <div>
            <Calendar events={events} />
          </div>
        </>
      }

      {active === 0 &&
        <div className={styles.events}>
          {events.map(event =>
            <div key={event.nid} className={styles.event}>
              <div className={styles.date}>
                <div className={styles.num}>
                  {dayjs(event.date).locale('ru').format('DD')}
                </div>

                <div className={styles.month}>
                  <div>{dayjs(event.date).locale('ru').format('MMMM')}</div>
                  <div className={styles.day}>{dayjs(event.date).locale('ru').format('dd')}</div>
                </div>
              </div>

              <div className={styles.title}>
                <a href={event.path}>
                  {event.title}
                </a>
              </div>
            </div>
          )}
        </div>
      }

      <a href="/events" className={styles.button}>
        Все события
      </a>
    </div>
  )
}
