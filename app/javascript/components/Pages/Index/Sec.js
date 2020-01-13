import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './Sec.module.css'

Sec.propTypes = {
  navs: PropTypes.array
}

export default function Sec ({ navs }) {
  const [active, setActive] = useState(0)

  const openTab = e => setActive(+e.target.dataset.index)

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {navs.filter(n => n.depth === 1).map((n1l, i) =>
          <div key={n1l.mlid} className={classNames(styles.tab, { [styles.active]: i === active })} onClick={openTab} data-index={i}>
            {n1l.title}
          </div>
        )}
      </div>

      <>
        {navs.filter(n => n.depth === 1).map((n1l, i) =>
          <div key={i} className={classNames(styles.items, { [styles.inactive]: i !== active })}>
            <Items items={navs.filter(n => n.depth === 2 && n.plid === n1l.mlid)} />
          </div>
        )}
      </>
    </div>
  )
}

Items.propTypes = {
  items: PropTypes.array
}

function Items ({ items }) {
  return (
    <>
      {items.map((item, i) =>
        <a href={item.path} key={i} className={classNames(styles.item, styles[`image_${Math.floor(Math.random() * 6) + 1}`])}>
          <div className={styles.title}>{item.title}</div>

          {item.external &&
            <svg className={styles.external} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 21L20.9998 1.00027" strokeWidth="1.5"></path>
              <path d="M6 1L20.9998 1V15.9998" strokeWidth="1.5"></path>
            </svg>
          }
        </a>
      )}
    </>
  )
}
