import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import axios from 'axios'

import { Title } from '../Pages'
import Renderer from '../Draft'

import pages from '../Pages.module.css'
import styles from './Show.module.css'

Show.propTypes = {
  slug: PropTypes.string
}

export default function Show ({ slug }) {
  const [node, setNode] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(`${slug}.json`)

      setNode(data.node)
    }

    _fetch()
  }, [])

  return (
    <div className={pages.container}>

      {node &&
        <>
          <Title
            h2={node.title}
          />

          {node.text &&
            <div className={styles.text}>
              <Renderer source={node.text} />
            </div>
          }
        </>
      }

      <div>
        <Link to="/news">
          NEWS
        </Link>
      </div>
    </div>
  )
}
