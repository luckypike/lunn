import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import axios from 'axios'

import { Title } from '../Pages'

import Feed from './Index/Feed'
import Calendar from './Index/Calendar'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  location: PropTypes.object
}

export default function Index ({ location }) {
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
            <Feed events={events} />

            <Calendar events={events} />
          </div>
        }
      </div>
    </div>
  )
}
