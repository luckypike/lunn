import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Title } from '../Pages'
import Renderer from '../Draft'
import pages from '../Pages.module.css'

import styles from './Show.module.css'

Show.propTypes = {
  slug: PropTypes.string
}

export default function Show ({ slug }) {
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
          />

          {event.text &&
            <div className={styles.text}>
              <Renderer source={event.text} />
            </div>
          }
        </>
      }
    </div>
  )
}
