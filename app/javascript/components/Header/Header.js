import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// import { path } from '../Routes'

import Menu from './Menu'
import Nav from './Nav'
import Search from './Search'

import styles from './Header.module.css'

Header.propTypes = {
  navs: PropTypes.array
}

export default function Header ({ navs }) {
  const [menu, setMenu] = useState(false)

  return (
    <header className={styles.root}>
      <div className={styles.nav}>
        <Nav navs={navs} onToggle={() => setMenu(!menu)} />
      </div>

      <div className={styles.logo}>
        LOGO
      </div>

      <div className={styles.locales}>
        LOCALES
      </div>

      <div className={styles.search}>
        <Search />
      </div>

      <div className={classNames(styles.menu, { [styles.active]: menu })}>
        <Menu navs={navs} />
      </div>
    </header>
  )
}
