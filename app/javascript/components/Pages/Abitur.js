import React from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'

import Title from '../Title'
import Docs from '../Docs/Docs'

import Today from './Abitur/Today'
import Admission from './Abitur/Admission'
import Courses from './Abitur/Courses'
import Foreigners from './Abitur/Foreigners'

import styles from './Abitur.module.css'
import pages from '../Pages.module.css'

import Top from './Abitur/Top.jpg'

Divisions.propTypes = {
  node: PropTypes.object,
  loaf: PropTypes.array,
  docs: PropTypes.array,
  locale: PropTypes.string
}

export default function Divisions ({ node, loaf, docs, locale }) {
  return (
    <div className={pages.beta}>
      {node &&
        <Title
          beta
          h1={node.title}
          loaf={loaf}
          desc="Бакалавриат, специалитет, магистратура, аспирантура"
          image={Top}
        />
      }

      <div className={styles.today}>
        <div className={pages.container}>
          <Today />
        </div>
      </div>

      <div className={styles.admission}>
        <div className={pages.container}>
          <Admission />
        </div>
      </div>

      <div className={styles.courses}>
        <div className={pages.container}>
          <Courses />
        </div>
      </div>

      <div className={styles.foreigners}>
        <div className={pages.container}>
          <Foreigners />
        </div>
      </div>

      {docs &&
        <div className={styles.docs}>
          <div className={pages.container}>
            <Docs docs={docs} locale={locale} />
          </div>
        </div>
      }
    </div>
  )
}