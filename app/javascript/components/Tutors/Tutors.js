import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import Index from './Index'
import Show from './Show'

Tutors.propTypes = {
  locale: PropTypes.string
}

export default function Tutors ({ locale }) {
  return (
    <Router>
      <Index path="tutors" />
      <Show path="tutors/:id" locale={locale} />
    </Router>
  )
}
