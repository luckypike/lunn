import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Siema from 'siema'

import styles from './Sliders.module.css'

Sliders.propTypes = {
  images: PropTypes.array
}

export default function Sliders ({ images }) {
  const slider = useRef()
  const mount = useRef()

  const slides = () => {
    return images.length > 1
  }

  useEffect(() => {
    if (slides()) {
      slider.current = new Siema({
        selector: mount.current,
        startIndex: 0,
        onChange: () => {
          setCurrent(slider.current.currentSlide)
        }
      })
    }
  }, [])

  const [current, setCurrent] = useState(0)

  return (
    <div className={styles.slider}>
      {slides() &&
        <>
          <div className={styles.prev} onClick={() => slider.current.prev()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.41,7.41,14,6,8,12l6,6,1.41-1.41L10.83,12Z" fill="#fff"/>
              <path d="M0,0H24V24H0Z" fill="none"/>
            </svg>
          </div>

          <div className={styles.next} onClick={() => slider.current.next()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g transform="translate(24 24) rotate(180)">
                <path d="M15.41,7.41,14,6,8,12l6,6,1.41-1.41L10.83,12Z" fill="#fff"/>
                <path d="M0,0H24V24H0Z" fill="none"/>
              </g>
            </svg>
          </div>

          <div className={styles.bullets}>
            {images.map((_, index) =>
              <div key={index} className={classNames(styles.bullet, { [styles.active]: current === index })} onClick={() => slider.current.goTo(index)} />
            )}
          </div>
        </>
      }

      <div ref={mount} className={styles.images}>
        {images.map((image, i) =>
          <div key={i}>
            <div className={styles.image} style={{ backgroundImage: `url(${image.path})` }} />
          </div>
        )}
      </div>
    </div>
  )
}
