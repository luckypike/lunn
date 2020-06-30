import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import axios from 'axios'

import { I18nContext, useI18n } from '../I18n'

import Intro from '../Video/Intro.mp4'
import Sec from './Index/Sec'
import Sliders from './Index/Sliders'
import Admission from './Index/Admission'
import Education from './Index/Education'
import News from './Index/News'
import Events from './Index/Events'
import Introduction from './Index/Introduction'
import Youtube from './Index/Youtube'
import Schedule from './Index/Schedule'

import buttons from '../Buttons.module.css'
import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  navs: PropTypes.array,
  admission_start: PropTypes.number,
  locale: PropTypes.string
}

export default function Index ({ locale }) {
  const I18n = useI18n(locale)

  const [news, setNews] = useState()
  const [events, setEvents] = useState()
  const [sliders, setSliders] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get((locale !== 'ru' ? `/${locale}` : '') + '/index.json')

      setNews(data.news)
      setEvents(data.events)
      setSliders(data.sliders)
    }

    _fetch()
  }, [])

  return (
    <I18nContext.Provider value={I18n}>
      <div className={styles.root}>
        <div className={styles.video}>
          <video playsInline autoPlay loop muted>
            <source src={Intro} type="video/mp4" />
          </video>

          <div className={styles.intro}>
            <div className={styles.introduction}>
              <Introduction />
            </div>
            <div className={styles.name}>
              Нижегородский государственный лингвистический
              <br />
              университет имени Н.А. Добролюбова
            </div>
          </div>
        </div>

        <div className={styles.admission}>
          <Admission />
        </div>

        <div className={styles.sec}>
          <div className={pages.container}>
            <Sec />
          </div>
        </div>

        <div className={styles.schedule}>
          <Schedule />
        </div>

        <div className={styles.events}>
          <div className={pages.container}>
            {events && events.length > 0 &&
              <Events events={events} />
            }
          </div>

          <a href="/events" className={styles.calendar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 37 34">
              <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M1 13h36M8 4H1v29h36V4h-8M25 4H12M10 1v6M27 1v6"/>
            </svg>

            <div className={styles.title}>
              Календарь
            </div>
          </a>
        </div>

        <div className={pages.container}>
          {!news &&
            <div className={styles.placeholder} />
          }

          {sliders && news &&
            <div className={styles.news}>
              <div className={styles.label}>
                <h2>{I18n.t('news.title')}</h2>

                <a href="/news" className={classNames(buttons.sec, styles.more)}>
                  Все новости
                </a>
              </div>

              <div className={styles.slider}>
                <Sliders sliders={sliders} />
              </div>

              <News news={news} I18n={I18n} />
            </div>
          }

          <Youtube />

          <div className={styles.education}>
            <Education />
          </div>
        </div>
      </div>
    </I18nContext.Provider>
  )
}
