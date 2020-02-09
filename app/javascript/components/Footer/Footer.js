import React from 'react'
// import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import AnimateHeight from 'react-animate-height'
import { parseDOM } from 'htmlparser2'
import domToReact from 'html-react-parser/lib/dom-to-react'
import { YMInitializer } from 'react-yandex-metrika';

import styles from './Footer.module.css'

Footer.propTypes = {
  navs: PropTypes.array,
  footer: PropTypes.array,
  partners: PropTypes.object
}

export default function Footer ({ navs, footer, partners }) {
  return (
    <>
      <div className={styles.partners}>
        {domToReact(parseDOM(partners.body))}
      </div>

      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.info}>
              <div className={styles.title}>
                © 2007–{new Date().getFullYear()} Нижегородский государственный лингвистический университет имени Н.А. Добролюбова
              </div>

              <div className={styles.links}>
                <a className={styles.link} href="/send-mail">Обращения граждан</a>
                <a className={styles.link} href="/send-mail">Интернет-приемная ректора</a>
              </div>

              <div className={styles.address}>
                <div className={styles.text}>603155, Россия, Нижний Новгород, ул. Минина 31а</div>
                <a className={styles.button} href="/contacts">Адрес на карте</a>
              </div>

              <div className={styles.contacts}>
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
              {navs.filter(item => item.depth === 1 && navs.filter(i => i.depth === 2 && i.plid === item.mlid).length > 0).map((n1l, i) =>
                <Main key={i} n1l={n1l} navs={navs} />
              )}

              <li className={styles.nav}>
                <ul className={classNames(styles.sec, styles.footer)}>
                  {navs.filter(item => item.depth === 1 && navs.filter(i => i.depth === 2 && i.plid === item.mlid).length === 0).map(f =>
                    <li key={f.mlid}>
                      <a href={f.path} className={styles.second}>
                        {f.title}
                      </a>
                    </li>
                  )}

                  {footer.map(f =>
                    <li key={f.mlid}>
                      <a href={f.path} className={styles.second}>
                        {f.title}
                      </a>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <YMInitializer
        accounts={[32824002]}
        options={{
          webvisor: true
        }}
        version="2"
      />
    </>
  )
}

Main.propTypes = {
  navs: PropTypes.array,
  n1l: PropTypes.object
}

function Main ({ navs, n1l }) {
  // const [height, setHeight] = useState(0)
  //
  // function handleClick () {
  //   setHeight(height === 0 ? 'auto' : 0)
  // }
  //
  // useEffect(() => {
  //   const _onResize = e => {
  //     if (window.innerWidth > 767) {
  //       setHeight('auto')
  //     } else {
  //       setHeight(0)
  //     }
  //   }
  //
  //   if (window) {
  //     window.addEventListener('resize', _onResize)
  //     _onResize()
  //   }
  // }, [])

  return (
    <li className={styles.nav} key={n1l.mlid}>
      <div className={styles.main}>
        <a href={n1l.path} className={styles.first}>
          {n1l.title}
        </a>

        {/* <div className={classNames(styles.more, { [styles.opened]: height === 'auto' })} onClick={handleClick} /> */}
      </div>

      <ul className={styles.sec}>
        {navs.filter(i => i.depth === 2 && i.plid === n1l.mlid).map(n2l =>
          <li key={n2l.mlid}>
            <a href={n2l.path} className={styles.second}>
              {n2l.title}
            </a>
          </li>
        )}
      </ul>
    </li>
  )
}
