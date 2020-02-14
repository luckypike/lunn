import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from '@reach/router'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import isBetween from 'dayjs/plugin/isBetween'

import styles from './Calendar.module.css'

dayjs.extend(isBetween)

Calendar.propTypes = {
  events: PropTypes.array,
  date: PropTypes.string
}

export default function Calendar ({ events, date }) {
  const [current, setCurrent] = useState(dayjs().locale('ru'))

  const startOfMonth = current.startOf('month').startOf('week')
  const endOfMonth = current.endOf('month').endOf('week')

  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  if (!events) return null
  return (
    <div className={styles.root}>
      <div className={styles.current}>
        <div className={classNames(styles.item, styles.prev)} onClick={() => setCurrent(current.subtract(1, 'month'))}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41,7.41,14,6,8,12l6,6,1.41-1.41L10.83,12Z" fill="#777"/>
            <path d="M0,0H24V24H0Z" fill="none"/>
          </svg>
        </div>

        <div className={styles.month}>
          {current.format('MMMM YYYY')}
        </div>

        <div className={classNames(styles.item, styles.next)} onClick={() => setCurrent(current.add(1, 'month'))}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g transform="translate(24 24) rotate(180)">
              <path d="M15.41,7.41,14,6,8,12l6,6,1.41-1.41L10.83,12Z" fill="#777"/>
              <path d="M0,0H24V24H0Z" fill="none"/>
            </g>
          </svg>
        </div>
      </div>

      <div className={styles.weekdays}>
        {weekdays.map((weekday, i) =>
          <div key={i} className={styles.weekday}>
            {weekday}
          </div>
        )}
      </div>

      <div className={styles.months}>
        {Array.from({ length: endOfMonth.diff(startOfMonth, 'days') + 1 }, (v, k) => startOfMonth.clone().add(k, 'day')).map((day, _) =>
          <Day
            key={day.year() + '_' + day.month() + '_' + day.date()}
            startOfMonth={current.startOf('month').subtract(1, 'day')}
            endOfMonth={current.endOf('month')}
            events={events.filter(event => (dayjs(event.date).locale('ru').format('D M YYYY') === day.format('D M YYYY')))}
            day={day}
            date={date}
            active={date}
          />
        )}
      </div>
    </div>
  )
}

Day.propTypes = {
  startOfMonth: PropTypes.object,
  endOfMonth: PropTypes.object,
  events: PropTypes.array,
  day: PropTypes.object,
  date: PropTypes.string,
  active: PropTypes.string
}

function Day ({ startOfMonth, endOfMonth, events, day, date, active }) {
  const isToday = () => {
    return day.isSame(dayjs(), 'day')
  }

  const isOutOfMonth = () => {
    return !day.isBetween(startOfMonth, endOfMonth)
  }

  const isActive = () => {
    return day.isSame(active, 'day')
  }

  return (
    <div className={classNames(styles.date, { [styles.today]: isToday(), [styles.active]: isActive() && !isOutOfMonth() })}>
      {!isOutOfMonth() &&
        <>
          {events.length > 0 &&
            <Link to={`/events?date=${day.format('YYYY-MM-DD')}`}>
              <div className={styles.in}>
                <div className={styles.event} />
              </div>
              {day.format('D')}
            </Link>
          }

          {events.length < 1 &&
            <>
              {day.format('D')}
            </>
          }
        </>
      }

      {isOutOfMonth() &&
        <div className={styles.out}>
          {day.format('D')}
        </div>
      }
    </div>
  )
}
