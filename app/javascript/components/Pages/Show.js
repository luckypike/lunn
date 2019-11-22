import React from 'react'
import PropTypes from 'prop-types'

Show.propTypes = {
  node: PropTypes.object
}

export default function Show ({ node }) {
  return (
    <div>{node.title}</div>
  )
}
