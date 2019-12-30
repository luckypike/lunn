import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import { Link } from '@reach/router'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import isBetween from 'dayjs/plugin/isBetween'

import fonts from '../../Fonts.module.css'
import styles from './Calendar.module.css'

dayjs.extend(isBetween)

Calendar.propTypes = {
  events: PropTypes.array
}

export default function Calendar ({ events }) {
  const [current, setCurrent] = useState(dayjs().locale('ru'))

  const startOfMonth = current.startOf('month').startOf('week')
  const endOfMonth = current.endOf('month').endOf('week')

  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  if (!events) return null
  return (
    <div className={styles.root}>
      <div className={classNames(styles.current, fonts.h3)}>
        <div className={styles.month}>{current.format('MMMM')}</div>
        <div className={styles.year}>{current.format('YYYY')}</div>

        <div className={styles.arrow}>
          <svg viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0H0L4 4L8 0Z" fill="#2F53EB"/>
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
            events={events.filter(event => (dayjs(event.date).locale('ru').format('D MM YY') === day.format('D MM YY')))}
            day={day}
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
  day: PropTypes.object
}

function Day ({ startOfMonth, endOfMonth, events, day }) {
  const isToday = () => {
    return day.isSame(dayjs(), 'day')
  }

  const isOutOfMonth = () => {
    return !day.isBetween(startOfMonth, endOfMonth)
  }

  return (
    <div className={classNames(styles.date, { [styles.today]: isToday() })}>
      {!isOutOfMonth() &&
        <>
          <div className={styles.in}>
            {day.format('D')}

            {events.length > 0 &&
              <>
                <div className={styles.event} />
              </>
            }
          </div>
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
