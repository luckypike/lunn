import React from 'react'
import { Link } from '@reach/router'

export default function Index () {
  return (
    <div>
      <div>
        Index
      </div>

      <div>
        <Link to="/news/123">
          News item
        </Link>
      </div>
    </div>
  )
}
