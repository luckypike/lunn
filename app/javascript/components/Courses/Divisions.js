import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Title from '../Title'

import Division from './Divisions/Division'

import styles from './Divisions.module.css'
import pages from '../Pages.module.css'

Divisions.propTypes = {
  node: PropTypes.object,
  level: PropTypes.string,
  divisions: PropTypes.array,
  loaf: PropTypes.array,
  locale: PropTypes.string
}

export default function Divisions ({ node, loaf, level, divisions, locale }) {
  return (
    <div className={pages.beta}>
      {node &&
        <Title
          beta
          h1={node.title}
          loaf={loaf}
        />
      }

      <div className={pages.container}>
        <div className={styles.tabs}>
          <ul>
            <li>
              <a href="/programs/ba" className={classNames(styles.tab, { [styles.active]: level === 'ba' })}>
                Бакалавиат
              </a>
            </li>

            <li>
              <a href="/programs/sp" className={classNames(styles.tab, { [styles.active]: level === 'sp' })}>
                Специалитет
              </a>
            </li>

            <li>
              <a href="/programs/ma" className={classNames(styles.tab, { [styles.active]: level === 'ma' })}>
                Магистратура
              </a>
            </li>

            <li>
              <a href="/programs/as" className={classNames(styles.tab, { [styles.active]: level === 'as' })}>
                Аспирантура
              </a>
            </li>
          </ul>
        </div>
      </div>

      {divisions &&
        divisions.filter(d => d.division_courses.length > 0).map(division =>
          <Division key={division.nid} level={level} division={division} locale={locale} />
        )
      }
    </div>
  )
}
