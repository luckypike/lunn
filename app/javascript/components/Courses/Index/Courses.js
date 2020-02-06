import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '../../I18n'

import Filters from './Filters'

import styles from './Courses.module.css'

Courses.propTypes = {
  courses: PropTypes.array,
  location: PropTypes.object,
  locale: PropTypes.string
}

export default function Courses ({ location, courses, locale }) {
  const query = new URLSearchParams(location.search)

  const I18n = useI18n(locale)
  const [filters, setFilters] = useState()
  const [data, setData] = useState(courses)

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
            ['russian', true],
            ['lit', query.getAll('ege').includes('lit')],
            ['math', query.getAll('ege').includes('math')],
            ['history', query.getAll('ege').includes('history')],
            ['social', query.getAll('ege').includes('social')]
          ])
        ]
      ])
    )
  }, [location.search])


  useEffect(() => {
    if (filters) {
      let newData = courses
      if (filters.get('ege') && [...filters.get('ege')].filter(([key, value]) => value === true).map(e => e[0]).length > 0) {
        const ege = [...filters.get('ege')].filter(([key, value]) => value === true).map(e => e[0])
        newData = newData.filter(course => course.ege.some(v => ege.indexOf(v) !== -1 ))
      }
      if (filters.get('level') && [...filters.get('level')].filter(([key, value]) => value === true).map(e => e[0]).length > 0) {
        const level = [...filters.get('level')].filter(([key, value]) => value === true).map(e => e[0])
        newData = newData.filter(course => level.includes(course.level))
      }
      if (filters.get('time') && [...filters.get('time')].filter(([key, value]) => value === true).map(e => e[0]).length > 0) {
        const time = [...filters.get('time')].filter(([key, value]) => value === true).map(e => e[0])
        newData = newData.filter(course => time.some(time => course[`time_${time}`] != null))
      }

      setData(newData)
    }
  }, [filters])

  if (!filters) return null

  const levels = {
    ba: 'Бакалавриат',
    sp: 'Специалитет',
    ma: 'Магистратура'
  }

  return (
    <>
      <Filters filters={filters} query={query} locale={locale}/>

      <div className={styles.courses}>
        {data.map(course =>
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

            {[1, 2, 3].filter(i => course[`time_${i}`] !== null && course[`places_${i}`] !== null).map(i =>
              <div key={i} className={styles.meta}>
                <div className={styles.form}>
                  {I18n.t(`courses.forms.form_${i}`)}
                </div>

                {/* <div>
                  {course[`places_${i + 1}`] > 0 ? course[`places_${i + 1}`] : 'нет'} бюджетных мест
                </div> */}

                <div className={styles.time}>
                  {I18n.t('courses.times', { count: I18n.toNumber(course[`time_${i}`], { separator: ',', precision: 1, strip_insignificant_zeros: true }) })}
                </div>

                {/* {course[`price_${i + 1}`] !== null &&
                  <div>
                    {course[`price_${i + 1}`]} руб. в года стоимость обучения
                  </div>
                } */}
              </div>
            )}

            {course.level !== 'ma' &&
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
            }
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
