import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'
import Show from './Show'

Tutors.propTypes = {
  locale: PropTypes.string
}

export default function Tutors ({ locale }) {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="tutors" />
        <Show path="tutors/:id" locale={locale} />
      </ScrollToTop>
    </Router>
  )
}
