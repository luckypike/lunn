import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Glide from '@glidejs/glide'

import styles from './Sliders.module.css'

Sliders.propTypes = {
  sliders: PropTypes.array
}

export default function Sliders ({ sliders }) {
  const [current, setCurrent] = useState(0)
  const mount = useRef()

  useEffect(() => {
    const glide = new Glide(mount.current, {
      type: 'carousel',
      autoplay: 10000,
      hoverpause: true,
      gap: 0
    })

    glide.on(['mount.after', 'run'], () => {
      setCurrent(glide.index)
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
                href={slider.link}
                key={slider.nid}
                className={classNames('glide__slide', styles.image)}
                style={{
                  backgroundImage: slider.image ? `url(https://assets.lunn.ru/images/1200x1500,q80/legacy${slider.image.path})` : null
                }}
              />
            )}
          </div>
        </div>
        <div className={classNames('glide__bullets', styles.bullets)} data-glide-el="controls[nav]">
          {sliders.map((s, index) =>
            <div key={index} className={styles.wrapper} data-glide-dir={`=${index}`}>
              <div className={classNames(styles.bullet, { [styles.active]: current === index })} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
