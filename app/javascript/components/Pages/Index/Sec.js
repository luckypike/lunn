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
      {navs.filter(n => n.depth === 1).map((n1l, i) =>
        <div key={n1l.mlid} className={styles.t}>
          <div className={classNames(styles.tab, { [styles.active]: i === active })} onClick={openTab} data-index={i}>
            <a href={n1l.path}>
              {n1l.title}
            </a>
          </div>

          <div className={classNames(styles.content, { [styles.qwe]: i === active })}>
            {navs.filter(n => n.depth === 2 && n.plid === n1l.mlid).map(n2l =>
              <div key={n2l.mlid}>
                <a href={n2l.path}>
                  {n2l.title}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
