import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from '@reach/router'

import { Title } from '../Pages'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

export default function Index () {
  const [node, setNode] = useState()
  const [tutors, setTutors] = useState()

  const _fetch = async () => {
    const { data } = await axios.get('/tutors.json')

    setNode(data.node)
    setTutors(data.tutors)
  }

  useEffect(() => {
    _fetch()
  }, [])

  return (
    <div className={pages.container}>
      {node &&
        <Title
          h1={node.title}
        />
      }

      {tutors &&
        <div className={styles.tutors}>
          {tutors.map(tutor =>
            <Link to={`/tutors/${tutor.id}`} key={tutor.nid} className={styles.tutor}>
              <div className={styles.image}>
                {tutor.image &&
                  <img src={tutor.image.path} />
                }
              </div>

              <div>
                {tutor.title}
              </div>
            </Link>
          )}
        </div>
      }
    </div>
  )
}
