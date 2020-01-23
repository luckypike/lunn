import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { Link } from '@reach/router'
import Renderer from '../../Draft'

import styles from './Item.module.css'

Item.propTypes = {
  item: PropTypes.object
}

export default function Item ({ item }) {
  return (
    <Link item={item} to={item.path} className={styles.news_item}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.wrapper}>
            {item.images.length > 0 &&
              <div className={styles.image}>
                <div className={styles.inner}>
                  <img src={item.images[0].path} />
                </div>
              </div>
            }
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.title}>
            {item.title}
          </div>

          {item.desc &&
            <div className={styles.desc}>
              <Renderer source={item.desc} />
            </div>
          }

          <div className={styles.date}>
            {dayjs.unix(item.date).locale('ru').format('DD MMMM YYYY')}
          </div>
        </div>
      </div>
    </Link>
  )
}
