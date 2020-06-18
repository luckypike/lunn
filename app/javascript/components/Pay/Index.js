import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Title from '../Title'
import Intro from './Index/Intro'
import { useI18n } from '../I18n'

import Search from './Index/Search'
import Text from './Index/Text'
import Free from './Index/Free'

import pages from '../Pages.module.css'
import styles from './Index.module.css'

Index.propTypes = {
  gateway: PropTypes.string,
  return_url: PropTypes.string,
  locale: PropTypes.string
}

export default function Index ({ gateway, return_url: returnUrl, locale }) {
  const [type, setType] = useState('free')

  const isFree = () => type === 'free'
  const isContract = () => type === 'contract'

  const I18n = useI18n(locale)

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={I18n.t('pay.index.title')}
      />

      <div className={pages.container}>
        <div className={styles.tabs}>
          <ul>
            <li className={classNames(styles.tab, { [styles.active]: type === 'free' })} onClick={() => setType('free')}>
              В свободной форме
            </li>

            <li className={classNames(styles.tab, { [styles.active]: type === 'contract' })} onClick={() => setType('contract')}>
              По  номеру договора
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.search}>
        <div className={pages.container}>
          {isFree() &&
            <Free gateway={gateway} returnUrl={returnUrl} />
          }

          {isContract() &&
            <div>
              Оплата по номеру договора временно недоступна. В ближайшее время этот функционал будет доделан.
            </div>
          }
        </div>
      </div>

      <div className={pages.container}>
        {/* <div className={styles.root}>
          QWE
        </div> */}
        <div className={styles.text}>
          <Text />
        </div>
      </div>
    </div>
  )
}
