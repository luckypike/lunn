import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'

import Division from './Index/Division'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  node: PropTypes.object,
  level: PropTypes.string,
  divisions: PropTypes.object,
  loaf: PropTypes.array,
  locale: PropTypes.string
}

export default function Index ({ node, loaf, level, divisions: data, locale }) {
  const divisions = deserialize(data)

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
                Бакалавриат
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
        divisions.filter(d => d.courses.length > 0).map(division =>
          <Division key={division.nid} level={level} division={division} locale={locale} />
        )
      }
    </div>
  )
}
