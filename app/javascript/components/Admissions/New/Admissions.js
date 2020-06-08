import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

import styles from './Admissions.module.css'

Admissions.propTypes = {
  admissions: PropTypes.array,
  locale: PropTypes.string
}

export default function Admissions ({ admissions }) {
  return (
    <div>
      <h2>
        Отправленные заявления
      </h2>

      <div className={styles.admissions}>
        {admissions && admissions.map(admission =>
          <Link key={admission.id} className={styles.admission} to={`/admissions/${admission.id}`}>
            <div className={styles.title}>
              Заявление № {admission.number}
            </div>

            <div>
              {[admission.identity_first_name, admission.identity_middle_name, admission.identity_last_name].join(' ')}
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
