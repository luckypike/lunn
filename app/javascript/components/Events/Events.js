import React from 'react'
import { Router } from '@reach/router'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'
import Show from './Show'

export default function Events () {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="events" />
        <Show path="events/:slug" />
      </ScrollToTop>
    </Router>
  )
}
