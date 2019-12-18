import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

  // console.log(query.get('page'))

  const page = parseInt(query.get('page')) || 1

  const [total, setTotal] = useState(perPage * 5)
  // const [pages, setPages] = useState()
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

  // console.log(pages)

  return (
    <div className={pages.root}>
      <div className={styles.intro}>
        Новости
      </div>

      <div className={pages.container}>

        <Pages pagination={pagination} page={page} />
        <List news={news} />
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
    <div>
      {[...Array(pagination)].map((_, i) => i + 1).slice(from, from + 5).map(i =>
        <div key={i}>
          <Link to={`/news?page=${i}`}>
            page: {i}
          </Link>
        </div>
      )}
    </div>
  )
}
