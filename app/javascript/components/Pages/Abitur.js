import React from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
import Docs from '../Docs/Docs2'
import { I18nContext, useI18n } from '../I18n'

import Contacts from './Abitur/Contacts'
import Today from './Abitur/Today'
import How from './Abitur/How'
import Admission from './Abitur/Admission'
import Courses from './Abitur/Courses'
import Foreigners from './Abitur/Foreigners'
import Results from './Abitur/Results'
import Timing from './Abitur/Timing'

import styles from './Abitur.module.css'
import pages from '../Pages.module.css'

import Top from './Abitur/Top.jpg'

Divisions.propTypes = {
  node: PropTypes.object,
  loaf: PropTypes.array,
  docs: PropTypes.object,
  locale: PropTypes.string
}

export default function Divisions ({ node, loaf, docs: docsJson, locale }) {
  const I18n = useI18n(locale)
  const docs = deserialize(docsJson)

  return (
    <I18nContext.Provider value={I18n}>
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

        <div className={styles.contacts}>
          <div className={pages.container}>
            <Contacts />
          </div>
        </div>

        <div className={styles.how}>
          <div className={pages.container}>
            <How />
          </div>
        </div>

        <div className={styles.admission}>
          <div className={pages.container}>
            <Admission />
          </div>
        </div>

        <div className={styles.results}>
          <div className={pages.container}>
            <Results />
          </div>
        </div>

        <div className={styles.timing}>
          <div className={pages.container}>
            <Timing />
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

        <div className={styles.today}>
          <div className={pages.container}>
            <Today />
          </div>
        </div>

        {docs &&
          <div className={styles.docs}>
            <div className={pages.container}>
              <Docs docs={docs} locale={locale} title="Ознакомиться с правилами приёма" />
            </div>
          </div>
        }
      </div>
    </I18nContext.Provider>
  )
}
