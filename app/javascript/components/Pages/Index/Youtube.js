import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Youtube.module.css'

Frame.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string
}

export default function Youtube () {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        Видеоновости
      </div>

      <Frame
        id="_ZcEqmDB7Rg"
        title="Ректор НГЛУ Жанна Никонова поздравляет студентов и педагогов университета с Днем знаний"
        desc="1 сентября"
      />

      <Frame
        id="eOp3ke5wR80"
        title="Академический хор НГЛУ представляет: Gaudeamus-2020"
        desc="31 августа"
      />
    </div>
  )
}

function Frame ({ id, title, desc }) {
  const [active, setActive] = useState(false)

  return (
    <div className={styles.video}>
      <div className={classNames(styles.youtube, { [styles.active]: active })} onClick={() => setActive(true)} >
        {!active &&
          <div className={styles.img}>
            <img src={`https://img.youtube.com/vi/${id}/sddefault.jpg`} />
          </div>
        }

        {active &&
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
          />
        }
      </div>

      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.date}>
        {desc}
      </div>
    </div>
  )
}
