import React from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'

import Title from '../Title'
import { useI18n } from '../I18n'

import pages from '../Pages.module.css'
import styles from './Success.module.css'

Success.propTypes = {
  result: PropTypes.string,
  locale: PropTypes.string
}

export default function Success ({ result, locale }) {
  const I18n = useI18n(locale)

  const isSuccess = () => result === 'success'

  return (
    <div className={pages.beta}>
      <Title
        beta
        h1={I18n.t('payments.success.title')}
      />

      <div className={pages.container}>
        <div className={styles.text}>
          {isSuccess() ? 'Оплата прошла успешно.' : 'Произошла ошибка при оплате, платёж не был обработан.' }
        </div>
      </div>
    </div>
  )
}
