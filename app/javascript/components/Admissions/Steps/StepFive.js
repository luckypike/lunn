import React from 'react'
import PropTypes from 'prop-types'

import { Errors } from '../../Form'

import form from '../../Form.module.css'

StepFive.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
}

export default function StepFive ({ values, errors, onChange }) {
  return (
    <>
      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_index || ''}
            name="address_index"
            onChange={onChange}
          />
          <div className={form.label}>
            Индекс *
          </div>
        </div>

        <Errors errors={errors.address_index} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_street || ''}
            name="address_street"
            onChange={onChange}
          />
          <div className={form.label}>
            Улица *
          </div>
        </div>

        <Errors errors={errors.address_street} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_house || ''}
            name="address_house"
            onChange={onChange}
          />
          <div className={form.label}>
            Дом *
          </div>
        </div>

        <Errors errors={errors.address_house} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_building || ''}
            name="address_building"
            onChange={onChange}
          />
          <div className={form.label}>
            Корпус
          </div>
        </div>

        <Errors errors={errors.address_building} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_apartment || ''}
            name="address_apartment"
            onChange={onChange}
          />
          <div className={form.label}>
            Квартира
          </div>
        </div>

        <Errors errors={errors.address_apartment} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_email || ''}
            name="address_email"
            onChange={onChange}
          />
          <div className={form.label}>
            E-mail
          </div>
        </div>

        <Errors errors={errors.address_email} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_mobile || ''}
            name="address_mobile"
            onChange={onChange}
          />
          <div className={form.label}>
            Мобильный телефон *
          </div>
        </div>

        <Errors errors={errors.address_mobile} />
      </div>

      <div className={form.el}>
        <div className={form.input}>
          <input
            type="text"
            value={values.address_phone || ''}
            name="address_phone"
            onChange={onChange}
          />
          <div className={form.label}>
            Домашний телефон
          </div>
        </div>

        <Errors errors={errors.address_phone} />
      </div>
    </>
  )
}
