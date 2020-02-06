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

  const mainImage = node && node.images && node.images.find(image => image.width > image.height * 1.2)

  return (
    <div className={pages.container}>

      {node &&
        <>
          <Title
            h2={node.title}
            date={node.created}
            loaf={[
              {
                mlid: 999,
                path: '/news',
                title: 'Новости'
              },
              {
                mlid: 9999,
                path: slug,
                title: node.title
              }
            ]}
          />

          <HelmetProvider>
            <Helmet>
              <title>{node.title}</title>
            </Helmet>
          </HelmetProvider>

          {mainImage &&
            <div className={styles.intro}>
              <img src={`https://beta.lunn.ru/images/1600x800,sc${mainImage.path}`} />
            </div>
          }

          {node.text &&
            <div className={styles.text}>
              <Renderer source={node.text} images={node.images} />
            </div>
          }
        </>
      }
    </div>
  )
}
