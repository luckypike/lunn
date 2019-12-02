import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// import { path } from '../Routes'

import Menu from './Menu'
import Nav from './Nav'
import Service from './Service'

import Logo from './Images/Logo.svg'

import styles from './Header.module.css'

Header.propTypes = {
  navs: PropTypes.array
}

export default function Header ({ navs }) {
  const [menu, setMenu] = useState(false)

  return (
    <div className={styles.container}>
      <header className={styles.root}>
        <div className={styles.nav}>
          <Nav navs={navs} onToggle={() => setMenu(!menu)} />
        </div>

        <div className={styles.logo}>
          <a href="/">
            <img src={Logo} />
          </a>
        </div>

        <div className={styles.locales}>
          LOCALES
        </div>

        <div className={styles.service}>
          <Service />
        </div>
      </header>

      <div className={classNames(styles.menu, { [styles.active]: menu })}>
        <Menu navs={navs} />
      </div>
    </div>
  )
}
