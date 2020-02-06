import React from 'react'
import PropTypes from 'prop-types'

import styles from './Gallery.module.css'

Gallery.propTypes = {
  images: PropTypes.array
}

export default function Gallery ({ images }) {
  return (
    <div className={styles.images}>
      {images.map(image =>
        <div key={image.fid} className={styles.image}>
          <img src={`https://beta.lunn.ru/images/0x1024${image.path}`} />
        </div>
      )}
    </div>
  )
}
