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

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/abitur/2020/list.json')

      setList(data.list)
      setProfiles(data.profiles)
      setCategories(data.categories)
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

      {list && list.length > 0 && profiles && categories &&
        <div className={pages.container}>
          <div className={styles.list}>
            {profiles.map((profile, i) =>
              <Course
                key={i}
                categories={categories}
                course={profile}
                list={list.filter(l => l.profiles.filter(p => p.profile === profile.profile && p.form === profile.form && p.tax === profile.tax).length > 0)}
              />
            )}
          </div>
        </div>
      }
    </I18nContext.Provider>
  )
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired
}

function Course ({ course, categories, list }) {
  const [active, setActive] = useState(false)

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
          {list.sort((a, b) => (a.achievements_all > b.achievements_all) ? -1 : 1)
            .sort((a, b) => (a.subjects_all > b.subjects_all) ? -1 : 1)
            .map((abitur, _) =>
              <Abitur
                index={_ + 1}
                key={abitur.id}
                abitur={abitur}
                course={abitur.profiles.filter(p => p.profile === course.profile && p.form === course.form && p.tax === course.tax)[0]}
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
  index: PropTypes.number
}

function Abitur ({ abitur, course, index }) {
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
        </div>

        <div className={styles.summary}>
          {abitur.achievements_all + abitur.subjects_all}
        </div>

        <div className={styles.arrow} />
      </div>

      {active &&
        <div className={styles.details}>
          {abitur.subjects && abitur.subjects.length > 0 &&
            <div className={styles.section}>
              <div className={styles.section_name}>Предметы</div>
              <div className={styles.results}>
                {abitur.subjects.map(s =>
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
              <div className={styles.section_name}>Индивидуальные достижения</div>
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
