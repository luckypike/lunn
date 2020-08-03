import React, { useState, useEffect, useContext } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import PropTypes from 'prop-types'
import axios from 'axios'

import Title from '../Title'
import Renderer from '../Renderer'
import Docs from '../Docs/Docs'
import { I18nContext } from '../I18n'

import pages from '../Pages.module.css'
import styles from './Show.module.css'

Show.propTypes = {
  slug: PropTypes.string
}

export default function Show ({ slug }) {
  const I18n = useContext(I18nContext)
  const [node, setNode] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(`${I18n.localePath()}/news/${slug}.json`)

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
                path: `${I18n.localePath()}/news`,
                title: I18n.t('news.title')
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
                <Docs docs={node.docs} locale={I18n.locale} />
              </div>
            }
          </div>
        </>
      }
    </div>
  )
}
