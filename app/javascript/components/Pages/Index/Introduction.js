import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import charming from 'charming'
import classNames from 'classnames'

import styles from './Introduction.module.css'

export default function Introduction () {
  const titles = [
    'Привет',
    'Hello',
    'Salut',
    'Hallo',
    'Ciao',
    'Hola'
  ]

  const [active, setActive] = useState(0)

  useEffect(() => {
    setInterval(() => {
      if (active >= titles.length - 1) {
        setActive(0)
      } else {
        setActive(a => a >= titles.length - 1 ? 0 : a + 1)
      }
    }, 3000)
  }, [])

  return (
    <div className={styles.root}>
      {titles.map((title, i) =>
        <Qq title={title} key={i} active={active === i} />
      )}
    </div>
  )
}

Qq.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool
}

function Qq ({ title, active }) {
  const titleRef = useRef()

  useEffect(() => {
    charming(titleRef.current, {
      setClassName: function (index, letter) {
        return `${styles[`letter-${index}`]} ${styles.letter}`
      }
    })
  }, [])

  return (
    <div ref={titleRef} className={classNames(styles.title, { [styles.active]: active })}>
      {title}
    </div>
  )
}
