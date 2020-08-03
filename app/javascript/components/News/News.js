import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import { I18nContext, useI18n } from '../I18n'
import ScrollToTop from '../ScrollToTop'

import Index from './Index'
import Show from './Show'

News.propTypes = {
  locale: PropTypes.string
}

export default function News ({ locale }) {
  const I18n = useI18n(locale)

  return (
    <I18nContext.Provider value={I18n}>
      <Router basepath={I18n.localePath()}>
        <ScrollToTop path="/">
          <Index path="news" />
          <Show path="news/:slug" />
        </ScrollToTop>
      </Router>
    </I18nContext.Provider>
  )
}
