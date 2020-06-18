import React from 'react'
// import PropTypes from 'prop-types'

import styles from './Logos.module.css'

import MCImg from './Images/mc.svg'
import VisaImg from './Images/visa.svg'
import MirImg from './Images/mir.svg'

export default function Logos () {
  return (
    <div className={styles.logos}>
      <img src={MCImg} className={styles.mc} />
      <img src={VisaImg} className={styles.visa} />
      <img src={MirImg} className={styles.mir} />
    </div>
  )
}
