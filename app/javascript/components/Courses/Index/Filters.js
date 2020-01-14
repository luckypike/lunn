import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { navigate } from '@reach/router'
import querystring from 'querystring'

import styles from './Filters.module.css'

Filters.propTypes = {
  filters: PropTypes.object,
  query: PropTypes.object
}

export default function Filters ({ filters, query }) {
  const [active, setActive] = useState(true)

  return (
    <>
      <div className={styles.handler}>
        <div className={styles.toggle} onClick={() => setActive(!active)}>
          Фильтры
        </div>

        <div className={styles.resetAll} onClick={() => navigate('/programs')}>
          Сбросить
        </div>
      </div>

      <div className={classNames(styles.filters, { [styles.active]: active })}>
        <Filter title="Уровень подготовки" id="level" filters={filters} />

        <Filter title="Форма обучения" id="time" filters={filters} />

        <Filter title="Предметы ЕГЭ" id="ege" filters={filters} />
      </div>
    </>
  )
}

Filter.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  filters: PropTypes.object
}

function Filter ({ id, title, filters }) {
  const handleClick = (id, value) => {
    const query = querystring.stringify(Object.assign({}, ...[...filters.entries()].map(([k, v]) => ({ [k]: [...v].filter(ev => (ev[1] && ev[0] !== id) || (ev[0] === id && !value)).map(ev => ev[0]) }))))
    // const query = querystring.stringify([...filters].map(e => [e[0], [...e[1]].filter(ev => (ev[1] && ev[0] !== id) || (ev[0] === id && !value)).map(ev => ev[0])]))
    // console.log(query)
    navigate(`?${query}`)
  }

  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.items}>
        {[...filters.get(id)].map(e =>
          <div key={e[0]}>
            <div onClick={() => handleClick(e[0], e[1])}>
              {e[1] && '+ '}
              {e[0]}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
