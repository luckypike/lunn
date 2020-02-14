import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import styles from './Youtube.module.css'

Frame.propTypes = {
  src: PropTypes.string,
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
        src="https://www.youtube.com/embed/gr9xa9pdpDk"
        title="Ректор НГЛУ Жанна Никонова поздравляет коллег с Днем российской науки"
        desc="7 февраля 2020"
      />

      <Frame
        src="https://www.youtube.com/embed/CDYozEbzF0s"
        title="Ученые НГЛУ поздравляют коллег с Днем российской науки"
        desc="7 февраля 2020"
      />
    </div>
  )
}

function Frame ({ src, title, desc }) {
  const frameRef = useRef()

  useEffect(() => {
    frameRef.current.setAttribute('src', src)
  }, [])

  return (
    <div className={styles.video}>
      <div className={styles.youtube}>
        <iframe ref={frameRef} frameBorder="0" allowFullScreen={true} />
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
