import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../Form.module.css'

StepFour.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepFour ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_country || ''}
            name="address_country"
            onChange={onChange}
          />
          <div className={form.label}>
            Страна *
          </div>
        </div>

        <Errors errors={errors.address_country} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_region || ''}
            name="address_region"
            onChange={onChange}
          />
          <div className={form.label}>
            Регион (автономная область, автономный округ, город ф.з., край, область, республика) *
          </div>
        </div>

        <Errors errors={errors.address_region} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_district || ''}
            name="address_district"
            onChange={onChange}
          />
          <div className={form.label}>
            Район *
          </div>
        </div>

        <Errors errors={errors.address_district} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_city || ''}
            name="address_city"
            onChange={onChange}
          />
          <div className={form.label}>
            Город *
          </div>
        </div>

        <Errors errors={errors.address_city} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_locality || ''}
            name="address_locality"
            onChange={onChange}
          />
          <div className={form.label}>
            Поселок, село, деревня, хутор...
          </div>
        </div>

        <Errors errors={errors.address_locality} />
      </div>
    </>
  )
}
