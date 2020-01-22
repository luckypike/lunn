import React from 'react'
import PropTypes from 'prop-types'

import styles from './Tutors.module.css'

Tutors.propTypes = {
  tutors: PropTypes.array
}

export default function Tutors ({ tutors }) {
  return (
    <div className={styles.tutors}>
      {tutors.map(tutor =>
        <a href={tutor.path} key={tutor.nid} className={styles.tutor}>
          <div className={styles.image}>
            {tutor.image &&
              <img src={tutor.image.path} />
            }
          </div>

          <div>
            {tutor.title}
          </div>
        </a>
      )}
    </div>
  )
}
