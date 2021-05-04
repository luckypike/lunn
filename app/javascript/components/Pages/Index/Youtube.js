import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { I18nContext } from '../../I18n'

import styles from './Youtube.module.css'

Youtube.propTypes = {
  video: PropTypes.array
}

Frame.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string
}

export default function Youtube ({ video }) {
  const I18n = useContext(I18nContext)

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        {I18n.t('pages.index.youtube.title')}
      </div>

      {video.map((v, i) =>
        <Frame
          key={`${v.youtube_id}-${i}`}
          id={v.youtube_id}
          title={v.title}
          desc={dayjs.unix(v.created).locale(I18n.locale).format('D MMMM YYYY')}
        />
      )}
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
