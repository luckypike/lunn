import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { deserialize } from 'jsonapi-deserializer'

// import { path } from '../Routes'

import Menu from './Menu'
import Nav from './Nav'
import Service from './Service'
import Special from './Special'
import Search from './Search'

import Logo from '!svg-react-loader?!./Images/Logo.svg'

import styles from './Header.module.css'

Header.propTypes = {
  navs: PropTypes.object,
  index: PropTypes.bool,
  locale: PropTypes.string
}

function useKeyboardEvent (key, callback) {
  useEffect(() => {
    const handler = function (event) {
      if (event.key === key) {
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [])
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
  }, [])

  useKeyboardEvent('Escape', () => {
    setMenuActive(false)
  })

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
        <div className={classNames(styles.overlay, { [styles.active]: menuActive, [styles.search_active]: searchActive })} onClick={() => setMenuActive(!menuActive)}/>

        <header className={styles.root}>
          <div className={classNames(styles.logo, { [styles.blue]: menuActive, [styles.white]: white })}>
            <a href={`/${locale !== 'ru' ? locale : ''}`}>
              <Logo />
            </a>
          </div>

          <div className={styles.nav}>
            <Nav
              index={index}
              navs={navs}
              menuActive={menuActive}
              onToggle={() => setMenuActive(!menuActive)}
            />
          </div>

          {!menuActive &&
            <div className={styles.service}>
              <Service
                index={index}
                menuActive={menuActive}
                specialActive={specialActive}
                onSearchToggle={() => setSearchActive(true)}
                onSpecialToggle={() => setSpecialActive(!specialActive)}
                locale={locale}
              />
            </div>
          }
        </header>

        <div className={classNames(styles.menu, { [styles.active]: menuActive })}>
          <Menu
            navs={navs}
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
