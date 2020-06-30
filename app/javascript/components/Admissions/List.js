import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
// import Docs from '../Docs/Docs2'
import { I18nContext, useI18n } from '../I18n'

import styles from './List.module.css'
import pages from '../Pages.module.css'

List.propTypes = {
  node: PropTypes.object.isRequired,
  loaf: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired
}

export default function List ({ node: nodeJson, loaf, locale }) {
  const node = deserialize(nodeJson)
  const I18n = useI18n(locale)

  const [list, setList] = useState()
  const [profiles, setProfiles] = useState()
  const [categories, setCategories] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/abitur/2020/list.json')

      setList(data.list)
      setProfiles(data.profiles)
      setCategories(data.categories)
    }

    _fetch()
  }, [])

  return (
    <I18nContext.Provider value={I18n}>
      <div className={pages.beta}>
        {node &&
          <Title
            beta
            h1={node.title}
            loaf={loaf}
          />
        }
      </div>

      {list && list.length > 0 &&
        <div className={styles.list}>
          <div className={pages.container}>
            {profiles && Object.entries(profiles).map((profile) =>
              <React.Fragment key={profile[0]}>
                <div>{profile[1].profile} {profile[1].form} {profile[1].tax}</div>

                {categories && categories.map((category, _) =>
                  <React.Fragment key={_}>
                    <div>{category}</div>

                    {list.map((row, _) =>
                      <React.Fragment key={_}>
                        {row.profiles.map(p => (
                          p.profile === profile[1].profile && p.form === profile[1].form && p.tax === profile[1].tax && p.categorob === category &&
                            <div key={row.id}>
                              {row.family}
                            </div>
                        ))}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}

              </React.Fragment>
            )}
          </div>
        </div>
      }
    </I18nContext.Provider>
  )
}
