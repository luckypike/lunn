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

      <div className={styles.content}>
        {navs.filter(n => n.depth === 1).map((n1l, i) =>
          <div key={i} className={classNames(styles.groups, { [styles.inactive]: i !== active })}>
            <Items items={navs.filter(n => n.depth === 2 && n.plid === n1l.mlid)} />
          </div>
        )}
      </div>
    </div>
  )
}

Items.propTypes = {
  items: PropTypes.array
}

function Items ({ items }) {
  const chunk = items.length < 3 ? 1 : Math.floor(items.length / 3)

  const groups = items
    .reduce((acc, _, i) =>
      (i % chunk)
        ? acc
        : [...acc, items.slice(i, i + chunk)]
    , [])

  return (
    <>
      {[...Array(3)].map((_, i) =>
        <div key={i} className={styles.group}>
          {groups[i] && groups[i].map(item =>
            <a href={item.path} key={item.mlid} className={styles.item}>
              {item.title}
            </a>
          )}

          {i === 0 && groups[3] && groups[3].map(item =>
            <a href={item.path} key={item.mlid} className={styles.item}>
              {item.title}
            </a>
          )}
        </div>
      )}
    </>
  )
}
