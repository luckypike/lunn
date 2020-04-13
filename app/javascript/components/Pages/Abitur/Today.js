import React from 'react'
import classNames from 'classnames'

import styles from './Today.module.css'

export default function Today () {
  return (
    <div>
      <div className={styles.facts}>
        <ul>
          <li>
            <div className={styles.gt}>
              Более
            </div>

            <div className={styles.digits}>
              3000
            </div>

            <div className={styles.fact}>
              Cтудентов из всех уголков мира
            </div>
          </li>

          <li>
            <div className={styles.gt}>
              Более
            </div>

            <div className={styles.digits}>
              80%
            </div>

            <div className={styles.fact}>
              Преподавателей университета — профессора и доктора наук
            </div>
          </li>

          <li>
            <div className={styles.digits}>
              13
            </div>

            <div className={styles.fact}>
              Преподавателей — носители иностранного языка
            </div>
          </li>

          <li>
            <div className={styles.digits}>
              16
            </div>

            <div className={styles.fact}>
              Иностранных языков включая редкие, такие как венгерский и румынский
            </div>
          </li>
        </ul>
      </div>

      <div>

      </div>

      <div className={styles.features}>
        <div className={classNames(styles.feature, styles.years100)}>
          <div className={styles.h0}>
            Университет с более чем 100-летней историей
          </div>
        </div>

        <div className={styles.feature}>
          <p className={styles.pm}>
            Глубокое изучение иностранных языков при выборе любого направления: журналистики, экономики и менеджмента и т.д.
          </p>

          <p className={styles.p8}>
            Это делает выпускников высококонкурентноспособными в любой сфере
          </p>
        </div>

        <div className={styles.feature}>
          <p className={styles.pm}>
            Более 60 договоров о сотрудничестве с вузами дальнего и ближнего зарубежья, возможность учиться по обмену
          </p>
        </div>

        <div className={styles.feature}>
          <p className={styles.pm}>
            Возможность стажировок и работы в ООН, в Еропейском суде по защите прав человека
          </p>
        </div>

        <div className={styles.feature}>
          <p className={styles.pm}>
            На территории университета — 10 культурно-образовательных языковых центров разных стран
          </p>
        </div>

        <div className={classNames(styles.feature, styles.w)}>
          <p className={styles.pm}>
            Работодатели НГЛУ — администрации всех уровней, МИД, международные компании, российские корпорации с зарубежным партнерством
          </p>

          <p className={styles.p8}>
            Intel, Henkel, Volkswagen, Skoda Auto, Нижфарм, Тосол-Синтез, Лукойл и т.д.
          </p>
        </div>
      </div>
    </div>
  )
}
