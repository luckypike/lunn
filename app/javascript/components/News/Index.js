import React, { useState, useEffect } from 'react'
import axios from 'axios'
import List from './List'

// import { Link } from '@reach/router'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

export default function Index () {
  const [news, setNews] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/news.json', {
        params: {
          limit: 10,
          page: 1
        }
      })

      setNews(data.news)
    }

    _fetch()
  }, [])

  if (!news) return null

  return (
    <div className={pages.root}>
      <div className={styles.intro}>
        Новости
      </div>

      <div className={pages.container}>
        <List news={news} />
      </div>
    </div>
  )
}
