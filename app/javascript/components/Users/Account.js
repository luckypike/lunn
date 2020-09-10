import React from 'react'
import PropTypes from 'prop-types'
import { deserialize } from 'jsonapi-deserializer'

import Title from '../Title'
import { useI18n } from '../I18n'

import styles from './Account.module.css'
import pages from '../Pages.module.css'

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
          {user.is_accountant &&
            <a href="/payments" className={styles.item}>
              <div className={styles.title}>
                Платежи
              </div>

              <div className={styles.desc}>
                Платежи через сайт с рассчетом комиссии
              </div>

              <div className={styles.more}>
                Список платежей

                <svg viewBox="0 0 36 36" fill="none" stroke="black">
                  <circle cx="18" cy="18" r="17" />

                  <path
                    d="M21 12L27 18L21 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M9 18H27"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          }

          <a href="/admissions/new" className={styles.item}>
            <div className={styles.title}>
              Поступай легко — поступай онлайн
            </div>

            <div className={styles.desc}>
              Подать документы в приёмную комиссию через сайт
            </div>

            <div className={styles.more}>
              Подать документы

              <svg viewBox="0 0 36 36" fill="none" stroke="black">
                <circle cx="18" cy="18" r="17" />

                <path
                  d="M21 12L27 18L21 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M9 18H27"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>

          <a href="/pay" className={styles.item}>
            <div className={styles.title}>
              Оплата обучения
            </div>

            <div className={styles.desc}>
              Вы сможете оплатить обучение или курсы через сайт
            </div>

            <div className={styles.more}>
              Оплатить онлайн

              <svg viewBox="0 0 36 36" fill="none" stroke="black">
                <circle cx="18" cy="18" r="17" />

                <path
                  d="M21 12L27 18L21 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M9 18H27"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
