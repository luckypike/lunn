import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'
import Show from './Show'

Events.propTypes = {
  locale: PropTypes.string
}

export default function Events ({ locale }) {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="events" />
        <Show path="events/:slug" locale={locale} />
      </ScrollToTop>
    </Router>
  )
}
