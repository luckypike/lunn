import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import styles from './News.module.css'

News.propTypes = {
  news: PropTypes.array
}

export default function News ({ news }) {
  return (
    <div className={styles.news}>
      <div className={styles.label}>
        <h2>Новости</h2>
      </div>

      <div className={styles.news_items}>
        {news.map(item =>
          <div key={item.nid} className={styles.news_item}>
            <div className={styles.image}>
              <img src={item.images[0].path} />
            </div>

            <div className={styles.date}>
              {dayjs.unix(item.created).locale('ru').format('DD MMMM YYYY')}
            </div>

            <div className={styles.title}>
              <a href={item.path}>
                {item.title}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* <div className={styles.button}>
        <a href="/news">
          Все новости
        </a>
      </div> */}
    </div>
  )
}
