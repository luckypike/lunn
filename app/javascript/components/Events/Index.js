import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import axios from 'axios'
import dayjs from 'dayjs'

import { Title } from '../Pages'

import Feed from './Index/Feed'
import Calendar from './Index/Calendar'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  location: PropTypes.object
}

export default function Index ({ location }) {
  const query = new URLSearchParams(location.search)

  const date = query.get('date') || 1

  const [events, setEvents] = useState()
  const [feed, setFeed] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/events.json', {
        params: {
          date: date
        }
      })

      setFeed(data.feed)
      setEvents(data.events)
    }

    _fetch()
  }, [date])

  return (
    <div className={pages.root}>
      <Title
        h1='Мероприятия'
        loaf={[
          {
            mlid: 999,
            path: location.pathname,
            title: 'Мероприятия'
          }
        ]}
      />

      <HelmetProvider>
        <Helmet>
          <title>Мероприятия</title>
        </Helmet>
      </HelmetProvider>

      <div className={pages.container}>
        {events &&
          <div className={styles.root}>
            {date === 1 &&
              <Feed feed={feed} />
            }

            {date !== 1 &&
              <Event events={events.filter(event => dayjs(event.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD'))} />
            }

            <Calendar events={events} date={date} />
          </div>
        }
      </div>
    </div>
  )
}

Event.propTypes = {
  events: PropTypes.array
}

function Event ({ events }) {
  return (
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
  )
}
