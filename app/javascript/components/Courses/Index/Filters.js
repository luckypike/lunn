import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useI18n } from '../../I18n'

import styles from './Filters.module.css'

Filters.propTypes = {
  locale: PropTypes.string,
  level: PropTypes.string,
  filters: PropTypes.object,
  setFilters: PropTypes.func
}

export default function Filters ({ filters, locale, setFilters, level }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window) {
      const width = window.innerWidth

      if (width >= 960) {
        setActive(true)
      }
    }
  }, [])

  return (
    <>
      {/* <div className={styles.handler}>
        <div className={styles.toggle} onClick={() => setActive(!active)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 14">
            <path stroke="#141414" strokeWidth="2" d="M7 2h9M8 7h8M12 12h4"/>
            <path fill="#141414" d="M4 5h2v4H4V5zM6 0h2v4H6zM8 10h2v4H8zM0 11h8v2H0zM0 1h4v2H0zM0 6h4v2H0z"/>
          </svg>

          {active ? 'Скрыть фильтры' : 'Показать фильтры'}
        </div>
      </div> */}

      <div className={classNames(styles.filters, { [styles.active]: active })}>
        <Filter
          title="Форма обучения"
          id="time"
          options={[1, 2, 3]}
          filters={filters}
          locale={locale}
          setFilters={setFilters}
        />

        <Filter
          title="Предметы ЕГЭ"
          id="ege"
          options={['foreign', 'russian', 'lit', 'math', 'history', 'social']}
          locale={locale}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </>
  )
}

Filter.propTypes = {
  locale: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  filters: PropTypes.object,
  setFilters: PropTypes.func
}

function Filter ({ locale, id, title, options, filters, setFilters }) {
  const I18n = useI18n(locale)
  const [selected, setSelected] = useState(filters.get(id) || [])

  useEffect(() => {
    const newFilters = new Map(filters)

    newFilters.set(id, selected)
    setFilters(newFilters)
  }, [selected])

  const handleToggle = (value) => {
    const newSelected = [...selected]

    if (newSelected.includes(value)) {
      if (value !== 'russian') {
        setSelected(newSelected.filter(item => item !== value))
      }
    } else {
      if (newSelected.length < 3) {
        newSelected.push(value)
      }

      setSelected(newSelected)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        {title &&
          <div className={styles.title}>
            {title}
          </div>
        }

        <div className={styles.items}>
          { options && options.map(option =>
            <div key={option} className={classNames(styles.item, { [styles.selected]: selected.includes(option), [styles.russian]: option === 'russian' })} onClick={() => handleToggle(option)}>
              {I18n.t(`courses.filters.${option}`)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
