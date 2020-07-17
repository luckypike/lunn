import React, { useState, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import PropTypes from 'prop-types'
import axios from 'axios'

import Title from '../Title'
import Renderer from '../Renderer'
import Docs from '../Docs/Docs'

import pages from '../Pages.module.css'
import styles from './Show.module.css'

Show.propTypes = {
  slug: PropTypes.string,
  locale: PropTypes.string
}

export default function Show ({ slug, locale }) {
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
    <div className={pages.beta}>
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
              }
            ]}
          />

          <HelmetProvider>
            <Helmet>
              <title>{node.title}</title>
            </Helmet>
          </HelmetProvider>

          <div className={pages.container}>

            <div className={styles.text}>
              {mainImage &&
                <div className={styles.intro}>
                  <img src={`https://assets.lunn.ru/imgproxy/rs:fill:1600:900/g:sm/q:75/${mainImage.encoded_path}.jpg`} />
                </div>
              }

              {node.text &&
                <Renderer source={node.text} images={node.images} />
              }
            </div>

            {node.docs &&
              <div className={styles.docs}>
                <Docs docs={node.docs} locale={locale} />
              </div>
            }
          </div>
        </>
      }
    </div>
  )
}
