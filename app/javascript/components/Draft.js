import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import parse, { domToReact } from 'html-react-parser'

import Gallery from './Gallery'

import styles from './Draft.module.css'

Renderer.propTypes = {
  source: PropTypes.string,
  images: PropTypes.array
}

export default function Renderer ({ source, images }) {
  const options = {
    replace: ({ type, name, attribs, children, data, parent }) => {
      if (type === 'tag') {
        if (name === 'p') {
          if (children.length === 1 && children[0].data && children[0].data.replace(/\s/g, '') === '') {
            return <></>
          }

          return (
            <p className={classNames(styles.p, styles[attribs.class])}>
              {domToReact(children, options)}
            </p>
          )
        }

        if (name === 'div') {
          if (children.length === 1 && children[0].data && children[0].data.replace(/\s/g, '') === '') {
            return <></>
          }

          // attribs.class === 'embedded_galleria' &&
          if (
            children[0] &&
            (
              children[0].data === '[galleria_embedded_tokens:galleria_embedded]' ||
              (children[0].children[0] && children[0].children[0].data === '[galleria_embedded_tokens:galleria_embedded]')
            )
          ) {
            return (
              <div className={styles.gallery}>
                <Gallery images={images} />
              </div>
            )
          }

          return (
            <div className={styles[attribs.class]}>
              {domToReact(children, options)}
            </div>
          )
        }

        if (name === 'figure') {
          return (
            <figure className={styles.figure}>
              {domToReact(children, options)}
            </figure>
          )
        }

        if (name === 'img') {
          const img = <img src={`http://www.lunn.ru${attribs.src}`} className={styles.img} />

          // if (!parent || (parent.name !== 'figure' && parent.name !== 'p')) {
          //   img = <figure>{img}</figure>
          // }

          return img
        }

        if (name === 'h1' || name === 'h2') {
          return (
            <h2 className={styles.h2}>
              {domToReact(children, options)}
            </h2>
          )
        }

        if (name === 'strong') {
          if (parent && parent.type === 'tag' && (parent.name === 'h2' || parent.name === 'strong')) {
            return (
              <>
                {domToReact(children, options)}
              </>
            )
          }

          if (children[0] && children[0].data === '[galleria_embedded_tokens:galleria_embedded]') {
            return <>{domToReact(children, options)}</>
          }

          return (
            <strong>
              {domToReact(children, options)}
            </strong>
          )
        }

        if (name === 'ul') {
          return (
            <ul className={styles.ul}>
              {domToReact(children, options)}
            </ul>
          )
        }

        if (name === 'u' || name === 'font') {
          return (
            <>
              {domToReact(children, options)}
            </>
          )
        }

        if (name === 'span') {
          if (parent && parent.type === 'tag' && !attribs.itemprop) {
            return (
              <>
                {domToReact(children, options)}
              </>
            )
          }

          return (
            <span itemProp={attribs.itemprop}>
              {domToReact(children, options)}
            </span>
          )
        }

        if (name === 'a') {
          return (
            <a className={styles.a} href={attribs.href}>
              {domToReact(children, options)}
            </a>
          )
        }

        if (name === 'ol') {
          return (
            <ol className={styles.ol}>
              {domToReact(children, options)}
            </ol>
          )
        }

        if (name === 'li') {
          return (
            <li>
              {domToReact(children, options)}
            </li>
          )
        }

        if (name === 'table') {
          return (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                {domToReact(children, options)}
              </table>
            </div>
          )
        }
      }
    }
  }

  const content = parse(source, options)

  return content
}

// export default function Renderer ({ source }) {
//   const blocks = convertFromHTML(source)
//   const state = ContentState.createFromBlockArray(
//     blocks.contentBlocks,
//     blocks.entityMap
//   )
//
//   return redraft(convertToRaw(state), renderers)
// }
//
// const getParagraphs = (children, { keys }) =>
//   children.map((p, i) =>
//     <p key={keys[i]} className={styles.p}>
//       {p}
//     </p>
//   )
//
// const getH2 = (children, { keys }) =>
//   children.map((p, i) =>
//     <h2 key={keys[i]} className={styles.h2}>
//       {p}
//     </h2>
//   )
//
// const getUl = (children, { depth, keys }) =>
//   <ul key={keys.join('-')} className={styles.ul}>
//     {children.map((li, i) =>
//       <li key={keys[i]}>{li}</li>
//     )}
//   </ul>
//
// const getOl = (children, { depth, keys }) =>
//   <ol key={keys.join('-')} className={styles.ol}>
//     {children.map((li, i) =>
//       <li key={keys[i]}>{li}</li>
//     )}
//   </ol>
//
// const getStyle = (children, { key }) =>
//   <strong key={key}>
//     {children}
//   </strong>
//
// const renderers = {
//   inline: {
//     BOLD: getStyle
//   },
//   blocks: {
//     unstyled: getParagraphs,
//     'header-two': getH2,
//     'unordered-list-item': getUl,
//     'ordered-list-item': getOl
//   }
// }
