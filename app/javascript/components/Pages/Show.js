import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Title } from '../Pages'
import Renderer from '../Draft'

import styles from './Show.module.css'
import pages from '../Pages.module.css'

Show.propTypes = {
  node: PropTypes.object,
  navs: PropTypes.array,
  loaf: PropTypes.array,
  docs: PropTypes.array
}

export default function Show ({ node, navs, docs, loaf }) {
  return (
    <div className={classNames(styles.root, pages.container)}>
      <Title
        title={node.title}
        loaf={loaf}
      />

      {navs && navs.length > 0 &&
        <div className={styles.navs}>
          {navs.map(nav =>
            <div key={nav.mlid} className={styles.nav}>
              <a href={nav.path}>
                {nav.title}
              </a>
            </div>
          )}
        </div>
      }

      {node.text &&
        <div className={styles.text}>
          <Renderer source={node.text} />
        </div>
      }

      {docs && docs.length > 0 &&
        <div className={styles.docs}>

          {/* То, что внутри styles.docs вынести в отдельный компонент! */}
          <ul>
            {docs.map(doc =>
              <li key={doc.fid}>
                <a href={doc.path} target="_blank" rel="noopener noreferrer">
                  {doc.title}
                </a>
              </li>
            )}
          </ul>
        </div>
      }
    </div>
  )
}
