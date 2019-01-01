import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const WeeklyLinks = ({ data }) => (
  <Layout
    title="Weekly Links"
    description="Useful links for developers, published every Saturday"
    posts={data.allMarkdownRemark && data.allMarkdownRemark.edges}
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
