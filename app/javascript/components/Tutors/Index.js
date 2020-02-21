import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Title } from '../Pages'
// import Filters from './Index/Filters'
import Tutor from './Index/Tutor'

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

      <div className={styles.executives}>
        Руководители
      </div>

      {tutors &&
        <>
          <div className={styles.leaders}>
            {tutors.filter(t => t.tutor_types.includes(9) || t.tutor_types.includes(1)).map(tutor =>
              <Tutor key={tutor.id} tutor={tutor} itemProp={itemProp(tutor.tutor_types)}/>
            )}
          </div>

          <div className={styles.tutors}>
            {tutors.filter(t => !t.tutor_types.includes(9) && !t.tutor_types.includes(1)).map(tutor =>
              <Tutor key={tutor.id} tutor={tutor} itemProp={itemProp(tutor.tutor_types)} />
            )}
          </div>
        </>
      }
    </div>
  )
}
