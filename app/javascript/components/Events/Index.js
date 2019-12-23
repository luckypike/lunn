import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Index.module.css'
import pages from '../Pages.module.css'

export default function Index () {
  const [events, setEvents] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/events.json')

      setEvents(data.events)
    }

    _fetch()
  }, [])

  console.log(events)

  return (
    <div className={pages.root}>
      <div className={styles.intro}>
        Мероприятия
      </div>

      {events &&
        <div className={styles.events}>
          {events.map((event, i) =>
            <a href={event.path} key={i} className={styles.event}>
              {event.title}
            </a>
          )}
        </div>
      }
    </div>
  )
}
