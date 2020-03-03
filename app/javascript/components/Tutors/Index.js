import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Title } from '../Pages'
import Tutor from './Index/Tutor'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  loaf: PropTypes.array
}

export default function Index ({ loaf }) {
  const [node, setNode] = useState()
  const [tutors, setTutors] = useState()
  const [search, setSearch] = useState('')

  const _fetch = async () => {
    const { data } = await axios.get('/tutors.json')

    setNode(data.node)
    setTutors(data.tutors)
  }

  useEffect(() => {
    _fetch()
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const itemProp = types => {
    if (types.includes(9)) {
      return 'rucovodstvo'
    } else if (types.includes(1)) {
      return 'rucovodstvoZam'
    } else {
      return 'teachingStaff'
    }
  }

  if (!tutors) return null

  const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item
      ]
    }),
    {}
  )

  const arr = [
    { faculty: 'Факультет английского языка', department: 'Кафедра английского языка' },
    { faculty: 'Факультет английского языка', department: 'Кафедра английской филологии' },
    { faculty: 'Факультет английского языка', department: 'Кафедра английского языка и профессиональной коммуникации' },
    { faculty: 'Факультет международных отношений, экономики и управления', department: 'Кафедра международных отношений и политологии' },
    { faculty: 'Факультет международных отношений, экономики и управления', department: 'Кафедра экономики, управления и информатики' },
    { faculty: 'Факультет романо-германских языков', department: 'Кафедра теории и практики немецкого языка' },
    { faculty: 'Факультет романо-германских языков', department: 'Кафедра теории и практики французского языка' },
    { faculty: 'Переводческий факультет', department: 'Кафедра английского языка переводческого факультета' },
    { faculty: 'Переводческий факультет', department: 'Кафедра теории и практики немецкого языка и перевода' },
    { faculty: 'Переводческий факультет', department: 'Кафедра теории и практики английского языка и перевода' },
    { faculty: 'Переводческий факультет', department: 'Кафедра теории и практики французского языка и перевода' },
    { faculty: 'Факультет дополнительного образования для иностранных граждан', department: 'Кафедра преподавания русского языка как родного и иностранного' },
    { faculty: 'Факультет дополнительного образования для иностранных граждан', department: 'Кафедра восточных и европейских языков' },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра физической культуры и спорта' },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра методики преподавания иностранных языков, педагогики и психологии' },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра истории, регионоведения и журналистики' },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра русской филологии, зарубежной литературы и межкультурной коммуникации' },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра философии, социологии и теории социальной коммуникации' }
  ]

  return (
    <div className={pages.container}>
      {node &&
        <Title
          h1={node.title}
          loaf={loaf}
        />
      }

      <div className={styles.input}>
        <input
          type="text"
          placeholder="Введите текст для поиска..."
          value={search}
          onChange={handleChange}
        />
      </div>

      {search &&
        <ul className={styles.search}>
          {tutors.filter(d => d.title.toLowerCase().includes(search.toLowerCase())).map(tutor =>
            <li key={tutor.fid}>
              <Tutor tutor={tutor} itemProp={itemProp(tutor.tutor_types)} />
            </li>
          )}
        </ul>
      }

      {tutors && !search &&
        <>
          <div className={styles.executives}>
            Руководители
          </div>

          <div className={styles.leaders}>
            {tutors.filter(t => t.tutor_types.includes(9)).map(tutor =>
              <Tutor key={tutor.id} tutor={tutor} itemProp={itemProp(tutor.tutor_types)}/>
            )}

            {tutors.filter(t => t.tutor_types.includes(1)).map(tutor =>
              <Tutor key={tutor.id} tutor={tutor} itemProp={itemProp(tutor.tutor_types)}/>
            )}
          </div>

          {Object.entries(groupBy(arr, 'faculty')).map((a, i) =>
            <div key={i} className={styles.faculty}>
              <h3>{a[0]}</h3>

              {a[1].map((dep, i) =>
                <h4 key={i}>
                  {dep.department}
                </h4>
              )}
            </div>
          )}

          {Object.entries(groupBy(tutors, 'department')).map((departments, _) =>
            <div key={_} className={styles.tutors}>
              {departments[1].filter(t => !t.tutor_types.includes(9) && !t.tutor_types.includes(1)).map(tutor =>
                <Tutor key={tutor.id} tutor={tutor} itemProp={itemProp(tutor.tutor_types)} />
              )}
            </div>
          )}
        </>
      }
    </div>
  )
}
