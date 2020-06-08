import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../FormStatic.module.css'

StepFive.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepFive ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Страна *
          </div>

          <input
            type="text"
            value={values.residence_country}
            name="residence_country"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_country} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Регион (автономная область, автономный округ, город ф.з., край, область, республика) *
          </div>

          <input
            type="text"
            value={values.residence_region}
            name="residence_region"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_region} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Район
          </div>

          <input
            type="text"
            value={values.residence_district}
            name="residence_district"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_district} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Город
          </div>

          <input
            type="text"
            value={values.residence_city}
            name="residence_city"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_city} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Поселок, село, деревня, хутор...
          </div>

          <input
            type="text"
            value={values.residence_locality}
            name="residence_locality"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_locality} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Индекс *
          </div>

          <input
            type="text"
            value={values.residence_index}
            name="residence_index"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_index} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Улица *
          </div>

          <input
            type="text"
            value={values.residence_street}
            name="residence_street"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_street} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Дом *
          </div>

          <input
            type="text"
            value={values.residence_house}
            name="residence_house"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_house} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Корпус
          </div>

          <input
            type="text"
            value={values.residence_building}
            name="residence_building"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_building} />
      </div>

      <div className={form.item}>
        <div className={form.input}>
          <div className={form.label}>
            Квартира
          </div>

          <input
            type="text"
            value={values.residence_apartment}
            name="residence_apartment"
            onChange={onChange}
          />
        </div>

        <Errors errors={errors.residence_apartment} />
      </div>
    </>
  )
}
