import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AnimateHeight from 'react-animate-height'

import { useI18n } from '../../I18n'

import styles from './Exp.module.css'

Exp.propTypes = {
  e: PropTypes.string,
  items: PropTypes.array,
  locale: PropTypes.string
}

export default function Exp ({ e, items, locale }) {
  const [height, setHeight] = useState(0)
  const I18n = useI18n(locale)

  function handleClick () {
    setHeight(height === 0 ? 'auto' : 0)
  }

  return (
    <div className={styles.root}>
      <h4 onClick={handleClick}>
        {I18n.t(`tutor.${e}`)}
        <div className={classNames(styles.more, { [styles.opened]: height === 'auto' })} />
      </h4>

      <div>
        <AnimateHeight height={height} duration={300}>
          <ul className={styles.ul}>
            {items.map((item, i) =>
              <li key={i}>
                {item}
              </li>
            )}
          </ul>
        </AnimateHeight>
      </div>
    </div>
  )
}
