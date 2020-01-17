import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Title } from '../Pages'
import Docs from '../Docs/Docs'
import Renderer from '../Draft'
import Navs from '../Navs'

import styles from './Show.module.css'
import pages from '../Pages.module.css'

Show.propTypes = {
  node: PropTypes.object,
  navs: PropTypes.array,
  loaf: PropTypes.array,
  docs: PropTypes.array,
  locale: PropTypes.string
}

export default function Show ({ node, navs, docs, loaf, locale }) {
  return (
    <div className={classNames(styles.root, pages.container)}>
      <Title
        h1={node.title}
        loaf={loaf}
      />

      {navs &&
        <Navs navs={navs} />
      }

      {node.text &&
        <div className={styles.text}>
          <Renderer source={node.text} />
        </div>
      }

      {docs &&
        <div className={styles.docs}>
          <Docs docs={docs} locale={locale} />
        </div>
      }
    </div>
  )
}
