import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import styles from './Index.module.css'

Index.propTypes = {
  navs: PropTypes.array
}

export default function Index ({ navs }) {
  const [news, setNews] = useState()
  const [events, setEvents] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/index.json')

      setNews(data.news)
      setEvents(data.events)
    }

    _fetch()
  }, [])

  return (
    <div className={styles.root}>
      <div>
        {navs.filter(n => n.depth === 1).map(nav =>
          <div key={nav.mlid}>
            <a href={nav.path}>
              {nav.title}
            </a>
          </div>
        )}
      </div>

      {news &&
        <div>
          <h2>Новости</h2>

          <div>
            {news.map(item =>
              <div key={item.nid}>
                <a href={item.path}>
                  {item.title}
                </a>
              </div>
            )}
          </div>
        </div>
      }

      {events &&
        <div>
          <h2>Афиша</h2>

          <div>
            {events.map(event =>
              <div key={event.nid}>
                <a href={event.path}>
                  {event.title}
                </a>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  )
}
