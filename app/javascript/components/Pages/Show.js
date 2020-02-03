import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Title } from '../Pages'
import Docs from '../Docs/Docs'
import Renderer from '../Draft'
import Navs from '../Navs'
import Nav from '../Nav'
import Tutors from './Show/Tutors'

import styles from './Show.module.css'
import pages from '../Pages.module.css'

Show.propTypes = {
  node: PropTypes.object,
  navs: PropTypes.array,
  loaf: PropTypes.array,
  tutors: PropTypes.array,
  docs: PropTypes.array,
  locale: PropTypes.string
}

export default function Show ({ node, navs, docs, loaf, tutors, locale }) {
  const arr = [5260, 480, 475, 490, 493, 491, 492, 498, 494, 495, 476]

  return (
    <div className={classNames(styles.root, pages.container)}>
      <Title
        h1={node.title}
        loaf={loaf}
      />

      {navs && !arr.includes(node.nid) &&
        <Nav navs={navs} />
      }

      {navs && arr.includes(node.nid) &&
        <Navs navs={navs} />
      }

      {node.text &&
        <div className={styles.text}>
          <Renderer source={node.text} />
        </div>
      }

      {tutors && tutors.length > 0 &&
        <div className={styles.tutors}>
          <h2>
            Состав кафедры
          </h2>

          <Tutors tutors={tutors} />
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
