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
        <a href={tutor.url || tutor.path} key={tutor.nid} className={styles.tutor}>
          <div className={styles.image}>
            {tutor.image &&
              <img src={`https://assets.lunn.ru/imgproxy/rs:fill:480:600/g:sm/q:75/${tutor.image.encoded_path}.jpg`} />
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
