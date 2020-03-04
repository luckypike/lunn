import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// import { path } from '../Routes'

import Menu from './Menu'
import Nav from './Nav'
import Service from './Service'
import Special from './Special'
import Search from './Search'

import Logo from '!svg-react-loader?!./Images/Logo.svg'

import styles from './Header.module.css'

Header.propTypes = {
  navs: PropTypes.array,
  index: PropTypes.bool,
  locale: PropTypes.string
}

export default function Header ({ navs, index, locale }) {
  const [menuActive, setMenuActive] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [specialActive, setSpecialActive] = useState(true)
  const [white, setWhite] = useState(false)

  useEffect(() => {
    if (index) {
      setWhite(true)
    }
  }, [])

  const handleClick = () => {
    setMenuActive(false)
    setSearchActive(false)
  }

  return (
    <>
      <Special active={specialActive} />

      <div className={classNames(styles.container, { [styles.index]: index, [styles.active]: menuActive, [styles.special]: specialActive })}>
        <div className={classNames(styles.overlay, { [styles.active]: menuActive, [styles.search_active]: searchActive })} onClick={() => handleClick()} onMouseEnter={() => setMenuActive(false)} />

        <header className={styles.root}>
          <div className={classNames(styles.logo, { [styles.blue]: menuActive, [styles.white]: white })}>
            <a href={`/${locale !== 'ru' ? locale : ''}`}>
              <Logo />
            </a>
          </div>

          <div className={styles.nav} onMouseLeave={() => setMenuActive(false)}>
            <Nav
              index={index}
              navs={navs}
              menuActive={menuActive}
              menuOpen={() => setMenuActive(true)}
              onToggle={() => setMenuActive(!menuActive)}
            />
          </div>

          {!menuActive &&
            <div className={styles.service}>
              <Service
                index={index}
                menuActive={menuActive}
                onSearchToggle={() => setSearchActive(true)}
                onSpecialToggle={() => setSpecialActive(!specialActive)}
                locale={locale}
              />
            </div>
          }
        </header>

        <div className={classNames(styles.menu, { [styles.active]: menuActive })} onMouseEnter={() => setMenuActive(true)}>
          <Menu navs={navs} />
        </div>

        <div className={classNames(styles.search, { [styles.active]: searchActive })}>
          <Search onSearchToggle={() => setSearchActive(false)} searchActive={searchActive} />
        </div>
      </div>
    </>
  )
}
