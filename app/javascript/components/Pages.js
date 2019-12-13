import React from 'react'
import PropTypes from 'prop-types'

Title.propTypes = {
  loaf: PropTypes.array,
  title: PropTypes.string
}

export function Title ({ title, loaf }) {
  return (
    <div>
      {loaf && loaf.length > 0 &&
        <ul>
          {loaf.map(l =>
            <li key={l.mlid}>
              <a href={l.path}>
                {l.title}
              </a>
            </li>
          )}
        </ul>
      }

      <h1>
        {title}
      </h1>
    </div>
  )
}
