import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { deserialize } from 'jsonapi-deserializer'
// import classNames from 'classnames'

// import { Title } from '../Pages'
import { I18nContext, useI18n } from '../I18n'
import Title from '../Title'
import Docs from '../Docs/Docs2'
import Renderer from '../Renderer'

import styles from './Page.module.css'
import pages from '../Pages.module.css'

Page.propTypes = {
  node: PropTypes.object,
  docs: PropTypes.object,
  user: PropTypes.object,
  loaf: PropTypes.array,
  locale: PropTypes.string
}

export default function Page ({ node, docs: docsJSON, user, loaf, locale }) {
  const I18n = useI18n(locale)
  const docs = deserialize(docsJSON)

  return (
    <I18nContext.Provider value={I18n}>
      <div className={pages.beta}>
        <Title
          h1={node.title}
          loaf={loaf}
          desc="Поступай легко – поступай онлайн"
        />

        <div className={pages.container}>
          {node.text &&
            <div className={styles.text}>
              <Renderer source={node.text} />
            </div>
          }

          {docs &&
            <div className={styles.docs}>
              <Docs docs={docs} locale={locale} />
            </div>
          }
        </div>
      </div>
    </I18nContext.Provider>
  )
}
