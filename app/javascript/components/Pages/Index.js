import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import Intro from '../Video/Intro.mp4'
import Sec from './Index/Sec'

import fonts from '../Fonts.module.css'
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
      <div className={styles.video}>
        <video playsInline autoPlay loop muted>
          <source src={Intro} type="video/mp4" />
        </video>

        <div className={styles.intro}>
          <div className={fonts.h0}>Hola</div>
          <div>Нижегородский государственный лингвистический <br /> университет имени Н.А. Добролюбова</div>
        </div>
      </div>

      <div className={styles.sec}>
        <div className={page.container}>
          <Sec navs={navs} />
        </div>
      </div>

      <div className={page.container}>
        <div className={styles.root}>
          {news &&
            <div className={styles.news}>
              <h2>Новости</h2>

              <div className={styles.news_items}>
                {news.map(item =>
                  <div key={item.nid} className={styles.news_item}>
                    <div className={styles.image}>
                      <img src={item.images[0].path} />
                    </div>

                    <div className={styles.title}>
                      <a href={item.path}>
                        {item.title}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.button}>
                <a href="/news">
                  Все новости
                </a>
              </div>
            </div>
          }

          {events &&
            <div className={styles.poster}>
              <h2>Афиша</h2>

              <div className={styles.events}>
                {events.map(event =>
                  <div key={event.nid} className={styles.event}>
                    <div className={styles.qwe}>
                      10
                    </div>
                    <div className={styles.title}>
                      <a href={event.path}>
                        {event.title}
                      </a>
                    </div>
                  </div>
                )}
                <div className={styles.button}>
                  <a href="#">
                    Все мероприятия
                  </a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
