import React from 'react'
import PropTypes from 'prop-types'

import { Title } from '../../Pages'

import Division from './Division'

import pages from '../../Pages.module.css'

Index.propTypes = {
  node: PropTypes.object,
  divisions: PropTypes.array,
  loaf: PropTypes.array,
  locale: PropTypes.string
}

export default function Index ({ node, loaf, divisions, locale }) {
  return (
    <div className={pages.root}>
      {node &&
        <Title
          h1={node.title}
          loaf={loaf}
        />
      }

      <div className={pages.container}>
        {divisions &&
          divisions.filter(d => d.division_courses.length > 0).map(division =>
            <Division key={division.nid} division={division} locale={locale} />
          )
        }
      </div>
    </div>
  )
}
