import React from 'react'
import PropTypes from 'prop-types'
import { YMaps, Map } from 'react-yandex-maps'

import { Title } from '../Pages'

import styles from './Contacts.module.css'
import pages from '../Pages.module.css'

Contacts.propTypes = {
  contacts: PropTypes.array
}

export default function Contacts ({ contacts }) {
  return (
    <div className={pages.container}>
      <Title
        h1="Контакты"
        loaf={[
          {
            mlid: 99999,
            path: 'about',
            title: 'Об Университете'
          },
          {
            mlid: 99998,
            path: 'contacts',
            title: 'Контакты'
          }
        ]}
      />

      <div className={styles.root}>
        <div className={styles.map}>
          <div className={styles.placeholder} />

          <YMaps>
            <Map
              className={styles.ymap}
              defaultState={{ center: [56.324878, 44.028165], zoom: 16 }}
            />
          </YMaps>
        </div>

        <div className={styles.items}>
          <div className={styles.item}>
            <span className={styles.text}>Адрес:</span>
            <div className={styles.address}>
              603155, Россия, Нижний Новгород, ул. Минина 31а
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.text}>Телефон:</span>
            <a href="tel:+78314361575" className={styles.tel}>
              +7 (831) 436-15-75
            </a>
          </div>

          <div className={styles.item}>
            <span className={styles.text}>Факс:</span>
            <a href="tel:+78314166131" className={styles.tel}>
              +7 (831) 416-61-31
            </a>
          </div>

          <div className={styles.item}>
            <span className={styles.text}>Эл. почта:</span>
            <a href="mailto:admdep@lunn.ru" className={styles.button}>
              admdep@lunn.ru
            </a>
          </div>
        </div>

        <div className={styles.phones}>
          <h2>
            Краткий телефонный справочник
          </h2>

          <div className={styles.contacts}>
            {contacts.map((contact, i) =>
              <div key={i} className={styles.contact}>
                <div className={styles.position}>
                  {contact[0]}
                </div>

                <div className={styles.title}>
                  {contact[1]}
                </div>

                <div className={styles.phone}>
                  {contact[2]}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
