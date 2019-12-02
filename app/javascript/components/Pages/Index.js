import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import Sec from './Index/Sec'

import styles from './Index.module.css'
import page from '../Page.module.css'

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
    <div className={page.root}>
      <div className={styles.sec}>
        <div className={page.container}>
          <Sec navs={navs} />
        </div>
      </div>

      <div className={page.container}>
        <div className={styles.root}>
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
      </div>
    </div>
  )
}
