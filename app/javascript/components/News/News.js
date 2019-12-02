import React from 'react'
import { Router } from '@reach/router'

import Index from './Index'
import Show from './Show'

export default function News () {
  return (
    <Router>
      <Index path="news" />
      <Show path="news/:slug" />
    </Router>
  )
}
