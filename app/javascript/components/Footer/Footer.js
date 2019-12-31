import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import fonts from '../Fonts.module.css'
import styles from './Footer.module.css'

Footer.propTypes = {
  navs: PropTypes.array
}

export default function Footer ({ navs }) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <div className={styles.title}>
              © 2007-2019 Нижегородский государственный лингвистический университет имени Н.А. Добролюбова
            </div>

            <div className={styles.links}>
              <a className={styles.link} href="#">Отзывы</a>
              <a className={styles.link} href="#">Обращения граждан</a>
              <a className={styles.link} href="#">Приемная ректора</a>
            </div>

            <div className={styles.adress}>
              <div className={styles.text}>603155, Россия, Нижний Новгород, ул. Минина 31а</div>
              <a className={styles.button} href="#">Адрес на карте</a>
            </div>

            <div className={styles.media}>
              <div>
                <a href="tel:+78314361575">+7 (831) 436-15-75</a>
              </div>

              <div>
                <a href="mailto:admdep@lunn.ru" className={styles.button}>admdep@lunn.ru</a>
              </div>

              <div>
                <a href="tel:+78314166131">Факс: +7 (831) 416-61-31</a>
              </div>
            </div>
          </div>

          <ul className={styles.navs}>
            {navs.filter(item => item.depth === 1).map(n1l =>
              <li className={styles.main} key={n1l.mlid}>
                <a href={n1l.path} className={classNames(styles.first, fonts.h4)}>
                  {n1l.title}
                  <div className={styles.plus} />
                </a>
                <ul>
                  {navs.filter(i => i.depth === 2 && i.plid === n1l.mlid).map(n2l =>
                    <li key={n2l.mlid}>
                      <a href={n2l.path} className={styles.second}>
                        {n2l.title}
                      </a>
                    </li>
                  )}
                </ul>
              </li>
            )}
          </ul>
        </div>

        {/* <div className={styles.media}>
          <div className={styles.title}>
             © 2007-2019 Нижегородский государственный лингвистический университет имени Н.А. Добролюбова
          </div>
          <div className={styles.logos}>
            <div className={styles.logo}>
              <a href="https://www.facebook.com/nnlinguistics/">
                <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.148 4H7.3A3.293 3.293 0 004 7.293v17.854a3.293 3.293 0 003.3 3.293h8.8l.015-8.733h-2.269a.535.535 0 01-.535-.533l-.011-2.816a.535.535 0 01.535-.537H16.1V13.1c0-3.157 1.928-4.876 4.744-4.876h2.311a.535.535 0 01.535.535v2.375a.535.535 0 01-.535.535h-1.418c-1.531 0-1.828.728-1.828 1.8v2.355h3.365a.536.536 0 01.532.6l-.334 2.815a.535.535 0 01-.532.472h-3.016l-.015 8.733h5.239a3.293 3.293 0 003.293-3.293V7.293A3.293 3.293 0 0025.148 4z" />
                </svg>
              </a>
            </div>

            <div className={styles.logo}>
              <a href="https://vk.com/linguistica">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.969 4h-7.5C5.622 4 4 5.621 4 12.469v7.5c0 6.847 1.621 8.469 8.469 8.469h7.5c6.847 0 8.469-1.621 8.469-8.469v-7.5c0-6.848-1.64-8.469-8.469-8.469zm3.76 17.437h-1.776c-.673 0-.88-.535-2.087-1.759-1.052-1.018-1.518-1.156-1.777-1.156-.362 0-.466.1-.466.6v1.6c0 .431-.138.69-1.276.69a6.92 6.92 0 01-5.433-3.26c-2.207-3.096-2.816-5.425-2.816-5.908 0-.259.1-.5.6-.5h1.776c.448 0 .621.207.793.69.88 2.535 2.346 4.76 2.949 4.76.224 0 .328-.1.328-.673V13.9c-.069-1.207-.707-1.311-.707-1.742a.43.43 0 01.448-.414h2.794c.379 0 .517.207.517.655v3.536c0 .379.172.517.276.517.224 0 .414-.138.828-.552a15.134 15.134 0 002.19-3.639.786.786 0 01.776-.5h1.777c.535 0 .655.276.535.655a22.43 22.43 0 01-2.4 4.1c-.19.31-.259.448 0 .793.19.259.811.793 1.225 1.276a7.678 7.678 0 011.5 2.087c.185.507-.074.765-.574.765z" />
                </svg>
              </a>
            </div>

            <div className={styles.logo}>
              <a href="https://www.youtube.com/user/nnlinguistics/">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.858 6H7.73A5.73 5.73 0 002 11.73v8.063a5.73 5.73 0 005.73 5.73h16.128a5.73 5.73 0 005.73-5.73V11.73A5.73 5.73 0 0023.858 6zm-3.875 10.153l-7.544 3.6a.3.3 0 01-.433-.273v-7.423a.3.3 0 01.44-.27l7.544 3.82a.3.3 0 01-.007.546z" />
                </svg>
              </a>
            </div>

            <div className={styles.logo}>
              <a href="#">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.159 4h-9.878A7.289 7.289 0 004 11.281v9.878a7.289 7.289 0 007.281 7.281h9.878a7.289 7.289 0 007.281-7.281v-9.878A7.289 7.289 0 0021.159 4zm4.822 17.159a4.822 4.822 0 01-4.822 4.822h-9.878a4.822 4.822 0 01-4.822-4.822v-9.878a4.822 4.822 0 014.822-4.822h9.878a4.822 4.822 0 014.822 4.822v9.878z" />
                  <path d="M16.22 9.899a6.32 6.32 0 106.32 6.321 6.328 6.328 0 00-6.32-6.321zm0 10.183a3.862 3.862 0 110-7.724 3.862 3.862 0 010 7.724zM22.553 11.462a1.515 1.515 0 100-3.03 1.515 1.515 0 000 3.03z" />
                </svg>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
