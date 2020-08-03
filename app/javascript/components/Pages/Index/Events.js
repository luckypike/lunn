import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { I18nContext } from '../../I18n'

import styles from './Events.module.css'
import buttons from '../../Buttons.module.css'

Events.propTypes = {
  events: PropTypes.array
}

export default function Events ({ events }) {
  const I18n = useContext(I18nContext)

  var today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className={styles.root}>
      <div className={styles.label}>
        <h2>
          {I18n.t('pages.index.events.title')}
        </h2>
      </div>

      <div className={styles.events}>
        {events.map(event =>
          <a href={event.path} key={event.nid} className={classNames(styles.event, { [styles.pass]: dayjs(event.date) < today })}>
            <div className={styles.date}>
              {dayjs(event.date).locale('ru').format('D MMMM')}
            </div>

            <div className={styles.title}>
              {event.title}
            </div>

            {dayjs(event.date) < today &&
              <div className={styles.passed}>
                Событие состоялось
              </div>
            }
          </a>
        )}
      </div>

      <a href="/events" className={classNames(buttons.sec, styles.more)}>
        {I18n.t('pages.index.events.more')}
      </a>
    </div>
  )
}
