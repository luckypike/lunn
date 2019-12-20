import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// import { path } from '../Routes'

import Menu from './Menu'
import Nav from './Nav'
import Service from './Service'
import Search from './Search'

import Logo from '!svg-react-loader?!./Images/Logo.svg'

import styles from './Header.module.css'

Header.propTypes = {
  navs: PropTypes.array,
  index: PropTypes.bool
}

export default function Header ({ navs, index }) {
  const [menuActive, setMenuActive] = useState(false)
  const [searchActive, setSearchActive] = useState(true)
  const [white, setWhite] = useState(false)

  useEffect(() => {
    if (index) {
      setWhite(true)
    }
  }, [])

  return (
    <div className={classNames(styles.container, { [styles.index]: index, [styles.active]: menuActive })}>
      <div className={classNames(styles.overlay, { [styles.active]: menuActive })} onClick={() => setMenuActive(!menuActive)} />

      <header className={styles.root}>
        <div className={classNames(styles.logo, { [styles.blue]: menuActive, [styles.white]: white })}>
          <a href="/">
            <Logo />
          </a>
        </div>

        <div className={styles.nav}>
          <Nav index={index} navs={navs} menuActive={menuActive} onToggle={() => setMenuActive(!menuActive)} />
        </div>

        <div className={styles.service}>
          <Service index={index} menuActive={menuActive} onSearchToggle={() => setSearchActive(true)} />
        </div>
      </header>

      <div className={classNames(styles.menu, { [styles.active]: menuActive })}>
        <Menu navs={navs} />
      </div>

      <div className={classNames(styles.search, { [styles.active]: searchActive })}>
        <Search onSearchToggle={() => setSearchActive(false)} />
      </div>
    </div>
  )
}
