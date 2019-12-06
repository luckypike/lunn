import React from 'react'
import PropTypes from 'prop-types'
// import { ContentState, convertFromHTML } from 'draft-js'

Show.propTypes = {
  node: PropTypes.object,
  navs: PropTypes.array,
  docs: PropTypes.array
}

export default function Show ({ node, navs, docs }) {
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

      {docs && docs.length > 0 &&
        <ul>
          {docs.map(doc =>
            <li key={doc.fid}>
              <a href={doc.path} target="_blank" rel="noopener noreferrer">
                {doc.title}
              </a>
            </li>
          )}
        </ul>
      }
    </div>
  )
}
