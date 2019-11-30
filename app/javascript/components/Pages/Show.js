import React from 'react'
import PropTypes from 'prop-types'
import { ContentState, convertFromHTML } from 'draft-js'

Show.propTypes = {
  node: PropTypes.object,
  body: PropTypes.object
}

export default function Show ({ node, body }) {
  const blocks = convertFromHTML(body.field_body_value)
  const state = ContentState.createFromBlockArray(
    blocks.contentBlocks,
    blocks.entityMap
  )

  console.log(state)

  return (
    <div>
      <h1>
        {node.title}
      </h1>

      {node.text &&
        <div>
          {node.text}
        </div>
      }
    </div>
  )
}
