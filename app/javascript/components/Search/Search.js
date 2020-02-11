import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import Index from './Index'

Search.propTypes = {
  locale: PropTypes.string
}

export default function Search ({ locale }) {
  return (
    <Router>
      <Index path="/search" locale={locale} />
    </Router>
  )
}
