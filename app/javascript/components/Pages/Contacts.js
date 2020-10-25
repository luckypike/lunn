import React from 'react'
import PropTypes from 'prop-types'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { useI18n, I18nContext } from '../I18n'

import Ballon from '../Pages/Index/Images/ballon.png'

import { Title } from '../Pages'

import styles from './Contacts.module.css'
import pages from '../Pages.module.css'

Contacts.propTypes = {
  address: PropTypes.string,
  contacts: PropTypes.array,
  locale: PropTypes.string
}

export default function Contacts ({ address, contacts, locale }) {
  const I18n = useI18n(locale)

  return (
    <I18nContext.Provider value={I18n}>
      <div className={pages.container}>
        <Title
          h1={I18n.t('pages.contacts.title')}
          loaf={[
            {
              mlid: 99999,
              path: 'about',
              title: I18n.t('pages.contacts.about')
            },
            {
              mlid: 99998,
              path: 'contacts',
              title: I18n.t('pages.contacts.title')
            }
          ]}
        />

        <div className={styles.root}>
          <div className={styles.map}>
            <div className={styles.placeholder} />

            <YMaps>
              <Map className={styles.ymap} defaultState={{ center: [56.325030, 44.031256], zoom: 16 }}>
                <Placemark
                  defaultGeometry={[56.32462542625421, 44.029508920558776]}
                  options = {{
                    iconLayout: 'default#image',
                    iconImageHref: Ballon,
                    iconImageSize: [45, 50],
                    iconImageOffset: [-20, -50]
                  }}
                />
              </Map>
            </YMaps>
          </div>

          <div className={styles.items}>
            <div className={styles.item}>
              <span className={styles.text}>
                {I18n.t('pages.contacts.address')}:
              </span>
              <div className={styles.address}>
                {address}
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.text}>
                {I18n.t('pages.contacts.phone')}:
              </span>
              <a href="tel:+78314361575" className={styles.tel}>
                +7 (831) 436-15-75
              </a>
            </div>

            <div className={styles.item}>
              <span className={styles.text}>
                {I18n.t('pages.contacts.fax')}:
              </span>
              <a href="tel:+78314166131" className={styles.tel}>
                +7 (831) 416-61-31
              </a>
            </div>

            <div className={styles.item}>
              <span className={styles.text}>
                {I18n.t('pages.contacts.email')}:
              </span>
              <a href="mailto:admdep@lunn.ru" className={styles.button}>
                admdep@lunn.ru
              </a>
            </div>
          </div>

          <div className={styles.phones}>
            <h2>
              {I18n.t('pages.contacts.phones')}
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
    </I18nContext.Provider>
  )
}
