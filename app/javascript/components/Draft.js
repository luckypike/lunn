import React from 'react'
import PropTypes from 'prop-types'
import redraft from 'redraft'

import { ContentState, convertFromHTML, convertToRaw } from 'draft-js'

import styles from './Draft.module.css'

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

const getParagraphs = (children, { keys }) =>
  children.map((p, i) =>
    <p key={keys[i]} className={styles.p}>
      {p}
    </p>
  )

const getH2 = (children, { keys }) =>
  children.map((p, i) =>
    <h2 key={keys[i]} className={styles.h2}>
      {p}
    </h2>
  )

const getUl = (children, { depth, keys }) =>
  <ul key={keys.join('-')} className={styles.ul}>
    {children.map((li, i) =>
      <li key={keys[i]}>{li}</li>
    )}
  </ul>

const getOl = (children, { depth, keys }) =>
  <ol key={keys.join('-')} className={styles.ol}>
    {children.map((li, i) =>
      <li key={keys[i]}>{li}</li>
    )}
  </ol>

const getStyle = (children, { key }) =>
  <strong key={key}>
    {children}
  </strong>

const renderers = {
  inline: {
    BOLD: getStyle
  },
  blocks: {
    unstyled: getParagraphs,
    'header-two': getH2,
    'unordered-list-item': getUl,
    'ordered-list-item': getOl
  }
}
