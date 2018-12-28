import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout
      location={location}
      title={siteTitle}
      description={siteDescription}
      posts={posts}
    />
  )
}

export default BlogIndex

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/posts/|/weekly-links/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
