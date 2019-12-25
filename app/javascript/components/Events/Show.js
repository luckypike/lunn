import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from '@reach/router'

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
    <div>
      {event &&
        <>
          <div>
            {event.title}
          </div>

          <div>
            {event.text}
          </div>
        </>
      }

      <Link to="/events">
        Events
      </Link>
    </div>
  )
}
