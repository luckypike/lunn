import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Title } from '../Pages'
import Docs from '../Docs/Docs'
import Renderer from '../Renderer'
import Navs from '../Navs'
import Nav from '../Nav'
import Tutors from './Show/Tutors'
import { I18nContext, useI18n } from '../I18n'

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
  const I18n = useI18n(locale)
  const nid = [475, 476, 490, 491, 492, 493, 494, 495, 498, 6066, 6083]

  return (
    <I18nContext.Provider value={I18n}>
      <div className={classNames(styles.root, pages.container)}>
        <Title
          h1={node.title}
          loaf={loaf}
        />

        {navs &&
          <Nav navs={navs.filter(nav => nav.depth > 2 && !nid.includes(node.nid) && node['menu_open?'] !== 1)} />
        }

        {navs &&
          <Navs navs={navs.filter(nav => nav.depth <= 2 || nid.includes(node.nid) || node['menu_open?'] === 1)} />
        }

        {node.text &&
          <div className={styles.text}>
            <Renderer source={node.text} images={node.images} />
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
    </I18nContext.Provider>
  )
}
