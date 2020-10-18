import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import { I18nContext, useI18n } from '../I18n'

// import ScrollToTop from '../ScrollToTop'

// import Index from './Index'
import Show from './Show'

Tutors.propTypes = {
  locale: PropTypes.string,
  loaf: PropTypes.array
}

export default function Tutors ({ locale, loaf }) {
  const I18n = useI18n(locale)

  return (
    <I18nContext.Provider value={I18n}>
      <Router>
        <Show path="/tutors/:id" locale={locale} loaf={loaf} />
        <Show path="/:locale/tutors/:id" locale={locale} loaf={loaf} />
        {/* <ScrollToTop path="/">
          <Index path="tutors" loaf={loaf} />
        </ScrollToTop> */}
      </Router>
    </I18nContext.Provider>
  )
}
