import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { navigate, Link } from '@reach/router'
// import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
import Admissions from './New/Admissions'
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
  const [notFillingAdmissions, setNotFillingAdmissions] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get('/admissions/new.json')

      setAdmissions(data.admissions)
      setNotFillingAdmissions(data.not_filling)
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

      <div className={styles.beta}>
        <div className={pages.container}>
          <div className={styles.betaText}>
            <h2>
              Открытый β-тест
            </h2>

            <p>
              До 19 июня подача документов через сайт работает в тестовом режиме.
              Это означает что часть функций тестируется и может работать некорректно.
              Все заявления поданные до 19 числа не будут удалены и будут считаться полноценными заявлениями о поступлении.
            </p>

            <p>
              Если у вас возникли трудости с заполнением или вы нашли техническую ошибку, которая мешает вам заполнить — просьба сообщить об этом на почту <a href="mailto:digital-lunn@yandex.ru">digital-lunn@yandex.ru</a>
            </p>
          </div>
        </div>
      </div>

      <div className={pages.container}>
        <div className={styles.root}>
          {notFillingAdmissions && notFillingAdmissions.length > 0 &&
            <div className={styles.admissions}>
              <Admissions admissions={notFillingAdmissions} />
            </div>
          }

          {admissions &&
            <div className={styles.start}>
              {isContinue() &&
                <div>
                  <h4>
                    Вы уже начинали заполнять заявление (№ {admissions[0].id})
                  </h4>

                  <p>
                    Вы заполнили его на {((admissions[0].state_key <= 11 ? admissions[0].state_key : 11) - 1) * 10}%.
                    Одновременно можно заполнять не более одного заявления.
                    Закончите заполенение текущего заявления и потом вы сможете подать еще одго при необходимости.
                  </p>

                  <p>
                    <Link className={styles.button_main} to={`/admissions/${admissions[0].id}/edit`}>
                      Продолжить заполнение
                    </Link>
                  </p>
                </div>
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
