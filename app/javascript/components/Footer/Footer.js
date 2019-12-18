import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import fonts from '../Fonts.module.css'
import styles from './Footer.module.css'

import Vk from '!svg-react-loader?!./Images/Vk.svg'
import Instagram from '!svg-react-loader?!./Images/Instagram.svg'
import Facebook from '!svg-react-loader?!./Images/Facebook.svg'
import Youtube from '!svg-react-loader?!./Images/Youtube.svg'

Footer.propTypes = {
  navs: PropTypes.array
}

export default function Footer ({ navs }) {
  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <ul className={styles.navs}>
            {navs.filter(item => item.depth === 1).map(n1l =>
              <li className={styles.main} key={n1l.mlid}>
                <a href={n1l.path} className={classNames(styles.first, fonts.h4)}>
                  {n1l.title}
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

          <div className={styles.info}>
            <div className={styles.adress}>
              <div className={styles.index}>Адрес:</div>
              <div className={styles.text}>603155, Россия, Нижний Новгород, ул. Минина 31а</div>
              <div className={styles.button}>
                <a href="#">
                  Показать на карте
                </a>
              </div>
            </div>

            <div className={styles.connect}>
              <div className={styles.phone}>
                <div className={styles.index}>Телефон:</div>
                <a href="tel:+78314361575" className={styles.text}>+7 (831) 436-15-75</a>
              </div>

              <div className={styles.fax}>
                <div className={styles.index}>Факс:</div>
                <a href="tel:+78314166131" className={styles.text}>+7 (831) 416-61-31</a>
              </div>

              <div className={styles.email}>
                <div className={styles.index}>Электронная почта:</div>
                <a href="mailto:admdep@lunn.ru" className={styles.text}>admdep@lunn.ru</a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.line} />

        <div className={styles.media}>
          <div className={styles.title}>
             © 2007-2019 Нижегородский государственный лингвистический университет имени Н.А. Добролюбова
          </div>
          <div className={styles.logos}>
            <div className={styles.logo}>
              <a href="#">
                <Vk />
              </a>
            </div>

            <div className={styles.logo}>
              <a href="#">
                <Facebook />
              </a>
            </div>

            <div className={styles.logo}>
              <a href="#">
                <Youtube />
              </a>
            </div>

            <div className={styles.logo}>
              <a href="#">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
