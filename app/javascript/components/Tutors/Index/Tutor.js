import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// import { Link } from '@reach/router'

import styles from './Tutor.module.css'

Tutor.propTypes = {
  tutor: PropTypes.object,
  itemProp: PropTypes.string
}

export default function Tutor ({ tutor, itemProp }) {
  return (
    <div className={styles.tutor}>
      <a href={`/tutors/${tutor.id}`} className={styles.tutor} itemProp={itemProp}>
        <div className={styles.image}>
          {tutor.image &&
            <img src={`https://assets.lunn.ru/imgproxy/rs:fill:480:600/g:sm/q:75/${tutor.image.encoded_path}.jpg`} />
          }
        </div>

        <div itemProp="fio">
          {tutor.title}
        </div>

        <div className={styles.data}>
          <div className={classNames(styles.position, { [styles.executives]: tutor.tutor_types.includes(9) || tutor.tutor_types.includes(1) })} itemProp="post">
            {tutor.position}
          </div>

          {tutor.tutor_email_public &&
            <div className={styles.email} itemProp="email">
              {tutor.tutor_email_public}
            </div>
          }

          {tutor.tutor_phone_public &&
            <div className={styles.phone} itemProp="telephone">
              {tutor.tutor_phone_public}
            </div>
          }
        </div>
      </a>
    </div>
  )
}
