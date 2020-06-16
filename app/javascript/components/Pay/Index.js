import React from 'react'
import PropTypes from 'prop-types'

import Title from '../Title'
import Text from './Index/Text'
import Intro from './Index/Intro'
import { useI18n } from '../I18n'

import Search from './Index/Search'

import pages from '../Pages.module.css'
import styles from './Index.module.css'

Index.propTypes = {
  locale: PropTypes.string
}

export default function Index ({ locale }) {
  const I18n = useI18n(locale)

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={I18n.t('pay.index.title')}
      />

      <div className={styles.search}>
        <div className={pages.container}>
          <Intro />

          <Search />
        </div>
      </div>

      <div className={pages.container}>
        {/* <div className={styles.root}>
          QWE
        </div> */}
        <div className={styles.text}>
          <Text />
        </div>
      </div>
    </div>
  )
}
