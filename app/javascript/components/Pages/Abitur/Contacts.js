import React from 'react'

import styles from './Contacts.module.css'

export default function Contacts () {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Не нашли ответа на интересующий вас вопрос?
        <br />
        Свяжитесь с приёмной комиссией
      </div>

      <div className={styles.contacts}>
        <a href="tel:+78314166141">
          +7 (831) 416-61-41
        </a>

        <a href="mailto:priem@lunn.ru" className={styles.a}>
          priem@lunn.ru
        </a>

        <a href="tel:+79307155798">
          +7 930 715-57-98
        </a>

        <a href="tel:+79200476026">
          +7 920 047-60-26
        </a>
      </div>
    </div>
  )
}
