import React from 'react'

export default function ScrollToTop ({ children, location }) {
  React.useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [location.pathname + location.search])
  return children
}
