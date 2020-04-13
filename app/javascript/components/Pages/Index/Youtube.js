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
        id="lLZ6hGXlsEM"
        title="Видеообращение ректора НГЛУ им. Н.А.Добролюбова Жанны Никоновой"
        desc="6 апреля 2020"
      />

      <Frame
        id="XUkJUeL4wFQ"
        title="Отзыв об НГЛУ Константин Кириченко"
        desc="19 февраля 2020"
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
