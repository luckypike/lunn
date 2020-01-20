import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

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

      {docs &&
        <div className={styles.docs}>
          DOCS
        </div>
      }
    </div>
  )
}
