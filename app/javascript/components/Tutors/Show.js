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
    'position',
    // 'tutor_edu',
    'tutor_qual',
    'tutor_adegree',
    'tutor_atitle',
    // 'tutor_school',
    // 'tutor_direction',
    // 'tutor_time',
    // 'tutor_stime',
    // 'tutor_phone',
    'tutor_email'
  ]

  const text = [
    'tutor_works',
    'tutor_conferences',
    'tutor_directions',
    'tutor_retraining',
    'tutor_special'
    // 'tutor_consult'
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
                  <h5>
                    {I18n.t(`tutor.${e}`)}
                  </h5>
                  <p>
                    {node[e]}
                  </p>
                </React.Fragment>
              )}
            </div>

            <div className={styles.text}>
              {text.filter(e => node[e]).map(e =>
                <Exp key={e} e={e} items={node[e]} locale={locale} />
              )}
            </div>
          </div>
        </>
      }
    </div>
  )
}
