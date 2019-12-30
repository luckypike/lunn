import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from '@reach/router'

import { Title } from '../Pages'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Show.propTypes = {
  id: PropTypes.string
}

export default function Show ({ id }) {
  const [node, setNode] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(`/tutors/${id}.json`)

      setNode(data.node)
    }

    _fetch()
  }, [])

  return (
    <div className={pages.container}>
      {node &&
        <Title
          h1={node.title}
        />
      }
    </div>
  )
}
