import React from 'react'
import PropTypes from 'prop-types'

Sec.propTypes = {
  navs: PropTypes.array
}

export default function Sec ({ navs }) {
  return (
    <div>
      {navs.filter(n => n.depth === 1).map(nav =>
        <div key={nav.mlid}>
          <a href={nav.path}>
            {nav.title}
          </a>
        </div>
      )}
    </div>
  )
}
