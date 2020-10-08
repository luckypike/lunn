import React, { useContext } from 'react'

import { I18nContext } from '../../I18n'

import styles from './Education.module.css'

import Lang from '!svg-react-loader?!./Images/Lang.svg'
import Profs from '!svg-react-loader?!./Images/Profs.svg'
import Studs from '!svg-react-loader?!./Images/Studs.svg'
import Prepods from '!svg-react-loader?!./Images/Prepods.svg'

export default function Education () {
  const I18n = useContext(I18nContext)

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        {I18n.t('pages.index.education.title')}
      </div>

      <div className={styles.blocks}>
        <div className={styles.block}>
          <div className={styles.image}>
            <Lang />
          </div>
          <div className={styles.title}>17</div>
          <div className={styles.container}>
            <div className={styles.ellipse}>
              <div className={styles.circle} />
            </div>
            <div className={styles.line} />
          </div>
          <div className={styles.text}>
            {I18n.t('pages.index.education.languages')}
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.image}>
            <Profs />
          </div>
          <div className={styles.title}>80%</div>
          <div className={styles.container}>
            <div className={styles.ellipse}>
              <div className={styles.circle} />
            </div>
            <div className={styles.line} />
          </div>
          <div className={styles.text}>
            {I18n.t('pages.index.education.professors')}
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.image}>
            <Studs />
          </div>
          <div className={styles.title}>{'>'} 3000</div>
          <div className={styles.container}>
            <div className={styles.ellipse}>
              <div className={styles.circle} />
            </div>
            <div className={styles.line} />
          </div>
          <div className={styles.text}>
            {I18n.t('pages.index.education.students')}
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.image}>
            <Prepods />
          </div>
          <div className={styles.title}>13</div>
          <div className={styles.container}>
            <div className={styles.ellipse}>
              <div className={styles.circle} />
            </div>
          </div>
          <div className={styles.text}>
            {I18n.t('pages.index.education.native')}
          </div>
        </div>
      </div>
    </div>
  )
}
