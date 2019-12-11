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
  const [searchActive, setSearchActive] = useState(false)
  const [white, setWhite] = useState(false)

  useEffect(() => {
    if (index) {
      setWhite(true)
    }
  }, [])

  return (
    <div className={classNames(styles.container, { [styles.index]: index })}>
      <header className={classNames(styles.root, { [styles.white]: white })}>
        <div className={styles.logo}>
          <a href="/">
            <Logo />
          </a>
        </div>

        <div className={styles.nav}>
          <Nav navs={navs} onToggle={() => setMenuActive(!menuActive)} />
        </div>

        <div className={styles.service}>
          <Service onSearchToggle={() => setSearchActive(true)} />
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
