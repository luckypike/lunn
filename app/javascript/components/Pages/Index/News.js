import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import styles from './News.module.css'
import buttons from '../../Buttons.module.css'

News.propTypes = {
  news: PropTypes.array,
  I18n: PropTypes.object
}

export default function News ({ news, I18n }) {
  return (
    <div className={styles.news}>
      <div className={styles.label}>
        <h2>{I18n.t('news.title')}</h2>
      </div>

      <div className={styles.news_items}>
        {news.map((item, i) =>
          <div key={item.nid} className={classNames(styles.news_item, { [styles.first]: i === 0 })}>
            <a href={item.path}>
              <div className={styles.image}>
                <img src={item.images[0].path} />
              </div>

              <div className={styles.title}>
                {item.title}
              </div>

              <div className={styles.date}>
                {dayjs.unix(item.created).locale('ru').format('DD MMMM YYYY')}
              </div>
            </a>
          </div>
        )}
      </div>

      <a className={buttons.sec} href="/news">
        Все новости
      </a>
    </div>
  )
}
