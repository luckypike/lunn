import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { deserialize } from 'jsonapi-deserializer'

import { Title } from '../Pages'
import Tutor from './Index/Tutor'
import { I18nContext, useI18n } from '../I18n'

import styles from './Index.module.css'
import pages from '../Pages.module.css'

Index.propTypes = {
  loaf: PropTypes.array,
  divisions: PropTypes.object,
  tutors: PropTypes.object,
  node: PropTypes.object,
  locale: PropTypes.string
}

export default function Index ({ loaf, tutors: tutorsJson, divisions: divisionsJson, node, locale }) {
  const I18n = useI18n(locale)
  const tutors = deserialize(tutorsJson)
  const divisions = deserialize(divisionsJson)
  const [search, setSearch] = useState('')

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

  if (!divisions) return null

  // const groupBy = (items, key) => items.reduce(
  //   (result, item) => ({
  //     ...result,
  //     [item[key]]: [
  //       ...(result[item[key]] || []),
  //       item
  //     ]
  //   }),
  //   {}
  // )

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
    <I18nContext.Provider value={I18n}>
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
            placeholder={I18n.t('tutors.search')}
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
              {I18n.t('tutors.governance')}
            </div>

            <div className={styles.leaders}>
              {tutors.filter(t => t.tutor_types.includes(9)).map(tutor =>
                <Tutor key={tutor.id} tutor={tutor} itemProp={itemProp(tutor.tutor_types)}/>
              )}

              {tutors.filter(t => t.tutor_types.includes(1)).map(tutor =>
                <Tutor key={tutor.id} tutor={tutor} itemProp={itemProp(tutor.tutor_types)}/>
              )}
            </div>
          </>
        }

        {divisions && !search &&
          <>
            {divisions.filter(d => d.departments.filter(d => d.has_tutors).length > 0).map(division =>
              <div key={division.id} className={styles.division}>
                <h3>
                  {division.title}
                </h3>

                {division.departments.filter(d => d.has_tutors).map(department =>
                  <div key={department.id}>
                    <h4>{department.title}</h4>

                    <div key={_} className={styles.tutors}>
                        {department.tutors.filter(t => !t.tutor_types.includes(9) && !t.tutor_types.includes(1)).map(tutor =>
                          <Tutor key={tutor.id} tutor={tutor} itemProp={itemProp(tutor.tutor_types)} />
                        )}
                      </div>
                  </div>
                )}
              </div>
            )}
          </>
        }

        <div className={styles.fil} itemProp="rucovodstvoFil">
          <div itemProp="fio">Филиалов нет</div>
          <div itemProp="post">Филиалов нет</div>
          <div itemProp="telephone">Филиалов нет</div>
          <div itemProp="email">Филиалов нет</div>
        </div>
      </div>
    </I18nContext.Provider>
  )
}
