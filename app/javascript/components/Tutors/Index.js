import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from '@reach/router'

import { Title } from '../Pages'
import Filters from './Index/Filters'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  loaf: PropTypes.array
}

export default function Index ({ loaf }) {
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

  const itemProp = types => {
    if (types.includes(9)) {
      return 'rucovodstvo'
    } else if (types.includes(1)) {
      return 'rucovodstvoZam'
    } else {
      return 'teachingStaff'
    }
  }

  return (
    <div className={pages.container}>
      {node &&
        <Title
          h1={node.title}
          loaf={loaf}
        />
      }

      {/* <Filters /> */}

      {tutors &&
        <div className={styles.tutors}>
          {tutors.map(tutor =>
            <Link to={`/tutors/${tutor.id}`} key={tutor.id} className={styles.tutor} itemProp={itemProp(tutor.tutor_types)}>
              <div className={styles.image}>
                {tutor.image &&
                  <img src={`https://assets.lunn.ru/images/480x600,sc/legacy${tutor.image.path}`} />
                }
              </div>

              <div itemProp="fio">
                {tutor.title}
              </div>

              <div className={styles.data}>
                <div className={styles.position} itemProp="post">
                  {tutor.position}
                </div>

                {tutor.tutor_email &&
                  <div className={styles.email} itemProp="email">
                    {tutor.tutor_email}
                  </div>
                }

                {tutor.tutor_phone &&
                  <div className={styles.phone} itemProp="telephone">
                    {tutor.tutor_phone}
                  </div>
                }
              </div>
            </Link>
          )}
        </div>
      }
    </div>
  )
}
