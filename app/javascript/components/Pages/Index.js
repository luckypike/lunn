import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { useI18n } from '../I18n'

import Intro from '../Video/Intro.mp4'
import Sec from './Index/Sec'
import Sliders from './Index/Sliders'
import Education from './Index/Education'
import News from './Index/News'
import Events from './Index/Events'
import Introduction from './Index/Introduction'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  navs: PropTypes.array,
  locale: PropTypes.string
}

export default function Index ({ navs, locale }) {
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
    <div className={pages.root}>
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

      <div className={styles.sec}>
        <div className={pages.container}>
          <Sec navs={navs} />
        </div>
      </div>

      <div className={pages.container}>
        <div className={styles.root}>
          {news &&
            <News news={news} I18n={I18n} />
          }

          {!news &&
            <div className={styles.placeholder} />
          }

          {events &&
            <Events events={events} />
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
    </div>
  )
}
