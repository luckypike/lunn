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
        +7 (831) 416-61-41
        <br />
        <a href="mailto:priem@lunn.ru" className={styles.a}>
          priem@lunn.ru
        </a>
      </div>
    </div>
  )
}
