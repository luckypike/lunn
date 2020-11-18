import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { I18nContext } from '../../I18n'

import styles from './Youtube.module.css'

Frame.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string
}

export default function Youtube () {
  const I18n = useContext(I18nContext)

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        {I18n.t('pages.index.youtube.title')}
      </div>

      <Frame
        id="pDygcbjTpDk"
        title="Ректор НГЛУ Жанна Никонова отвечает на самые задаваемые вопросы о дистанционном обучении"
        desc="17 ноября"
      />

      <Frame
        id="yhghSNPxc7g"
        title="Ректор НГЛУ Жанна Никонова - о необходимости вакцинации от гриппа"
        desc="16 ноября"
      />
    </div>
  )
}

function Frame ({ id, title, desc }) {
  const [active, setActive] = useState(false)

  return (
    <div className={styles.video}>
      <div className={classNames(styles.youtube, { [styles.active]: active })} onClick={() => setActive(true)} >
        {!active &&
          <div className={styles.img}>
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} />
          </div>
        }

        {active &&
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
          />
        }
      </div>

      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.date}>
        {desc}
      </div>
    </div>
  )
}
