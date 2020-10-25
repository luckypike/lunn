import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AnimateHeight from 'react-animate-height'

import { I18nContext } from '../../I18n'
import Renderer from '../../Renderer'

import styles from './Exp.module.css'

Exp.propTypes = {
  e: PropTypes.string,
  node: PropTypes.object,
  item: PropTypes.string,
  text: PropTypes.string,
  items: PropTypes.array,
  locale: PropTypes.string
}

export default function Exp ({ e, node, item, items, text }) {
  const [height, setHeight] = useState(0)
  // const I18n = useI18n(locale)
  const I18n = useContext(I18nContext)

  function handleClick () {
    setHeight(height === 0 ? 'auto' : 0)
  }

  return (
    <div className={styles.root}>
      <h4 onClick={handleClick}>
        {I18n.t(`tutor.${e}`)}
        <div className={classNames(styles.more, { [styles.opened]: height === 'auto' })} />
      </h4>

      <div>
        <AnimateHeight height={height} duration={300}>
          <>
            {e !== 'tutor_school' && item &&
              <p>
                {item}
              </p>
            }

            {e === 'tutor_school' && item &&
              <>
                <p>
                  {item}
                  <br />
                  {node.tutor_direction}
                </p>

                {node.tutor_edu &&
                  <p>
                    {node.tutor_edu}
                  </p>
                }
              </>
            }

            {text &&
              <Renderer source={text} />
            }

            {items &&
              <ul className={styles.ul}>
                {items.map((item, i) =>
                  <li key={i}>
                    {item}
                  </li>
                )}
              </ul>
            }
          </>

        </AnimateHeight>
      </div>
    </div>
  )
}
