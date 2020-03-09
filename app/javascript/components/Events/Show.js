import React, { useState, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Title } from '../Pages'
import Renderer from '../Renderer'
import Docs from '../Docs/Docs'

import pages from '../Pages.module.css'
import styles from './Show.module.css'

Show.propTypes = {
  slug: PropTypes.string,
  locale: PropTypes.string
}

export default function Show ({ slug, locale }) {
  const [event, setEvent] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(`${slug}.json`)

      setEvent(data.event)
    }

    _fetch()
  }, [])

  return (
    <div className={pages.container}>

      {event &&
        <>
          <Title
            h2={event.title}
            loaf={[
              {
                mlid: 999,
                path: '/events',
                title: 'Мероприятия'
              },
              {
                mlid: 9999,
                path: slug,
                title: event.title
              }
            ]}
          />

          <HelmetProvider>
            <Helmet>
              <title>{event.title}</title>
            </Helmet>
          </HelmetProvider>

          {event.text &&
            <div className={styles.text}>
              <Renderer source={event.text} />
            </div>
          }

          {event.docs &&
            <div className={styles.docs}>
              <Docs docs={event.docs} locale={locale} />
            </div>
          }
        </>
      }
    </div>
  )
}
