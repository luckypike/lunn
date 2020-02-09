import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { navigate } from '@reach/router'
import querystring from 'querystring'

import { useI18n } from '../../I18n'

import styles from './Filters.module.css'

Filters.propTypes = {
  locale: PropTypes.string,
  filters: PropTypes.object,
  query: PropTypes.object
}

export default function Filters ({ filters, query, locale }) {
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
        <Filter title="Уровень подготовки" id="level" filters={filters} locale={locale}/>

        <Filter title="Форма обучения" id="time" filters={filters} locale={locale}/>

        <Filter title="Предметы ЕГЭ" id="ege" filters={filters} locale={locale} />
      </div>
    </>
  )
}

Filter.propTypes = {
  locale: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  filters: PropTypes.object
}

function Filter ({ locale, id, title, filters }) {
  const I18n = useI18n(locale)
  const selectedFilters = [...filters.get(id)].filter(([key, value]) => value === true && key != 'russian')

  const handleClick = (id, value) => {
    const query = querystring.stringify(Object.assign({}, ...[...filters.entries()].map(([k, v]) => ({ [k]: [...v].filter(ev => (ev[1] && ev[0] !== id) || (ev[0] === id && !value)).map(ev => ev[0]) }))))
    // const query = querystring.stringify([...filters].map(e => [e[0], [...e[1]].filter(ev => (ev[1] && ev[0] !== id) || (ev[0] === id && !value)).map(ev => ev[0])]))
    navigate(`?${query}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.filter, { [styles.active]: selectedFilters.length > 0 })}>
        <div className={styles.title}>
          {title}
          {selectedFilters.length > 0 &&
            <div className={styles.checked}>
              {selectedFilters.length}
            </div>
          }
        </div>

        <div className={styles.items}>
          { id && id === 'ege' &&
            <div key="ege" className={classNames(styles.item, styles.selected, styles.disabled)}>
              <label>
                <input
                  disabled
                  checked={true}
                  type="checkbox"
                  value="true"
                />
                {I18n.t(`courses.filters.russian`)}
              </label>
            </div>
          }
          {[...filters.get(id)].filter(([key, value]) => key != 'russian').map(e =>
            <div key={e[0]} className={classNames(styles.item, { [styles.selected]: e[1] }, { [styles.disabled]: id === 'ege' && !e[1] && selectedFilters.length >= 2 })}>
              <label>
                <input
                  disabled={selectedFilters.length >= 2 && !e[1] && id === 'ege' ? true : false}
                  checked={e[1]}
                  type="checkbox"
                  value={e[1]}
                  onChange={() => handleClick(e[0], e[1])}
                />
                {I18n.t(`courses.filters.${e[0]}`)}
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
