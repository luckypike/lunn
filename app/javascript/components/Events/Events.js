import React from 'react'
import { Router } from '@reach/router'

import Index from './Index'
import Show from './Show'

export default function Events () {
  return (
    <Router>
      <Index path="events" />
      <Show path="events/:slug" />
    </Router>
  )
}
