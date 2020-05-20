import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepFour.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepFour ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Страна *
          </div>

          <input
            type="text"
            value={values.address_country}
            name="address_country"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_country} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Регион (автономная область, автономный округ, город ф.з., край, область, республика) *
          </div>

          <input
            type="text"
            value={values.address_region}
            name="address_region"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_region} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Район *
          </div>

          <input
            type="text"
            value={values.address_district}
            name="address_district"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_district} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Город *
          </div>

          <input
            type="text"
            value={values.address_city}
            name="address_city"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_city} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Поселок, село, деревня, хутор...
          </div>

          <input
            type="text"
            value={values.address_locality}
            name="address_locality"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_locality} />
      </div>
    </>
  )
}
