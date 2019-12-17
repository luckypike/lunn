import React from 'react'
import PropTypes from 'prop-types'
import redraft, { createStylesRenderer, createBlockRenderer } from 'redraft'
// import Immutable from 'immutable'

import { ContentState, convertFromHTML, convertToRaw } from 'draft-js'

Renderer.propTypes = {
  source: PropTypes.string
}

export default function Renderer ({ source }) {
  const blocks = convertFromHTML(source)
  const state = ContentState.createFromBlockArray(
    blocks.contentBlocks,
    blocks.entityMap
  )

  return redraft(convertToRaw(state), renderers)
}

const renderers = {
  inline: {
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>
  },
  blocks: {
    unstyled: (children) => children.map((child, i) => <p key={i}>{child}</p>)
  }
}
