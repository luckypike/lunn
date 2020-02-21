import React from 'react'
import PropTypes from 'prop-types'

import { Link } from '@reach/router'

import styles from './Tutor.module.css'

Tutor.propTypes = {
  tutor: PropTypes.object,
  itemProp: PropTypes.string
}

export default function Tutor ({ tutor, itemProp }) {
  return (
    <div className={styles.tutor}>
      <Link to={`/tutors/${tutor.id}`} className={styles.tutor} itemProp={itemProp}>
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
    </div>
  )
}
