import React from 'react'
import PropTypes from 'prop-types'
// import { ContentState, convertFromHTML } from 'draft-js'

Show.propTypes = {
  node: PropTypes.object,
  navs: PropTypes.array
}

export default function Show ({ node, navs }) {
  // const blocks = convertFromHTML(node.text)
  // const state = ContentState.createFromBlockArray(
  //   blocks.contentBlocks,
  //   blocks.entityMap
  // )
  //
  // console.log(state)

  return (
    <div>
      <h1>
        {node.title}
      </h1>

      {navs && navs.length > 0 &&
        <div>
          {navs.map(nav =>
            <div key={nav.mlid}>
              <a href={nav.path}>
                {nav.title}
              </a>
            </div>
          )}
        </div>
      }

      {node.text &&
        <div>
          {node.text}
        </div>
      }
    </div>
  )
}
