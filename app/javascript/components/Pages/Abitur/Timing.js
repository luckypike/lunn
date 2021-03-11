import React, { useState } from 'react'
import classNames from 'classnames'

import styles from './Timing.module.css'

export default function Results () {
  const [bachelor, setBachelor] = useState(false)
  const [magistracy, setMagistracy] = useState(false)

  return (
    <div className={styles.root}>
      <h2>Сроки проведения зачисления</h2>

      <div className={styles.program}>
        <div className={classNames(styles.handle, { [styles.active]: bachelor })} onClick={() => setBachelor(!bachelor)}>
          <h3>Бакалавриат и специалитет</h3>
        </div>

        {bachelor &&
          <div className={styles.timing}>
            <div className={styles.date}>
              <div>10 июля</div>
              <div>Срок завершения приема документов от абитуриентов, поступающих на обучение по результатам вступительных испытаний, проводимых НГЛУ самостоятельно</div>
            </div>

            <div className={styles.date}>
              <div>25 июля</div>
              <div>Срок завершения приема документов от абитуриентов, поступающих на обучение по результатам ЕГЭ</div>
            </div>

            <h4>Бюджетная очная форма обучения</h4>

            <div className={styles.date}>
              <div>27 июля</div>
              <div>Размещение конкурсных списков поступающих на официальном сайте</div>
            </div>

            <div className={styles.date}>
              <div>До 28 июля включительно</div>
              <div>Осуществляется прием заявлений о согласии на зачисление от абитуриентов, поступающих без вступительных испытаний, а также поступающих на места в пределах квот</div>
            </div>

            <div className={styles.date}>
              <div>30 июляа</div>
              <div>Издаются приказы о зачислении абитуриентов, поступающих на места в пределах квот</div>
            </div>

            <div className={styles.date}>
              <div>До 3 августа включительно</div>
              <div>Осуществляется прием заявлений о согласии на зачисление на основные конкурсные места</div>
            </div>

            <div className={styles.date}>
              <div>5 августа</div>
              <div>Издаются приказы о зачислении абитуриентов, подавших заявление о согласии на зачисление, на основные конкурсные места</div>
            </div>

            <h4>Бюджетные очно-заочная и заочная формы обучения</h4>

            <div className={styles.date}>
              <div>27 июля</div>
              <div>Размещение конкурсных списков поступающих на официальном сайте</div>
            </div>

            <div className={styles.date}>
              <div>6 августа</div>
              <div>Завершается прием заявлений о согласии на зачисление от абитуриентов, поступающих на места в пределах квот</div>
            </div>

            <div className={styles.date}>
              <div>7 августа</div>
              <div>Завершается прием заявлений о согласии на зачисление от абитуриентов, поступающих на основные конкурсные места</div>
            </div>

            <div className={styles.date}>
              <div>9 августа</div>
              <div>Издаются приказы о зачислении абитуриентов, поступающих на места в пределах квот, а также поступающих на основные конкурсные места</div>
            </div>

            <h4>Платная форма обучения</h4>

            <div className={styles.date}>
              <div>27 июля</div>
              <div>Размещение конкурсных списков поступающих на официальном сайте</div>
            </div>

            <div className={styles.date}>
              <div>10 августа</div>
              <div>Завершается прием заявлений о согласии на зачисление на платные места на первом этапе</div>
            </div>

            <div className={styles.date}>
              <div>11 августа</div>
              <div>Издаются приказы о зачислении абитуриентов на платные места</div>
            </div>

            <div className={styles.date}>
              <div>20 августа</div>
              <div>Завершается прием заявлений о согласии на зачисление на платные места, оставшиеся вакантными после первого этапа зачисления</div>
            </div>

            <div className={styles.date}>
              <div>23 августа</div>
              <div>Издаются приказы о зачислении абитуриентов на платные места</div>
            </div>

            <h4>Заочная платная форма обучения</h4>

            <div className={styles.date}>
              <div>20 сентября</div>
              <div>Завершается прием заявлений о согласии на зачисление на платные места, оставшиеся вакантными после основных этапов зачисления</div>
            </div>

            <div className={styles.date}>
              <div>21 сентября</div>
              <div>Издаются приказы о зачислении абитуриентов на платные места</div>
            </div>
          </div>
        }
      </div>

      <div className={styles.program}>
        <div className={classNames(styles.handle, { [styles.active]: magistracy })} onClick={() => setMagistracy(!magistracy)}>
          <h3>Магистратура</h3>
        </div>

        {magistracy &&
          <div className={styles.timing}>
            <div className={styles.date}>
              <div>12 августа</div>
              <div>Cрок завершения приема документов, необходимых для поступления</div>
            </div>

            <div className={styles.date}>
              <div>24 августа</div>
              <div>Cрок завершения вступительных испытаний</div>
            </div>

            <div className={styles.date}>
              <div>26 августа</div>
              <div>Завершается прием заявлений о согласии на зачисление от абитуриентов, поступающих на бюджетные места</div>
            </div>

            <div className={styles.date}>
              <div>27 августа</div>
              <div>Издаются приказы о зачислении абитуриентов на бюджетные места</div>
            </div>

            <div className={styles.date}>
              <div>28 августа</div>
              <div>Завершается прием заявлений о согласии на зачисление от абитуриентов, поступающих на платные места</div>
            </div>

            <div className={styles.date}>
              <div>29 августа</div>
              <div>Издаются приказы о зачислении абитуриентов на платные места</div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
