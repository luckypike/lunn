import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { deserialize } from 'jsonapi-deserializer'

// import { path } from '../Routes'

import Menu from './Menu'
import Nav from './Nav'
// import Service from './Service'
import Special from './Special'
import Search from './Search'

import Logo from '!svg-react-loader?!./Images/Logo.svg'

import styles from './Header.module.css'

Header.propTypes = {
  navs: PropTypes.object,
  index: PropTypes.bool,
  locale: PropTypes.string
}

export default function Header ({ navs: data, index, locale }) {
  const navs = deserialize(data)

  const [menuActive, setMenuActive] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [specialActive, setSpecialActive] = useState(false)
  const [white, setWhite] = useState(false)

  useEffect(() => {
    if (index) {
      setWhite(true)
    }

    window.addEventListener('keydown', onEscapeDown)

    return () => {
      window.removeEventListener('keydown', onEscapeDown)
    }
  }, [])

  const onEscapeDown = event => {
    if (event.key === 'Escape') {
      setMenuActive(false)
      setSearchActive(false)
    }
  }

  return (
    <>
      <Special active={specialActive} />

      <div
        className={classNames(
          styles.container, {
            [styles.index]: index,
            [styles.active]: menuActive,
            [styles.special]: specialActive
          }
        )}
      >
        <div className={classNames(styles.overlay, { [styles.active]: menuActive || searchActive })} onClick={() => {
          setMenuActive(false)
          setSearchActive(false)
        }
        }/>

        <header className={styles.root}>
          <div className={classNames(styles.logo, { [styles.blue]: menuActive })}>
            <a href={`/${locale !== 'ru' ? locale : ''}`}>
              <Logo />
            </a>
          </div>

          <div
            className={classNames(styles.navIcon, { [styles.white]: white, [styles.active]: menuActive })}
            onClick={() => setMenuActive(!menuActive)}
          >
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="2" />
              <rect x="3" y="11" width="18" height="2" />
              <rect x="3" y="17" width="18" height="2" />
            </svg>
          </div>

          <div
            className={classNames(styles.specialIcon, { [styles.active]: specialActive, [styles.white]: white })}
            onClick={() => setSpecialActive(!specialActive)}
            itemProp="copy"
          >
            <svg viewBox="0 0 32 32">
              <path d="M16 9.266a10.366 10.366 0 015.674 1.678 10.94 10.94 0 013.947 4.556 10.994 10.994 0 01-3.952 4.547A10.42 10.42 0 0116 21.733a10.42 10.42 0 01-5.669-1.686A10.995 10.995 0 016.378 15.5a10.94 10.94 0 013.947-4.556A10.366 10.366 0 0116 9.266zM16 7c-2.59.002-5.12.814-7.26 2.33A13.328 13.328 0 004 15.5a13.315 13.315 0 004.738 6.173A12.555 12.555 0 0016 24c2.59 0 5.122-.811 7.262-2.327A13.316 13.316 0 0028 15.5a13.328 13.328 0 00-4.74-6.17A12.568 12.568 0 0016 7zm0 5.666c.539 0 1.066.166 1.515.478.448.311.798.754 1.005 1.271.206.518.26 1.088.155 1.637a2.87 2.87 0 01-.747 1.451 2.698 2.698 0 01-1.396.776c-.53.11-1.078.053-1.576-.161a2.753 2.753 0 01-1.224-1.044 2.912 2.912 0 01-.46-1.574c0-.752.288-1.472.8-2.004a2.678 2.678 0 011.928-.83zm0-2.266c-.971 0-1.92.299-2.728.86a5.062 5.062 0 00-1.808 2.288 5.284 5.284 0 00-.28 2.947c.19.989.658 1.898 1.344 2.61a4.856 4.856 0 002.514 1.396c.952.197 1.94.096 2.836-.29a4.954 4.954 0 002.203-1.878c.54-.839.828-1.825.828-2.833a5.21 5.21 0 00-1.44-3.604 4.825 4.825 0 00-3.47-1.496z" />
            </svg>
          </div>

          <div
            className={classNames(styles.searchIcon, { [styles.white]: white })}
            onClick={() => setSearchActive(true)}
          >
            <svg viewBox="0 0 32 32">
              <path d="M20.607 18.856h-.922l-.327-.315a7.595 7.595 0 10-.817.817l.315.327v.922l5.835 5.816 1.733-1.733-5.817-5.834zm-7 0a5.25 5.25 0 114.853-3.24 5.243 5.243 0 01-4.853 3.24z" />
            </svg>
          </div>

          <div className={styles.nav}>
            <Nav
              white={white}
              navs={navs.filter(nav => nav.menu_name === 'menu-main-nav')}
            />
          </div>

          {/* {!menuActive &&
            <div className={styles.service}>
              <Service
                index={index}
                menuActive={menuActive}
                specialActive={specialActive}
                onSearchToggle={() => setSearchActive(true)}
                onSpecialToggle={() => setSpecialActive(!specialActive)}
                onToggle={() => setMenuActive(!menuActive)}
                locale={locale}
              />
            </div>
          } */}
        </header>

        <div className={classNames(styles.menu, { [styles.active]: menuActive })}>
          <Menu
            navs={navs.filter(nav => nav.menu_name === 'menu-sec-nav')}
            onToggle={() => setMenuActive(!menuActive)}
          />
        </div>

        <div className={classNames(styles.search, { [styles.active]: searchActive })}>
          <Search onSearchToggle={() => setSearchActive(false)} searchActive={searchActive} />
        </div>
      </div>
    </>
  )
}
