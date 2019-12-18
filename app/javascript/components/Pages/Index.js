import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
// import classNames from 'classnames'

import Intro from '../Video/Intro.mp4'
import Sec from './Index/Sec'
import Sliders from './Index/Sliders'
import Education from './Index/Education'

// import fonts from '../Fonts.module.css'
import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  navs: PropTypes.array
}

export default function Index ({ navs }) {
  const [news, setNews] = useState()
  const [events, setEvents] = useState()
  const [sliders, setSliders] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/index.json')

      setNews(data.news)
      setEvents(data.events)
      setSliders(data.sliders)
    }

    _fetch()
  }, [])

  return (
    <div className={pages.root}>
      <div className={styles.video}>
        <video playsInline autoPlay loop muted>
          <source src={Intro} type="video/mp4" />
        </video>

        <div className={styles.intro}>
          <div className={styles.introduction}>Hola</div>
          <div>Нижегородский государственный лингвистический <br /> университет имени Н.А. Добролюбова</div>
        </div>
      </div>

      <div className={styles.sec}>
        <div className={pages.container}>
          <Sec navs={navs} />
        </div>
      </div>

      <div className={pages.container}>
        <div className={styles.root}>
          {news && events &&
            <>
              <div className={styles.news}>
                <h2>Новости</h2>

                <div className={styles.news_items}>
                  {news.map(item =>
                    <div key={item.nid} className={styles.news_item}>
                      <div className={styles.image}>
                        <img src={item.images[0].path} />
                      </div>

                      <div className={styles.date}>
                        {dayjs.unix(item.created).locale('ru').format('DD MMMM YYYY')}
                      </div>

                      <div className={styles.title}>
                        <a href={item.path}>
                          {item.title}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.poster}>
                <h2>Афиша</h2>

                <div className={styles.events}>
                  {events.map(event =>
                    <div key={event.nid} className={styles.event}>
                      <div className={styles.created}>
                        <div className={styles.date}>
                          {dayjs.unix(event.created).locale('ru').format('DD MMMM YYYY')}
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
              </div>
            </>
          }

          {sliders &&
            <div className={styles.slider}>
              <Sliders sliders={sliders} />
            </div>
          }

          <div className={styles.education}>
            <Education />
          </div>
        </div>
      </div>

      {/* <div className={pages.container}>
        <div className={styles.buttons}>
          <a href="/news" className={styles.all_news}>
            Все новости
          </a>

          <a href="#" className={styles.all_poster}>
            Все мероприятия
          </a>
        </div>
      </div> */}
    </div>
  )
}
