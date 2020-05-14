import React from 'react'
import { Router } from '@reach/router'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'
import Show from './Show'
import Form from './Form'

export default function Admissions () {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="admissions" />
        <Show path="admissions/:slug" />
        <Form path="admissions/new" />
        <Form path="admissions/:id/edit" />
      </ScrollToTop>
    </Router>
  )
}
