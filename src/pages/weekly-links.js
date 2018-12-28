import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const WeeklyLinks = ({ data }) => (
  <Layout
    title="Posts"
    description="Technical Posts About Web Development"
    posts={data.allMarkdownRemark.edges}
  />
)

export default WeeklyLinks

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/weekly-links/" } }
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
