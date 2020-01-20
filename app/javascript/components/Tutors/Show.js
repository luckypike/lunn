import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
// import { Link } from '@reach/router'

import { useI18n } from '../I18n'

import { Title } from '../Pages'
// import Renderer from '../Draft'
import Exp from './Show/Exp'

import styles from './Show.module.css'
import pages from '../Pages.module.css'

Show.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string
}

export default function Show ({ id, locale }) {
  const I18n = useI18n(locale)
  const [node, setNode] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(`/tutors/${id}.json`)

      setNode(data.node)
    }

    _fetch()
  }, [])

  const desc = [
    'tutor_edu',
    'tutor_qual'
  ]

  return (
    <div className={pages.container}>
      {node &&
        <>
          <Title
            h1={node.title}
          />

          <div className={styles.root}>
            <div className={styles.photo}>
              <div className={styles.image}>
                {node.image &&
                  <img src={node.image.path} />
                }
              </div>
            </div>

            <div className={styles.desc}>
              {desc.filter(e => node[e]).map(e =>
                <React.Fragment key={e}>
                  <h4>
                    {I18n.t(`tutor.${e}`)}
                  </h4>
                  <p>
                    {node[e]}
                  </p>
                </React.Fragment>
              )}
            </div>

            <div className={styles.text}>
              {['tutor_works'].filter(e => node[e]).map(e =>
                <Exp key={e} e={e} items={node[e]} />
              )}
            </div>
          </div>
        </>
      }
    </div>
  )
}
