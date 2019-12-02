import React from 'react'
import { Link } from '@reach/router'

export default function Show () {
  return (
    <div>
      <div>
        Show
      </div>

      <div>
        <Link to="/news">
          NEWS
        </Link>
      </div>
    </div>
  )
}
