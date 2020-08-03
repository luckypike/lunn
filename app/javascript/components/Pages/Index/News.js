import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { I18nContext } from '../../I18n'

import styles from './News.module.css'
import buttons from '../../Buttons.module.css'

News.propTypes = {
  news: PropTypes.array,
  I18n: PropTypes.object
}

export default function News ({ news }) {
  const I18n = useContext(I18nContext)

  return (
    <div className={styles.news}>
      <div className={styles.label}>
        <h2>
          {I18n.t('pages.index.news.title')}
        </h2>
      </div>

      <div className={styles.items}>
        {news.map((item, i) =>
          <a href={item.path} key={item.nid} className={styles.item}>
            <div className={styles.title}>
              {item.title}
            </div>

            <div className={styles.date}>
              {dayjs.unix(item.created).locale(I18n.locale).format('D MMMM YYYY')}
            </div>
          </a>
        )}
      </div>

      <a href={`${I18n.localePath()}/news`} className={classNames(buttons.sec, styles.more)}>
        {I18n.t('pages.index.news.more')}
      </a>
    </div>
  )
}
