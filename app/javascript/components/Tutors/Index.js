import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import axios from 'axios'

import { Title } from '../Pages'
import Tutor from './Index/Tutor'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  loaf: PropTypes.array,
  tutors: PropTypes.array,
  node: PropTypes.object
}

export default function Index ({ loaf, tutors, node }) {
  // const [node, setNode] = useState()
  // const [tutors, setTutors] = useState()
  const [search, setSearch] = useState('')

  // useEffect(() => {
  //   const _fetch = async () => {
  //     const { data } = await axios.get('/tutors.json')
  //
  //     setNode(data.node)
  //     setTutors(data.tutors)
  //   }
  //
  //   _fetch()
  // }, [])

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
    { faculty: 'Факультет английского языка', department: 'Кафедра английского языка', nid: 580 },
    { faculty: 'Факультет английского языка', department: 'Кафедра английской филологии', nid: 581 },
    { faculty: 'Факультет английского языка', department: 'Кафедра английского языка и профессиональной коммуникации', nid: 582 },
    { faculty: 'Факультет международных отношений, экономики и управления', department: 'Кафедра международных отношений и политологии', nid: 613 },
    { faculty: 'Факультет международных отношений, экономики и управления', department: 'Кафедра экономики, управления и информатики', nid: 614 },
    { faculty: 'Факультет романо-германских языков', department: 'Кафедра теории и практики немецкого языка', nid: 586 },
    { faculty: 'Факультет романо-германских языков', department: 'Кафедра теории и практики французского языка', nid: 587 },
    { faculty: 'Переводческий факультет', department: 'Кафедра английского языка переводческого факультета', nid: 601 },
    { faculty: 'Переводческий факультет', department: 'Кафедра теории и практики немецкого языка и перевода', nid: 603 },
    { faculty: 'Переводческий факультет', department: 'Кафедра теории и практики английского языка и перевода', nid: 602 },
    { faculty: 'Переводческий факультет', department: 'Кафедра теории и практики французского языка и перевода', nid: 604 },
    { faculty: 'Факультет дополнительного образования для иностранных граждан', department: 'Кафедра преподавания русского языка как родного и иностранного', nid: 499 },
    { faculty: 'Факультет дополнительного образования для иностранных граждан', department: 'Кафедра восточных и европейских языков', nid: 506 },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра физической культуры и спорта', nid: 502 },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра методики преподавания иностранных языков, педагогики и психологии', nid: 505 },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра истории, регионоведения и журналистики', nid: 500 },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра русской филологии, зарубежной литературы и межкультурной коммуникации', nid: 501 },
    { faculty: 'Общеуниверситетские кафедры', department: 'Кафедра философии, социологии и теории социальной коммуникации', nid: 503 }
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
            <li key={tutor.id}>
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
              <h3>
                {a[0]}
              </h3>

              {a[1].map((dep, i) =>
                <div key={i}>
                  <h4>
                    {dep.department}
                  </h4>

                  {Object.entries(groupBy(tutors.filter(t => t.department === dep.nid), 'department')).map((departments, _) =>
                    <div key={_} className={styles.tutors}>
                      {departments[1].filter(t => !t.tutor_types.includes(9) && !t.tutor_types.includes(1)).map(tutor =>
                        <Tutor key={tutor.id} tutor={tutor} itemProp={itemProp(tutor.tutor_types)} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      }

      <div className={styles.fil} itemProp="rucovodstvoFil">
        Филиалов нет
      </div>
    </div>
  )
}
