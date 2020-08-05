import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { navigate, Link } from '@reach/router'
// import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
import Admissions from './New/Admissions'
import Text from './New/Text'
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

      <div className={styles.dup}>
        <div className={pages.container}>
          <h2>
            Повторная подача заявления
          </h2>

          <p className={styles.lead}>
            Если вы уже заполнили анкету до получения ЕГЭ и отправили ее в приемную комиссию, убедительно просим вас не заполнять новую анкету и не вносить в нее баллы!
          </p>

          <p>
            Мы сами проверяем баллы через Федеральную информационную систему и вносим их в нашу базу данных. После этого они появляются в списке абитуриентов. Обработка повторных заявлений и выявление «двойников» отнимает много времени и отвлекает от работы по внесению баллов ЕГЭ и обработке новых заявлений!
          </p>
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
                    Вы заполнили его на {parseInt((admissions[0].state_key <= 11 ? admissions[0].state_key : 11) / 11 * 100)}%.
                    Одновременно можно заполнять не более одного заявления.
                    Закончите заполнение текущего заявления.
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
            <Text />
          </div>
        </div>
      </div>
    </div>
  )
}
