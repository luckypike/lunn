import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { navigate } from '@reach/router'

import Renderer from '../Renderer'
import { Title } from '../Pages'
import { useI18n } from '../I18n'

import pages from '../Pages.module.css'
import styles from './Index.module.css'

Index.propTypes = {
  location: PropTypes.object,
  locale: PropTypes.string
}

export default function Index ({ location, locale }) {
  const I18n = useI18n(locale)

  const [results, setResults] = useState()
  const [q, setQ] = useState('')
  const _debounceFetch = useRef(debounce(query => _fetch(query), 500)).current

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    setQ(query.get('q') || '')
  }, [])

  const handleChange = ({ target: { value } }) => {
    setQ(value)
    navigate(`/search${value.length > 0 ? `?q=${value}` : ''}`, { replace: true })
  }

  useEffect(() => {
    if (q.length >= 3) {
      _debounceFetch(q)
    } else {
      if (results) {
        setResults()
      }
    }
  }, [q])

  const _fetch = async query => {
    const { data } = await axios.get('/search.json', { params: { q: query } })

    setResults(data.results)
  }

  return (
    <div className={pages.container}>
      <Title
        h1={I18n.t('search.title')}
      />

      <div className={styles.root}>
        <div className={styles.input}>
          <input
            onChange={handleChange}
            value={q}
          />
        </div>

        {results &&
          <div className={styles.results}>
            {results.map(result =>
              <a key={result.nid} href={result.path} className={styles.result}>
                <div className={styles.title}>
                  {result.title}
                </div>

                {result.highlight &&
                  <div className={styles.highlight}>
                    <Renderer source={result.highlight} />
                  </div>
                }
              </a>
            )}
          </div>
        }
      </div>
    </div>
  )
}
