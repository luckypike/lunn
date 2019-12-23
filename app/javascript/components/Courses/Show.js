import React from 'react'
import PropTypes from 'prop-types'

import { Title } from '../Pages'

import pages from '../Pages.module.css'

Show.propTypes = {
  node: PropTypes.object,
  loaf: PropTypes.array
}

export default function Show ({ node, loaf }) {
  return (
    <div className={pages.container}>
      <Title
        h1={node.title}
        loaf={[
          ...loaf,
          {
            mlid: 999,
            path: node.path,
            title: node.title
          }
        ]}
      />

    </div>
  )
}
