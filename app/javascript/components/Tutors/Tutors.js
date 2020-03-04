import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

// import ScrollToTop from '../ScrollToTop'

// import Index from './Index'
import Show from './Show'

Tutors.propTypes = {
  locale: PropTypes.string,
  loaf: PropTypes.array
}

export default function Tutors ({ locale, loaf }) {
  return (
    <Router>
      <Show path="tutors/:id" locale={locale} loaf={loaf} />
      {/* <ScrollToTop path="/">
        <Index path="tutors" loaf={loaf} />
      </ScrollToTop> */}
    </Router>
  )
}
