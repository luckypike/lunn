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
            Район
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
            Город
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

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Индекс *
          </div>

          <input
            type="text"
            value={values.address_index}
            name="address_index"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_index} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Улица *
          </div>

          <input
            type="text"
            value={values.address_street}
            name="address_street"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_street} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Дом *
          </div>

          <input
            type="text"
            value={values.address_house}
            name="address_house"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_house} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Корпус
          </div>

          <input
            type="text"
            value={values.address_building}
            name="address_building"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_building} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Квартира
          </div>

          <input
            type="text"
            value={values.address_apartment}
            name="address_apartment"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.address_apartment} />
      </div>
    </>
  )
}
