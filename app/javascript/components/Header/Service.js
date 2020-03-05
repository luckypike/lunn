import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Service.module.css'

Service.propTypes = {
  onSearchToggle: PropTypes.func,
  onSpecialToggle: PropTypes.func,
  index: PropTypes.bool,
  menuActive: PropTypes.bool,
  specialActive: PropTypes.bool,
  locale: PropTypes.string
}

export default function Service ({
  onSearchToggle,
  onSpecialToggle,
  index,
  menuActive,
  specialActive,
  locale
}) {
  return (
    <div className={classNames(styles.root, { [styles.white]: index, [styles.black]: menuActive })}>
      <div className={styles.locales}>
        {locale === 'ru' &&
          <a href="/en/page/study-russian-lunn">EN</a>
        }

        {locale !== 'ru' &&
          <a href="/">RU</a>
        }
      </div>

      <div className={classNames(styles.special, { [styles.active]: specialActive })} onClick={onSpecialToggle}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 9.266a10.366 10.366 0 015.674 1.678 10.94 10.94 0 013.947 4.556 10.994 10.994 0 01-3.952 4.547A10.42 10.42 0 0116 21.733a10.42 10.42 0 01-5.669-1.686A10.995 10.995 0 016.378 15.5a10.94 10.94 0 013.947-4.556A10.366 10.366 0 0116 9.266zM16 7c-2.59.002-5.12.814-7.26 2.33A13.328 13.328 0 004 15.5a13.315 13.315 0 004.738 6.173A12.555 12.555 0 0016 24c2.59 0 5.122-.811 7.262-2.327A13.316 13.316 0 0028 15.5a13.328 13.328 0 00-4.74-6.17A12.568 12.568 0 0016 7zm0 5.666c.539 0 1.066.166 1.515.478.448.311.798.754 1.005 1.271.206.518.26 1.088.155 1.637a2.87 2.87 0 01-.747 1.451 2.698 2.698 0 01-1.396.776c-.53.11-1.078.053-1.576-.161a2.753 2.753 0 01-1.224-1.044 2.912 2.912 0 01-.46-1.574c0-.752.288-1.472.8-2.004a2.678 2.678 0 011.928-.83zm0-2.266c-.971 0-1.92.299-2.728.86a5.062 5.062 0 00-1.808 2.288 5.284 5.284 0 00-.28 2.947c.19.989.658 1.898 1.344 2.61a4.856 4.856 0 002.514 1.396c.952.197 1.94.096 2.836-.29a4.954 4.954 0 002.203-1.878c.54-.839.828-1.825.828-2.833a5.21 5.21 0 00-1.44-3.604 4.825 4.825 0 00-3.47-1.496z" />
        </svg>
      </div>

      <div className={styles.search} onClick={onSearchToggle}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.607 18.856h-.922l-.327-.315a7.595 7.595 0 10-.817.817l.315.327v.922l5.835 5.816 1.733-1.733-5.817-5.834zm-7 0a5.25 5.25 0 114.853-3.24 5.243 5.243 0 01-4.853 3.24z" />
        </svg>
      </div>
    </div>
  )
}
