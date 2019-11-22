import React from 'react'
import PropTypes from 'prop-types'

History.propTypes = {
  node: PropTypes.object
}

export default function History ({ node }) {
  return (
    <div>History: {node.title}</div>
  )
}
