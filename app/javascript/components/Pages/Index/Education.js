import React from 'react'
import classNames from 'classnames'

import styles from './Education.module.css'

import Lang from '!svg-react-loader?!./Images/Lang.svg'
import Profs from '!svg-react-loader?!./Images/Profs.svg'
import Studs from '!svg-react-loader?!./Images/Studs.svg'
import Prepods from '!svg-react-loader?!./Images/Prepods.svg'

export default function Education () {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
         Более 100 лет в сфере образования
      </div>

      <div className={styles.blocks}>
        <div className={styles.block}>
          <div className={styles.image}>
            <Lang />
          </div>
          <div className={styles.text}>16</div>
        </div>

        <div className={styles.block}>
          <div className={styles.image}>
            <Profs />
          </div>
          <div className={styles.text}>80%</div>
        </div>

        <div className={styles.block}>
          <div className={styles.image}>
            <Studs />
          </div>
          <div className={styles.text}>{'>'}3000</div>
        </div>

        <div className={styles.block}>
          <div className={styles.image}>
            <Prepods />
          </div>
          <div className={styles.text}>13</div>
        </div>
      </div>
    </div>
  )
}
