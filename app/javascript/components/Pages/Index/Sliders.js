import React from 'react'
import PropTypes from 'prop-types'

Sliders.propTypes = {
  sliders: PropTypes.array
}

export default function Sliders ({ sliders }) {
  return (
    <div>
      <h2>
        SLIDERS
      </h2>

      <div>
        {sliders.map(slider =>
          <div key={slider.nid}>
            {slider.title}
            <br />
            <img src={slider.image.path} width="50" />
          </div>
        )}
      </div>
    </div>
  )
}
