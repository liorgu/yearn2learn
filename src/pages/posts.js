import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const Posts = ({ data }) => (
  <Layout
    title="Posts"
    description="Technical Posts About Web Development"
    posts={data.allMarkdownRemark.edges}
  />
)

export default Posts

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/posts/" } }
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
