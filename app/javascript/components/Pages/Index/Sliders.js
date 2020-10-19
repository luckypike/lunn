import React, { useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Glide from '@glidejs/glide'

import { I18nContext } from '../../I18n'

import styles from './Sliders.module.css'

Sliders.propTypes = {
  sliders: PropTypes.array
}

export default function Sliders ({ sliders }) {
  const mount = useRef()
  const I18n = useContext(I18nContext)

  useEffect(() => {
    const glide = new Glide(mount.current, {
      type: 'slider',
      rewind: false,
      // autoplay: 2000,
      hoverpause: true,
      gap: 0
    })

    glide.mount()
  }, [])

  return (
    <div className={styles.slider}>
      <div className={classNames('glide', styles.images)} ref={mount}>
        <div className={classNames('glide__track', styles.track)} data-glide-el="track">
          <div className={classNames('glide__slides', styles.slides)}>
            {sliders.map((slider, i) =>
              <a
                className={classNames('glide__slide', styles.slide)}
                href={slider.link}
                key={slider.nid}
              >
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: slider.image ? `url(https://assets.lunn.ru/imgproxy/rs:fill:1500:1200/g:sm/q:75/${slider.image.encoded_path})` : null
                  }}
                />

                <div className={styles.data}>
                  <div className={styles.title}>
                    {slider.title}
                  </div>

                  <div className={styles.action}>
                    <span className={styles.button}>
                      {I18n.t('pages.index.sliders.more')}
                    </span>
                  </div>
                </div>
              </a>
            )}
          </div>

          <div className={styles.nav} data-glide-el="controls">
            <div className={styles.prev} data-glide-dir="<">
              <svg viewBox="0 0 12 22" fill="none">
                <path d="M11 21L1 11 11 1" stroke="#000"/>
              </svg>
            </div>

            <div className={styles.next} data-glide-dir=">">
              <svg viewBox="0 0 12 22" fill="none">
                <path d="M1 21l10-10L1 1" stroke="#000"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
