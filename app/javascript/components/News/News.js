import React from 'react'
import { Router } from '@reach/router'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'
import Show from './Show'

export default function News () {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="news" />
        <Show path="news/:slug" />
      </ScrollToTop>
    </Router>
  )
}
