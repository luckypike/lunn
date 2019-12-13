import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import axios from 'axios'

import pages from '../Pages.module.css'
import styles from './Show.module.css'

Show.propTypes = {
  slug: PropTypes.string
}

export default function Show ({ slug }) {
  const [news, setNews] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(`${slug}.json`)

      setNews(data.news)
    }

    _fetch()
  }, [])

  return (
    <div className={pages.container}>
      <div className={styles.intro}>
        show
      </div>

      <div>
        <Link to="/news">
          NEWS
        </Link>
      </div>
    </div>
  )
}
