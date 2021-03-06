import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
// import { Link } from '@reach/router'

import { I18nContext, useI18n } from '../I18n'

import { Title } from '../Pages'
import Exp from './Show/Exp'

import styles from './Show.module.css'
import pages from '../Pages.module.css'

Show.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  loaf: PropTypes.array
}

export default function Show ({ id, locale, loaf }) {
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
    'tutor_time',
    'tutor_stime'
    // 'tutor_phone',
    // 'tutor_email'
  ]

  const text = [
    'tutor_school',
    'tutor_works',
    'tutor_conferences',
    'tutor_directions',
    'tutor_retraining',
    'tutor_special'
    // 'tutor_consult'
  ]

  return (
    <I18nContext.Provider value={I18n}>
      <div className={pages.container}>
        {node &&
          <>
            <Title
              h1={node.title}
              loaf={[
                ...loaf,
                {
                  mlid: 999,
                  path: node.path,
                  title: node.title
                }
              ]}
            />

            <div className={styles.root}>
              <div className={styles.photo}>
                <div className={styles.image}>
                  {node.image &&
                    <img src={`https://assets.lunn.ru/imgproxy/rs:fill:480:600/g:sm/q:75/${node.image.encoded_path}.jpg`} />
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

                {(node.tutor_consult || node.tutor_email) &&
                  <>
                    <h5>
                      {I18n.t('tutor.tutor_contacts')}
                    </h5>

                    <p>
                      {node.tutor_consult &&
                        <>
                          {node.tutor_consult}
                        </>
                      }

                      {node.tutor_email &&
                        <>
                          <br />
                          {node.tutor_email}
                        </>
                      }
                    </p>
                  </>
                }
              </div>

              <div className={styles.text}>
                {node.text &&
                  <Exp e="text" text={node.text} />
                }

                {text.filter(e => node[e] && node[e].length > 0).map(e =>
                  <React.Fragment key={e}>
                    {Array.isArray(node[e]) &&
                      <Exp e={e} items={node[e]} locale={locale} />
                    }

                    {!Array.isArray(node[e]) &&
                      <Exp e={e} item={node[e]} locale={locale} node={node} />
                    }
                  </React.Fragment>
                )}
              </div>
            </div>
          </>
        }

        {!node &&
          <div className={styles.placeholder} />
        }
      </div>
    </I18nContext.Provider>
  )
}
