import React from 'react'
import PropTypes from 'prop-types'

History.propTypes = {
  node: PropTypes.object,
  body: PropTypes.object
}

export default function History ({ node, body }) {
  return (
    <div>
      <h1>
        {node.title}
      </h1>

      {body &&
        <div
          dangerouslySetInnerHTML={{
            __html: body.field_body_value
          }}
        />
      }
    </div>
  )
}
