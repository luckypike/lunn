import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'
import Show from './Show'

News.propTypes = {
  locale: PropTypes.object
}

export default function News ({ locale }) {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="news" />
        <Show path="news/:slug" locale={locale} />
      </ScrollToTop>
    </Router>
  )
}
