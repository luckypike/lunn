import { useEffect } from 'react'

export default function ScrollToTop ({ children, location }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.search])

  return children
}
