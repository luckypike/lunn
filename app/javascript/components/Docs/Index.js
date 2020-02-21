import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import mime from 'mime-types'

import { useI18n } from '../I18n'
import { Title } from '../Pages'
import Renderer from '../Renderer'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Show.propTypes = {
  node: PropTypes.object,
  loaf: PropTypes.array,
  docs: PropTypes.array,
  locale: PropTypes.string
}

export default function Show ({ node, docs, loaf, locale }) {
  const I18n = useI18n(locale)

  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className={classNames(styles.root, pages.container)}>
      <Title
        h1={node.title}
        loaf={loaf}
      />

      {node.text &&
        <div className={styles.text}>
          <Renderer source={node.text} />
        </div>
      }

      <div className={styles.input}>
        <input
          type="text"
          placeholder="Введите название документа для поиска..."
          value={search}
          onChange={handleChange}
        />
      </div>

      <div itemProp="copyDoc">
        <div itemProp="docLink">
          {docs &&
            <ul className={styles.docs}>
              {docs.filter(d => d.title.toLowerCase().includes(search.toLowerCase())).map(doc =>
                <li key={doc.fid}>
                  <a href={doc.path} className={styles.doc} itemProp={doc.wrapper}>
                    <div className={styles.data}>
                      <div className={styles.title}>
                        {doc.title}
                      </div>

                      <div className={styles.meta}>
                        ({mime.extension(doc.mime)}, {I18n.toHumanSize(doc.size, { precision: 1, format: '%n %u', strip_insignificant_zeros: true })})
                      </div>

                    </div>
                  </a>
                </li>
              )}
            </ul>
          }
        </div>
      </div>
    </div>
  )
}
