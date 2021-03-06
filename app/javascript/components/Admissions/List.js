import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'
import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
// import Docs from '../Docs/Docs2'
import { I18nContext, useI18n } from '../I18n'

import styles from './List.module.css'
import pages from '../Pages.module.css'

List.propTypes = {
  node: PropTypes.object.isRequired,
  loaf: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired
}

export default function List ({ node: nodeJson, loaf, locale }) {
  const node = deserialize(nodeJson)
  const I18n = useI18n(locale)

  const [list, setList] = useState()
  const [profiles, setProfiles] = useState()
  const [categories, setCategories] = useState()
  const [types, setTypes] = useState()
  const [exams, setExams] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/abitur/2020/list.json')

      setList(data.list)
      setProfiles(data.profiles)
      setCategories(data.categories)
      setTypes(data.types)
      setExams(data.exams)
    }

    _fetch()
  }, [])

  return (
    <I18nContext.Provider value={I18n}>
      <div className={pages.beta}>
        {node &&
          <Title
            beta
            h1={node.title}
            loaf={loaf}
          />
        }
      </div>

      {list && list.length > 0 && profiles && categories && types && exams &&
        <div className={pages.container}>
          <div className={styles.hint}>
            Абитуриенты, подавшие согласие на зачисление, поднимаются в верхнюю часть списков
          </div>

          {types.map((type, t) =>
            <React.Fragment key={t}>
              <h2>{type}</h2>
              <div className={styles.list}>
                {profiles.filter(p => p.type === type[0]).map((profile, i) =>
                  <Course
                    key={i}
                    categories={categories}
                    course={profile}
                    exams={exams}
                    listData={list.filter(l => l.profiles.filter(p => p.profile === profile.profile && p.form === profile.form && p.tax === profile.tax).length > 0)}
                  />
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      }
    </I18nContext.Provider>
  )
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  listData: PropTypes.array.isRequired,
  exams: PropTypes.array.isRequired
}

function Course ({ course, categories, listData, exams }) {
  const [active, setActive] = useState(false)
  const [list, setList] = useState(listData)

  useEffect(() => {
    const newList = [...listData]
    const secondList = []

    newList.map(l => {
      if (l.profiles.find(p => (p.categorob !== 'По общему конкурсу' && p.id === course.id))) {
        const abitur = Object.assign({}, l)
        const profile = Object.assign({}, abitur.profiles.find(p => (p.categorob !== 'По общему конкурсу' && p.id === course.id && p.form === course.form && p.tax === course.tax)))
        if (abitur.profiles.filter(p => p.id === profile.id && p.form === profile.form && p.tax === profile.tax).length > 1) {
          abitur.profiles = [...abitur.profiles.filter(p => (p.categorob !== profile.categorob && p.id === profile.id) || (p.id !== profile.id))]
          secondList.push(abitur)
        }
      }
    })

    setList(listData.concat(secondList))
  }, [listData])

  const getProfile = (profiles) => {
    return profiles.filter(p => p.profile === course.profile && p.form === course.form && p.tax === course.tax)[0]
  }

  return (
    <div className={styles.course}>
      <div className={classNames(styles.handle, { [styles.active]: active })} onClick={() => setActive(!active)}>
        <h4>
          {course.profile}
        </h4>

        <div>
          {course.form}, {course.tax}
        </div>
      </div>

      {active &&
        <div className={styles.abiturs}>
          {list
            .sort((a, b) => (getProfile(a.profiles).achievements > getProfile(b.profiles).achievements) ? -1 : 1)
            .sort((a, b) => ((a.subjects.find(s => s.id === course.order[2]) ? a.subjects.find(s => s.id === course.order[2]).grade : 0) > (b.subjects.find(s => s.id === course.order[2]) ? b.subjects.find(s => s.id === course.order[2]).grade : 0)) ? -1 : 1)
            .sort((a, b) => ((a.subjects.find(s => s.id === course.order[1]) ? a.subjects.find(s => s.id === course.order[1]).grade : 0) > (b.subjects.find(s => s.id === course.order[1]) ? b.subjects.find(s => s.id === course.order[1]).grade : 0)) ? -1 : 1)
            .sort((a, b) => ((a.subjects.find(s => s.id === course.order[0]) ? a.subjects.find(s => s.id === course.order[0]).grade : 0) > (b.subjects.find(s => s.id === course.order[0]) ? b.subjects.find(s => s.id === course.order[0]).grade : 0)) ? -1 : 1)
            .sort((a, b) => (getProfile(a.profiles).grades > getProfile(b.profiles).grades) ? -1 : 1)
            .sort((a, b) => (getProfile(a.profiles).overall > getProfile(b.profiles).overall) ? -1 : 1)
            .sort((a, b) => ((getProfile(a.profiles).grades === 0 && getProfile(a.profiles).foreign ? 0 : getProfile(a.profiles).soglasiye) > (getProfile(b.profiles).grades === 0 && getProfile(b.profiles).foreign ? 0 : getProfile(b.profiles).soglasiye)) ? -1 : 1)
            .sort((a, b) => (categories.indexOf(getProfile(a.profiles).categorob) > categories.indexOf(getProfile(b.profiles).categorob) ? -1 : 1))
            .map((abitur, _) =>
              <Abitur
                index={_ + 1}
                key={_}
                abitur={abitur}
                exams={exams.filter(e => e.profile === getProfile(abitur.profiles).id).map(e => e.exam)}
                course={getProfile(abitur.profiles)}
              />
            )
          }
        </div>
      }
    </div>
  )
}

Abitur.propTypes = {
  abitur: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  index: PropTypes.number,
  exams: PropTypes.array.isRequired
}

function Abitur ({ abitur, course, index, exams }) {
  const [active, setActive] = useState(false)

  return (
    <div className={styles.abitur}>
      <div className={styles.short} onClick={() => setActive(!active)}>
        <div className={styles.place}>
          {index}.
        </div>

        <div className={styles.name}>
          {abitur.family_name} {abitur.first_name} {abitur.middle_name}

          {course.categorob !== 'По общему конкурсу' &&
            <>
              <br />
              <span className={styles.cat}>
                {course.categorob}
              </span>

            </>
          }

          {course.foreign &&
            <>
              <br />
              <span className={styles.cat}>
                Иностранные граждане
              </span>
            </>
          }

          {course.soglasiye === 1 &&
            <>
              <br />
              <span className={styles.cat}>
                Согласие на зачисление
              </span>
            </>
          }

          {course.admission &&
            <>
              <br />
              <span className={styles.cat}>
                Зачислен: {abitur.profiles.find(p => p.admission === true).profile}
              </span>
            </>
          }
        </div>

        <div className={styles.summary}>
          {course.overall}
        </div>

        <div className={styles.arrow} />
      </div>

      {active &&
        <div className={styles.details}>
          {abitur.subjects && abitur.subjects.length > 0 &&
            <div className={styles.section}>
              <div className={styles.results}>
                {abitur.subjects.filter(s => exams.includes(s.id)).map(s =>
                  <div key={s.id} className={styles.result}>
                    <div>{s.subject}</div>
                    <div>{s.grade}</div>
                  </div>
                )}
              </div>
            </div>
          }
          {abitur.achievements && abitur.achievements.length > 0 &&
            <div className={styles.section}>
              <div className={styles.results}>
                {abitur.achievements.map(a =>
                  <div key={a.id} className={styles.result}>
                    <div>{a.achievement}</div>
                    <div>{a.grade}</div>
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

// Cat.propTypes = {
//   cat: PropTypes.string.isRequired,
//   list: PropTypes.array.isRequired
// }
//
// function Cat ({ cat, list }) {
//   if (list.length < 1) return null
//
//   return (
//     <div className={styles.cat}>
//       <div>
//         <h5>
//           {cat}
//         </h5>
//       </div>
//
//       <div>
//         {list.map(abitur =>
//           <div key={abitur.id} className={styles.abitur}>
//             <div className={styles.name}>
//               {abitur.family_name} {abitur.first_name} {abitur.middle_name}
//             </div>
//
//             <div className={styles.summary}>
//               <div className={styles.marks}>
//                 250 баллов
//               </div>
//
//               <div className={styles.achiv}>
//                 2 инд. дост.
//               </div>
//             </div>
//
//             <div className={styles.arrow} />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
