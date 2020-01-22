import React, { useState, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Title } from '../Pages'
import Renderer from '../Draft'
import Sliders from './Index/Sliders'

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
            date={node.created}
          />

          <HelmetProvider>
            <Helmet>
              <title>{node.title}</title>
            </Helmet>
          </HelmetProvider>

          {node.images &&
            <Sliders images={node.images} />
          }

          {node.text &&
            <div className={styles.text}>
              <Renderer source={node.text} />
            </div>
          }
        </>
      }
    </div>
  )
}
