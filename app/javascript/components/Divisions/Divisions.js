import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'

import ScrollToTop from '../ScrollToTop'

import Index from './Index'

Divisions.propTypes = {
  node: PropTypes.object,
  locale: PropTypes.string,
  divisions: PropTypes.array,
  courses: PropTypes.array,
}

export default function Divisions ({ locale, node, divisions, courses }) {
  return (
    <Router>
      <ScrollToTop path="/">
        <Index path="abitur/programs" node={node} divisions={divisions} courses={courses} locale={locale}/>
      </ScrollToTop>
    </Router>
  )
}
