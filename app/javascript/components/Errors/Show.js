import React from 'react'
import PropTypes from 'prop-types'

import pages from '../Pages.module.css'
import styles from './Show.module.css'

Show.propTypes = {
  code: PropTypes.string
}

export default function Show ({ code }) {
  const errors = {
    500: {
      title: '500 Внутренняя ошибка сервера',
      text: 'На сервере что-то пошло не так или он слишком перегружен. Попробуйте подождать, либо перейти на главную страница.'
    },
    403: {
      title: '403 Доступ запрещен',
      text: 'К сожалению, у вас не хватает прав доступа к этой странице.'
    },
    404: {
      title: '404 Страница не найдена',
      text: 'К сожалению, по этому адресу страница не найдена.'
    }
  }

  return (
    <div className={pages.container}>
      <div className={styles.root}>
        <h1>
          {errors[code].title}
        </h1>

        <p>
          {errors[code].text}
        </p>
      </div>
    </div>
  )
}
