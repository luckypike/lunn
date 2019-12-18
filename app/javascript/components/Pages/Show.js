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

      {navs &&
        <div className={styles.groups}>
          <Navs navs={navs} />
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

Navs.propTypes = {
  navs: PropTypes.array
}

function Navs ({ navs }) {
  const chunk = navs.length < 3 ? 1 : Math.floor(navs.length / 3)

  const groups = navs
    .reduce((acc, _, i) =>
      (i % chunk)
        ? acc
        : [...acc, navs.slice(i, i + chunk)]
    , [])
  return (
    <>
      {[...Array(3)].map((_, i) =>
        <div key={i} className={styles.group}>
          {groups[i] && groups[i].map(nav =>
            <a href={nav.path} key={nav.mlid} className={styles.nav}>
              {nav.title}
            </a>
          )}

          {i === 0 && groups[3] && groups[3].map(nav =>
            <a href={nav.path} key={nav.mlid} className={styles.nav}>
              {nav.title}
            </a>
          )}
        </div>
      )}
    </>
  )
}
