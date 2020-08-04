import React from 'react'
import PropTypes from 'prop-types'
import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
import { useI18n } from '../I18n'

import styles from './Account.module.css'
import pages from '../Pages.module.css'

import ArrowImg from '!svg-react-loader?!../../images/arrow.svg'

Account.propTypes = {
  user: PropTypes.object,
  locale: PropTypes.string
}

export default function Account ({ user: data, locale }) {
  const I18n = useI18n(locale)
  const user = deserialize(data)

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={I18n.t('users.account.title')}
        desc={user.email}
      />

      <div className={pages.container}>
        {!user.confirmed &&
          <div className={styles.confirm}>
            <p>
              На почту {user.email} было отправлено письмо со ссылкой для подтверждения регистрации.
            </p>

            <p>
              Пока вы не подтвердите почту часть разделов будет недоступна, например, подача документов, потому что на неё будут приходить уведомления о процессе рассмотрения документов.
            </p>
          </div>
        }

        <div className={styles.root}>
          <a href="/admissions/new" className={styles.item}>
            <div className={styles.title}>
              Поступай легко — поступай онлайн
            </div>

            <div className={styles.desc}>
              Подать документы в приёмную комиссию через сайт
            </div>

            <div className={styles.more}>
              <span>Подать документы</span>

              <ArrowImg />
            </div>
          </a>

          <div className={styles.item}>
            <div className={styles.title}>
              Оплата обучения
            </div>

            <div className={styles.desc}>
              Вы сможете оплатить обучение или курсы через сайт
            </div>

            <div className={styles.more}>
              Временно недоступно
            </div>
          </div>

          {user.tutor &&
            <>
              {!user.has_page &&
                <a href="/tutors/new" className={styles.item}>
                  <div className={styles.title}>
                    Кабинет преподавателя
                  </div>

                  <div className={styles.more}>
                    <span>Заполнить анкету</span>

                    <ArrowImg />
                  </div>
                </a>
              }
              {user.has_page &&
                <a href={`/tutors/${user.page}/edit`} className={styles.item}>
                  <div className={styles.title}>
                    Кабинет преподавателя
                  </div>

                  <div className={styles.more}>
                    <span>Изменить анкету</span>

                    <ArrowImg />
                  </div>
                </a>
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}
