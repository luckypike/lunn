import React from 'react'
// import PropTypes from 'prop-types'

import styles from './Intro.module.css'

import MCImg from './Images/mc.svg'
import VisaImg from './Images/visa.svg'
import MirImg from './Images/mir.svg'

export default function Intro () {
  return (
    <div className={styles.root}>
      <div className={styles.logos}>
        <img src={MCImg} className={styles.mc} />
        <img src={VisaImg} className={styles.visa} />
        <img src={MirImg} className={styles.mir} />
      </div>

      <p className={styles.text}>
        Оплатить обучение и курсы можно на сайте университета.
        Чтобы найти доступные для оплаты счета введите номер договора и фамилию.
        Для оплаты счета нажмите на кнопку «Оплатить», после этого вы будете перенаправлены на защищенную платежную страницу «Газпромбанк» (Акционерное общество), где будет необходимо ввести данные вашей пластиковой карты.
        В случае успешной оплаты вы получите от сайта уведомление о том, что оплата проведена и описание порядка получения услуги.
      </p>
    </div>
  )
}
