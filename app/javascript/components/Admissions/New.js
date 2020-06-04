import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { navigate, Link } from '@reach/router'
// import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
import { useI18n } from '../I18n'

import styles from './New.module.css'
import pages from '../Pages.module.css'

New.propTypes = {
  user: PropTypes.object,
  locale: PropTypes.string
}

export default function New ({ locale, user: userJSON }) {
  const I18n = useI18n(locale)
  // const user = deserialize(userJSON)

  const [admissions, setAdmissions] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/admissions/new.json')

      setAdmissions(data.admissions)
    }

    _fetch()
  }, [])

  const handleCreate = async () => {
    await axios.post('/admissions.json', { admission: { q: '' } })
      .then(({ data }) => {
        navigate(`/admissions/${data.id}/edit`)
      }).catch(_error => {
        window.location = '/join'
      })
  }

  const isContinue = () => admissions && admissions.length === 1

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={I18n.t('admissions.new.title')}
      />

      <div className={pages.container}>
        <div className={styles.root}>
          {admissions &&
            <div className={styles.start}>
              {isContinue() &&
                <Link className={styles.button_main} to={`/admissions/${admissions[0].id}/edit`}>
                  Продолжить заполнение (шаг 3 из 10)
                </Link>
              }

              {!isContinue() &&
                <button className={styles.button_main} onClick={handleCreate}>
                  Начать заполнение
                </button>
              }
            </div>
          }

          <div className={styles.text}>
            <p>
              Вы можете начать заполнять анкеты. Предоставляя свои персональные данные, вы даете свое согласие на обработку ваших персональных данных, как это описано в <a href="#">Соглашении о персональных данных</a>. Анкета состоит из 10 шагов на которых нужно заполнить информацию:
            </p>

            <ul className={styles.ul}>
              <li>
                ваши личные данные;
              </li>

              <li>
                документ, удостоверяющий личность;
              </li>

              <li>
                информация о родителях;
              </li>

              <li>
                адреса регистрации и проживания;
              </li>

              <li>
                информация об оконченом учебном заведении;
              </li>

              <li>
                информация об имеющемся образовании;
              </li>

              <li>
                информация о личных достижениях;
              </li>

              <li>
                информация по баллам;
              </li>

              <li>
                информация о форме обучения.
              </li>
            </ul>

            <p>
              На последнем шаге вы сможете проверить все данные перед отправкой их на проверку.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
