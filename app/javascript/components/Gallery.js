import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Glide from '@glidejs/glide'

import styles from './Gallery.module.css'

Gallery.propTypes = {
  images: PropTypes.array
}

export default function Gallery ({ images }) {
  if (!images || images.length < 2) return null

  const mount = useRef()

  const slides = () => {
    return images.length > 1
  }

  useEffect(() => {
    if (slides()) {
      const glide = new Glide(mount.current, {
        perView: 2.25,
        bound: true,
        rewind: true,
        gap: 30,
        breakpoints: {
          767: {
            perView: 1.25,
            gap: 10
          }
        }
      })

      glide.mount()
    }
  }, [])

  return (
    <div className={classNames('glide', styles.images)} ref={mount}>
      <div className='glide__track' data-glide-el="track">
        <div className={classNames('glide__slides', styles.slides)}>
          {images.map(image =>
            <div key={image.fid} className={styles.image}>
              <img src={`https://assets.lunn.ru/imgproxy/rs:fill:0:1024/g:sm/q:75/${image.encoded_path}.jpg`} />
            </div>
          )}
        </div>
      </div>

      <div className={classNames('glide__arrows', styles.nav)} data-glide-el="controls">
        <button className={classNames('glide__arrow glide__arrow--right', styles.next)} data-glide-dir=">">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 34">
            <path stroke="#2E4DE6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l16 16L1 33"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
