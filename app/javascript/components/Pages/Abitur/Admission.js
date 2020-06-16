import React from 'react'

import styles from './Admission.module.css'

export default function Admission () {
  return (
    <div className={styles.root}>
      <div className={styles.online}>
        <h2>
          Поступай легко — поступай онлайн
        </h2>

        <p className={styles.desc}>
          В 2020 году прием документов мы будет осуществлять только в дистанционной форме, через личный кабинет абитуриента на нашем сайте, который откроется для вас 19 июня 2020 года.
        </p>
      </div>

      <div className={styles.account}>

        <h3>
          Как поступить в НГЛУ
        </h3>

        <p className={styles.how}>
          <a className={styles.button} href="/abitur/2020/basp">
            Бакалавриат/специалитет
          </a>

          {/* <br /> */}

          <a className={styles.button} href="/abitur/2020/ma">
            Магистратура
          </a>

          <a className={styles.button} href="/abitur/2020/as">
            Аспирантура
          </a>
        </p>

        <h3>
          Личный кабинет абитуриента
        </h3>

        <p>
          Здесь вы можете подать заявление о приёме и документы
        </p>

        <p>
          <a className={styles.button} href="/admissions/new">
            Подать документы
          </a>
        </p>
      </div>
    </div>
  )
}
