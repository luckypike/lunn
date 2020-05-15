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
              Пока вы не подтвердить почту часть разделов будет недоступна, например, подача документов, потому что на неё будут приходить уведомления о процессе рассмотрения документов.
            </p>
          </div>
        }

        <div className={styles.root}>
          <a href="/admissions/new" className={styles.item}>
            <div className={styles.title}>
              Подача документов на поступление в электронном виде
            </div>

            <div className={styles.desc}>
              Вы сможете подать документы на поступление через сайт
            </div>

            <div className={styles.more}>
              Подать документы
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
        </div>
      </div>
    </div>
  )
}
