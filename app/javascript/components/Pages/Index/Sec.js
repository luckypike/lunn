import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { I18nContext } from '../../I18n'

import styles from './Sec.module.css'

import ArrowImg from '!svg-react-loader?!../../../images/arrow-right.svg'

Sec.propTypes = {
  navs: PropTypes.array
}

export default function Sec () {
  const I18n = useContext(I18nContext)

  return (
    <div className={styles.root}>
      <div className={styles.items}>
        <a href="/page/shkolniku" className={classNames(styles.item, styles.hss)}>
          <div className={styles.title}>
            {I18n.t('pages.index.sec.school')}
          </div>

          <div className={styles.more}>
            <span>{I18n.t('pages.index.sec.more')}</span>

            <ArrowImg />
          </div>
        </a>

        <a href="/abitur/2020" className={classNames(styles.item, styles.abitur)}>
          <div className={styles.title}>
            {I18n.t('pages.index.sec.abitur')}
          </div>

          <div className={styles.more}>
            <span>{I18n.t('pages.index.sec.more')}</span>

            <ArrowImg />
          </div>
        </a>

        <a href="/page/studentu" className={classNames(styles.item, styles.student)}>
          <div className={styles.title}>
            {I18n.t('pages.index.sec.student')}
          </div>

          <div className={styles.more}>
            <span>{I18n.t('pages.index.sec.more')}</span>

            <ArrowImg />
          </div>
        </a>

        <a href="/page/vypuskniku" className={classNames(styles.item, styles.graduate)}>
          <div className={styles.title}>
            {I18n.t('pages.index.sec.alumni')}
          </div>

          <div className={styles.more}>
            <span>{I18n.t('pages.index.sec.more')}</span>

            <ArrowImg />
          </div>
        </a>
      </div>
    </div>
  )
}
