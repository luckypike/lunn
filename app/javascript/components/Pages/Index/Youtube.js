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
        id="PI9nzd1suQY"
        title="Заочное или вечернее обучение в НГЛУ - пожалуй, идеальный вариант совмещения работы и учебы!"
        desc="20 июля"
      />

      <Frame
        id="RJdISL8GV3A"
        title="Обращение Ректора НГЛУ им. Н.А. Добролюбова профессора Жанны Никоновой к выпускникам-2020"
        desc="30 июня"
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
          <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} />
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
