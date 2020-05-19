import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'
import Show from './Show'
import New from './New'
import Form from './Form'

Admissions.propTypes = {
  user: PropTypes.object,
  locale: PropTypes.string
}

export default function Admissions ({ locale, user }) {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="admissions" />
        <Show path="admissions/:id" />
        <New path="admissions/new" locale={locale} user={user} />
        <Form path="admissions/:id/edit" locale={locale} />
      </ScrollToTop>
    </Router>
  )
}
