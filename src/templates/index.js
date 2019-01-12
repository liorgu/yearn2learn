import React from 'react'
import Layout from '../components/Layout'
import classes from './index.module.scss'
import NavLink from '../components/NavLink'
import Img from 'gatsby-image'
import { Link, graphql } from 'gatsby'

const IndexPage = ({ data, pageContext }) => {
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
        <header
          className={classes.header}
          style={{
            backgroundImage: `url(${
              data.background.childImageSharp.fluid.src
            })`,
          }}
        >
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

export const indexQuery = graphql`
  query {
    background: file(relativePath: { eq: "description.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
