import React, { useState, useEffect } from 'react'
import axios from 'axios'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import List from './Index/List'

import { Link } from '@reach/router'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  location: PropTypes.object
}

export default function Index ({ location }) {
  const query = new URLSearchParams(location.search)
  const perPage = 10

  const page = parseInt(query.get('page')) || 1

  const [total, setTotal] = useState(perPage * 5)
  const [news, setNews] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/news.json', {
        params: {
          limit: perPage,
          page: page
        }
      })

      setNews(data.news)
      setTotal(data.total)
    }

    _fetch()
  }, [page])

  if (!news) return null

  let pagination = 5
  if (total) pagination = Math.ceil(total / perPage)

  return (
    <div className={pages.root}>
      <div className={styles.intro}>
        Новости
      </div>

      <div className={pages.container}>
        <List news={news} />
        <Pages pagination={pagination} page={page} />
      </div>
    </div>
  )
}

Pages.propTypes = {
  pagination: PropTypes.number,
  page: PropTypes.number
}

function Pages ({ pagination, page }) {
  let from = page - 3
  if (from < 0) from = 0
  if (from + 5 > pagination) from = pagination - 5

  return (
    <div className={styles.pages}>
      <div className={classNames(styles.left, { [styles.disable]: page === 1 })}>
        <Link to={`/news?page=${page - 1}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41,7.41,14,6,8,12l6,6,1.41-1.41L10.83,12Z" fill="#777"/>
            <path d="M0,0H24V24H0Z" fill="none"/>
          </svg>
        </Link>
      </div>

      {[...Array(pagination)].map((_, i) => i + 1).slice(from, from + 5).map(i =>
        <div key={i} className={classNames(styles.page, { [styles.active]: page === i })}>
          <Link to={`/news?page=${i}`}>
            {i}
          </Link>
        </div>
      )}

      <div className={styles.right}>
        <Link to={`/news?page=${page + 1}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g transform="translate(24 24) rotate(180)">
              <path d="M15.41,7.41,14,6,8,12l6,6,1.41-1.41L10.83,12Z" fill="#777"/>
              <path d="M0,0H24V24H0Z" fill="none"/>
            </g>
          </svg>
        </Link>
      </div>
    </div>
  )
}
