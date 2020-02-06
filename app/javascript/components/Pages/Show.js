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
  const nid = [475, 476, 490, 491, 492, 493, 494, 495, 498]

  return (
    <div className={classNames(styles.root, pages.container)}>
      <Title
        h1={node.title}
        loaf={loaf}
      />

      {navs &&
        <Nav navs={navs.filter(nav => nav.depth > 2 && !nid.includes(node.nid))} />
      }

      {navs &&
        <Navs navs={navs.filter(nav => nav.depth <= 2 || nid.includes(node.nid))} />
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
