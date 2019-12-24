import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Calendar from './Index/Calendar'

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

  return (
    <div className={pages.root}>
      <div className={styles.intro}>
        Мероприятия
      </div>

      <Calendar events={events} />
    </div>
  )
}
