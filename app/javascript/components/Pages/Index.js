import React from 'react'
import PropTypes from 'prop-types'
// import axios from 'axios'
import { deserialize } from 'jsonapi-deserializer'

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

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  navs: PropTypes.array,
  news: PropTypes.object,
  events: PropTypes.object,
  sliders: PropTypes.object,
  locale: PropTypes.string
}

export default function Index ({ locale, news: newsData, events: eventsData, sliders: slidersData }) {
  const I18n = useI18n(locale)

  const news = deserialize(newsData)
  const events = deserialize(eventsData)
  const sliders = deserialize(slidersData)

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
            <div className={styles.name}>{}
              {I18n.t('pages.index.intro.first_line')}
              <br />
              {I18n.t('pages.index.intro.second_line')}
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

        {events.length > 0 &&
          <div className={styles.events}>
            <div className={pages.container}>
              <Events events={events} />
            </div>

            <a href="/events" className={styles.calendar}>
              <svg fill="none" viewBox="0 0 37 34">
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M1 13h36M8 4H1v29h36V4h-8M25 4H12M10 1v6M27 1v6"/>
              </svg>

              <div className={styles.title}>
                {I18n.t('pages.index.events.calendar')}
              </div>
            </a>
          </div>
        }

        <div className={pages.container}>
          <div className={styles.slider}>
            <Sliders sliders={sliders} />
          </div>

          <div className={styles.news}>
            <News news={news} />
          </div>

          <Youtube />

          <div className={styles.education}>
            <Education />
          </div>
        </div>
      </div>
    </I18nContext.Provider>
  )
}
