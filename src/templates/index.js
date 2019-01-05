import React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/Layout'
import classes from './index.module.scss'
import NavLink from '../components/NavLink'

const IndexPage = ({ pageContext }) => {
  const {
    group,
    index,
    pageCount,
    pathPrefix,
    additionalContext: { title, description },
  } = pageContext

  const navLinkProps = { currIndex: index, pathPrefix, count: pageCount }

  return (
    <Layout>
      <div className={classes.wrapper}>
        <header>
          <h1>{title}</h1>
          <h2>{description}</h2>
        </header>
        {group &&
          group.map(({ node }) => {
            const postTitle = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <div>
                  <strong>{node.frontmatter.date}</strong>
                </div>
                <h3 className={classes.postTitle}>
                  <Link to={node.fields.slug}>{postTitle}</Link>
                </h3>
              </div>
            )
          })}
        <span>
          <NavLink {...navLinkProps} index={1} label="<" />
          {[index - 2, index - 1, index, index + 1, index + 2].map(
            indexLink => (
              <NavLink {...navLinkProps} index={indexLink} label={indexLink} />
            )
          )}
          <NavLink {...navLinkProps} index={pageCount} label=">" />
        </span>
      </div>
    </Layout>
  )
}
export default IndexPage
