import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'
import Show from './Show'

Tutors.propTypes = {
  locale: PropTypes.string,
  node: PropTypes.object,
  loaf: PropTypes.array,
  tutors: PropTypes.array
}

export default function Tutors ({ locale, loaf, tutors, node }) {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="tutors" loaf={loaf} tutors={tutors} node={node} />
        <Show path="tutors/:id" locale={locale} loaf={loaf} />
      </ScrollToTop>
    </Router>
  )
}
