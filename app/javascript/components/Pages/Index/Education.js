import React from 'react'

import styles from './Education.module.css'

import Lang from '!svg-react-loader?!./Images/Lang.svg'
import Profs from '!svg-react-loader?!./Images/Profs.svg'
import Studs from '!svg-react-loader?!./Images/Studs.svg'
import Prepods from '!svg-react-loader?!./Images/Prepods.svg'

export default function Education () {
  return (
    <div className={styles.root}>
      <div className={styles.intro}>
         Более 100 лет в сфере образования
      </div>

      <div className={styles.blocks}>
        <div className={styles.block}>
          <div className={styles.image}>
            <Lang />
          </div>
          <div className={styles.title}>16</div>
          <div className={styles.ellipse}>
            <div className={styles.circle} />
          </div>
          <div className={styles.text}>иностранных языков</div>
        </div>

        <div className={styles.block}>
          <div className={styles.image}>
            <Profs />
          </div>
          <div className={styles.title}>80%</div>
          <div className={styles.ellipse}>
            <div className={styles.circle} />
          </div>
          <div className={styles.text}>преподавателей — профессора и доктора наук</div>
        </div>

        <div className={styles.block}>
          <div className={styles.image}>
            <Studs />
          </div>
          <div className={styles.title}>{'>'} 3000</div>
          <div className={styles.ellipse}>
            <div className={styles.circle} />
          </div>
          <div className={styles.text}>студентов</div>
        </div>

        <div className={styles.block}>
          <div className={styles.image}>
            <Prepods />
          </div>
          <div className={styles.title}>13</div>
          <div className={styles.ellipse}>
            <div className={styles.circle} />
          </div>
          <div className={styles.text}>иностранных преподавателей — носители языка</div>
        </div>
      </div>
    </div>
  )
}
