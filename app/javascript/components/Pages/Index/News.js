import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Renderer from '../../Draft'
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
        {news.map((item, i) =>
          <div key={item.nid} className={classNames(styles.news_item, { [styles.first]: i === 0 })}>
            <a href={item.path}>
              <div className={styles.image}>
                <img src={item.images[0].path} />
              </div>

              <div className={styles.title}>
                {item.title}
              </div>

              {i === 0 && item.desc !== null &&
                <div className={styles.desc}>
                  <Renderer source={item.desc} />
                </div>
              }

              <div className={styles.date}>
                {dayjs.unix(item.created).locale('ru').format('DD MMMM YYYY')}
              </div>
            </a>
          </div>
        )}
      </div>

      <a className={styles.button} href="/news?page=1">
        Все новости
      </a>
    </div>
  )
}
