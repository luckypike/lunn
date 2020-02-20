import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Title } from '../Pages'
import Renderer from '../Renderer'

import styles from './Page.module.css'
import pages from '../Pages.module.css'

Page.propTypes = {
  node: PropTypes.object,
  user: PropTypes.object,
  loaf: PropTypes.array,
  locale: PropTypes.string
}

export default function Page ({ node, user, loaf, locale }) {
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

      {!user &&
        <div>

        </div>
      }

      {user &&
        <div>
          <a href="/admissions/new">
            Подать документы
          </a>
        </div>
      }
    </div>
  )
}
