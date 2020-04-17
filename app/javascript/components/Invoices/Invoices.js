import React from 'react'
import { Router } from '@reach/router'
import PropTypes from 'prop-types'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'

Invoices.propTypes = {
  invoices: PropTypes.array,
}

export default function Invoices ({ invoices }) {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="invoices" invoices={invoices} />
      </ScrollToTop>
    </Router>
  )
}
