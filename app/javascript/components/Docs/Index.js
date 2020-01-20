import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import mime from 'mime-types'

import { useI18n } from '../I18n'
import { Title } from '../Pages'
import Renderer from '../Draft'

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
        <input placeholder="Введите название документа для поиска..." />
      </div>

      {docs &&
        <ul className={styles.docs}>
          {docs.map(doc =>
            <li key={doc.fid}>
              <a href={doc.path} target="_blank" rel="noopener noreferrer" className={styles.doc} itemProp={doc.wrapper}>
                <svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0H4A3.995 3.995 0 00.02 4L0 36a3.994 3.994 0 003.98 4H28a4.011 4.011 0 004-4V12L20 0zM4 36V4h14v10h10v22H4z" fill="#2F53EB"/>
                </svg>

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
  )
}
