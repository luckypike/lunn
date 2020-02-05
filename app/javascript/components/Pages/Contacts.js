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
