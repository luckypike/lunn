import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Filters from './Filters'

import styles from './Courses.module.css'

Courses.propTypes = {
  courses: PropTypes.array,
  location: PropTypes.object
}

export default function Courses ({ location, courses }) {
  const query = new URLSearchParams(location.search)

  const [filters, setFilters] = useState()

  useEffect(() => {
    // const newFilters = new Map(filters)
    // Array.from(query.entries()).map(e => {
    //   if (newFilters.has(e[0]) && newFilters.get(e[0]).has(e[1])) {
    //     newFilters.get(e[0]).set(e[1], true)
    //   }
    // })
    //
    // setFilters(newFilters)

    setFilters(
      new Map([
        [
          'level',
          new Map([
            ['ba', query.getAll('level').includes('ba')],
            ['sp', query.getAll('level').includes('sp')],
            ['ma', query.getAll('level').includes('ma')]
          ])
        ],
        [
          'time',
          new Map([
            ['1', query.getAll('time').includes('1')],
            ['2', query.getAll('time').includes('2')],
            ['3', query.getAll('time').includes('3')]
          ])
        ],
        [
          'ege',
          new Map([
            ['foreign', query.getAll('ege').includes('foreign')],
            ['russian', query.getAll('ege').includes('russian')],
            ['lit', query.getAll('ege').includes('lit')],
            ['math', query.getAll('ege').includes('math')],
            ['history', query.getAll('ege').includes('history')],
            ['social', query.getAll('ege').includes('social')]
          ])
        ]
      ])
    )
  }, [location.search])

  if (!filters) return null

  const levels = {
    ba: 'Бакалавриат',
    sp: 'Специалитет',
    ma: 'Магистратура'
  }

  return (
    <>
      <Filters filters={filters} query={query} />

      <div className={styles.courses}>
        {courses.map(course =>
          <a key={course.nid} href={course.path} className={styles.course}>
            <div className={styles.direction}>
              {course.title}
            </div>

            <div className={styles.title}>
              {course.spec || course.title}
            </div>

            <div className={styles.level}>
              {levels[course.level]}
            </div>

            {/* {[...Array(3)].filter((_, i) => course[`time_${i + 1}`] !== null && course[`places_${i + 1}`] !== null).map((_, i) =>
              <div key={i} className={styles.meta}>
                <div>
                  {forms[i + 1]}
                </div>

                <div>
                  {course[`places_${i + 1}`] > 0 ? course[`places_${i + 1}`] : 'нет'} бюджетных мест
                </div>

                <div>
                  {course[`time_${i + 1}`]} года срок обучения
                </div>

                {course[`price_${i + 1}`] !== null &&
                  <div>
                    {course[`price_${i + 1}`]} руб. в года стоимость обучения
                  </div>
                }
              </div>
            )} */}

            <div className={styles.ege}>
              <p className={styles.eget}>
                Предметы ЕГЭ
              </p>

              <ul className={styles.es}>
                {course.ege.map(e =>
                  <li key={e} className={styles.e}>
                    <Ege label={e} />
                  </li>
                )}
              </ul>
            </div>
          </a>
        )}
      </div>
    </>
  )
}

function Ege ({ label }) {
  const labels = {
    foreign: 'Иностранный язык',
    russian: 'Русский язык',
    lit: 'Литература',
    math: 'Математика',
    history: 'История',
    social: 'Обществознание'
  }

  return labels[label] || label
}
