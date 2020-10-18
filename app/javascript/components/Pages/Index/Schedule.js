import React, { useContext } from 'react'
import classNames from 'classnames'

import { I18nContext } from '../../I18n'

import styles from './Schedule.module.css'
import pages from '../../Pages.module.css'

export default function Schedule () {
  const I18n = useContext(I18nContext)

  return (
    <a className={classNames(pages.container, styles.root)} href="/schedule">
      <div className={styles.toggle}>
        <div className={styles.header}>
          {I18n.t('pages.index.schedule.title')}
        </div>

        <div className={styles.button} >
          {I18n.t('pages.index.schedule.more')}
        </div>
      </div>
    </a>
  )
}

function Arrow () {
  return (
    <svg className={styles.external} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 29">
      <path stroke="#2E4DE6" strokeLinecap="round" strokeLinejoin="round" d="M7 22l10-11m-7-3l12-1-1 12"/>
    </svg>
  )
}
